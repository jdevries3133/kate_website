import { useState } from "react";
import { Form, useTransition, useActionData } from "remix";

const InnerForm = () => {
  const transition = useTransition();
  const actionData = useActionData();
  return (
    <fieldset disabled={transition.state === "submitting"}>
      <Form method="post">
        <label>
          Name{" "}
          {actionData && actionData.errors.name ? (
            <p>{actionData.errors.name}</p>
          ) : null}
          <input
            type="text"
            name="name"
            defaultValue={actionData ? actionData.values.name : undefined}
          />
        </label>
        <label>
          Email{" "}
          {actionData && actionData.errors.email ? (
            <p>{actionData.errors.email}</p>
          ) : null}
          <input
            type="email"
            name="email"
            defaultValue={actionData ? actionData.values.email : undefined}
          />
        </label>
        <label>
          Message{" "}
          {actionData && actionData.errors.message ? (
            <p>{actionData.errors.message}</p>
          ) : null}
          <textarea name="message" />
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
        "
          type="submit"
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
    <button
      onClick={() => setShowForm(true)}
      className="
                  shadow
                  p-6
                  m-6
                  text-clay-200
                  font-bold
                  text-lg
                  rounded-md
                  bg-gradient-to-tr
                  from-secondary-400
                  to-secondary-600
                  hover:text-white
                  hover:from-secondary-300
                  hover:to-secondary-400
                  hover:shadow-none
                "
    >
      Contact Me
    </button>
  );
};
