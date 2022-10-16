export const DOMAIN =
  process.env.NODE_ENV === "production" ? "katetell.com" : "localhost";
export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://katetell.com/"
    : "http://localhost:8000";

const _secret = process.env.SESSION_SECRET;
if (!_secret) {
  throw new Error("missing required environment variable SESSION_SECRET");
}
export const SESSION_SECRET: string = _secret;

export const EMAIL_SENDING_ENABLED = process.env.EMAIL_SENDING_ENABLED === "1";
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || "";
export const FROM_EMAIL = "hello@katetell.com";

export const COOKIE_TIMEOUT = // one year
  60 * // seconds
  60 * // minutes
  24 * // hours
  365; // days
