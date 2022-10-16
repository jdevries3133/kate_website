import { title } from "./utils";

test("title function", () => {
  expect(title("hello")).toEqual("Hello");
  expect(title("hello there")).toEqual("Hello There");
});
