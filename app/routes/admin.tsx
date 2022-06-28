/**
 * Admin login route
 */

import {
  useActionData,
  Form,
  ActionFunction,
  LoaderFunction,
  Outlet,
  useLoaderData,
  json,
  Link,
} from "remix";
import { getSession, commitSession } from "~/sessions";

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const password = (await request.formData()).get("password");
  const secret = process.env.ADMIN_PASSWORD;

  // secure a tea :)
  if (password === secret) {
    session.set("isAuthenticated", true);
    return json("ok", {
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
  return { isAuthenticated: session.get("isAuthenticated") };
};

export default function Login() {
  const data = useActionData();
  const { isAuthenticated } = useLoaderData();

  return isAuthenticated ? (
    <div className="flex flex-col items-center justify-center">
      <div className="flex gap-4">
        <div className="prose">
          <Link to="/admin/comments" className="text-lg font-bold">
            Comments
          </Link>
        </div>
        <div className="prose">
          <Link to="/admin/contacts" className="text-lg font-bold">
            Contacts
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  ) : (
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
