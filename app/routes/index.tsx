import { ActionArgs, MetaFunction } from "@remix-run/node";

import { Link } from "@remix-run/react";
import prisma from "~/prisma.server";
import { ContactForm } from "~/components/contactForm";
import * as SplashContent from "~/mdx/splashContent.mdx";
import * as ExtraSplashContent from "~/mdx/extraSplashContent.mdx";

export const meta: MetaFunction = () => {
  return { title: "Kate Tell: Author" };
};

export type ActionData = ReturnType<typeof action>;
export const action = async ({ request }: ActionArgs) => {
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

  // TODO: refactor into profile service
  const { id: profileId } = await prisma.userProfile.upsert({
    select: { id: true },
    where: {
      email: values.email,
    },
    update: {
      name: values.name,
    },
    create: {
      email: values.email,
      name: values.name,
    },
  });

  const valuesWithProfile = {
    message: values.message,
    profileId,
  };

  if (!errors.name && !errors.email) {
    await prisma.contactInquiry.create({
      data: valuesWithProfile,
    });
    return {
      values: { valuesWithProfile, name, email, message },
      status: "submitted",
      errors: { name: "", errors: "", email: "" },
    };
  }

  return {
    values: values,
    errors,
    status: "error",
  };
};

export default function Index() {
  return (
    <>
      <div className="min-h-screen bg-primary-100 flex flex-col md:flex-row items-center justify-center">
        <div className="flex justify-center">
          <div className="group">
            <div className="max-w-md sm:shadow sm:bg-accent-100 sm:group-hover:bg-gray-100 sm:group-hover:shadow-none transition sm:rounded-lg sm:p-4 sm:m-2">
              <div className="mx-4 pt-1 flex flex-row justify-between items-center">
                <h1>Kate Tell</h1>
                <img
                  className="w-48 h-48 border-accent sm:group-hover:border-primary-200 transition border-8 shadow-sm rounded-full"
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
        </div>
        <div className="flex items-center justify-center">
          <ContactForm />
        </div>
      </div>
    </>
  );
}
