import type { ReactNode } from "react";

type Variant =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "secondary";

interface BadgeProps {
  children: ReactNode;
  variant?: Variant;
}

const variants = {
  primary:
    "bg-blue-100 text-blue-700",

  success:
    "bg-green-100 text-green-700",

  warning:
    "bg-yellow-100 text-yellow-700",

  danger:
    "bg-red-100 text-red-700",

  secondary:
    "bg-slate-100 text-slate-700",
};

const Badge = ({
  children,
  variant = "primary",
}: BadgeProps) => {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        variants[variant],
      ].join(" ")}
    >
      {children}
    </span>
  );
};

export default Badge;