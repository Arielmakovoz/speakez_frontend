import Link from "next/link";
import useWindowSize from "~/utils/useWindowSize";
import { TbWorldBolt } from "react-icons/tb";
import HoverLogo from "../home page/hover-logo";

const Navbar: React.FC = () => {
  const { isMobile } = useWindowSize();

  return (
    <div className="flex h-14 w-screen items-center justify-between px-10 pb-1 pt-4">
      <div className="flex flex-1 items-center justify-start">
        <Link
          href="/"
          className="flex items-center justify-center rounded-full pt-6 transition hover:-translate-y-0.5 hover:fill-white/80"
          aria-label="Home"
        >
          <HoverLogo width={isMobile ? "2.75rem" : "4rem"} />
        </Link>
      </div>
      <div className="flex h-full flex-1 items-center justify-end">
        {" "}
        <Link href="/impact">
          <TbWorldBolt className="text-highlight" size="2rem" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
