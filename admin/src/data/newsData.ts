export interface News {
  id: number;
  title: string;
  summary: string;
  content: string;
  category: string;
  status: "Yayında" | "Taslak";
  author: string;
  publishDate: string;
  image: string ;
  slug: string;
}

export const newsData: News[] = [
  {
    id: 1,
    title: "Yeni Millet Bahçesi Projesi Başladı",
    summary:
      "Onikişubat Belediyesi tarafından hayata geçirilen yeni millet bahçesi projesinde çalışmalar başladı.",
    content:
      "Onikişubat Belediyesi tarafından hayata geçirilen yeni millet bahçesi projesinde çalışmalar tüm hızıyla devam ediyor. Proje tamamlandığında vatandaşlarımız modern sosyal yaşam alanına kavuşacak.",
    category: "Projeler",
    status: "Yayında",
    author: "Admin",
    publishDate: "04.08.2026",
    image: "",
    slug: "yeni-millet-bahcesi-projesi-basladi",
  },
  {
    id: 2,
    title: "Asfalt Çalışmaları Devam Ediyor",
    summary:
      "İlçe genelinde asfalt yenileme çalışmaları aralıksız devam ediyor.",
    content:
      "Fen İşleri Müdürlüğü ekipleri tarafından yürütülen asfalt yenileme çalışmaları planlanan program doğrultusunda devam ediyor.",
    category: "Fen İşleri",
    status: "Yayında",
    author: "Admin",
    publishDate: "03.08.2026",
    image: "",
    slug: "asfalt-calismalari-devam-ediyor",
  },
  {
    id: 3,
    title: "Spor Kompleksi Açılışı",
    summary:
      "Yeni spor kompleksi çok yakında vatandaşların hizmetine açılıyor.",
    content:
      "Onikişubat Belediyesi tarafından yapımı tamamlanan spor kompleksi yakında hizmete açılacak. Tesiste birçok spor branşı için alan bulunuyor.",
    category: "Spor",
    status: "Taslak",
    author: "Editör",
    publishDate: "02.08.2026",
    image: "",
    slug: "spor-kompleksi-acilisi",
  },
];