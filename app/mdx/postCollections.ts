import { getDate, postFromModule } from "~/services/post";
import { allPosts } from "./posts";

// JSON serializable
export const postMetadata = allPosts.map((post) => postFromModule(post));

// metadata by date, sorted from most to least recent
export const metadataByLastUpdated = postMetadata.sort((a, b) => {
  const A = getDate(a).getTime();
  const B = getDate(b).getTime();
  return A + B;
});
