export interface SearchItem {
  id: number;
  title: string;
  category: string;
  description: string;
  path: string;
}

export const searchData: SearchItem[] = [
  // Haberler
  {
    id: 1,
    title: "Yeni Millet Bahçesi Projesi",
    category: "Haber",
    description: "Millet bahçesi çalışmaları hızla devam ediyor.",
    path: "/haberler/1",
  },
  {
    id: 2,
    title: "Asfalt Çalışmaları Başladı",
    category: "Haber",
    description: "İlçe genelinde asfalt çalışmaları başladı.",
    path: "/haberler/2",
  },

  // Duyurular
  {
    id: 20,
    title: "Su Kesintisi Duyurusu",
    category: "Duyuru",
    description: "Planlı su kesintisi hakkında bilgilendirme.",
    path: "/duyurular",
  },

  // İhaleler
  {
    id: 30,
    title: "Çevre Düzenleme Yapım İşi",
    category: "İhale",
    description: "Fen İşleri Müdürlüğü",
    path: "/ihaleler/1",
  },

  // Projeler
  {
    id: 40,
    title: "Akıllı Kavşak Projesi",
    category: "Proje",
    description: "Akıllı şehir uygulamaları.",
    path: "/projeler/1",
  },

  // Kurumsal
  {
    id: 50,
    title: "Başkan",
    category: "Kurumsal",
    description: "Belediye Başkanı",
    path: "/kurumsal/baskan",
  },

  {
    id: 51,
    title: "Müdürlükler",
    category: "Kurumsal",
    description: "Belediye Müdürlükleri",
    path: "/kurumsal/mudurlukler",
  },

  // E-Belediye
  {
    id: 60,
    title: "Vergi Borcu Sorgulama",
    category: "E-Belediye",
    description: "Online borç sorgulama hizmeti.",
    path: "/e-belediye",
  },

  {
    id: 61,
    title: "Online Ödeme",
    category: "E-Belediye",
    description: "Online ödeme sistemi.",
    path: "/e-belediye",
  },
];