import { vi } from "vitest";
import { validateSlug } from "./validateSlug";

vi.mock("~/mdx", () => {
  return {
    allPosts: [
      {
        attributes: {
          created: new Date(),
          title: "post",
          description: "my post",
        },
        filename: "post.mdx",
      },
    ],
  };
});

describe("validateSlug", () => {
  it("passes through valid slugs", () => {
    expect(validateSlug("post")).toEqual("post");
  });
  it("throws for invalid (not present) slugs", () => {
    expect(() => validateSlug("whatever")).toThrow();
  });
  it("throws a 404 Response", async () => {
    try {
      validateSlug("whatever");
      fail("previous call should have thrown");
    } catch (e) {
      expect((e as Response).status).toEqual(404);
      expect((e as Response).statusText).toEqual("Not Found");
      expect(await (e as Response).text()).toContain("slug is not valid");
    }
  });
});
