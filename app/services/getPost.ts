import { MDXModule } from "mdx/types";
import { allPosts } from "~/mdx";

const moduleNameMapping: { [key: string]: MDXModule } = {};
allPosts.forEach((post) => {
  const slug = post.filename.slice(0, -4);
  moduleNameMapping[slug] = post as any as MDXModule;
});

/**
 * Get the MDX module of a blogpost given its slug
 */
export const getPost = (slug: string): MDXModule | null => {
  if (slug in moduleNameMapping) {
    const match = moduleNameMapping[slug];
    if (!match?.default) {
      console.error(`post matching slug ${slug} has no default content`);
      return null;
    }
    return match;
  }
  return null;
};
