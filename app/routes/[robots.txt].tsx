import { LoaderFunction } from "remix";

export const loader: LoaderFunction = () => {
  const content = `
    User-agent: *
    Disallow: 
    Disallow: /admin
    Sitemap: http://kate.jackdevries.com/sitemap.xml
  `;
  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      encoding: "UTF-8",
    },
  });
};
