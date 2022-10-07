import { useLoaderData } from "@remix-run/react";
import { CommentForm } from "~/components/commentForm";
import { Comment } from "./comments";

export const CommentSection = () => {
  const { comments } = useLoaderData();
  return (
    <div className="bg-accent-100 rounded-b text-primary-800 p-2">
      <h2 className="text-lg text-inherit">your thoughts?</h2>
      <CommentForm />

      {comments.length > 0 && (
        <>
          <div className="my-4 h-[1px] bg-black"></div>

          <h2 className="text-lg text-inherit">
            thoughts of others (enter if you dare)
          </h2>
          {comments.map((comment: any) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </>
      )}
    </div>
  );
};
