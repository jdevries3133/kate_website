import { PropsWithChildren } from "react";
import { Footer } from "./footer";
import { HeaderContent } from "./header";

export const DefaultPageContainer: React.FC<PropsWithChildren> = ({
  children,
}) => (
  <div className="flex sm:items-center flex-col bg-secondary-600 min-h-screen relative">
    <header className="flex bg-accent-100 rounded m-2 p-2 items-center max-w-prose">
      <HeaderContent />
    </header>
    <div className="relative z-0">
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  </div>
);
