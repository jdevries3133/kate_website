import { Link, MetaFunction } from "remix";
import { useLocales } from "~/providers/localeProvider";
import { postMetadata } from "~/mdx/postCollections";

export const meta: MetaFunction = () => {
  return {
    title: "Blog Posts",
    description: "List of all blog posts",
  };
};

export default function List() {
  const locales = useLocales();
  return postMetadata.map((post) => {
    const dateStr = post.created.toLocaleDateString(locales);
    return (
      <Link key={post.slug} to={`/blog/${post.slug}`}>
        <div className="max-w-prose p-4 m-2 border-primary bg-clay-200 text-mineral-700 rounded shadow">
          <h3>{post.title}</h3>
          {dateStr && <p className="text-sm font-light">{dateStr}</p>}
          <p className="pl-2 border-l-4 border-zinc-200">
            {post.attributes?.description}
          </p>
        </div>
      </Link>
    );
  });
}
