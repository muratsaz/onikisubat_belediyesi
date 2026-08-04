import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type Variant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "outline";

type Size =
  | "sm"
  | "md"
  | "lg";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

const variantClasses = {
  primary:
    "bg-blue-700 text-white hover:bg-blue-800",

  secondary:
    "bg-slate-700 text-white hover:bg-slate-800",

  danger:
    "bg-red-600 text-white hover:bg-red-700",

  success:
    "bg-emerald-600 text-white hover:bg-emerald-700",

  outline:
    "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100",
};

const sizeClasses = {
  sm: "px-3 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={[
        "rounded-xl font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
};

export default Button;