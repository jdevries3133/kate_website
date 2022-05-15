export const getSlug = (filename: string) => {
  const result = filename.match(/(.*)\.mdx/);
  if (result) {
    return result[1];
  }
  throw new Error(`invalid filename: ${filename}`);
};
