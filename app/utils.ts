import fs from "fs";
import path from "path";

const getBaseDir = () => path.resolve(__dirname, "..");

/**
 * Validate the existence of a file in /public/...
 *
 * Options:
 *  if clientIgnore is set to true, the function will just return `true`
 *  without checking, since this function uses server APIs.
 */
export function doesStaticFileExist(
  route: string,
  options?: {
    clientIgnore: boolean;
  }
) {
  if (options && options.clientIgnore) {
    return true;
  }
  // remove leading '/' if present
  if (route.startsWith("/")) {
    route = route.slice(1);
  }
  const fullpath = path.resolve(getBaseDir(), "public", route);
  return fs.existsSync(fullpath);
}
