import { Link, useLocation } from "remix";

const StyledLink: React.FC<{ to: string }> = ({ children, to }) => (
  <Link
    className="text-primary-300 focus:text-primary-200 hover:text-primary-200 hover:underline focus:underline"
    to={to}
  >
    {children}
  </Link>
);

export const Header = () => {
  const { pathname } = useLocation();
  if (pathname === "/") {
    return (
      <header className="absolute top-0 left-0 p-2 p-2">
        <StyledLink to="/blog/list">blog</StyledLink>
      </header>
    );
  }
  if (pathname === "/blog/list") {
    return (
      <header className="flex gap-2 m-2">
        <StyledLink to="/">home</StyledLink>
      </header>
    );
  }
  return (
    <header className="flex gap-2 m-2">
      <StyledLink to="/">home</StyledLink>
      <StyledLink to="/blog/list">
        {pathname.includes("blog") ? "posts" : "blog"}
      </StyledLink>
    </header>
  );
};
