import { Form, useParams } from "remix";

export const actionId = "submit comment";

export const action = (data: FormData) => {
  const content = data.get("content");
  console.error("not implemented");
};

export const CommentForm: React.FC = () => {
  const { post } = useParams();
  return (
    <Form method="post" action={`/blog/${post}/`}>
      <label className="text-sm" id="content">
        comment
        <input id="content" className="block text-base" type="text" />
      </label>
      <button
        className="block text-base p-1 m-1 bg-primary-100 rounded hover:bg-primary-200 focus:ring-primary-400"
        type="submit"
      >
        submit
      </button>
    </Form>
  );
};
