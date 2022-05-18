import { renderToString } from "react-dom/server";
import { RemixServer } from "remix";
import type { EntryContext } from "remix";
import { parseAcceptLanguage } from "intl-parse-accept-language";
import { LocaleContextProvider } from "./providers/localeProvider";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const acceptLanguage = request.headers.get("accept-language");
  const locales = parseAcceptLanguage(acceptLanguage, {
    validate: Intl.DateTimeFormat.supportedLocalesOf,
  });
  const markup = renderToString(
    <LocaleContextProvider locales={locales}>
      <RemixServer context={remixContext} url={request.url} />
    </LocaleContextProvider>
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
