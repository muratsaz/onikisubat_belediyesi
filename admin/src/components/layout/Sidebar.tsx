import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { sidebarMenu } from "../../data/sidebarMenu";
import SidebarItem from "./SidebarItem";

import {
  getCurrentUserFromStorage,
  logout,
} from "../../services/authService";

const Sidebar = () => {
  const navigate = useNavigate();

  const currentUser = getCurrentUserFromStorage();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const visibleMenuItems = sidebarMenu.filter((item) => {
    if (item.superadminOnly) {
      return currentUser?.is_superadmin === true;
    }

    return true;
  });

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-200 bg-white shadow-sm">

      {/* LOGO */}

      <div className="flex h-24 items-center justify-center border-b border-slate-200 bg-white px-6 shadow-sm">
        <img
          src="/images/logos/logo.png"
          alt="Onikişubat Belediyesi"
          className="h-16 w-auto transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* MENÜ */}

      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {visibleMenuItems.map((item) => (
            <SidebarItem
              key={item.title}
              title={item.title}
              path={item.path}
              icon={item.icon}
              children={item.children}
            />
          ))}
        </ul>
      </nav>

      {/* FOOTER */}

      <div className="border-t border-slate-200 bg-slate-50 p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-red-200 px-4 py-3 font-medium text-red-600 transition-all duration-200 hover:border-red-300 hover:bg-red-50"
        >
          <LogOut size={20} />
          Çıkış Yap
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;