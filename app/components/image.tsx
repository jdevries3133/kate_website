export const Image: React.FC<{
  src: string;
  alt: string;
  caption: string;
}> = ({ src, alt, caption }) => {
  // this is used in mdx, so we must validate our inputs
  if (!src || !alt || !caption) {
    let errStr = '';
    if (!src) errStr.concat("`src` was not provided to image component");
    if (!alt) errStr.concat("`alt` was not provided to image component");
    if (!caption) errStr.concat("`caption` was not provided to image compoonent");
    throw new Error(errStr);
  }
  return (
    <div className="not-prose">
      <img
        className="w-full"
        src={src}
        alt={alt || caption || "undescribed image"}
      />
      <span className="text-secondary-800 text-sm">{caption}</span>
    </div>
  );
};
