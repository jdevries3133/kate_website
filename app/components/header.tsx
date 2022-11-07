import { Link, useLoaderData, useLocation } from "remix";
import { BlogSearch } from "./search";
import { profileLoader, ProfileLoaderData } from "~/services/profile";

export const loader = profileLoader;

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

export const HeaderContent = () => {
  const { pathname } = useLocation();
  const result = useLoaderData<{ profile: ProfileLoaderData }>();
  const profile = result?.profile ? result.profile : { name: "" };
  profile.name = "josephinasmith3";
  return (
    <>
      <div className="flex gap-2 flex-shrink">
        <NavItem name="home" to="/" />
        <NavItem
          name={pathname.includes("post") ? "posts" : "blog"}
          to="/blog"
        />
        <NavItem name="about" to="/about" />
      </div>
      <div className="flex-grow sm:flex sm:justify-end sm:items-center">
        <div className="pr-2 sm:pr-0">
          <BlogSearch />
        </div>
      </div>
      {profile && !/\/profile/.test(pathname) && (
        <div className="flex flex-col justify-end text-right">
          <Link to="/profile" className="p-1 hover:bg-primary-100 transition">
            <p>Hi, {profile.name.split(" ")[0]}!</p>
          </Link>
        </div>
      )}
    </>
  );
};
