import { Link } from "remix";

export const PostCard: React.FC<{
  title: string;
  description: string;
  created: string;
  linkTo: string;
  extraClasses?: {
    container?: string;
  };
}> = ({ title, description, created, linkTo, extraClasses }) => (
  <Link to={linkTo}>
    <div
      className={`
      max-w-prose
      p-4
      m-2
      border-primary
      bg-clay-200
      text-mineral-700
      rounded
      shadow
      ${extraClasses?.container || ""}
   `}
    >
      <h3>{title}</h3>
      <p className="text-sm font-light">{created}</p>
      <p className="pl-2 border-l-4 border-zinc-200">{description}</p>
    </div>
  </Link>
);
