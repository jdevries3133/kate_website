/**
 * Interface for accessing posts. Posts can be published or unpublished here.
 */

import * as myCluster from "./myCluster.mdx";
import * as developingClusterApps from "./developingClusterApps.mdx";

export const allPosts = [
  // TODO: I don't know why all this type casting is necessary...
  developingClusterApps as any as typeof import("*.mdx"),
  myCluster as any as typeof import("*.mdx"),
];
