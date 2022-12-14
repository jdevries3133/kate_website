import { Comment as CommentType, UserProfile } from "@prisma/client";
import { Form, Link, useLocation } from "remix";
import { Comment } from "./comments";
import { Button, DeleteButton } from "./buttons";

export const CommentCard: React.FC<{
  comment: CommentType & { Profile: Pick<UserProfile, "name" | "id"> };
}> = ({ comment }) => {
  const { pathname } = useLocation();
  return (
    <div className="rounded m-2 p-2 bg-blue-100">
      <div className="flex items-center justify-center">
        <p>
          Post: <span className="bold">{comment.postSlug}</span>
        </p>
        {pathname.includes("admin") && (
          <Form method="post">
            <input type="hidden" name="id" value={comment.id} />
            <DeleteButton>delete</DeleteButton>
          </Form>
        )}
        <Link to={`/post/${comment.postSlug}`}>
          <Button>view post</Button>
        </Link>
      </div>

      <div className="rounded m-1 p-1 bg-gray-100">
        <Comment comment={comment} />
      </div>
    </div>
  );
};
