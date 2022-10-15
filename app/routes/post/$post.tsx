import {
  ActionArgs,
  ErrorBoundaryComponent,
  Link,
  LoaderArgs,
  MetaFunction,
  useCatch,
  useLoaderData,
  useParams,
} from "remix";
import prisma from "~/prisma.server";
import { action as commentFormAction } from "~/components/commentForm";
import { CommentSection } from "~/components/commentSection";
import { getPost, validateSlug } from "~/services/post";
import { BASE_URL } from "~/config.server";
import { isSlugValid } from "~/services/post/validateSlug";
import { DefaultPageContainer } from "~/components/pageContainer";
import { searchAction, searchLoader } from "~/components/search";

export const meta: MetaFunction = ({ params, location }) => {
  if (!isSlugValid(params.post)) return {};

  const slug = validateSlug(params.post);
  const { description, title, thumbnail } = getPost(slug).attributes;

  return {
    title: title,
    description: description,
    "og:description": description,
    "og:title": title,
    "og:url": BASE_URL + location.pathname,
    "og:image": BASE_URL + (thumbnail || "/static/defaultThumbnail.webp"),
    "twitter:card": "summary_large_image",
  };
};

export const loader = async (args: LoaderArgs) => {
  const { params, request } = args;
  // will throw not found for invalid post
  const slug = validateSlug(params.post);

  const rawComments = await prisma.comment.findMany({
    where: {
      postSlug: slug,
    },
    include: {
      Profile: {
        select: { name: true },
      },
    },
  });
  const comments = rawComments.map((c) => ({
    ...c,
    createdAt: c.createdAt.toISOString(),
  }));

  const post = getPost(slug);
  return {
    comments,
    created: post.attributes.created?.toISOString(),
    lastUpdated: post.attributes.lastUpdated?.toISOString(),
    search: searchLoader(request)
  };
};

export const action = async (args: ActionArgs) => {

  const r = await searchAction(args);
  if (r !== null) return r;

  return await commentFormAction(args);
};

export default function Post() {
  const { created, lastUpdated } = useLoaderData();
  const { post: postSlug } = useParams();
  if (!postSlug) throw new Error("missing post slug");

  const Post = getPost(postSlug);
  if (Post === null) {
    return (
      <p className="text-secondary-300">Post matching {postSlug} not found</p>
    );
  }
  return (
    <DefaultPageContainer>
      <div className="prose break-words">
        <div
          className="
          p-2
          bg-secondary-200
          shadow-xl
          rounded-t
          md:p-4
          md:border-2
          md:border-primary-200
        "
        >
          <div className="not-prose">
            {created && (
              <p>
                Created: {new Date(created).toLocaleDateString()}
                {lastUpdated && (
                  <span className="italic text-primary-600">
                    ; Last Updated {new Date(lastUpdated).toLocaleDateString()}
                  </span>
                )}
              </p>
            )}
          </div>
          <Post.default />
        </div>
        <div className="not-prose">
          <CommentSection />
        </div>
      </div>
    </DefaultPageContainer>
  );
}

export const CatchBoundary: ErrorBoundaryComponent = () => {
  const params = useParams();
  const caught = useCatch();
  let message: React.ReactNode;

  switch (caught.status) {
    case 404:
      message = (
        <>
          <p>
            A post matching <code>{params.post || "this URL"}</code> doesn't
            exist!{" "}
          </p>
          <Link to="/blog">
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
    <DefaultPageContainer>
      <div className="prose">
        <div
          className="
            p-2
            bg-secondary-200
            shadow-xl
            rounded
            md:p-4
            md:border-2
            md:border-primary-200
          "
        >
          <h1>Oops!</h1>
          {message}
        </div>
      </div>
    </DefaultPageContainer>
  );
};
