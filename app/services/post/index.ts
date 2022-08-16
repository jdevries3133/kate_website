// validateSlug depends on collections
// collections depends on validateSlug
//
// hence, the two validators are in separate modules to avoid circular
// dependency
export { validateMdxModule } from "./validateMdxModule";
export { validateSlug } from "./validateSlug";

export { getPost, getSerializableMetaData } from "./getters";
export { allPosts, postMetadata, moduleNameMapping } from "./collections";
export type { ValidSlug } from "./types";
