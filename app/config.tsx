export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://jackdevries.com"
    : "http://localhost:8000";

export const HOMEPAGE_LAST_UPDATED = "2022-05-21t08:36:31-04:00";

// in seconds
export const COOKIE_TIMEOUT =
  60 * // seconds
  60 * // minutes
  24 * // hours
  365; // days
