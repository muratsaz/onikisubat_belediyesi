import {
  useNavigate,
  useLocation,
  NavLink,
} from "react-router-dom";

import { useEffect, useState } from "react";

import { Menu, Search } from "lucide-react";

import SearchModal from "../search/SearchModal";
import MobileMenu from "./MobileMenu";
import DropdownMenu from "./DropdownMenu";

import {
  getNavigation,
  type Navigation,
} from "../../services/navigationService";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const [navigationItems, setNavigationItems] = useState<
    Navigation[]
  >([]);

  const navigate = useNavigate();
  const location = useLocation();

  /*
   * -------------------------------------------------------
   * NAVIGATION VERİLERİNİ AL
   * -------------------------------------------------------
   */

  useEffect(() => {
    const loadNavigation = async () => {
      try {
        const data = await getNavigation();

        setNavigationItems(
          data
            .filter((item) => item.is_active)
            .sort(
              (a, b) =>
                a.display_order - b.display_order
            )
        );
      } catch (error) {
        console.error(
          "Navigasyon menüsü alınamadı:",
          error
        );
      }
    };

    loadNavigation();
  }, []);

  /*
   * -------------------------------------------------------
   * SECTION ID BUL
   * -------------------------------------------------------
   *
   * Örnek:
   *
   * /#baskan
   *     ↓
   * baskan
   *
   * /#haberler
   *     ↓
   * haberler
   *
   * /iletisim
   *     ↓
   * section değildir, normal route olarak çalışır.
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
   * SECTION SCROLL
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
   * SECTION MENÜ TIKLAMA
   * -------------------------------------------------------
   *
   * /#baskan
   *      → Başkan bölümüne scroll
   *
   * /#haberler
   *      → Haberler bölümüne scroll
   *
   * /#announcements
   *      → Duyurular bölümüne scroll
   *
   * /iletisim
   *      → İletişim sayfasına gider
   */

  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    e.preventDefault();

    const sectionId = getSectionId(path);

    /*
     * Gerçek bir section ise
     */
    if (sectionId) {
      /*
       * Zaten ana sayfadaysak
       * direkt scroll yap.
       */
      if (location.pathname === "/") {
        scrollToSection(sectionId);

        window.history.replaceState(
          null,
          "",
          `/#${sectionId}`
        );

        return;
      }

      /*
       * Başka sayfadaysak önce ana sayfaya git.
       *
       * Ana sayfa açıldığında aşağıdaki useEffect
       * hash'i okuyup section'a scroll eder.
       */
      navigate(`/#${sectionId}`);

      return;
    }

    /*
     * Section değilse normal route.
     *
     * Örneğin:
     *
     * /iletisim
     */

    navigate(path);
  };

  /*
   * -------------------------------------------------------
   * URL HASH DEĞİŞTİĞİNDE SECTION'A KAYDIR
   * -------------------------------------------------------
   *
   * Örneğin başka bir sayfadan:
   *
   * /#baskan
   *
   * ile ana sayfaya geldiğimizde Başkan bölümüne
   * otomatik olarak scroll eder.
   *
   * Başkan bölümü API'den geldiği için biraz geç
   * oluşabileceğinden birkaç kez kontrol ediyoruz.
   */

  useEffect(() => {
    if (location.pathname !== "/") {
      return;
    }

    if (!location.hash) {
      return;
    }

    const sectionId =
      location.hash.replace("#", "");

    const tryScroll = () => {
      const element =
        document.getElementById(sectionId);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        return true;
      }

      return false;
    };

    /*
     * İlk deneme
     */
    const timeout = window.setTimeout(() => {
      tryScroll();
    }, 100);

    /*
     * API verilerinin yüklenmesi ihtimaline karşı
     */
    const timeout2 = window.setTimeout(() => {
      tryScroll();
    }, 500);

    /*
     * Son güvenlik denemesi
     */
    const timeout3 = window.setTimeout(() => {
      tryScroll();
    }, 1000);

    return () => {
      window.clearTimeout(timeout);
      window.clearTimeout(timeout2);
      window.clearTimeout(timeout3);
    };
  }, [
    location.pathname,
    location.hash,
  ]);

  /*
   * -------------------------------------------------------
   * ANA MENÜLER
   * -------------------------------------------------------
   */

  const mainItems =
    navigationItems.filter(
      (item) => item.parent_id === null
    );

  /*
   * -------------------------------------------------------
   * ALT MENÜLER
   * -------------------------------------------------------
   */

  const getChildren = (
    parentId: number
  ) => {
    return navigationItems
      .filter(
        (item) =>
          item.parent_id === parentId
      )
      .sort(
        (a, b) =>
          a.display_order -
          b.display_order
      );
  };

  /*
   * -------------------------------------------------------
   * ANA SAYFA
   * -------------------------------------------------------
   *
   * Ana sayfaya basıldığında:
   *
   * 1. Yeni sekme açılmaz.
   * 2. React Router ile sadece route değiştirilmez.
   * 3. Tarayıcı gerçek bir sayfa yenilemesi yapar.
   *
   * Böylece F5 atılmış gibi uygulama baştan yüklenir.
   */

  const handleHomeClick = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();

    window.location.href = "/";
  };

  return (
    <>
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">

          {/* Logo + Menü */}

          <div className="flex items-center gap-8 lg:gap-12">

            {/* Logo */}

            <NavLink
              to="/"
              className="flex items-center gap-3"
            >
              <img
                src="/images/logos/logo.png"
                alt="Onikişubat Belediyesi"
                className="h-14 w-auto"
              />
            </NavLink>

            {/* Desktop Menü */}

            <ul className="hidden items-center gap-6 lg:flex xl:gap-8">

              {mainItems.map((item) => {

                /*
                 * ------------------------------------------------
                 * ANA SAYFA
                 * ------------------------------------------------
                 */

                if (
                  item.path === "/" ||
                  item.title === "Ana sayfa"
                ) {
                  return (
                    <li key={item.id}>
                      <a
                        href="/"
                        onClick={handleHomeClick}
                        className="font-medium text-slate-700 transition duration-200 hover:text-blue-600"
                      >
                        {item.title}
                      </a>
                    </li>
                  );
                }

                const children =
                  getChildren(item.id);

                /*
                 * ------------------------------------------------
                 * ALT MENÜSÜ OLAN MENÜLER
                 * ------------------------------------------------
                 *
                 * Örneğin:
                 *
                 * Kurumsal
                 *   ├─ Başkan
                 *   ├─ Başkan Yardımcıları
                 *   ├─ Meclis Üyeleri
                 *   └─ Müdürlüklerimiz
                 */

                if (
                  children.length > 0
                ) {
                  return (
                    <DropdownMenu
                      key={item.id}
                      title={item.title}
                      items={children.map(
                        (child) => ({
                          title:
                            child.title,
                          path:
                            child.path,
                        })
                      )}
                    />
                  );
                }

                /*
                 * ------------------------------------------------
                 * SECTION VE NORMAL SAYFA
                 * ------------------------------------------------
                 *
                 * /#baskan
                 *      → scroll
                 *
                 * /#haberler
                 *      → scroll
                 *
                 * /#announcements
                 *      → scroll
                 *
                 * /iletisim
                 *      → normal sayfa
                 */

                if (
                  item.item_type ===
                  "section"
                ) {
                  return (
                    <li
                      key={item.id}
                    >
                      <a
                        href={item.path}
                        onClick={(e) =>
                          handleSectionClick(
                            e,
                            item.path
                          )
                        }
                        className="font-medium text-slate-700 transition duration-200 hover:text-blue-600"
                      >
                        {item.title}
                      </a>
                    </li>
                  );
                }

                /*
                 * ------------------------------------------------
                 * HARİCİ BAĞLANTI
                 * ------------------------------------------------
                 *
                 * Sadece gerçekten harici bir bağlantı
                 * olduğunda yeni sekmede açılır.
                 *
                 * Ana sayfa artık buraya düşmez çünkü
                 * yukarıda özel olarak yakalanıyor.
                 */

                if (
                  item.item_type ===
                  "external"
                ) {
                  return (
                    <li
                      key={item.id}
                    >
                      <a
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-slate-700 transition duration-200 hover:text-blue-600"
                      >
                        {item.title}
                      </a>
                    </li>
                  );
                }

                /*
                 * ------------------------------------------------
                 * NORMAL SAYFA / ROUTE
                 * ------------------------------------------------
                 */

                return (
                  <li
                    key={item.id}
                  >
                    <NavLink
                      to={item.path}
                      className={({
                        isActive,
                      }) =>
                        [
                          "font-medium transition duration-200",
                          "hover:text-blue-600",
                          isActive
                            ? "text-blue-700"
                            : "text-slate-700",
                        ].join(" ")
                      }
                    >
                      {item.title}
                    </NavLink>
                  </li>
                );
              })}

            </ul>
          </div>

          {/* Sağ Taraf */}

          <div className="flex items-center gap-3">

            {/* Arama */}

            <button
              onClick={() =>
                setSearchOpen(true)
              }
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
              onClick={() =>
                setMobileOpen(true)
              }
              aria-label="Menüyü Aç"
            >
              <Menu size={22} />
            </button>

          </div>
        </div>
      </nav>

      {/* Mobil Menü */}

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() =>
          setMobileOpen(false)
        }
      />

      {/* Arama Modalı */}

      <SearchModal
        open={searchOpen}
        onClose={() =>
          setSearchOpen(false)
        }
      />
    </>
  );
};

export default Navbar;