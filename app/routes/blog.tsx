import { ActionArgs, LoaderFunction } from "remix";
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

export const action = async (a: ActionArgs) => searchAction(a);

type LoaderData = SearchLoaderData & PostLoaderData;

export const loader: LoaderFunction = ({ request }): LoaderData => ({
  posts: postLoader(),
  search: searchLoader(request),
});

export default function Blog() {
  return (
    <DefaultPageContainer>
      <ListPosts />
    </DefaultPageContainer>
  );
}
