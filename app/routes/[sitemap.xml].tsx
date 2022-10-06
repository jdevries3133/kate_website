import { BASE_URL } from "~/config.server";
import { postMetadata } from "~/services/post";

export const loader = () => {
  const latestBlogPost = postMetadata.reduce((a, b) =>
    a.lastMod.getTime() > b.lastMod.getTime() ? a : b
  );

  const content = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${BASE_URL}</loc>
        <lastmod>2022-05-21t08:36:31-04:00</lastmod>
        <priority>1.0</priority>
      </url>

      <url>
        <loc>${BASE_URL}/blog</loc>
        <lastmod>${latestBlogPost.lastMod.toISOString()}</lastmod>
        <priority>1.0</priority>
      </url>

      ${postMetadata.map(
        ({ slug, lastMod }) => `
          <url>
            <loc>${BASE_URL}/post/${slug}</loc>
              <lastmod>${lastMod.toISOString()}</lastmod>
            <priority>0.8</priority>
          </url>
        `
      )}

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
