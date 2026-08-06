import { Search } from "lucide-react";

interface ProjectToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  filter: "Tümü" | "Yayında" | "Taslak";
  onFilterChange: (
    value: "Tümü" | "Yayında" | "Taslak"
  ) => void;
  status: string;
  onStatusChange: (value: string) => void;
}

const ProjectToolbar = ({
  search,
  onSearchChange,
  filter,
  onFilterChange,
  status,
  onStatusChange,
}: ProjectToolbarProps) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-3">

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
            placeholder="Proje ara..."
            className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-600"
          />
        </div>

        {/* Yayın Durumu */}
        <select
          value={filter}
          onChange={(e) =>
            onFilterChange(
              e.target.value as "Tümü" | "Yayında" | "Taslak"
            )
          }
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
        >
          <option value="Tümü">Tüm Yayın Durumları</option>
          <option value="Yayında">Yayında</option>
          <option value="Taslak">Taslak</option>
        </select>

        {/* Proje Durumu */}
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
        >
          <option value="Tümü">Tüm Proje Durumları</option>
          <option value="Planlanıyor">Planlanıyor</option>
          <option value="Devam Ediyor">Devam Ediyor</option>
          <option value="Tamamlandı">Tamamlandı</option>
        </select>

      </div>
    </div>
  );
};

export default ProjectToolbar;