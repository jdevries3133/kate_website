import { MDXModule } from "mdx/types";
import {
  ActionFunction,
  ErrorBoundaryComponent,
  Link,
  LoaderFunction,
  useCatch,
  useParams,
} from "remix";
import { CommentSection } from "~/components/commentSection";
import { action as commentFormAction } from "~/components/commentForm";
import { allPosts, postNames } from "~/mdx";
import { getPost } from "~/services/getPost";

export const loader: LoaderFunction = ({ params }) => {
  const { post } = params;
  if (!(post && postNames.includes(post))) {
    throw new Response("Not Found", { status: 404 });
  }
  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  commentFormAction(data);
  return null;
};

export default function Post() {
  const { post: postSlug } = useParams();
  if (!postSlug) throw new Error("missing post slug");
  const Post = getPost(postSlug);
  if (Post === null) {
    return <p className="text-clay-300">Post matching {postSlug} not found</p>;
  }
  return (
    <>
      <div
        className="
          p-2
          bg-clay-200
          shadow-xl
          rounded-t
          prose
          break-words
          md:p-4
          md:border-2
          md:border-primary-200
        "
      >
        <Post.default />
      </div>
      {/* <CommentSection /> */}
    </>
  );
}

export const CatchBoundary: ErrorBoundaryComponent = () => {
  const caught = useCatch();
  let message: React.ReactNode;

  switch (caught.status) {
    case 404:
      message = (
        <>
          <p>That blog post doesn't exist! </p>
          <Link to="/blog/list">
            <p>See all blog posts</p>
          </Link>
        </>
      );
      break;
    default:
      message = (
        <p>
          There was a problem with your request!
          <br />
          {caught.status} {caught.statusText}
        </p>
      );
      break;
  }
  return (
    <div className="prose">
      <h1>Oops!</h1>
      {message}
    </div>
  );
};
