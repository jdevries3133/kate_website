// app/sessions.js
import { createCookieSessionStorage } from "remix";
import { BASE_URL, COOKIE_TIMEOUT } from "./config";

export const {
  getSession,
  commitSession: _commitSessionDefault,
  destroySession,
} = createCookieSessionStorage({
  cookie: {
    name: "__session",
    domain: process.env.NODE_ENV === "production" ? BASE_URL : "localhost",
    httpOnly: true,
    path: "/",
    secrets: [process.env.SECRET_KEY || ""],
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
