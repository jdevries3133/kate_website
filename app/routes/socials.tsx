import { ActionArgs } from "remix";
import { Loading } from "~/components/loading";
import { DefaultPageContainer } from "~/components/pageContainer";
import { searchAction, searchLoader, SearchLoader } from "~/components/search";

export const action = (a: ActionArgs) => searchAction(a);

export const loader: SearchLoader = ({ request }) => ({
  search: searchLoader(request),
});

export default function Socials() {
  return (
    <DefaultPageContainer>
      <div className="max-w-prose">
        <a
          className="twitter-timeline"
          data-width="600"
          href="https://twitter.com/ktaetlel?ref_src=twsrc%5Etfw"
        >
          <div className="w-full text-center">
            <Loading />
          </div>
        </a>
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charSet="utf-8"
        ></script>
      </div>
    </DefaultPageContainer>
  );
}
