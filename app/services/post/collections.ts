import { allPosts as rawPosts } from "~/mdx";
import { validateMdxModule } from "./validateMdxModule";
import { postFromModule } from "./transform";
import type { ValidMdxModule } from "./types";

export const allPosts = rawPosts.map((post) => validateMdxModule(post));
export const postMetadata = allPosts.map((post) => postFromModule(post));

export const moduleNameMapping: { [key: string]: ValidMdxModule } = {};
allPosts.forEach((post) => {
  const slug = post.filename.replace(".mdx", "");
  moduleNameMapping[slug] = validateMdxModule(post);
});
