import { ActionFunction, LoaderFunction } from "remix";
import {
  searchLoader,
  LoaderData as SearchLoaderData,
} from "~/components/search";
import ListPosts, {
  LoaderData as PostLoaderData,
  loader as postLoader,
} from "~/components/listPosts";
import { DefaultPageContainer } from "~/components/pageContainer";
import { searchAction } from "~/components/search/search.server";

export const action: ActionFunction = async (args) => {
  return searchAction(args)
  ;
};

type LoaderData = SearchLoaderData & PostLoaderData;

export const loader: LoaderFunction = ({ request }): LoaderData => {
  const url = new URL(request.url);
  const postQuery = url.searchParams.get("post");
  const postSearchResults = postQuery ? searchLoader(postQuery) : [];

  const postsList = postLoader();

  return {
    posts: postsList,
    search: postSearchResults,
  };
};

export default function Blog() {
  return (
    <DefaultPageContainer>
      <ListPosts />
    </DefaultPageContainer>
  );
}
