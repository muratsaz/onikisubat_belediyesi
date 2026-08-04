import { Search, Filter } from "lucide-react";

export interface NewsToolbarProps {
  search?: string;
  onSearchChange?: (value: string) => void;
  filter?: "Tümü" | "Yayında" | "Taslak";
  onFilterChange?: (
    value: "Tümü" | "Yayında" | "Taslak"
  ) => void;
}

const NewsToolbar = ({
  search = "",
  onSearchChange = () => {},
  filter = "Tümü",
  onFilterChange = () => {},
}: NewsToolbarProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">

      {/* Arama */}
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Haber ara..."
          className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
        />
      </div>

      {/* Filtre */}
      <div className="flex items-center gap-3">
        <Filter
          size={18}
          className="text-slate-500"
        />

        <select
          value={filter}
          onChange={(e) =>
            onFilterChange(
              e.target.value as
                | "Tümü"
                | "Yayında"
                | "Taslak"
            )
          }
          className="rounded-xl border border-slate-200 px-4 py-2.5 outline-none transition focus:border-blue-600"
        >
          <option value="Tümü">
            Tüm Haberler
          </option>

          <option value="Yayında">
            Yayında
          </option>

          <option value="Taslak">
            Taslak
          </option>
        </select>
      </div>

    </div>
  );
};

export default NewsToolbar;