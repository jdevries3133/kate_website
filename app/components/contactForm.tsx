import { useState } from "react";
import { Form, useTransition, useActionData } from "remix";
import { action } from "~/routes";
import { PrimaryButton } from "./buttons";
import { Loading } from "./loading";

const InnerForm = () => {
  const transition = useTransition();
  const actionData = useActionData<ReturnType<typeof action>>();
  if (transition.state === "loading") return <Loading />;
  return (
    <fieldset disabled={transition.state === "submitting"}>
      <Form
        method="post"
        className="border bg-primary-200 p-2 m-3 rounded-xl md:rounded-full flex flex-col items-start text-primary"
      >
        <label className="block text-left pt-2 pb-1">
          Name{" "}
          {actionData && actionData.errors.name ? (
            <div>
              <p className="inline-block text-xs bg-red-100 rounded-3xl p-1 my-1">
                {actionData.errors.name}
              </p>
            </div>
          ) : null}
          <input
            className="bg-secondary-200 shadow p-1 rounded w-full focus:bg-white focus:rounded focus:shadow"
            type="text"
            name="name"
            defaultValue={
              typeof actionData?.values?.name === "string"
                ? actionData.values.name
                : undefined
            }
          />
        </label>
        <label className="block text-left pt-2 pb-1">
          Email{" "}
          {actionData && actionData.errors.email ? (
            <div>
              <p className="inline-block text-xs bg-red-100 rounded-3xl p-1 my-1">
                {actionData.errors.email}
              </p>
            </div>
          ) : null}
          <input
            className="bg-secondary-200 shadow p-1 rounded w-full focus:bg-white focus:rounded focus:shadow"
            type="email"
            name="email"
            defaultValue={
              typeof actionData?.values?.email === "string"
                ? actionData.values.email
                : undefined
            }
          />
        </label>
        <label className="block text-left pt-2 pb-1">
          Message{" "}
          <textarea
            className="w-full h-24 bg-secondary-200 shadow p-1 rounded focus:bg-white focus:rounded focus:shadow"
            name="message"
          />
        </label>
        <button
          className="
                bg-yellow-300
                rounded
                p-2
                mt-2
                hover:bg-yellow-400
                shadow-md
                hover:shadow-none
                disabled:bg-gray-200
        "
          type="submit"
          disabled={transition.state === "submitting"}
        >
          Submit
        </button>
      </Form>
    </fieldset>
  );
};

const ContactFormButton = () => {
  const [showForm, setShowForm] = useState(false);

  if (showForm) return <InnerForm />;

  return (
    <PrimaryButton
      data-testid="contactMeFormOpener"
      onClick={() => setShowForm(true)}
    >
      Contact Me
    </PrimaryButton>
  );
};

export const ContactForm = () => {
  const actionData = useActionData<typeof action>();

  return actionData?.status === "submitted" ? (
    <div
      data-testid="successIndicator"
      className="bg-clay-100 rounded-md shadow p-2 m-2"
    >
      <h3 className="text-black font-bold">
        {typeof actionData.values.name === "string" ? (
          <>Thanks, {actionData.values.name}!</>
        ) : (
          "Thanks!"
        )}
      </h3>
      <p>I'll get back to you soon.</p>
    </div>
  ) : (
    <ContactFormButton />
  );
};
