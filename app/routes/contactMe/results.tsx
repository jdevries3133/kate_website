import { redirect, LoaderFunction, useLoaderData } from "remix";
import { getSession } from "~/sessions";
import prisma from "~/prisma.server";
import { ContactInquiry } from "@prisma/client";

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
  const data = useLoaderData<ContactInquiry[]>();
  console.log(data);
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
          </tr>
        </thead>
        <tbody>
          {data.map(({ name, email, createdAt, message }, i) => (
            <tr key={i}>
              <td>{name}</td>
              <td>{email}</td>
              <td>{createdAt}</td>
              <td>{message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
