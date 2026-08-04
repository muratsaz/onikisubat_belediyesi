import { LogOut } from "lucide-react";

import { sidebarMenu } from "../../data/sidebarMenu";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-200 bg-white shadow-sm">

      {/* Logo */}

      <div className="flex h-24 items-center justify-center border-b border-slate-200 bg-white px-6 shadow-sm">
        <img
          src="/images/logos/logo.png"
          alt="Onikişubat Belediyesi"
          className="h-16 w-auto transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Menü */}

      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {sidebarMenu.map((item) => (
            <SidebarItem
              key={item.title}
              title={item.title}
              path={item.path}
              icon={item.icon}
            />
          ))}
        </ul>
      </nav>

      {/* Footer */}

      <div className="border-t border-slate-200 bg-slate-50 p-4">
        <button className="flex w-full items-center justify-center gap-3 rounded-xl border border-red-200 px-4 py-3 font-medium text-red-600 transition-all duration-200 hover:bg-red-50 hover:border-red-300">
          <LogOut size={20} />
          Çıkış Yap
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;