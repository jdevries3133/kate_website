import { title } from "./utils";
import { doesStaticFileExist } from "./utils";

test("title function", () => {
  expect(title("hello")).toEqual("Hello");
  expect(title("hello there")).toEqual("Hello There");
});

test("valid file appears true", () => {
  expect(doesStaticFileExist("/static/cat.webp")).toBe(true);
  expect(doesStaticFileExist("favicon.ico")).toBe(true);
  expect(doesStaticFileExist("/favicon.ico")).toBe(true);
  expect(doesStaticFileExist("site.webmanifest")).toBe(true);
});
