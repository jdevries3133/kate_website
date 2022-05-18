/**
 * Interface for accessing posts. Posts can be published or unpublished here.
 */

import * as myCluster from "./myCluster.mdx";
import * as developingClusterApps from "./developingClusterApps.mdx";

// TODO: I don't know why all this type casting is necessary...
export const allPosts = [myCluster as any as typeof import("*.mdx")];
