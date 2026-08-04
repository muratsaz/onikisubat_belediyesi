import {
  Bell,
  CalendarDays,
  ChevronDown,
  Search,
  UserCircle2,
} from "lucide-react";

const Topbar = () => {
  const today = new Date().toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">

      {/* Sol Alan */}

      <div>

        <h1 className="text-2xl font-black text-slate-800">
          Dashboard
        </h1>

        <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays size={16} />
          <span>{today}</span>
        </div>

      </div>

      {/* Sağ Alan */}

      <div className="flex items-center gap-6">

        {/* Arama */}

        <div className="relative hidden lg:block">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Yönetim panelinde ara..."
            className="w-80 rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 outline-none transition-all duration-300 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />

        </div>

        {/* Bildirim */}

        <button className="relative rounded-xl p-3 transition hover:bg-slate-100">

          <Bell size={22} />

          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />

        </button>

        {/* Profil */}

        <button className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 transition hover:shadow-md">

          <UserCircle2
            size={42}
            className="text-blue-700"
          />

          <div className="text-left">

            <p className="font-semibold text-slate-800">
              Sistem Yöneticisi
            </p>

            <p className="text-sm text-slate-500">
              Admin
            </p>

          </div>

          <ChevronDown
            size={18}
            className="text-slate-400"
          />

        </button>

      </div>

    </header>
  );
};

export default Topbar;