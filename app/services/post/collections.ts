import { allPosts as rawPosts } from "~/mdx";
import { validateMdxModule } from "./validateMdxModule";
import type { ValidMdxModule } from "./types";
import { getSerializableMetaData } from "./getters";

export const allPosts = rawPosts.map((post) => validateMdxModule(post));
export const postMetadata = allPosts.map((post) =>
  getSerializableMetaData(post)
);

export const moduleNameMapping: { [key: string]: ValidMdxModule } = {};
allPosts.forEach((post) => {
  const slug = post.filename.replace(".mdx", "");
  moduleNameMapping[slug] = post;
});
