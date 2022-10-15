import { useEffect } from "react";

export const useInterval = (callback: () => void, interval: number): void => {
  useEffect(() => {
    const id = setInterval(callback, interval);
    return () => clearInterval(id);
  });
};
