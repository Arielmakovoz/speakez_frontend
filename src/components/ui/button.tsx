import { cn } from "~/utils/cn";
import Loading from "../shared/loading";

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  name: string;
}

const Button: React.FC<IButtonProps> = ({
  children,
  className,
  loading = false,
  disabled,
  name,
  ...rest
}) => {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      aria-label={name}
      title={name}
      className={cn(
        `bg-secondary text-highlight transition-all rounded-lg px-3 py-[0.4rem] hover:bg-opacity-[0.95] hover:opacity-90 disabled:opacity-5`,
        className
      )}
    >
      {loading ? (
        <div className="relative flex items-center justify-center">
          <Loading className="absolute" />
          <div className="w-full opacity-0">{children}</div>
        </div>
      ) : (
        <>{children}</>
      )}
    </button>
  );
};

export default Button;
