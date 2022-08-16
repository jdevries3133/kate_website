import { useRef } from "react";
import { Link, useLoaderData, useSubmit } from "remix";
import { useOnClickOutside } from "~/hooks/useOnClickOutside";
import { PostCard } from "../postCard";

import type { LoaderData } from "./search.server";

export const SearchResults = () => {
  const submit = useSubmit();
  const { search } = useLoaderData<LoaderData>();
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
        <Link key={post.slug} to={`/post/${post.slug}`}>
          <PostCard
            extraClasses={{ container: "bg-clay-400 border-2 border-clay-100" }}
            {...post}
          />
        </Link>
      ))}
    </div>
  );
};
