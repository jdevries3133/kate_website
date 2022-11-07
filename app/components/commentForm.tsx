import { useState } from "react";
import {
  Form,
  ActionArgs,
  useActionData,
  useLoaderData,
  useTransition,
} from "remix";
import prisma from "~/prisma.server";
import { validateSlug } from "~/services/post";
import { ProfileLoaderData } from "~/services/profile";
import { Loading } from "./loading";

export const actionId = "submit comment";

export const action = async ({ request, params }: ActionArgs) => {
  const slug = validateSlug(params.post);
  const data = await request.clone().formData();
  const authorInput = data.get("author");
  const contentInput = data.get("content");
  const emailInput = data.get("email");

  let retval = {
    errors: {
      author: [] as string[],
      email: [] as string[],
      content: [] as string[],
    },
  };
  if (!contentInput) retval.errors.content.push("Comment is required");
  if (!authorInput) retval.errors.author.push("Name is required");
  if (!emailInput) retval.errors.email.push("Email is required");

  if (retval.errors.email.length > 0 || retval.errors.author.length > 0) {
    return retval;
  }

  const content = contentInput as string;
  const author = authorInput as string;
  const email = emailInput as string;

  // TODO: refactor into profile service
  const res = await prisma.userProfile.findUnique({
    select: {
      id: true,
    },
    where: {
      email,
    },
  });

  let profileId;
  if (res) {
    profileId = res.id;
  } else {
    const { id } = await prisma.userProfile.create({
      data: {
        email: email,
        name: author,
      },
    });
    profileId = id;
  }

  if (content) {
    await prisma.comment.create({
      data: {
        profileId,
        content: content as string,
        postSlug: slug,
      },
    });
  }

  return retval;
};

export const CommentForm: React.FC = () => {
  // track the initial interactivity with these fields for some UI reactivity
  const [wasFieldInteracted, onFieldInteraction] = useState({
    name: false,
    email: false,
  });
  const markInteracted = (fieldName: keyof typeof wasFieldInteracted) => {
    if (!wasFieldInteracted[fieldName]) {
      onFieldInteraction({
        ...wasFieldInteracted,
        [fieldName]: true,
      });
    }
  };
  const { state } = useTransition();
  const data = useActionData<ReturnType<typeof action>>();
  const { profile } = useLoaderData<{
    profile: ProfileLoaderData;
  }>();

  if (state === "submitting") return <Loading />;
  return (
    <Form className="flex flex-col" method="post">
      <label className="text-sm">
        your name
        {data?.errors?.author && (
          <p className="text-red-500">{data.errors.author}</p>
        )}
        <input
          className={`block rounded focus:ring-2 focus:ring-primary-200 focus:outline-none transition delay-100
            ${profile && !wasFieldInteracted.name ? "bg-gray-200" : ""}
          `}
          type="text"
          name="author"
          defaultValue={profile?.name || ""}
          onChange={() => markInteracted("name")}
        />
      </label>
      <label className="text-sm">
        your email
        {data?.errors?.email && (
          <p className="text-red-500">{data.errors.email}</p>
        )}
        <input
          className={`block rounded focus:ring-2 focus:ring-primary-200 focus:outline-none transition delay-100
            ${profile && !wasFieldInteracted.email ? "bg-gray-200" : ""}
          `}
          type="text"
          name="email"
          defaultValue={profile?.email || ""}
          onChange={() => markInteracted("email")}
        />
      </label>
      <label className="text-sm">
        comment
        {data?.errors?.content && (
          <p className="text-red-500">{data.errors.content}</p>
        )}
        <textarea
          className="
            w-full
            px-3
            py-2
            text-gray-700
            border
            rounded
            focus:ring-2
            focus:ring-primary-200
            focus:outline-none
          "
          name="content"
          rows={4}
        ></textarea>
      </label>
      <div>
        <button
          className="
          text-gray-900
          text-base
          p-1
          m-1
          bg-yellow-100
          rounded
          hover:bg-yellow-200
          focus:ring-yellow-400
        "
          type="submit"
        >
          submit
        </button>
      </div>
    </Form>
  );
};
