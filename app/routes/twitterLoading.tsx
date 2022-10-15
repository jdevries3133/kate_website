import { useState } from "react";
import { useInterval } from "~/hooks/useInterval";

/* twitter takes forever to load sometimes, so we may as well make it fun */
export const TwitterLoading: React.FC = () => {
  const [n, setN] = useState(0);
  useInterval(() => {
    if (n < messages.length - 1) {
      setN(n + 1);
    }
  }, 2000);

  const messages = [
    "",
    "Come on twitter",
    "You can do it!!",
    "I believe in you",
    "I believed in you",
    "Bruh, it's been 8 seconds",
    "On today's episode of 1 developer versus multi-billion dollar tech giant, we wait for twitter to load one embed",
    "Well, I hope you enjoy the page; I don't think twitter cares to join us today",
  ];

  return <p>{messages[n]}</p>;
};
