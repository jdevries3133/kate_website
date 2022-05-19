import { Comment as CommentType } from "@prisma/client";

export const Comment: React.FC<{ comment: CommentType }> = ({ comment }) => {
  const author = comment.author || "anon";
  return (
    <div className="prose">
      <p className="text-sm">
        at {comment.createdAt}, {author} wrote ::
      </p>
      <p className="border-l-4 border-l-mineral-400 pl-2">{comment.content}</p>
    </div>
  );
};
