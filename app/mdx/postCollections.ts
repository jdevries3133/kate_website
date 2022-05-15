import { allPosts } from "./posts";
import { getSlug } from "./utils";

// utility collections derived from the allPosts constant above
export const postNames = allPosts.map((p) => getSlug(p.filename));
