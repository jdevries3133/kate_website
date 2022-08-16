import { Form } from "remix";
import { SearchResults } from "./searchResults";

export const BlogSearch: React.FC = () => {
  return (
    <div>
      <Form method="get">
        <input
          name="post"
          aria-label="search blog posts"
          className="rounded p-1 m-2 w-[20rem]"
          type="text"
          placeholder="search posts"
        />
      </Form>
      <SearchResults />
    </div>
  );
};
