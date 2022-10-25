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
  const { profile } = useLoaderData<{ profile: ProfileLoaderData }>();
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
      <div className="flex-grow flex justify-end items-center">
        <div className="pr-2 sm:pr-0">
          <BlogSearch />
        </div>
        {profile && !/\/profile/.test(pathname) && (
          <div className="hidden sm:flex flex-col justify-end text-right">
            <p>Hey, {profile.name.split(" ")[0]}!</p>
            <p>
              <Link
                to="/profile"
                className="p-1 hover:bg-primary-100 transition"
              >
                View Profile
              </Link>
            </p>
          </div>
        )}
      </div>
    </>
  );
};
