/**
 * Admin login route
 */

import { PropsWithChildren } from "react";
import {
  useActionData,
  Form,
  ActionFunction,
  LoaderFunction,
  Outlet,
  useLoaderData,
  json,
  Link,
  redirect,
} from "remix";
import { getSession, commitSession } from "~/sessions";

/* if we are literally at `/admin` and authenticated, redirect to this route */
const DEFAULT_ROUTE = "/admin/comments";

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
  const isAuthenticated = session.get("isAuthenticated");
  if (isAuthenticated && /\/admin(\/)?$/.test(new URL(request.url).pathname)) {
    throw redirect(`${DEFAULT_ROUTE}`);
  }
  return { isAuthenticated };
};

const NavItem: React.FC<
  PropsWithChildren & {
    relTo: string;
  }
> = ({ relTo: to, children }) => (
  <div className="prose">
    <Link to={to} className="text-lg font-bold">
      {children}
    </Link>
  </div>
);

export default function Login() {
  const data = useActionData();
  const { isAuthenticated } = useLoaderData();

  return isAuthenticated ? (
    <>
      <div className="flex gap-4">
        <NavItem relTo="contacts">Contacts</NavItem>
        <NavItem relTo="comments">Comments</NavItem>
        <NavItem relTo="designSystem">Design System</NavItem>
        <NavItem relTo="emailSendTest">Test Email Sending</NavItem>
      </div>
      <Outlet />
    </>
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
