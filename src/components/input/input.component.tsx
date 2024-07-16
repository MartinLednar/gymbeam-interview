import { cva } from "class-variance-authority";
import { ComponentPropsWithoutRef, FC, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentPropsWithoutRef<"input"> {
  fieldError?: string;
}

export const inputStyleVariants = cva(
  "border-2 rounded-md border-gray-600/30 py-4 px-3 outline-none focus:border-gray-600/80 bg-transparent disabled:pointer-events-none disabled:border-none disabled:appearance-none"
);

const Input: FC<Props> = forwardRef<HTMLInputElement, Props>(
  ({ fieldError, className, ...otherProps }, ref) => {
    return (
      <>
        <input
          className={twMerge(inputStyleVariants({ className }))}
          {...otherProps}
          ref={ref}
        />

        {fieldError && <p className="text-red-600 pt-1">{fieldError}</p>}
      </>
    );
  }
);

Input.displayName = "Input";

export default Input;
