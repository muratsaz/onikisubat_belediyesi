import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import {
  NavLink,
  useLocation,
} from "react-router-dom";
import type { LucideIcon } from "lucide-react";

import type {
  SidebarMenuChild,
} from "../../data/sidebarMenu";

interface SidebarItemProps {
  title: string;
  path?: string;
  icon: LucideIcon;
  children?: SidebarMenuChild[];
}

const SidebarItem = ({
  title,
  path,
  icon: Icon,
  children,
}: SidebarItemProps) => {
  const location = useLocation();

  const hasChildren = Boolean(
    children && children.length > 0
  );

  const isChildActive = hasChildren
    ? children!.some((child) =>
        location.pathname.startsWith(child.path)
      )
    : false;

  const [isOpen, setIsOpen] = useState(isChildActive);

  useEffect(() => {
    if (isChildActive) {
      setIsOpen(true);
    }
  }, [isChildActive]);

  if (hasChildren) {
    return (
      <li>
        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className={[
            "group relative flex w-full items-center justify-between rounded-xl px-4 py-3 font-medium transition-all duration-300",
            isChildActive
              ? "bg-slate-100 text-blue-700"
              : "text-slate-700 hover:bg-slate-100 hover:text-blue-700",
          ].join(" ")}
        >
          <span className="flex items-center gap-4">
            <Icon
              size={22}
              className="transition-transform duration-300 group-hover:scale-110"
            />

            <span className="text-[15px]">
              {title}
            </span>
          </span>

          {isOpen ? (
            <ChevronDown
              size={18}
              className="transition-transform duration-300"
            />
          ) : (
            <ChevronRight
              size={18}
              className="transition-transform duration-300"
            />
          )}
        </button>

        {isOpen && (
          <ul className="mt-1 space-y-1 pl-4">
            {children!.map((child) => (
              <li key={child.path}>
                <NavLink
                  to={child.path}
                  className={({ isActive }) =>
                    [
                      "group relative flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-blue-700 text-white shadow-md"
                        : "text-slate-600 hover:bg-slate-100 hover:text-blue-700",
                    ].join(" ")
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-white" />
                      )}

                      {child.icon && (
                        <child.icon
                          size={18}
                          className="shrink-0 transition-transform duration-200 group-hover:scale-110"
                        />
                      )}

                      <span>
                        {child.title}
                      </span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <NavLink
        to={path || "/"}
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
            {isActive && (
              <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-white" />
            )}

            <Icon
              size={22}
              className="transition-transform duration-300 group-hover:scale-110"
            />

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