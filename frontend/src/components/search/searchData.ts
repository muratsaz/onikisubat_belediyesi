export interface SearchItem {
  id: number;
  title: string;
  category: string;
  description: string;
  path: string;
  keywords: string[];
}

export const searchData: SearchItem[] = [
  // ---------------- HABERLER ----------------

  {
    id: 1,
    title: "Yeni Millet Bahçesi Projesi",
    category: "Haber",
    description: "Millet bahçesi çalışmaları hızla devam ediyor.",
    path: "/haberler/1",
    keywords: [
      "millet",
      "bahçe",
      "park",
      "yeşil alan",
      "haber",
      "proje",
    ],
  },

  {
    id: 2,
    title: "Asfalt Çalışmaları Başladı",
    category: "Haber",
    description: "İlçe genelinde asfalt çalışmaları başladı.",
    path: "/haberler/2",
    keywords: [
      "asfalt",
      "yol",
      "kaldırım",
      "fen işleri",
      "ulaşım",
    ],
  },

  // ---------------- DUYURULAR ----------------

  {
    id: 20,
    title: "Su Kesintisi Duyurusu",
    category: "Duyuru",
    description: "Planlı su kesintisi hakkında bilgilendirme.",
    path: "/duyurular",
    keywords: [
      "su",
      "kesinti",
      "arıza",
      "duyuru",
      "kaski",
    ],
  },

  // ---------------- İHALELER ----------------

  {
    id: 30,
    title: "Çevre Düzenleme Yapım İşi",
    category: "İhale",
    description: "Fen İşleri Müdürlüğü",
    path: "/ihaleler/1",
    keywords: [
      "ihale",
      "çevre",
      "fen işleri",
      "yapım",
      "park",
    ],
  },

  // ---------------- PROJELER ----------------

  {
    id: 40,
    title: "Akıllı Kavşak Projesi",
    category: "Proje",
    description: "Akıllı şehir uygulamaları.",
    path: "/projeler/1",
    keywords: [
      "akıllı şehir",
      "trafik",
      "kavşak",
      "ulaşım",
      "proje",
    ],
  },

  // ---------------- KURUMSAL ----------------

  {
    id: 50,
    title: "Başkan",
    category: "Kurumsal",
    description: "Belediye Başkanı",
    path: "/kurumsal/baskan",
    keywords: [
      "başkan",
      "belediye başkanı",
      "yönetim",
    ],
  },

  {
    id: 51,
    title: "Başkan Yardımcıları",
    category: "Kurumsal",
    description: "Başkan yardımcıları",
    path: "/kurumsal/baskan-yardimcilari",
    keywords: [
      "başkan yardımcısı",
      "yönetim",
    ],
  },

  {
    id: 52,
    title: "Meclis Üyeleri",
    category: "Kurumsal",
    description: "Belediye Meclisi",
    path: "/kurumsal/meclis-uyeleri",
    keywords: [
      "meclis",
      "encümen",
      "üyeler",
    ],
  },

  {
    id: 53,
    title: "Müdürlükler",
    category: "Kurumsal",
    description: "Belediye Müdürlükleri",
    path: "/kurumsal/mudurlukler",
    keywords: [
      "fen işleri",
      "zabıta",
      "park bahçeler",
      "temizlik işleri",
      "müdürlük",
    ],
  },

  {
    id: 54,
    title: "Organizasyon Şeması",
    category: "Kurumsal",
    description: "Kurumsal organizasyon yapısı",
    path: "/kurumsal/organizasyon-semasi",
    keywords: [
      "organizasyon",
      "şema",
      "kurumsal",
    ],
  },

  {
    id: 55,
    title: "Misyon ve Vizyon",
    category: "Kurumsal",
    description: "Kurumsal misyon ve vizyon",
    path: "/kurumsal/misyon-vizyon",
    keywords: [
      "misyon",
      "vizyon",
      "kurumsal",
    ],
  },

  // ---------------- İLETİŞİM ----------------

  {
    id: 70,
    title: "İletişim",
    category: "İletişim",
    description: "Telefon, adres ve e-posta bilgileri",
    path: "/iletisim",
    keywords: [
      "telefon",
      "adres",
      "mail",
      "harita",
      "ulaşım",
      "konum",
    ],
  },

  // ---------------- E-BELEDİYE ----------------

  {
    id: 80,
    title: "Vergi Borcu Sorgulama",
    category: "E-Belediye",
    description: "Online vergi borcu sorgulama",
    path: "/e-belediye",
    keywords: [
      "vergi",
      "borç",
      "ödeme",
      "emlak",
      "çtv",
    ],
  },

  {
    id: 81,
    title: "Online Ödeme",
    category: "E-Belediye",
    description: "Belediye ödemelerini internetten yapın",
    path: "/e-belediye",
    keywords: [
      "ödeme",
      "kredi kartı",
      "borç",
      "online",
    ],
  },

  {
    id: 82,
    title: "İmar Durumu",
    category: "E-Belediye",
    description: "İmar durumu sorgulama",
    path: "/e-belediye",
    keywords: [
      "imar",
      "arsa",
      "ruhsat",
      "plan",
      "yapı",
    ],
  },

  {
    id: 83,
    title: "Evrak Doğrulama",
    category: "E-Belediye",
    description: "Belge doğrulama sistemi",
    path: "/e-belediye",
    keywords: [
      "evrak",
      "belge",
      "doğrulama",
      "qr",
    ],
  },

  {
    id: 84,
    title: "Beyaz Masa",
    category: "E-Belediye",
    description: "Talep ve şikayet başvuruları",
    path: "/e-belediye",
    keywords: [
      "şikayet",
      "talep",
      "başvuru",
      "beyaz masa",
    ],
  },

  {
    id: 85,
    title: "Rayiç Değer Sorgulama",
    category: "E-Belediye",
    description: "Rayiç değer bilgileri",
    path: "/e-belediye",
    keywords: [
      "rayiç",
      "arsa",
      "emlak",
      "değer",
    ],
  },
];