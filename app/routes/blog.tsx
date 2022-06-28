import { LoaderFunction, Outlet, redirect } from "remix";
import { Header } from "~/components/header";
import { Footer } from "~/components/footer";

export const loader: LoaderFunction = ({ params, request }) => {
  if (!/\/blog\/list/.test(request.url) && !params.post) {
    return redirect("/blog/list");
  }
  return null;
};

export default function Blog() {
  return (
    <div className="flex sm:items-center flex-col bg-secondary-600 min-h-screen">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
