import { postFromModule } from "~/services/post";
import { allPosts } from "./posts";
import { getSlug } from "./utils";

// JSON serializable
export const postMetadata = allPosts.map((post) => postFromModule(post));
