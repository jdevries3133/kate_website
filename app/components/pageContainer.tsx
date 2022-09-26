import { PropsWithChildren } from "react";
import { Footer } from "./footer";
import { Header } from "./header";

export const DefaultPageContainer: React.FC<PropsWithChildren> = ({
  children,
}) => (
  <div className="flex sm:items-center flex-col bg-secondary-600 min-h-screen relative">
    <div className="relative z-10">
      <Header />
    </div>
    <div className="relative z-0">
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  </div>
);
