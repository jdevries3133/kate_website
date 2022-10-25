import { LoaderArgs, ActionArgs } from "remix";
import { searchLoader } from "~/components/search";
import ListPosts, { loader as postLoader } from "~/components/listPosts";
import { DefaultPageContainer } from "~/components/pageContainer";
import { searchAction } from "~/components/search/search.server";
import { profileLoader } from "~/services/profile";

export const action = ({ request }: ActionArgs) => searchAction(request);

export const loader = async ({ request }: LoaderArgs) => ({
  profile: await profileLoader(request),
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
