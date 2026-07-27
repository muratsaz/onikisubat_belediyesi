import { Link } from "react-router-dom";
import { Menu, Search } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">

        <Link
          to="/"
          className="text-2xl font-bold text-blue-700"
        >
          Onikişubat Belediyesi
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">

          <li>
            <Link to="/">Ana Sayfa</Link>
          </li>

          <li>
            <Link to="/kurumsal">Kurumsal</Link>
          </li>

          <li>
            <Link to="/haberler">Haberler</Link>
          </li>

          <li>
            <Link to="/duyurular">Duyurular</Link>
          </li>

          <li>
            <Link to="/projeler">Projeler</Link>
          </li>

          <li>
            <Link to="/hizmetler">Hizmetler</Link>
          </li>

          <li>
            <Link to="/iletisim">İletişim</Link>
          </li>

        </ul>

        <div className="flex items-center gap-4">

          <button>
            <Search size={22} />
          </button>

          <button className="lg:hidden">
            <Menu size={28} />
          </button>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;