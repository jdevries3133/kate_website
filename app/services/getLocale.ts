import { parseAcceptLanguage } from "intl-parse-accept-language";

export const getLocale = (request: Request) => {
  const locales = parseAcceptLanguage(request.headers.get("accept-language"), {
    validate: Intl.DateTimeFormat.supportedLocalesOf,
  });
  return locales;
};
