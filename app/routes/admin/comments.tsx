import {
  ActionFunction,
  LoaderFunction,
  useLoaderData,
  useTransition,
} from "remix";
import { CommentAdminCard } from "~/components/commentAdminCard";
import { Loading } from "~/components/loading";
import prisma from "~/prisma.server";

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const idStr = data.get("id");
  const id = idStr && parseInt(idStr as string);
  if (typeof id === "number") {
    const comment = await prisma.comment.delete({
      where: {
        id,
      },
    });
    return {
      comment,
      isDeleted: true,
    };
  }
  return { isDeleted: false };
};

export const loader: LoaderFunction = () => {
  return prisma.comment.findMany();
};

export default function Comments() {
  const { state } = useTransition();
  const comments = useLoaderData();
  return (
    <div className="flex flex-col items-center justify-center">
      {state === "loading" ? (
        <Loading />
      ) : (
        <>
          <h1>Manage Comments</h1>
          {comments.map((comment: any) => (
            <CommentAdminCard key={comment.id} comment={comment} />
          ))}
        </>
      )}
    </div>
  );
}
