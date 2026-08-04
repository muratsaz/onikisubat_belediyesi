import type { InputHTMLAttributes } from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = ({
  label,
  error,
  className = "",
  ...props
}: InputProps) => {
  return (
    <div className="w-full">

      {label && (
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}

      <input
        {...props}
        className={[
          "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none transition",
          "focus:border-blue-600 focus:ring-4 focus:ring-blue-100",
          "disabled:cursor-not-allowed disabled:bg-slate-100",
          className,
        ].join(" ")}
      />

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}

    </div>
  );
};

export default Input;