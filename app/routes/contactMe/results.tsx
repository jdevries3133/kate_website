import {
  Form,
  redirect,
  LoaderFunction,
  useLoaderData,
  ActionFunction,
  useTransition,
} from "remix";
import { getSession } from "~/sessions";
import prisma from "~/prisma.server";
import { ContactInquiry } from "@prisma/client";

export const action: ActionFunction = async ({ request }) => {
  const id = parseInt(((await request.formData()).get("id") || "") as string);
  await prisma.contactInquiry.delete({
    where: { id },
  });
  return null;
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.get("isAuthenticated")) {
    return redirect("/contactMe");
  }
  return (await prisma.contactInquiry.findMany()).map((inquiry) => ({
    ...inquiry,
    createdAt: inquiry.createdAt.toLocaleDateString(),
  }));
};

export default function Results() {
  const { state } = useTransition();
  const data = useLoaderData<ContactInquiry[]>();
  return (
    <div className="prose m-4">
      <h1>Contact Inquiries</h1>
      <table>
        <thead>
          <tr>
            <td>name</td>
            <td>email</td>
            <td>created</td>
            <td>message</td>
            <td>actions</td>
          </tr>
        </thead>
        <tbody>
          {data.map(({ name, email, createdAt, message, id }, i) => (
            <tr key={i}>
              <td>{name}</td>
              <td>{email}</td>
              <td>{createdAt}</td>
              <td>{message}</td>
              <td>
                {["submitting", "loading"].includes(state) ? (
                  <h3>Loading...</h3>
                ) : (
                  <Form method="post">
                    <input type="hidden" name="id" value={id} />
                    <button
                      className="
                        rounded
                        shadow
                        border
                        p-2
                        m-2
                        bg-red-200
                        hover:bg-red-300
                        focus:bg-red-300
                        outline-none
                        focus:ring-4
                        focus:ring-red-500"
                    >
                      delete
                    </button>
                  </Form>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
