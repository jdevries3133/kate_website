import { Form } from "remix";
import { SearchResults } from "./searchResults";

export const BlogSearch: React.FC = () => {
  return (
    <>
      <Form method="get">
        <input
          name="post"
          aria-label="search posts"
          className="rounded p-1 m-2 w-full sm:w-60"
          type="text"
          placeholder="search posts"
        />
      </Form>
      <SearchResults />
    </>
  );
};
