import { useLoaderData } from "remix";
import { CommentForm } from "~/components/commentForm";
import { Comment } from "./comments";
import { Comment as CommentType } from "@prisma/client";

export const CommentSection = () => {
  const { comments } = useLoaderData<{ comments: CommentType[] }>();
  return (
    <div className="bg-clay-400 rounded-b text-mineral-600 p-2">
      <h2 className="text-lg text-inherit">your thoughts?</h2>
      <CommentForm />

      {comments.length && (
        <>
          <div className="my-4 h-[1px] bg-black"></div>

          <h2 className="text-lg text-inherit">
            thoughts of others (enter if you dare)
          </h2>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </>
      )}
    </div>
  );
};
