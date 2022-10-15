import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

// cannot use; pending https://github.com/remix-run/remix/issues/2570
//@ts-ignore
function hydrateReact18() {
  const hydrate = () => {
    startTransition(() => {
      hydrateRoot(
        document,
        <StrictMode>
          <RemixBrowser />
        </StrictMode>
      );
    });
  };

  if (window.requestIdleCallback) {
    window.requestIdleCallback(hydrate);
  } else {
    // Safari doesn't support requestIdleCallback
    // https://caniuse.com/requestidlecallback
    window.setTimeout(hydrate, 1);
  }
}

import { hydrate } from "react-dom";

hydrate(<RemixBrowser />, document);
