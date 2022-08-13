import * as myCluster from "./myCluster.mdx";
import * as clusterApps from "./developingClusterApps.mdx";
import * as terraformModules from "./terraformModules.mdx";
import * as gitDescribe from "./gitDescribe.mdx";
import * as crossCompile from "./rustCrossCompile.mdx";
import * as vimTutorial from "./vimTutorial.mdx";
import * as vimVsNeovim from "./vimVsNeovim.mdx";
import * as vimMetaConcepts from './vimMetaConcepts.mdx';
import * as myNeovimConfig from './myNeovimConfig.mdx';

/**
 * This is where posts can be published or unpublished. All posts in the array
 * below are published.
 */
export const allPosts = [
  vimTutorial,
  vimMetaConcepts,
  vimVsNeovim,
  myNeovimConfig,
  crossCompile,
  terraformModules,
  gitDescribe,
  myCluster,
  clusterApps,
];
