import {
  ActionFunction,
  ErrorBoundaryComponent,
  Link,
  LoaderFunction,
  useCatch,
  useLoaderData,
  useParams,
} from "remix";
import { action as commentFormAction } from "~/components/commentForm";
import { getLocale } from "~/services/getLocale";
import { getPost, validateSlug } from "~/services/post";

export const loader: LoaderFunction = ({ request, params }) => {
  // will throw not found for invalid post
  const slug = validateSlug(params.post);

  // render the dates to strings on the server to avoid normalization issues
  const locale = getLocale(request);
  const post = getPost(slug);
  return {
    created: post.attributes.created?.toLocaleDateString(locale),
    lastUpdated: post.attributes.lastUpdated?.toLocaleDateString(locale),
  };
};

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  commentFormAction(data);
  return null;
};

export default function Post() {
  const { created, lastUpdated } = useLoaderData();
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
        <div className="not-prose">
          {created && (
            <p>
              Created: {created}
              {lastUpdated && (
                <span className="italic text-mineral-600">
                  ; Last Updated {lastUpdated}
                </span>
              )}
            </p>
          )}
        </div>
        <Post.default />
      </div>
      {/* <CommentSection /> will go here when finished */}
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
