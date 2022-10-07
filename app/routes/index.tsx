import { MetaFunction } from "@remix-run/node";

import { ActionFunction } from "remix";
import { Link } from "@remix-run/react";
import prisma from "~/prisma.server";
import { ContactForm } from "~/components/contactForm";
import * as SplashContent from "~/mdx/splashContent.mdx";
import * as ExtraSplashContent from "~/mdx/extraSplashContent.mdx";

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
    <>
      <div className="min-h-screen bg-primary-100">
        <div>
          <div className="mx-4 pt-1 flex flex-row items-center">
            <h1>Kate Tell</h1>
            <img
              className="w-48 h-48 border-accent border-8 shadow-sm rounded-full"
              src="/static/headshot.webp"
              alt="My Headshot"
            />
          </div>
          <div className="flex flex-col m-8">
            <SplashContent.default />
            <div className="hidden md:block">
              <ExtraSplashContent.default />
            </div>
          </div>
          <div className="flex justify-center">
            <Link to="/blog">
              <button
                className="
                p-2
                bg-gradient-to-tr
                from-secondary-100
                via-purple-100
                to-primary-200
                border-secondary-300
                border-2
                rounded-lg
                shadow
                hover:shadow-none
              "
              >
                View blog posts
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <ContactForm />
      </div>
    </>
  );
}
