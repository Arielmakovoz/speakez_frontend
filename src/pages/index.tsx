import Link from "next/link";
import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import { BsInfo } from "react-icons/bs";
import { FaArrowsRotate } from "react-icons/fa6";
import { CgDarkMode } from "react-icons/cg";
import Layout from "~/components/shared/layout";
import { cn } from "~/utils/cn";
import { changeColor } from "~/utils/colorMode";
import { TbWorldCog } from "react-icons/tb";
import { LengthSelector } from "~/components/home page/length-selector";
import AudioButtons from "~/components/home page/audio-recorder";
import { choosePhrase, type lengths } from "~/utils/phrases";
import Results from "~/components/home page/results";
import { motion } from "framer-motion";

const sampleData = {
  wpm: 51,
  acc: 62,
  stutters: 14,
  hardOnset: 10,
  bars: [
    {
      name: "PR",
      value: 456,
    },
    {
      name: "BL",
      value: 351,
    },
    {
      name: "SR",
      value: 271,
    },
    {
      name: "IN",
      value: 191,
    },
  ],
  fillers: [
    {
      word: "Uh",
      count: 1,
    },

    {
      word: "Actually",
      count: 2,
    },
    {
      word: "Basically",
      count: 2,
    },
  ],
};

const container = {
  hidden: { height: 0 },
  visible: {
    height: "30vh",
  },
};

export default function Home() {
  const [phrase, setPhrase] = useState("");
  const [length, setLength] = useState<lengths>(10);
  const [didFinish, setDidFinish] = useState(false);

  useEffect(() => {
    setPhrase(choosePhrase(10));
  }, []);

  return (
    <Layout>
      <motion.div
        initial="hidden"
        animate={didFinish ? "hidden" : "visible"}
        variants={container}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      />
      <div className="bg-highlight flex w-fit transform gap-2 rounded px-4 py-2">
        <ToolbarButton Icon={BsInfo} href="/info" />
        <ToolbarButton Icon={CgDarkMode} onClick={changeColor} />
        <ToolbarButton
          Icon={FaArrowsRotate}
          onClick={() => setPhrase(choosePhrase(length, phrase))}
          className="hover:rotate-12 active:rotate-180"
        />
        <AudioButtons setDidFinish={setDidFinish} />
        <ToolbarButton Icon={TbWorldCog} onClick={() => 0} />
        <LengthSelector
          length={length}
          setLength={setLength}
          onChange={(len: lengths) => setPhrase(choosePhrase(len, phrase))}
        />
      </div>
      <p className="mt-6 max-w-[25rem] text-center font-ubuntu text-3xl font-medium text-highlight-light dark:text-highlight-dark">
        {phrase}
      </p>
      <Results {...sampleData} variant={didFinish ? "visible" : "hidden"} />
    </Layout>
  );
}

export const ToolbarButton: React.FC<
  React.PropsWithChildren<{
    Icon: IconType;
    onClick?: () => void;
    linkClassName?: string;
    className?: string;
    href?: string;
  }>
> = ({
  Icon,
  onClick = () => 0,
  linkClassName = "",
  className = "",
  href = "",
}) => {
  return (
    <Link
      href={href}
      className={cn("text-bg-main-light dark:text-bg-main-dark", linkClassName)}
      onClick={onClick}
    >
      <Icon
        size="1.5rem"
        className={cn("transition-all hover:scale-110", className)}
      />
    </Link>
  );
};
