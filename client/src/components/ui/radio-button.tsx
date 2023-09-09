import { cn } from "~/utils/cn";

export interface RadioButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  groupName: string;
  left?: boolean;
  right?: boolean;
  noBg?: boolean;
  selected?: boolean;
  outerClassName?: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  groupName,
  className,
  selected, // Causes strange behavior
  outerClassName,
  children,
  ...rest
}) => {
  return (
    <label className={outerClassName}>
      <input
        type="radio"
        name={groupName}
        className="peer absolute opacity-0"
        checked={selected}
      />
      <div
        className={cn(
          `text-highlight flex flex-col items-center px-2 text-bg-main-light/60 transition-all hover:scale-[1.07] peer-checked:text-bg-main-light dark:text-bg-main-dark/60  dark:peer-checked:text-bg-main-dark`,
          className
        )}
        {...rest}
      >
        {children}
      </div>
    </label>
  );
};

export default RadioButton;
