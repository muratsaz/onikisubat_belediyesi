import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  title: string;
  path: string;
  icon: LucideIcon;
}

const SidebarItem = ({
  title,
  path,
  icon: Icon,
}: SidebarItemProps) => {
  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) =>
          [
            "group relative flex items-center gap-4 rounded-xl px-4 py-3 font-medium transition-all duration-300",

            isActive
              ? "bg-blue-700 text-white shadow-lg"
              : "text-slate-700 hover:bg-slate-100 hover:text-blue-700",
          ].join(" ")
        }
      >
        {({ isActive }) => (
          <>
            {/* Sol aktif çizgi */}

            {isActive && (
              <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-white" />
            )}

            {/* İkon */}

            <Icon
              size={22}
              className="transition-transform duration-300 group-hover:scale-110"
            />

            {/* Yazı */}

            <span className="text-[15px]">
              {title}
            </span>
          </>
        )}
      </NavLink>
    </li>
  );
};

export default SidebarItem;