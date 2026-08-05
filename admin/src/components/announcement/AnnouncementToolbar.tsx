import { Search } from "lucide-react";

interface AnnouncementToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  filter: "Tümü" | "Yayında" | "Taslak";
  onFilterChange: (
    value: "Tümü" | "Yayında" | "Taslak"
  ) => void;
  category: string;
  onCategoryChange: (value: string) => void;
}

const categories = [
  "Tümü",
  "Genel",
  "İhale",
  "Duyuru",
  "Etkinlik",
  "Sosyal",
  "Kültür",
  "Spor",
  "Eğitim",
  "Diğer",
];

const AnnouncementToolbar = ({
  search,
  onSearchChange,
  filter,
  onFilterChange,
  category,
  onCategoryChange,
}: AnnouncementToolbarProps) => {
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
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            placeholder="Duyuru ara..."
            className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-600"
          />
        </div>

        {/* Durum */}
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
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
        >
          <option value="Tümü">Tüm Durumlar</option>
          <option value="Yayında">Yayında</option>
          <option value="Taslak">Taslak</option>
        </select>

        {/* Kategori */}
        <select
          value={category}
          onChange={(e) =>
            onCategoryChange(e.target.value)
          }
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
        >
          {categories.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

      </div>
    </div>
  );
};

export default AnnouncementToolbar;