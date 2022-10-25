import { Comment as CommentType, UserProfile } from "@prisma/client";
import { useLoaderData } from "remix";
import { ProfileLoaderData } from "~/services/profile";

// TODO: this isn't a true CommentType; the dates have already been serialized
// dates are going to be ISO formatted strings
export const Comment: React.FC<{
  comment: CommentType & { Profile: Pick<UserProfile, "name" | "id"> };
}> = ({ comment }) => {
  const { profile } = useLoaderData<{ profile: ProfileLoaderData }>();
  const author =
    profile && profile.id === comment.Profile.id ? "you" : comment.Profile.name;

  const dateTime = new Date(comment.createdAt).toLocaleString();

  return (
    <div className="prose">
      <p className="text-sm">
        <>
          at {dateTime}, {author} wrote:
        </>
      </p>
      <p className="border-l-4 border-l-primary-400 pl-2">{comment.content}</p>
    </div>
  );
};
