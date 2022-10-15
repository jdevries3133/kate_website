import { Loading } from "~/components/loading";
import { DefaultPageContainer } from "~/components/pageContainer";
import { searchAction, searchLoader, SearchLoader } from "~/components/search";
import { TwitterLoading } from "./twitterLoading";

import * as AboutMe from "~/mdx/aboutMe.mdx";
import { TWITTER_EMBED_HEIGHT } from "~/config";
import { twitterScript } from "~/vendor/twitterScript";
import { useEffect } from "react";

export const action = searchAction;

export const loader: SearchLoader = ({ request }) => ({
  search: searchLoader(request),
});

export default function About() {
  useEffect(twitterScript, []);
  return (
    <DefaultPageContainer>
      <div className="flex flex-col md:flex-row">
        <div className="prose bg-primary-100 rounded p-2 m-2">
          <AboutMe.default />
        </div>
        <div className="w-full md:w-[40vw]">
          <a
            className="twitter-timeline"
            href="https://twitter.com/ktaetlel?ref_src=twsrc%5Etfw"
            data-height={TWITTER_EMBED_HEIGHT}
          >
            <div className="w-full text-center">
              <Loading />
              <TwitterLoading />
            </div>
          </a>
        </div>
      </div>
    </DefaultPageContainer>
  );
}
