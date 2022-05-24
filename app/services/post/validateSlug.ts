import type { ValidSlug } from "./types";
import { moduleNameMapping } from "./collections";

export const validateSlug = (slug: string | undefined): ValidSlug => {
  if (slug === undefined || !(slug in moduleNameMapping)) {
    throw new Response("slug is not valid", { status: 404 });
  }
  return slug as ValidSlug;
};
