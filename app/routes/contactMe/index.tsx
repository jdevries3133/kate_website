import {
  useActionData,
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
} from "remix";
import { commitSession, getSession } from "~/sessions";

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const password = (await request.formData()).get("password");
  const secret = process.env.CONTACT_INQUIRY_PASSWORD;
  if (password === secret) {
    session.set("isAuthenticated", true);
    return redirect("/contactMe/results", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
  console.error(
    `authentication failure. user input of ${password} did not match ${secret}`
  );
  return "password is not correct";
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.get("isAuthenticated")) {
    return redirect("/contactMe/results");
  }
  return null;
};

export default function ContactMe() {
  const data = useActionData();
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Form method="post">
        <p>{data}</p>
        <label>
          <input className="block rounded" type="text" name="password" />
        </label>
        <button>Submit</button>
      </Form>
    </div>
  );
}
