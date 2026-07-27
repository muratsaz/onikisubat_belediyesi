import { Bell, Search, Settings } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
      {/* Sol Taraf */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h2>

        <p className="text-sm text-slate-500">
          Yönetim paneline hoş geldiniz.
        </p>
      </div>

      {/* Sağ Taraf */}
      <div className="flex items-center gap-4">
        {/* Arama */}
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2">
          <Search size={18} className="text-slate-400" />

          <input
            type="text"
            placeholder="Ara..."
            className="w-48 bg-transparent text-sm outline-none"
          />
        </div>

        {/* Bildirim */}
        <button className="rounded-xl border border-slate-200 p-3 transition hover:bg-slate-100">
          <Bell size={20} />
        </button>

        {/* Ayarlar */}
        <button className="rounded-xl border border-slate-200 p-3 transition hover:bg-slate-100">
          <Settings size={20} />
        </button>

        {/* Kullanıcı */}
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
            A
          </div>

          <div>
            <p className="font-semibold text-slate-800">
              Admin
            </p>

            <p className="text-sm text-slate-500">
              Yönetici
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}