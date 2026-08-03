import { Search, RotateCcw } from "lucide-react";

interface TenderSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const TenderSearch = ({
  value,
  onChange,
}: TenderSearchProps) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row">
        {/* Arama Kutusu */}
        <div className="relative flex-1">
          <Search
            size={22}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="İhale adı veya müdürlük ara..."
            className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-14 pr-5 text-base outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Temizle */}
        <button
          type="button"
          onClick={() => onChange("")}
          className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-slate-200 px-6 font-semibold transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
        >
          <RotateCcw size={20} />
          Temizle
        </button>
      </div>
    </div>
  );
};

export default TenderSearch;