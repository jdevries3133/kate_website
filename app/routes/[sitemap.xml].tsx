import { postMetadata } from "~/mdx/postCollections";

export const loader = () => {
  const blogPosts = postMetadata.map((post) => {
    const lastUpdated = post.lastUpdated
      ? post.lastUpdated.toISOString()
      : post.created
      ? post.created.toISOString()
      : "2022-05-21t08:36:31-04:00";
    return `
        <url>
        <loc>https://jackdevries.com/blog/${post.slug}</loc>
          <lastmod>${lastUpdated}</lastmod>
        <priority>0.8</priority>
        </url>
        `;
  });

  const content = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://jackdevries.com/</loc>
        <lastmod></lastmod>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>https://jackdevries.com/blog</loc>
        <lastmod>2022-05-21t08:36:31-04:00</lastmod>
        <priority>1.0</priority>
      </url>
      ${blogPosts}
    </urlset>
    `;
  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      encoding: "UTF-8",
    },
  });
};
