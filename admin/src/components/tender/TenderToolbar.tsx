import { Search } from "lucide-react";

interface TenderToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
}

const TenderToolbar = ({
  search,
  onSearchChange,
  status,
  onStatusChange,
}: TenderToolbarProps) => {
  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-[1fr_220px]">
        {/* Arama */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="İhale ara..."
            className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-600"
          />
        </div>

        {/* Durum */}
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
        >
          <option value="Tümü">Tüm İhaleler</option>
          <option value="ACTIVE">Açık</option>
          <option value="CLOSED">Sonuçlandı</option>
        </select>
      </div>
    </div>
  );
};

export default TenderToolbar;