import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, FC } from "react";

const buttonVariants = cva(
  "p-2 px-4 rounded-md border-2 text-center transition-colors duration-500 disabled:opacity-50 flex items-center justify-center gap-x-2 disabled:pointer-events-none",
  {
    variants: {
      intent: {
        greenEmpty: "border-green-600 hover:bg-green-600 hover:text-white",
        greenFull: "bg-green-600 border-green-600 text-white",
        redFull: "bg-red-600 border-red-600 text-white",
        orangeEmpty: "border-orange-500 hover:bg-orange-500 hover:text-white",
      },
    },
    defaultVariants: {
      intent: "greenEmpty",
    },
  }
);
interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button: FC<Props> = ({
  children,
  onClick,
  className,
  intent,
  ...otherProps
}) => {
  return (
    <button
      onClick={onClick}
      className={buttonVariants({ className, intent })}
      {...otherProps}
    >
      {children}
    </button>
  );
};
