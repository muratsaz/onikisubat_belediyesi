import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";

interface DropdownItem {
  title: string;
  path: string;
}

interface DropdownMenuProps {
  title: string;
  items: DropdownItem[];
}

const DropdownMenu = ({ title, items }: DropdownMenuProps) => {
  return (
    <li className="group relative">
      <button className="flex items-center gap-1 font-medium text-slate-700 transition hover:text-blue-600">
        {title}
        <ChevronDown
          size={16}
          className="transition group-hover:rotate-180"
        />
      </button>

      <div className="invisible absolute left-0 top-full z-50 mt-3 w-72 rounded-xl border border-slate-200 bg-white opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
        <ul className="py-2">
          {items.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className="block px-5 py-3 text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default DropdownMenu;