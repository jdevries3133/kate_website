import { useState, useEffect } from "react";

/* to avoid excessive re-renders, granularity is the number of pixels that
 * must change for a re-render to occur. For example, at the default granularity
 * of 100, the screen size must change by at least 100 px before the state
 * will be set, triggering a re-render. Set granularity to 0 to trigger a
 * re-render on every call to the window resize event handler
 */
export const useWidth = (granularity: number = 100) => {
  const [width, setWidth] = useState<number | null>(null);
  useEffect(() => {
    if (!width) {
      setWidth(window.innerWidth);
      return;
    }
    const handler = () => {
      if (Math.abs(window.innerWidth - width) > granularity) {
        setWidth(window.innerWidth);
      }
    };
    window.addEventListener("resize", handler);

    return () => window.removeEventListener("resize", handler);
  }, [granularity]);

  return width;
};
