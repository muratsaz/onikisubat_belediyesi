export interface NavigationItem {
  title: string;
  path: string;
}

export const navigationItems: NavigationItem[] = [
  {
    title: "Ana Sayfa",
    path: "/",
  },
  {
    title: "Kurumsal",
    path: "/kurumsal",
  },
  {
    title: "Haberler",
    path: "/haberler",
  },
  {
    title: "Duyurular",
    path: "/duyurular",
  },
  {
    title: "İhaleler",
    path: "/ihaleler",
  },
  {
    title: "Projeler",
    path: "/projeler",
  },
  {
    title: "Hizmetler",
    path: "/hizmetler",
  },
  {
    title: "İletişim",
    path: "/iletisim",
  },
];

export const kurumsalItems: NavigationItem[] = [
  {
    title: "Başkan",
    path: "/kurumsal/baskan",
  },
  {
    title: "Başkan Yardımcıları",
    path: "/kurumsal/baskan-yardimcilari",
  },
  {
    title: "Meclis Üyeleri",
    path: "/kurumsal/meclis-uyeleri",
  },
  {
    title: "Müdürlükler",
    path: "/kurumsal/mudurlukler",
  },
  {
    title: "Organizasyon Şeması",
    path: "/kurumsal/organizasyon-semasi",
  },
  {
    title: "Misyon & Vizyon",
    path: "/kurumsal/misyon-vizyon",
  },
];