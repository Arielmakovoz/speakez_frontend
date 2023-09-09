import Link from "next/link";
import { BsDiscord, BsEnvelopeFill, BsTwitter } from "react-icons/bs";
import { useState } from "react";
import type { IconType } from "react-icons";
import { cn } from "~/utils/cn";

const Footer: React.FC = () => {
  const [hoverLbl, setHoverLbl] = useState("");
  return (
    <div className="flex h-44 w-screen flex-col items-center justify-center gap-3 px-10 shadow md:h-32 md:flex-row md:justify-between">
      <div className="align-center flex justify-between gap-4">
        <SocialIcon
          label="Twitter"
          link="https://www.twitter.com"
          hoverLbl={hoverLbl}
          setHoverLbl={setHoverLbl}
          Icon={BsTwitter}
        />
        <SocialIcon
          label="Email"
          link="https://gmail.com"
          hoverLbl={hoverLbl}
          setHoverLbl={setHoverLbl}
          Icon={BsEnvelopeFill}
        />
        <SocialIcon
          label="Discord"
          link="https://discord.com"
          hoverLbl={hoverLbl}
          setHoverLbl={setHoverLbl}
          Icon={BsDiscord}
        />
      </div>
    </div>
  );
};

export default Footer;

const SocialIcon: React.FC<{
  label: string;
  link: string;
  hoverLbl: string;
  setHoverLbl: React.Dispatch<React.SetStateAction<string>>;
  Icon: IconType;
}> = ({ label, link, hoverLbl, setHoverLbl, Icon }) => (
  <Link
    href={link}
    target="_blank"
    rel="noreferrer"
    aria-label={label}
    onMouseEnter={() => setHoverLbl(label)}
    onMouseLeave={() => setHoverLbl("")}
  >
    <Icon
      size="2rem"
      // color={hoverLbl === label ? "#ffffff" : "rgb(255,255,255,"}
      className={cn(
        "text-highlight opacity-20 transition-all",
        (hoverLbl === label || hoverLbl === "") && "opacity-100"
      )}
    />
  </Link>
);
