import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useEffect, useState } from "react";

import { X } from "lucide-react";

import {
  getNavigation,
  type Navigation,
} from "../../services/navigationService";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({
  isOpen,
  onClose,
}: MobileMenuProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuItems, setMenuItems] =
    useState<Navigation[]>([]);

  /*
   * -------------------------------------------------------
   * MENÜLERİ AL
   * -------------------------------------------------------
   */

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const loadNavigation = async () => {
      try {
        const data =
          await getNavigation();

        setMenuItems(
          data
            .filter(
              (item) => item.is_active
            )
            .sort(
              (a, b) =>
                a.display_order -
                b.display_order
            )
        );
      } catch (error) {
        console.error(
          "Mobil navigasyon menüsü alınamadı:",
          error
        );
      }
    };

    loadNavigation();
  }, [isOpen]);

  /*
   * -------------------------------------------------------
   * SECTION ID BUL
   * -------------------------------------------------------
   *
   * /#baskan
   *      → baskan
   *
   * /#haberler
   *      → haberler
   *
   * /iletisim
   *      → null
   */

  const getSectionId = (
    path: string
  ): string | null => {
    if (!path.includes("/#")) {
      return null;
    }

    return (
      path
        .split("/#")[1]
        ?.replace("#", "")
        .trim() || null
    );
  };

  /*
   * -------------------------------------------------------
   * SECTION'A SCROLL
   * -------------------------------------------------------
   */

  const scrollToSection = (
    sectionId: string
  ) => {
    const element =
      document.getElementById(sectionId);

    if (!element) {
      console.warn(
        `Sayfada "${sectionId}" id'li bölüm bulunamadı.`
      );

      return;
    }

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  /*
   * -------------------------------------------------------
   * SECTION TIKLAMA
   * -------------------------------------------------------
   *
   * /#baskan
   *      → section'a scroll
   *
   * /#haberler
   *      → section'a scroll
   *
   * /iletisim
   *      → /iletisim sayfasına git
   */

  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    e.preventDefault();

    const sectionId =
      getSectionId(path);

    /*
     * Gerçek section ise
     */

    if (sectionId) {
      onClose();

      /*
       * Ana sayfadaysak direkt scroll
       */

      if (
        location.pathname === "/"
      ) {
        scrollToSection(sectionId);

        window.history.replaceState(
          null,
          "",
          `/#${sectionId}`
        );

        return;
      }

      /*
       * Başka sayfadaysak
       * ana sayfaya git + hash
       */

      navigate(`/#${sectionId}`);

      return;
    }

    /*
     * Normal route
     *
     * Örneğin:
     *
     * /iletisim
     */

    onClose();
    navigate(path);
  };

  /*
   * Menü kapalıysa hiçbir şey render etme.
   */

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Arka plan */}

      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={onClose}
      />

      {/* Mobil Menü */}

      <aside className="fixed right-0 top-0 z-50 h-screen w-80 bg-white shadow-xl">

        {/* Başlık */}

        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-lg font-bold">
            Menü
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Menüyü Kapat"
          >
            <X />
          </button>
        </div>

        {/* Menü Listesi */}

        <nav className="flex flex-col">

          {menuItems.map((item) => {

            /*
             * ------------------------------------------------
             * SECTION
             * ------------------------------------------------
             */

            if (
              item.item_type ===
              "section"
            ) {
              return (
                <a
                  key={item.id}
                  href={item.path}
                  onClick={(e) =>
                    handleSectionClick(
                      e,
                      item.path
                    )
                  }
                  className="border-b px-6 py-4 transition hover:bg-slate-100"
                >
                  {item.title}
                </a>
              );
            }

            /*
             * ------------------------------------------------
             * HARİCİ BAĞLANTI
             * ------------------------------------------------
             */

            if (
              item.item_type ===
              "external"
            ) {
              return (
                <a
                  key={item.id}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="border-b px-6 py-4 transition hover:bg-slate-100"
                >
                  {item.title}
                </a>
              );
            }

            /*
             * ------------------------------------------------
             * NORMAL ROUTE
             * ------------------------------------------------
             */

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onClose();
                  navigate(item.path);
                }}
                className="border-b px-6 py-4 text-left transition hover:bg-slate-100"
              >
                {item.title}
              </button>
            );
          })}

        </nav>
      </aside>
    </>
  );
};

export default MobileMenu;