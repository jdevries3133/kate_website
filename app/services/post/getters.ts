import { moduleNameMapping } from "./collections";
import type { ValidSlug, ValidMdxModule, PostMetadata } from "./types";

const NotFound = new Response("post not found", { status: 404 });

/**
 * Get the MDX module of a blogpost given its slug
 */
export const getPost = (slug: ValidSlug): ValidMdxModule => {
  if (slug in moduleNameMapping) {
    const match = moduleNameMapping[slug];
    return match;
  }
  throw NotFound;
};

export const getDate = (post: PostMetadata): Date => {
  const date = post.lastUpdated
    ? post.lastUpdated
    : post.created
    ? post.created
    : null;
  if (date === null) {
    throw new Error(`post does not contain a date: ${post.filename}`);
  }
  // a little duck typing for extra safety
  return date;
};
