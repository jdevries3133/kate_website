// app/sessions.js
import { createCookieSessionStorage } from "remix";
import { COOKIE_TIMEOUT, DOMAIN, SECRET_KEY } from "./config.server";

export const {
  getSession,
  commitSession: _commitSessionDefault,
  destroySession,
} = createCookieSessionStorage({
  cookie: {
    name: "__session",
    domain: DOMAIN,
    httpOnly: true,
    path: "/",
    secrets: [SECRET_KEY],
    sameSite: "strict",
    secure: true,
  },
});

/**
 * commitSession wrapper that also resets the cookie expiration date
 */
export const commitSession: typeof _commitSessionDefault = (
  session,
  opts = {}
) => {
  if (opts.expires === undefined) {
    opts.expires = new Date(Date.now() + COOKIE_TIMEOUT);
  }
  return _commitSessionDefault(session, opts);
};
