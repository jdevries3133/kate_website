import { Link, useLocation } from "remix";
import { BlogSearch } from "./search";

const linkStyles = `
  text-primary-300
  focus:text-primary-200
  focus:underline
  hover:text-primary-200
  hover:underline
`;

export const Header = () => {
  const { pathname } = useLocation();
  if (pathname === "/blog") {
    return (
      <header className="flex items-center gap-2 m-2">
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
