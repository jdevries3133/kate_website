import { vi } from "vitest";
import { validateMdxModule } from "./validateMdxModule";

vi.mock("~/mdx");

const makeModule = (removeAttr?: string): typeof import("*.mdx") => {
  const templateModule = {
    attributes: {
      extra: "things",
      are: "allowd",
      created: new Date(2020, 11, 12),
      lastUpdated: new Date(2022, 11, 15),
      title: "My Post",
      description: "My other post description",
      thumbnail: "/static/cluster.webp",
    },
    filename: "file.mdx",
    Component: () => <h1>Hello world from my other post</h1>,
    default: () => <h1>Hello world from my other post</h1>,
  };
  if (!removeAttr) return templateModule;
  return {
    ...templateModule,
    attributes: {
      ...templateModule.attributes,
      [removeAttr]: undefined,
    },
  };
};

const mockModules = {
  valid: makeModule(),
  validWithoutThumbnail: makeModule("thumbnail"),
  validMissingLastUpdated: makeModule("lastUpdated"),
  invalidMissingTitle: makeModule("title"),
  invalidMissingDescription: makeModule("description"),
  invalidMissingCreated: makeModule("created"),
  invalidLastUpdatedBeforeCreated: {
    ...makeModule(),
    attributes: {
      ...makeModule().attributes,
      lastUpdated: new Date(2020, 11, 10),
    },
  },
  invalidThumbanilDoesNotExixt: {
    ...makeModule(),
    attributes: {
      ...makeModule().attributes,
      thumbnail: "foo",
    },
  },
};

const modulesStartingWith = (s: string) =>
  Object.keys(mockModules)
    .filter((k) => k.startsWith(s))
    .map((k) => mockModules[k as keyof typeof mockModules]);

const validModules = modulesStartingWith("valid");
const invalidModules = modulesStartingWith("invalid");

describe("validateMdxModule", () => {
  it("passes through all valid modules", () => {
    validModules.forEach((mod) => {
      expect(validateMdxModule(mod)).toBe(mod);
    });
  });
  it("rejects invalid modules", () => {
    invalidModules.forEach((mod) => {
      expect(() => validateMdxModule(mod)).toThrow();
    });
  });
});
