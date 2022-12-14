import { ActionArgs, MetaFunction } from "@remix-run/node";

import { Link } from "@remix-run/react";
import prisma from "~/prisma.server";
import { ContactForm } from "~/components/contactForm";
import * as SplashContent from "~/mdx/splashContent.mdx";
import * as ExtraSplashContent from "~/mdx/extraSplashContent.mdx";
import { HeaderContent } from "~/components/header";
import { searchAction, searchLoader, SearchLoader } from "~/components/search";
import { getSession, jsonAndCommit } from "~/sessions";
import {
  handlyAnonymousProfileSubmission,
  ProfileLoader,
  profileLoader,
} from "~/services/profile";

export const meta: MetaFunction = () => {
  return { title: "Kate Tell: Author" };
};

export const action = async ({ request }: ActionArgs) => {
  await searchAction(request);

  const form = await request.formData();
  const name = form.get("name");
  const email = form.get("email");
  const message = form.get("message");

  const errors = {
    email: "",
    name: "",
  };
  if (!name) errors.name = "Please enter your name.";
  if (!email) errors.email = "Please enter your email.";

  const values = {
    name: (name as string) || "",
    email: (email as string) || "",
    message: (message as string) || "",
  };

  const { id: profileId } = await handlyAnonymousProfileSubmission({
    email: values.email,
    name: values.name,
  });

  const session = await getSession(request.headers.get("Cookie"));
  session.set("profileId", profileId);

  const valuesWithProfile = {
    message: values.message,
    profileId,
  };

  if (!errors.name && !errors.email) {
    await prisma.contactInquiry.create({
      data: valuesWithProfile,
    });
    return jsonAndCommit(
      {
        values: { valuesWithProfile, name, email, message },
        status: "submitted",
        errors: { name: "", errors: "", email: "" },
      },
      session
    );
  }

  return jsonAndCommit(
    {
      values: values,
      errors,
      status: "error",
    },
    session
  );
};

export const loader: SearchLoader & ProfileLoader = async ({ request }) => ({
  profile: await profileLoader(request),
  search: searchLoader(request),
});

export default function Index() {
  return (
    <>
      {/* I have no idea why, but if this thing doesn't have padding, the background
          doesn't show through */}
      <div className="py-[0.1px] bg-gradient-to-tr from-blue-200 to-purple-200 w-full">
        <header className="flex flex-wrap md:flex-nowrap flex-grow bg-accent-100 rounded m-2 p-2 items-center">
          <HeaderContent />
        </header>
      </div>
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
