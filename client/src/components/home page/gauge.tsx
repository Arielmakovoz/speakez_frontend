import { cn } from "~/utils/cn";
import styles from "~/styles/gauge.module.css";

const Gauge: React.FC<{ amount: number; total: number }> = ({
  amount,
  total,
}) => {
  return (
    <div className="flex w-3/5 flex-col items-center">
      <div className={cn("bg-highlight my-3 w-full", styles.gauge)}>
        <div
          className={cn(styles.percentage)}
          style={{ transform: `rotate(${(amount / total) * 180}deg)` }}
        ></div>
        <div className={cn(styles.mask, "bg-main")}></div>
      </div>
      <p className="text-3xl font-bold">{amount}</p>
    </div>
  );
};

export default Gauge;
