export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://kate.jackdevries.com/"
    : "http://localhost:8000";

// one year in seconds
export const COOKIE_TIMEOUT =
  60 * // seconds
  60 * // minutes
  24 * // hours
  365; // days
