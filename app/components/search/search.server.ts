import Fuse from "fuse.js";
import { ActionFunction, redirect } from "remix";
import { allPosts, getSerializableMetaData } from "~/services/post";
import { mdxModToPlainText } from "~/services/post/toPlainText.server";

export type LoaderData = { search: ReturnType<typeof searchLoader> };

export const searchAction: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const action = data.get("action");
  if (action === "clearSearchResults") {
    return redirect("/blog");
  }
  return null;
};

export const searchLoader = (query: string) => {
  if (!query) return [];

  type QueryablePost = ReturnType<typeof getSerializableMetaData> & {
    /* plain text conetnt */
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
