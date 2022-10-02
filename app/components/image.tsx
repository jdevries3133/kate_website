export const Image: React.FC<{
  src: string;
  alt: string;
  caption?: string;
}> = ({ src, alt, caption }) => {
  return (
    <div className="not-prose">
      <img className="w-full" src={src} alt={alt} />
      <span className="text-secondary-800 text-sm">{caption}</span>
    </div>
  );
};
