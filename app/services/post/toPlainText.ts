import path from "path";
import fs from "fs";

import { ValidMdxModule } from "./types";
import { getBaseDir } from "~/utils";

export const mdxTextToPlainText = (text: string): string => {
  // we want to remove the yaml header, so we'll turn this flag off once we see
  // the closing `---`
  let countYamlHeaderDelimiters = 0;
  // remove the yaml header
  const result = text
    .split("\n")
    .map((line) => {
      // we want to pass over the yaml header, so we'll return early until we
      // pass each of the `---`'s
      if (/^---/.test(line)) {
        countYamlHeaderDelimiters++;
        return "";
      }
      if (countYamlHeaderDelimiters < 2) {
        return "";
      }
      // block-level items
      // comments
      line = line.replace(/^#+/, "");
      // block quotes
      line = line.replace(/^>+/, "");
      // bullet point list
      line = line.replace(/^>?[ \r\n\t]*- ?/, "");

      // inline items
      // code backticks
      line = line.replace(/`/g, "");
      // asteriks
      line = line.replace(/\*/g, "");
      // underscores
      line = line.replace(/_/g, "");

      // remove import statements
      if (
        line.includes("import") &&
        line.includes("from") &&
        line.includes(";")
      ) {
        return "";
      }
      // trivial removal of HTML tags within lines
      // normal (with inner text)
      line = line.replace(/<(.*)>(.*)<\/([A-Za-z]+)>/g, "$2");

      // remove self-closing html tags
      line = line.replace(/<([A-Za-z])+( )?\/>( )?/g, "");

      // remove lonely tags
      line = line.replace(/<(\/)?([A-Za-z])+>/g, "");

      return `${line.trim()}\n`;
    })
    .join("");

  return result.trim();
};

export const mdxModToPlainText = (mod: ValidMdxModule): string => {
  const fullPath = path.resolve(getBaseDir(), "app", "mdx", mod.filename);
  const rawContent = fs.readFileSync(fullPath).toString("utf8");

  return mdxTextToPlainText(rawContent);
};
