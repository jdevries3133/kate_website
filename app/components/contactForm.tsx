import { useState } from "react";
import { Form, useTransition, useActionData } from "remix";
import { PrimaryButton } from "./buttons";

const InnerForm = () => {
  const transition = useTransition();
  const actionData = useActionData();
  return (
    <fieldset disabled={transition.state === "submitting"}>
      <Form
        method="post"
        className="border border-coffee bg-secondary-300 p-2 m-3 rounded flex flex-col items-start text-coffee"
      >
        <label className="block text-left pt-2 pb-1">
          Name{" "}
          {actionData && actionData.errors.name ? (
            <p>{actionData.errors.name}</p>
          ) : null}
          <input
            className="bg-clay-200 rounded shadow p-1 rounded w-full focus:bg-white focus:rounded focus:shadow"
            type="text"
            name="name"
            defaultValue={actionData ? actionData.values.name : undefined}
          />
        </label>
        <label className="block text-left pt-2 pb-1">
          Email{" "}
          {actionData && actionData.errors.email ? (
            <p>{actionData.errors.email}</p>
          ) : null}
          <input
            className="bg-clay-200 rounded shadow p-1 rounded w-full focus:bg-white focus:rounded focus:shadow"
            type="email"
            name="email"
            defaultValue={actionData ? actionData.values.email : undefined}
          />
        </label>
        <label className="block text-left pt-2 pb-1">
          Message{" "}
          {actionData && actionData.errors.message ? (
            <p>{actionData.errors.message}</p>
          ) : null}
          <textarea
            className="w-full h-24 bg-clay-200 rounded shadow p-1 rounded w-full focus:bg-white focus:rounded focus:shadow"
            name="message"
          />
        </label>
        <button
          className="
                bg-primary-300
                rounded
                p-2
                mt-2
                hover:bg-primary-400
                shadow-md
                hover:shadow-none
                disabled:bg-gray-200
        "
          type="submit"
          disabled={transition.state === "loading"}
        >
          Submit
        </button>
      </Form>
    </fieldset>
  );
};

export const ContactForm = () => {
  const [showForm, setShowForm] = useState(false);

  if (showForm) return <InnerForm />;

  return (
    <PrimaryButton onClick={() => setShowForm(true)}>Contact Me</PrimaryButton>
  );
};
