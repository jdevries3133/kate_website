import { Link, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { postMetadata } from "~/mdx/postCollections";
import { parseAcceptLanguage } from "intl-parse-accept-language";

export const meta: MetaFunction = () => {
  return {
    title: "Blog Posts",
    description: "List of all blog posts",
  };
};

type LoaderData = {
  slug: string;
  title: string;
  description?: string;
  created?: string;
  lastUpdated?: string;
};

export const loader: LoaderFunction = ({ request }) => {
  // convert created and lastUpdated (if present) to strings on the server to
  // avoid client-server mismatches. We don't need to be super precise with the
  // dates.
  const locales = parseAcceptLanguage(request.headers.get("accept-language"), {
    validate: Intl.DateTimeFormat.supportedLocalesOf,
  });
  const data: LoaderData[] = postMetadata.map((post) => ({
    slug: post.slug,
    title: typeof post.title === "string" ? post.title : "Untitled",
    description: post.description,
    created: post?.created?.toLocaleDateString(locales),
    lastUpdated: post?.lastUpdated?.toLocaleDateString(locales),
  }));
  return data;
};

export default function List() {
  const posts = useLoaderData<LoaderData[]>();
  return posts.map((post) => {
    return (
      <Link key={post.slug} to={`/blog/${post.slug}`}>
        <div className="max-w-prose p-4 m-2 border-primary bg-clay-200 text-mineral-700 rounded shadow">
          <h3>{post.title}</h3>
          {post.created && <p className="text-sm font-light">{post.created}</p>}
          {post.description && (
            <p className="pl-2 border-l-4 border-zinc-200">
              {post.description}
            </p>
          )}
        </div>
      </Link>
    );
  });
}
