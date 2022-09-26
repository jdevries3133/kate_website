import { PropsWithChildren } from "react";

export const CodeSample: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="md:relative md:shadow-md md:w-[90ch] md:left-[calc(50%-42ch)]">
      {children}
    </div>
  );
};
