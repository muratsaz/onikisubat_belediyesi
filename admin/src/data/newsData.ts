export interface News {
  id: number;
  title: string;
  category: string;
  status: "Yayında" | "Taslak";
  author: string;
  publishDate: string;
}

export const newsData: News[] = [
  {
    id: 1,
    title: "Yeni Millet Bahçesi Projesi Başladı",
    category: "Projeler",
    status: "Yayında",
    author: "Admin",
    publishDate: "04.08.2026",
  },
  {
    id: 2,
    title: "Asfalt Çalışmaları Devam Ediyor",
    category: "Fen İşleri",
    status: "Yayında",
    author: "Admin",
    publishDate: "03.08.2026",
  },
  {
    id: 3,
    title: "Spor Kompleksi Açılışı",
    category: "Spor",
    status: "Taslak",
    author: "Editör",
    publishDate: "02.08.2026",
  },
];