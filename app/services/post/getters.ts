import { BASE_URL } from "~/config";
import { moduleNameMapping } from "./collections";
import type { ValidSlug, ValidMdxModule } from "./types";

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

/**
 * Return post metadata including slug, which is serializable. Convert `created`
 * and `lastUpdated` to strings if present.
 */
export function getSerializableMetaData(mod: ValidMdxModule) {
  return {
    ...mod.attributes,
    slug: mod.filename.replace(/\.mdx?$/, ""),
    filename: mod.filename,
  };
}
