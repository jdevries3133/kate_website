import { useEffect, useRef } from "react";

/* internally includes sane defaults for debouncing */
export const useScrollDirection = ({
  up,
  down,
}: {
  up: () => void;
  down: () => void;
}) => {
  const scrollPrev = useRef(0);
  useEffect(() => {
    const listener = () => {
      // note: scrollTop increases in value as the user scrolls down. If the
      // previous value is smaller than the current value, the user is scrolling
      // down.
      const scrollCurrent = document.documentElement.scrollTop;
      scrollCurrent < scrollPrev.current ? down() : up();
      scrollPrev.current = scrollCurrent;
    };

    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
  }, [up, down]);
};
