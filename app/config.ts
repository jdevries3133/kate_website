export const DOMAIN =
  process.env.NODE_ENV === "production" ? "katetell.com" : "localhost";
export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://katetell.com/"
    : "http://localhost:8000";

const _secret = process.env.SECRET_KEY;
if (!_secret) {
  throw new Error("missing required environment variable SECRET_KEY");
}
export const SECRET_KEY: string = _secret;

export const COOKIE_TIMEOUT = // one year
  60 * // seconds
  60 * // minutes
  24 * // hours
  365; // days
