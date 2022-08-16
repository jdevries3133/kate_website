import { vi } from "vitest";
import { mdxTextToPlainText } from "./toPlainText.server";

vi.mock("~/.mdx");

/**
 * Example generator that inserts an empty yaml header
 */
const exampleFactory = (text: string) => {
  return `---\n---\n\n${text}`;
};

describe("mdxModToPlainText block items", () => {
  // headers
  it("returns strings from the body of the post", () => {
    const text = exampleFactory("hello world");
    expect(mdxTextToPlainText(text)).toEqual("hello world");
  });
  it("removes header text", () => {
    const text = exampleFactory("# big hello world");
    expect(mdxTextToPlainText(text)).toContain("big hello world");
    expect(mdxTextToPlainText(text).includes("#")).toBeFalsy();
  });
  it("removes secondary headers", () => {
    const text = exampleFactory("## big hello world");
    expect(mdxTextToPlainText(text)).toContain("big hello world");
    expect(mdxTextToPlainText(text).includes("#")).toBeFalsy();
  });
  it("does not remove hashes if they they appear midline", () => {
    let text = exampleFactory("do not remove me: ###");
    expect(mdxTextToPlainText(text)).toEqual("do not remove me: ###");
  });

  // block quotes
  it("removes block quotes (> at start of line)", () => {
    const text = exampleFactory("> I am a block quote");
    const result = mdxTextToPlainText(text);

    expect(result).toContain("I am a block quote");
    expect(result.includes(">")).toBeFalsy();
  });
  it("removes nested block quotes", () => {
    const text = exampleFactory(">> nested \n>>>block quote");
    const result = mdxTextToPlainText(text);

    expect(result).toContain("nested");
    expect(result).toContain("block quote");
    expect(result).toContain("\n");
    expect(result.includes(">")).toBeFalsy();
  });
  it("does not remove `>` character mid-line", () => {
    const text = exampleFactory("this should not => go away");
    const result = mdxTextToPlainText(text);

    expect(result).toEqual("this should not => go away");
  });

  it("removes bullet points", () => {
    const text = exampleFactory("- bullet point\n- bullet point");
    const result = mdxTextToPlainText(text);

    expect(result).toContain("bullet point");
    expect(result.includes("-")).toBeFalsy();
  });
  it("removes bullet points with leading whitespace", () => {
    const text = exampleFactory("- bullet point\n  - nested bullet point");
    const result = mdxTextToPlainText(text);

    expect(result).toContain("bullet point");
    expect(result).toContain("nested bullet point");
    expect(result.includes("-")).toBeFalsy();
  });
  it("removes bullet points inside block quotes", () => {
    const text = exampleFactory(
      "> - bullet point\n>  - bullet point\n> -in blockquote"
    );
    const result = mdxTextToPlainText(text);

    expect(result).toContain("bullet point");
    expect(result).toContain("in blockquote");
    expect(result.includes("-")).toBeFalsy();
  });
});

describe("inline markdown and JSX syntax removal", () => {
  beforeAll(() => {
    vi.unmock("~/mdx");
  });
  it("removes backticks", () => {
    const text = exampleFactory("some `code` text");
    const result = mdxTextToPlainText(text);

    expect(result).toEqual("some code text");
    expect(result.includes("`")).toBeFalsy();
  });
  it("removes asteriks", () => {
    const text = exampleFactory("some *italic* text");
    const result = mdxTextToPlainText(text);

    expect(result).toEqual("some italic text");
    expect(result.includes("*")).toBeFalsy();
  });
  it("removes underscores that lead or trail words", () => {
    const text = exampleFactory("this is _italic_ as well");
    const result = mdxTextToPlainText(text);

    expect(result.includes("_")).toBeFalsy();
    expect(result).toEqual("this is italic as well");
  });
  it("removes single-line html tags", () => {
    const text = exampleFactory("I have a <span>html tag</span> here");
    const result = mdxTextToPlainText(text);

    expect(result).toEqual("I have a html tag here");
  });
  it("removes lonely opening tags (which may have a closing tag elsewhere)", () => {
    const text = exampleFactory("<p>");
    const result = mdxTextToPlainText(text);

    expect(result).toEqual("");
  });
  it("removes lonely closing tags (which may have an opening tag elsewhere)", () => {
    const text = exampleFactory("</p>");
    const result = mdxTextToPlainText(text);

    expect(result).toEqual("");
  });
  it("removes self-closing html tags in a single line", () => {
    const text = exampleFactory("here is a <CodeBlock /> component");
    const result = mdxTextToPlainText(text);

    expect(result).toEqual("here is a component");
  });
  // note: complex jsx tags, like those spanning multiple lines, are not removed
});
