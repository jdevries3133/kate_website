export const BlogSearch: React.FC = () => {
  // TODO: use the component / action pattern. This component should also have
  // an action and loader to do the searching on the backend, not be overly
  // wasteful.
  return (
    <>
      <input
        aria-label="search across posts"
        className="rounded p-1 m-2"
        type="text"
        placeholder="search posts"
      />
    </>
  );
};
