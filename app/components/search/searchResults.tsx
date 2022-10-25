import { useRef } from "react";
import { useLoaderData, useSubmit } from "remix";
import { useOnClickOutside } from "~/hooks/useOnClickOutside";
import { PostCard } from "../postCard";

import type { LoaderData as SearchLoaderData } from "./search.server";

export const SearchResults = () => {
  const submit = useSubmit();
  const { search } = useLoaderData<{ search: SearchLoaderData }>();
  const searchResultsContainer = useRef(null);
  useOnClickOutside(searchResultsContainer, () => {
    const data = new FormData();
    data.set("action", "clearSearchResults");
    submit(data, { method: "post" });
  });

  if (search.length === 0) return null;

  return (
    <div
      className="absolute t-0 l-0 z-50 bg-primary-300 p-1 rounded shadow-xl"
      ref={searchResultsContainer}
    >
      {search.map((post) => (
        <PostCard
          key={post.slug}
          linkTo={`/post/${post.slug}`}
          extraClasses={{
            container: "bg-secondary-400 border-2 border-clay-100",
          }}
          {...post}
        />
      ))}
    </div>
  );
};
