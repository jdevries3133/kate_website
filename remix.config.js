/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildDirectory: "build",
  devServerPort: 8002,
  ignoredRouteFiles: [".*"],
  mdx: async () => ({
    rehypePlugins: [
      (await import("rehype-slug")).default,
      (await import("rehype-autolink-headings")).default,
    ],
  }),
};
