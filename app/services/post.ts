import { allPosts } from "~/mdx";
import type { ComponentType as MdxComponentType } from "react";

// valid type can be gotten by passing a string through `validateSlug`
type ValidSlug = string;

type ValidMdxModule = {
  attributes: {
    [key: string]: any;
    created: Date;
    lastUpdated?: Date;
    title: string;
    description: string;
  };
  filename: string;
  Component: MdxComponentType;
};

export type PostMetadata = { slug: string; [key: string]: any };

const NotFound = new Response("post not found", { status: 404 });

const moduleNameMapping: { [key: string]: typeof import("*.mdx") } = {};
allPosts.forEach((post) => {
  const slug = post.filename.slice(0, -4);
  moduleNameMapping[slug] = post;
});

/**
 * Get the MDX module of a blogpost given its slug
 */
export const getPost = (slug: ValidSlug): typeof import("*.mdx") => {
  if (slug in moduleNameMapping) {
    const match = moduleNameMapping[slug];
    if (!match?.default) {
      throw NotFound;
    }
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

/**
 * Return post metadata including slug, which is serializable. Convert `created`
 * and `lastUpdated` to strings if present.
 */
export function postFromModule(mod: typeof import("*.mdx")): PostMetadata {
  return {
    ...mod.attributes,
    slug: mod.filename.replace(/\.mdx?$/, ""),
  };
}

// TODO: validate modules very early on to avoid type casting in the module
// listing, and avoid tons of repetitive dynamic code all over the place
export const validateMdxModule = (
  _: typeof import("*.mdx")
): ValidMdxModule => {
  throw new Error("not implemented");
};

export const validateSlug = (slug: string | undefined): ValidSlug => {
  if (slug === undefined || !(slug in moduleNameMapping)) {
    throw NotFound;
  }
  return slug as ValidSlug;
};

export { allPosts } from "~/mdx";
