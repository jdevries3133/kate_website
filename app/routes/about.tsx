import { Loading } from "~/components/loading";
import { DefaultPageContainer } from "~/components/pageContainer";
import { searchAction, searchLoader, SearchLoader } from "~/components/search";
import { TwitterLoading } from "./twitterLoading";

import * as AboutMe from "~/mdx/aboutMe.mdx";
import { TWITTER_EMBED_HEIGHT } from "~/config";
import { twitterScript } from "~/vendor/twitterScript";
import { useEffect, useState } from "react";
import { ScrollToTopButton } from "~/components/scrollToTopButton";

export const action = searchAction;

export const loader: SearchLoader = ({ request }) => ({
  search: searchLoader(request),
});

export default function About() {
  // Explicitly using state instead of a ref because we need to trigger a
  // re-render when the element exists. Ultimately, this creates or updates
  // the intersection observer deepeer in the component tree of the scroll
  // to top button
  const [ twitterEl, setTwitterEl ] = useState<HTMLElement | null>(null);

  useEffect(twitterScript, []);

  return (
    <DefaultPageContainer>
      <ScrollToTopButton  showIfIntersecting={twitterEl} />
      <div className="flex flex-col md:flex-row">
        <div className="prose bg-primary-100 rounded p-2 m-2">
          <AboutMe.default />
        </div>
        <div ref={(el) => setTwitterEl(el)} className="w-full md:w-[40vw]">
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
