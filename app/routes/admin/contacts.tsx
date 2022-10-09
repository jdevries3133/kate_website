import { ActionArgs, Form, useLoaderData, useTransition } from "remix";
import prisma from "~/prisma.server";
import { DeleteButton } from "~/components/buttons";
import { Loading } from "~/components/loading";

export const action = async ({ request }: ActionArgs) => {
  const id = parseInt(((await request.formData()).get("id") || "") as string);
  await prisma.contactInquiry.delete({
    where: { id },
  });
  return null;
};

export const loader = async () => {
  return (
    await prisma.contactInquiry.findMany({
      include: {
        Profile: {
          select: { name: true, email: true },
        },
      },
    })
  ).map((inquiry) => ({
    ...inquiry,
    createdAt: inquiry.createdAt.toLocaleDateString(),
  }));
};

export default function Contacts() {
  const { state } = useTransition();
  const data = useLoaderData<ReturnType<typeof loader>>();
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
          {data.map(
            ({ Profile: { name, email }, createdAt, message, id }, i) => (
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
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
