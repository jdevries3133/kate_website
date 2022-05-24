import type { ValidMdxModule, PostMetadata } from "./types";
/**
 * Return post metadata including slug, which is serializable. Convert `created`
 * and `lastUpdated` to strings if present.
 */
export function postFromModule(mod: ValidMdxModule): PostMetadata {
  return {
    ...mod.attributes,
    slug: mod.filename.replace(/\.mdx?$/, ""),
  };
}
