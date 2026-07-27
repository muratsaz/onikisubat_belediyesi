import {
  LayoutDashboard,
  Newspaper,
  Megaphone,
  CalendarDays,
  Images,
  FileText,
  Users,
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard },
  { title: "Haberler", icon: Newspaper },
  { title: "Duyurular", icon: Megaphone },
  { title: "Etkinlikler", icon: CalendarDays },
  { title: "Galeri", icon: Images },
  { title: "Sayfalar", icon: FileText },
  { title: "Kullanıcılar", icon: Users },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col bg-slate-900 text-white">
      <div className="border-b border-slate-800 p-6">
        <h1 className="text-xl font-bold">
          Onikişubat Belediyesi
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Yönetim Paneli
        </p>
      </div>

      <nav className="flex-1 p-4">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className={`mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 transition
                ${
                  index === 0
                    ? "bg-blue-600"
                    : "hover:bg-slate-800"
                }`}
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}