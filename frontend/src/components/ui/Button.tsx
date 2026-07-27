import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

export default function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-xl px-4 py-2 font-medium transition duration-200",
        {
          "bg-blue-600 text-white hover:bg-blue-700":
            variant === "primary",

          "bg-slate-200 text-slate-800 hover:bg-slate-300":
            variant === "secondary",

          "bg-red-600 text-white hover:bg-red-700":
            variant === "danger",
        },
        className
      )}
      {...props}
    />
  );
}