import { useState } from "react";
import { Form, ActionFunction, useTransition, useActionData } from "remix";

export const action: ActionFunction = async ({ request }) => {
  const body = request.formData();
  console.log(body);
};

const InnerForm = () => {
  const transition = useTransition();
  const actionData = useActionData();
  return (
    <fieldset disabled={transition.state === "submitting"}>
      <Form method="post">
        <label>
          Name{" "}
          {actionData && actionData.errors.name ? (
            <p className="text-red-500">{actionData.errors.name}</p>
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
            <p className="text-red-500">{actionData.errors.email}</p>
          ) : null}
          <input
            type="email"
            name="email"
            defaultValue={actionData ? actionData.values.email : undefined}
          />
        </label>
        <button type="submit">Submit</button>
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
