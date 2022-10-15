import { useState } from "react";

import { useIntersection } from "~/hooks/useIntersection";

export const ScrollToTopButton: React.FC<{
  showIfIntersecting?: HTMLElement | null;
  mobileOnly?: boolean;
}> = ({ showIfIntersecting, mobileOnly }) => {
  const [show, setShow] = useState(false);

  const scrollToTop = () => {
    document.documentElement.scrollTop = 0;
  };

  useIntersection(
    showIfIntersecting,
    (e) => {
      e.forEach((entry) => {
        if (entry.isIntersecting && !show) setShow(true);
        else if (!entry.isIntersecting && show) setShow(false);
      });
    },
    {
      rootMargin: "0px",
      threshold: 0,
    }
  );

  return (
    <div className={mobileOnly === false ? "" : "sm:hidden"}>
      <div className="fixed bottom-2 z-50 w-full">
        <div className="flex justify-center">
          <button
            onClick={scrollToTop}
            className={`
            font-serif
            font-light
            p-2
            bg-secondary-200
            hover:bg-secondary-300
            rounded-xl
            shadow-xl
            border-2
            border-accent-200
            hover:shadow-none
            ${show ? "animate-pulse" : ""}
            transition
            ease-in-out
            delay-100
            ${show ? "opacity-100" : "opacity-0"}
            `}
          >
            Scroll To Top
          </button>
        </div>
      </div>
    </div>
  );
};
