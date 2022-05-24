import { doesStaticFileExist } from "./utils";

test("valid file appears true", () => {
  expect(doesStaticFileExist("/static/cluster.webp")).toBe(true);
  expect(doesStaticFileExist("favicon.ico")).toBe(true);
  expect(doesStaticFileExist("/favicon.ico")).toBe(true);
  expect(doesStaticFileExist("site.webmanifest")).toBe(true);
});
