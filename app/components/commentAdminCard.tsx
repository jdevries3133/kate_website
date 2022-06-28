import { Comment as CommentType } from "@prisma/client";
import { Form, Link } from "remix";
import { Comment } from "./comments";
import { Button, DeleteButton } from "./buttons";

export const CommentAdminCard: React.FC<{ comment: CommentType }> = ({
  comment,
}) => {
  return (
    <div className="rounded m-2 p-2 bg-blue-100">
      <div className="flex items-center justify-center">
        <p>
          Post: <span className="bold">{comment.postSlug}</span>
        </p>
        <Form method="post">
          <input type="hidden" name="id" value={comment.id} />
          <DeleteButton>delete</DeleteButton>
        </Form>
        <Link to={`/blog/${comment.postSlug}`}>
          <Button>view post</Button>
        </Link>
      </div>

      <div className="rounded m-1 p-1 bg-gray-100">
        <Comment comment={comment} />
      </div>
    </div>
  );
};
