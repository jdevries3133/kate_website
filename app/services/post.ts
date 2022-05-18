import { allPosts } from "~/mdx";

// valid type can be gotten by passing a string through `validateSlug`
type ValidSlug = string;

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

/**
 * Return post metadata including slug, which is serializable. Convert `created`
 * and `lastUpdated` to strings if present.
 */
export function postFromModule(mod: typeof import("*.mdx")): {
  slug: string;
  [key: string]: any;
} {
  return {
    ...mod.attributes,
    slug: mod.filename.replace(/\.mdx?$/, ""),
  };
}

export const validateSlug = (slug: string | undefined): ValidSlug => {
  if (slug === undefined || !(slug in moduleNameMapping)) {
    throw NotFound;
  }
  return slug as ValidSlug;
};

export { allPosts } from "~/mdx";
