import { MetaFunction } from "@remix-run/node";

import { ActionFunction } from "remix";
import { Link } from "@remix-run/react";
import prisma from "~/prisma.server";
import { ContactForm } from "~/components/contactForm";

export const meta: MetaFunction = () => {
  return { title: "Kate Tell: Author" };
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const name = form.get("name");
  const email = form.get("email");
  const message = form.get("message");

  const errors = {
    email: "",
    name: "",
  };
  if (!name) errors.name = "Please enter your name";
  if (!email) errors.email = "Please enter your email";

  const values = {
    name: (name as string) || "",
    email: (email as string) || "",
    message: (message as string) || "",
  };

  if (!errors.name && !errors.email) {
    await prisma.contactInquiry.create({
      data: values,
    });
    return {
      values,
      status: "submitted",
    };
  }

  return {
    values: values,
    errors,
  };
};

export default function Index() {
  return (
    <div className="m-8 prose">
      <h1>Kate Tell: Author Extrordinaire!!</h1>
      <p>TODO: create a nice landing page for you :)</p>
      <Link to="/blog">View blog posts</Link>
      <ContactForm />
    </div>
  );
}
