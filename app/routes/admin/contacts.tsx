import {
  Form,
  LoaderFunction,
  useLoaderData,
  ActionFunction,
  useTransition,
} from "remix";
import prisma from "~/prisma.server";
import { ContactInquiry } from "@prisma/client";
import { DeleteButton } from "~/components/buttons";
import { Loading } from "~/components/loading";

export const action: ActionFunction = async ({ request }) => {
  const id = parseInt(((await request.formData()).get("id") || "") as string);
  await prisma.contactInquiry.delete({
    where: { id },
  });
  return null;
};

export const loader: LoaderFunction = async () => {
  return (await prisma.contactInquiry.findMany()).map((inquiry) => ({
    ...inquiry,
    createdAt: inquiry.createdAt.toLocaleDateString(),
  }));
};

export default function Contacts() {
  const { state } = useTransition();
  const data = useLoaderData<ContactInquiry[]>();
  return (
    <div className="prose m-4">
      <h1>Manage Contact Inquiries</h1>
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
                  <Loading />
                ) : (
                  <Form method="post">
                    <input type="hidden" name="id" value={id} />
                    <DeleteButton>delete</DeleteButton>
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
