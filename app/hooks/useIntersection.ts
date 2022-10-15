import { useEffect } from "react";

export const useIntersection = (
  element: HTMLElement | null | undefined,
  callback: IntersectionObserverCallback,
  opts: IntersectionObserverInit
) => {
  useEffect(() => {
    if (element) {
      if (opts.root === undefined) opts.root = null;
      const observer = new IntersectionObserver(callback, opts);
      observer.observe(element);
      return () => observer.disconnect();
    }
  }, [element, callback, opts]);
};
