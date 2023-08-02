import { cn } from "~/utils/cn";
import Gauge from "./gauge";
import { BarList, DonutChart } from "@tremor/react";
import { motion } from "framer-motion";

export type BarData = { name: string; value: number };
export type FillerData = { word: string; count: number };

export interface ResultData {
  wpm: number;
  acc: number;
  stutters: number;
  hardOnset: number;
  bars: BarData[];
  fillers: FillerData[];
}

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const Results: React.FC<ResultData> = ({
  wpm,
  acc,
  stutters,
  hardOnset,
  bars,
  fillers,
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="text-highlight mt-4 grid w-full grid-cols-4 grid-rows-2 gap-3 px-10"
    >
      <ResultBox className="flex flex-col items-center justify-center">
        <p className="text-center text-2xl font-medium">WPM</p>
        <Gauge id="WPM" amount={wpm} total={120} />
      </ResultBox>
      <ResultBox className="flex flex-col items-center">
        <p className="text-center text-2xl font-medium">ACC</p>
        <Gauge id="ACC" amount={acc} total={120} />
      </ResultBox>
      <ResultBox className="flex flex-col items-center">
        <p className="text-center text-2xl font-medium">Stutters</p>
        <p className="text-[5rem] font-bold">{stutters}</p>
      </ResultBox>
      <ResultBox className="flex flex-col items-center">
        <p className="text-center text-2xl font-medium">Hard-Onset</p>
        <p className="text-[5rem] font-bold">{hardOnset}</p>
      </ResultBox>
      <ResultBox size={2} className="tremor-barList-bar:fill-red-500">
        <p className="text-center text-2xl font-medium">Data</p>
        <BarList data={bars} className="mt-2" />
      </ResultBox>{" "}
      <ResultBox size={2}>
        <p className="text-center text-2xl font-medium">Filler Words</p>
        <DonutChart
          data={fillers}
          index="word"
          category="count"
          colors={["orange", "orange", "orange", "orange", "orange", "orange"]}
          label={`${fillers.reduce(
            (partialSum, a) => partialSum + a.count,
            0
          )} fillers`}
        />
        {/* <div className="flex h-full flex-1 flex-col items-start justify-center">
          {fillers.map(({ word, count }, i) => (
            <p key={i} className="text-black">
              {word}: {count}
            </p>
          ))}
        </div> */}
      </ResultBox>
    </motion.div>
  );
};

const ResultBox: React.FC<
  React.PropsWithChildren<{ size?: number; className?: string }>
> = ({ size = 1, className, children }) => {
  return (
    <motion.div
      variants={item}
      className={cn(
        `col-span-${size} w-full items-center justify-center rounded border-2 border-highlight-light px-4 py-6 dark:border-highlight-dark`,
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default Results;
