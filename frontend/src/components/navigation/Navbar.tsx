import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, Search } from "lucide-react";

import SearchModal from "../search/SearchModal";
import MobileMenu from "./MobileMenu";
import DropdownMenu from "./DropdownMenu";

import {
  navigationItems,
  kurumsalItems,
} from "../../utils/navigation";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleNewsClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (location.pathname === "/") {
      document
        .getElementById("haberler")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#haberler");
    }
  };

  const handleAnnouncementClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (location.pathname === "/") {
      document
        .getElementById("announcements")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#announcements");
    }
  };

  return (
    <>
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">

          {/* Logo + Menü */}
          <div className="flex items-center gap-8 lg:gap-12">

            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-3">
              <img
                src="/images/logos/logo.png"
                alt="Onikişubat Belediyesi"
                className="h-14 w-auto"
              />
            </NavLink>

            {/* Desktop Menu */}
            <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
              {navigationItems.map((item) => {
                if (item.title === "Kurumsal") {
                  return (
                    <DropdownMenu
                      key={item.title}
                      title="Kurumsal"
                      items={kurumsalItems}
                    />
                  );
                }

                return (
                  <li key={item.path || item.title}>
                    {item.title === "Haberler" ? (
                      <a
                        href="#haberler"
                        onClick={handleNewsClick}
                        className="font-medium text-slate-700 transition duration-200 hover:text-blue-600"
                      >
                        Haberler
                      </a>
                    ) : item.title === "Duyurular" ? (
                      <a
                        href="#announcements"
                        onClick={handleAnnouncementClick}
                        className="font-medium text-slate-700 transition duration-200 hover:text-blue-600"
                      >
                        Duyurular
                      </a>
                    ) : (
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          [
                            "transition duration-200",
                            "font-medium",
                            "hover:text-blue-600",
                            isActive
                              ? "text-blue-700"
                              : "text-slate-700",
                          ].join(" ")
                        }
                      >
                        {item.title}
                      </NavLink>
                    )}
                  </li>
                );
              })}
            </ul>

          </div>

          {/* Sağ Butonlar */}
          <div className="flex items-center gap-3">

            {/* Arama */}
            <button
              onClick={() => setSearchOpen(true)}
              className="rounded-lg border p-2 transition hover:bg-slate-100"
              aria-label="Ara"
            >
              <Search size={20} />
            </button>

            {/* E-Belediye */}
            <NavLink
              to="/e-belediye"
              className="hidden rounded-lg bg-blue-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 lg:block"
            >
              E-Belediye
            </NavLink>

            {/* Mobil Menü */}
            <button
              className="rounded-lg border p-2 transition hover:bg-slate-100 lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Menüyü Aç"
            >
              <Menu size={22} />
            </button>

          </div>

        </div>
      </nav>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
};

export default Navbar;