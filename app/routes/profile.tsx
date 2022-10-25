import { useLoaderData, LoaderArgs, redirect, Link } from "remix";
import { profileLoader } from "~/services/profile";
import prisma from "~/prisma.server";
import { DefaultPageContainer } from "~/components/pageContainer";
import {
  validateSlug,
  getSerializableMetaData,
  getPost,
} from "~/services/post";
import { searchLoader } from "~/components/search";
import { PropsWithChildren } from "react";
import { Comment } from "~/components/comments";

export const loader = async ({ request }: LoaderArgs) => {
  const profile = await profileLoader(request);

  if (!profile) throw redirect("/noProfile");

  const comments = (
    await prisma.comment.findMany({
      where: { profileId: profile.id },
      include: {
        Profile: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    })
  ).map((comment) => {
    const slug = validateSlug(comment.postSlug);
    const postData = getSerializableMetaData(getPost(slug));

    return {
      postData,
      ...comment,
    };
  });

  return {
    profile,
    comments,
    search: searchLoader(request),
  };
};

const ProfilePageContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <DefaultPageContainer>
      <div className="prose bg-secondary-100 p-2 m-2 rounded shadow">
        {children}
      </div>
    </DefaultPageContainer>
  );
};

export default function ProfilePage() {
  const data = useLoaderData<ReturnType<typeof loader>>();
  if (!data) {
    return (
      <ProfilePageContainer>
        <>
          <h1>No profile yet!</h1>
          <p>
            You don't have a profile, or, if you do, it isn't associated with
            your current device. To link or create your profile, interact with
            the website by leaving a comment!
          </p>
        </>
      </ProfilePageContainer>
    );
  }
  const { profile, comments: commentsRaw } = data;
  // deserialize comment dates
  const comments = commentsRaw.map((comment) => ({
    ...comment,
    createdAt: new Date(comment.createdAt),
  }));
  if (comments.length > 0) {
    return (
      <ProfilePageContainer>
        <>
          <h1>Hi there {profile.name}!</h1>
          <p>
            Here's an overview of the {comments.length} comment
            {comments.length > 1 ? "s" : ""} you've left on my site. Thank you
            for your engagement!
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {comments.map((comment) => (
              <Link
                to={`/post/${comment.postSlug}`}
                className="not-prose no-underline"
              >
                <div className="w-64 p-2 rounded shadow bg-secondary-100 border border-zinc-200">
                  <h3>Post: {comment.postData.title}</h3>
                  <p className="text-sm"></p>
                  <Comment comment={comment} key={comment.id} />
                </div>
              </Link>
            ))}
          </div>
        </>
      </ProfilePageContainer>
    );
  }
  return (
    <ProfilePageContainer>
      <>
        <h1>Hi {profile.name}</h1>
        <p>
          You don't have any comments yet, but you can come here to view the
          comments you've created across all my posts.
        </p>
      </>
    </ProfilePageContainer>
  );
}
