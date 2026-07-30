import { Link } from "react-router-dom";
import { X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  const menuItems = [
    { title: "Ana Sayfa", path: "/" },
    { title: "Kurumsal", path: "/kurumsal" },
    { title: "Haberler", path: "/haberler" },
    { title: "Duyurular", path: "/duyurular" },
    { title: "Projeler", path: "/projeler" },
    { title: "Hizmetler", path: "/hizmetler" },
    { title: "İletişim", path: "/iletisim" },
  ];

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={onClose}
      />

      <aside className="fixed right-0 top-0 z-50 h-screen w-80 bg-white shadow-xl">

        <div className="flex items-center justify-between border-b p-5">

          <h2 className="text-lg font-bold">
            Menü
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <nav className="flex flex-col">

          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className="border-b px-6 py-4 transition hover:bg-slate-100"
            >
              {item.title}
            </Link>
          ))}

        </nav>

      </aside>
    </>
  );
};

export default MobileMenu;