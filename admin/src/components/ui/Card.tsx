import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  title?: string;
}

const Card = ({
  children,
  title,
  className = "",
  ...props
}: CardProps) => {
  return (
    <div
      {...props}
      className={[
        "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md",
        className,
      ].join(" ")}
    >
      {title && (
        <h2 className="mb-5 text-lg font-bold text-slate-800">
          {title}
        </h2>
      )}

      {children}
    </div>
  );
};

export default Card;