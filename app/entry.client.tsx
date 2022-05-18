import { hydrate } from "react-dom";
import { RemixBrowser } from "remix";
import { LocaleContextProvider } from "./providers/localeProvider";

const locales = window.navigator.languages;

hydrate(
  <LocaleContextProvider locales={locales as any as string[]}>
    <RemixBrowser />
  </LocaleContextProvider>,

  document
);
