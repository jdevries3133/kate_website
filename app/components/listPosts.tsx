import { MetaFunction, useLoaderData } from "remix";
import { PostCard } from "~/components/postCard";
import { postMetadata } from "~/services/post";

export const meta: MetaFunction = () => {
  return {
    title: "Blog Posts",
    description: "List of all my blog posts",
  };
};

export type LoaderData = { posts: ReturnType<typeof loader> };

export const loader = () => {
  const data = postMetadata.map((post) => ({
    slug: post.slug,
    title: typeof post.title === "string" ? post.title : "Untitled",
    description: post.description,

    // convert created and lastUpdated (if present) to strings on the server to
    // avoid client-server mismatches. We don't need to be super precise with the
    // dates.
    created: post.created.toLocaleDateString(),
    lastUpdated: post?.lastUpdated?.toLocaleDateString(),
  }));
  return data;
};

export default function List() {
  const { posts } = useLoaderData<LoaderData>();

  return (
    <>
      {posts.map((post) => (
        <PostCard
          key={post.slug}
          linkTo={`/post/${post.slug}`}
          title={post.title}
          description={post.description}
          created={post.created}
        />
      ))}
    </>
  );
}
