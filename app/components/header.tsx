import { Link, useLocation } from "remix";
import { BlogSearch } from "./search";

const linkStyles = `
  text-primary-700
  focus:text-primary-800
  focus:underline
  hover:text-primary-800
  hover:underline
`;

/* item that will not appear if the current pathname contains its name */
const NavItem: React.FC<{ name: string; to: string }> = ({ name, to }) => {
  const { pathname } = useLocation();
  if (
    pathname.includes(name) ||
    (name === "home" && ["/", ""].includes(pathname))
  )
    return null;
  return (
    <Link to={to} className={linkStyles}>
      {name}
    </Link>
  );
};

export const Header = () => {
  const { pathname } = useLocation();
  return (
    <header className="flex bg-accent-100 rounded p-2 m-2 items-center">
      <div className="flex gap-2 flex-shrink">
        <NavItem name="home" to="/" />
        <NavItem
          name={pathname.includes("post") ? "posts" : "blog"}
          to="/blog"
        />
        <NavItem name="socials" to="/socials" />
      </div>
      <div className="flex-grow flex justify-end">
        <BlogSearch />
      </div>
    </header>
  );
};
