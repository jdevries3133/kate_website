// app/sessions.js
import { createCookieSessionStorage } from "remix";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__session",

      // all of these are optional
      domain:
        process.env.NODE_ENV === "production"
          ? "empacadmusic.org"
          : "localhost",
      expires: new Date(Date.now() + 60_000),
      httpOnly: true,
      maxAge: 600,
      path: "/",
      secrets: [process.env.SECRET_KEY || ""],
      sameSite: "lax",
      secure: true,
    },
  });

export { getSession, commitSession, destroySession };
