import { Link, MetaFunction } from "remix";
import { allPosts, getSlug } from "~/mdx";

export const meta: MetaFunction = () => {
  return {
    title: "Blog Posts",
    description: "List of all blog posts",
  };
};

export default function List() {
  return allPosts.map((post) => {
    const dateStr = post.attributes?.date?.toLocaleDateString();
    return (
      <Link key={post.filename} to={`/blog/${getSlug(post.filename)}`}>
        <div className="max-w-prose p-4 m-2 border-primary bg-clay-200 text-mineral-700 rounded shadow">
          <h3>{post.attributes?.title}</h3>
          {dateStr && <p className="text-sm font-light">{dateStr}</p>}
          <p className="pl-2 border-l-4 border-zinc-200">
            {post.attributes?.description}
          </p>
        </div>
      </Link>
    );
  });
}
