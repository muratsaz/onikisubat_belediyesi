import type { InputHTMLAttributes } from "react";
import { Search } from "lucide-react";

interface SearchInputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

const SearchInput = ({
  className = "",
  ...props
}: SearchInputProps) => {
  return (
    <div className="relative w-full">

      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        {...props}
        className={[
          "w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition",
          "focus:border-blue-600 focus:ring-4 focus:ring-blue-100",
          className,
        ].join(" ")}
      />

    </div>
  );
};

export default SearchInput;