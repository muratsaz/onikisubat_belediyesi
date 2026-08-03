export interface Project {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  status: "Devam Ediyor" | "Tamamlandı";
  location: string;
  startDate: string;
  endDate: string;
  budget: string;
  progress: number;
  coverImage: string;
  images: string[];
}

export const projectData: Project[] = [
  {
    id: 1,
    title: "Millet Bahçesi Projesi",
    shortDescription:
      "Şehrimize yeni sosyal yaşam alanı kazandırılıyor.",
    description:
      "Millet Bahçesi Projesi kapsamında yürüyüş yolları, bisiklet yolları, çocuk oyun alanları, spor sahaları, sosyal donatılar ve geniş yeşil alanlar oluşturulmaktadır.",
    category: "Park ve Bahçe",
    status: "Devam Ediyor",
    location: "Onikişubat",
    startDate: "12 Mart 2026",
    endDate: "30 Kasım 2026",
    budget: "125.000.000 ₺",
    progress: 65,
    coverImage: "/images/projects/project1.jpg",
    images: [
      "/images/projects/project1.jpg",
      "/images/projects/project1-2.jpg",
      "/images/projects/project1-3.jpg",
      "/images/projects/project1-4.jpg",
    ],
  },
  {
    id: 2,
    title: "Akıllı Kavşak Sistemi",
    shortDescription:
      "Trafik yoğunluğunu azaltacak yeni nesil kavşak sistemi.",
    description:
      "Şehir içi ulaşımı rahatlatmak amacıyla sinyalizasyon sistemi yenilenmekte ve akıllı kavşak altyapısı kurulmaktadır.",
    category: "Ulaşım",
    status: "Devam Ediyor",
    location: "Onikişubat",
    startDate: "03 Ocak 2026",
    endDate: "18 Ağustos 2026",
    budget: "42.000.000 ₺",
    progress: 80,
    coverImage: "/images/projects/project2.jpg",
    images: [
      "/images/projects/project2.jpg",
      "/images/projects/project2-2.jpg",
      "/images/projects/project2-3.jpg",
    ],
  },
  {
    id: 3,
    title: "Gençlik Merkezi",
    shortDescription:
      "Gençlere yönelik modern yaşam ve eğitim merkezi.",
    description:
      "Kütüphane, etüt salonları, konferans salonu ve sosyal alanlardan oluşan yeni gençlik merkezi yapılmaktadır.",
    category: "Sosyal",
    status: "Devam Ediyor",
    location: "Onikişubat",
    startDate: "20 Şubat 2026",
    endDate: "12 Aralık 2026",
    budget: "73.500.000 ₺",
    progress: 45,
    coverImage: "/images/projects/project3.jpg",
    images: [
      "/images/projects/project3.jpg",
      "/images/projects/project3-2.jpg",
      "/images/projects/project3-3.jpg",
    ],
  },
  {
    id: 4,
    title: "Bisiklet Yolu Projesi",
    shortDescription:
      "Şehir genelinde yeni bisiklet yolları oluşturuluyor.",
    description:
      "Çevreci ulaşımı desteklemek amacıyla yeni bisiklet yolları ve dinlenme alanları yapılmaktadır.",
    category: "Ulaşım",
    status: "Tamamlandı",
    location: "Onikişubat",
    startDate: "15 Mayıs 2025",
    endDate: "10 Şubat 2026",
    budget: "21.000.000 ₺",
    progress: 100,
    coverImage: "/images/projects/project4.jpg",
    images: [
      "/images/projects/project4.jpg",
      "/images/projects/project4-2.jpg",
    ],
  },
  {
    id: 5,
    title: "Kent Meydanı Düzenlemesi",
    shortDescription:
      "Modern kent meydanı ve çevre düzenleme çalışmaları.",
    description:
      "Kent merkezinin estetik görünümünü artıracak peyzaj ve çevre düzenleme çalışmaları tamamlanmaktadır.",
    category: "Çevre",
    status: "Devam Ediyor",
    location: "Merkez",
    startDate: "08 Nisan 2026",
    endDate: "20 Aralık 2026",
    budget: "58.000.000 ₺",
    progress: 35,
    coverImage: "/images/projects/project5.jpg",
    images: [
      "/images/projects/project5.jpg",
      "/images/projects/project5-2.jpg",
    ],
  },
  {
    id: 6,
    title: "Kapalı Spor Salonu",
    shortDescription:
      "Uluslararası standartlarda spor kompleksi.",
    description:
      "Basketbol, voleybol ve birçok branşa hizmet verecek modern spor kompleksi inşa edilmektedir.",
    category: "Spor",
    status: "Tamamlandı",
    location: "Tekerek",
    startDate: "18 Ağustos 2025",
    endDate: "05 Mart 2026",
    budget: "88.000.000 ₺",
    progress: 100,
    coverImage: "/images/projects/project6.jpg",
    images: [
      "/images/projects/project6.jpg",
      "/images/projects/project6-2.jpg",
      "/images/projects/project6-3.jpg",
    ],
  },
];