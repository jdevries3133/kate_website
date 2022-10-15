import Fuse from "fuse.js";
import { ActionArgs, LoaderArgs, redirect } from "remix";
import { allPosts, getSerializableMetaData } from "~/services/post";
import { mdxModToPlainText } from "~/services/post/toPlainText.server";

export type LoaderData = { search: ReturnType<typeof searchLoader> };
export type SearchLoader = (arg: LoaderArgs) => LoaderData;

export const searchAction = async ({ request }: ActionArgs) => {
  const data = await request.clone().formData();
  const action = data.get("action");
  if (action === "clearSearchResults") {
    const url = new URL(request.url);
    url.searchParams.delete("post");
    throw redirect(url.toString());
  }
  return null;
};

export const searchLoader = (request: Request) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("post");
  if (!query) return [];

  type QueryablePost = ReturnType<typeof getSerializableMetaData> & {
    /* plain text content */
    content: string;
  };

  // note: this can't be in the collections module because mdxModToPlainText
  // can only run on the server
  const queryablePosts = allPosts.reduce<QueryablePost[]>(
    (acc, post) => [
      ...acc,
      {
        ...getSerializableMetaData(post),
        content: mdxModToPlainText(post),
      },
    ],
    []
  );

  const fuseOpts = { keys: ["content", "title", "description"] };
  const searchResult = new Fuse(queryablePosts, fuseOpts).search(query);

  if (searchResult) {
    return searchResult.map((res) => ({
      title: res.item.title,
      description: res.item.description,
      slug: res.item.slug,
      created: res.item.created.toISOString(),
    }));
  } else {
    return [];
  }
};
