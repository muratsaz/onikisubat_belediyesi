import {
  FileText,
  FolderOpen,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

interface TenderSidebarProps {
  filter: "all" | "open" | "closed";
  setFilter: (
    filter: "all" | "open" | "closed"
  ) => void;
}

const menuItems = [
  {
    id: "all",
    title: "Tüm İhaleler",
    icon: FileText,
  },
  {
    id: "open",
    title: "Açık İhaleler",
    icon: FolderOpen,
  },
  {
    id: "closed",
    title: "Sonuçlanan İhaleler",
    icon: CheckCircle2,
  },
] as const;

const TenderSidebar = ({
  filter,
  setFilter,
}: TenderSidebarProps) => {
  return (
    <aside className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm self-start">

      <div className="bg-blue-700 px-6 py-5">
        <h3 className="text-2xl font-bold text-white">
          İhaleler
        </h3>
      </div>

      <div className="divide-y divide-slate-100">

        {menuItems.map((item) => {
          const Icon = item.icon;

          const active = filter === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setFilter(item.id)}
              className={`group flex w-full items-center justify-between px-6 py-6 transition ${
                active
                  ? "bg-blue-50"
                  : "hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-4">

                <Icon
                  size={24}
                  className={
                    active
                      ? "text-blue-700"
                      : "text-slate-500"
                  }
                />

                <span
                  className={`text-lg font-semibold ${
                    active
                      ? "text-blue-700"
                      : "text-slate-800"
                  }`}
                >
                  {item.title}
                </span>

              </div>

              <ChevronRight
                className={`transition ${
                  active
                    ? "translate-x-1 text-blue-700"
                    : "text-slate-400"
                }`}
              />
            </button>
          );
        })}

      </div>

    </aside>
  );
};

export default TenderSidebar;