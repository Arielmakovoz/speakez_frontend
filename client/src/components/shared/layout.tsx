import { Header } from "~/components/shared/header";
import Navbar from "./navbar";
import Footer from "./footer";
import { cn } from "~/utils/cn";
import Loading from "./loading";
import { useEffect } from "react";

const Layout: React.FC<
  React.PropsWithChildren<{
    title?: string;
    className?: string;
    noFooter?: boolean;
    loading?: boolean;
  }>
> = ({ title, className, noFooter = false, loading = false, children }) => {
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <main className="bg-main relative flex min-h-screen flex-col items-center text-text-100">
      <Header title={title} />
      <div className="absolute top-0">
        <Navbar />
      </div>

      <div
        className={cn(
          "mt-14 flex h-full w-full flex-1 flex-col items-center justify-center overflow-x-hidden overflow-y-clip pb-20",
          className
        )}
      >
        {loading ? <Loading /> : <>{children}</>}
      </div>
      {!noFooter && !loading && <Footer />}
    </main>
  );
};

export default Layout;
