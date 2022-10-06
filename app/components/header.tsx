import { Link, useLocation } from "remix";
import { BlogSearch } from "./search";

const linkStyles = `
  text-primary-700
  focus:text-primary-800
  focus:underline
  hover:text-primary-800
  hover:underline
`;

export const Header = () => {
  const { pathname } = useLocation();
  if (pathname === "/blog") {
    return (
      <header className="flex bg-accent-100 rounded p-2 m-2 items-center gap-2">
        <Link className={linkStyles} to="/">
          home
        </Link>
        <BlogSearch />
      </header>
    );
  }
  return (
    <header className="flex items-center gap-2 m-2">
      <Link className={linkStyles} to="/">
        home
      </Link>
      <Link className={linkStyles} to="/blog">
        {pathname.includes("post") ? "posts" : "blog"}
      </Link>
    </header>
  );
};
