import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import type { SearchItem } from "./searchData";

interface SearchResultProps {
  item: SearchItem;
  onClose: () => void;
}

const colors: Record<string, string> = {
  Haber: "bg-blue-100 text-blue-700",
  Duyuru: "bg-orange-100 text-orange-700",
  İhale: "bg-emerald-100 text-emerald-700",
  Proje: "bg-violet-100 text-violet-700",
  Kurumsal: "bg-slate-100 text-slate-700",
  "E-Belediye": "bg-cyan-100 text-cyan-700",
};

const SearchResult = ({
  item,
  onClose,
}: SearchResultProps) => {
  return (
    <Link
      to={item.path}
      onClick={onClose}
      className="group flex items-center justify-between rounded-2xl border border-slate-200 p-5 transition hover:border-blue-200 hover:bg-blue-50"
    >
      <div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            colors[item.category] ??
            "bg-slate-100 text-slate-700"
          }`}
        >
          {item.category}
        </span>

        <h3 className="mt-3 text-lg font-bold text-slate-900 transition group-hover:text-blue-700">
          {item.title}
        </h3>

        <p className="mt-1 text-sm text-slate-600">
          {item.description}
        </p>

      </div>

      <ArrowRight
        className="text-blue-700 transition group-hover:translate-x-1"
      />
    </Link>
  );
};

export default SearchResult;