import { motion } from "framer-motion";
import { ArrowRight, CalendarDays } from "lucide-react";
import { useState } from "react";
import ContentModal from "../common/ContentModal/ContentModal";

const news = [
  {
    id: 1,
    title: "Yeni Millet Bahçesi Projesinde Çalışmalar Hızla Devam Ediyor",
    category: "Projeler",
    date: "28 Temmuz 2026",
    image: "/images/news/news1.jpg",
    excerpt: "..",
    content:
      "Buraya yönetim panelinden gelecek uzun haber içeriği yazılacaktır. Şimdilik örnek metindir. Daha sonra FastAPI üzerinden gelecek.",
  },
  {
    id: 2,
    title: "Yeni Park Vatandaşların Hizmetine Açıldı",
    category: "Yaşam",
    date: "25 Temmuz 2026",
    image: "/images/news/news2.jpg",
    excerpt:
      "Modern oyun alanları ve yeşil yaşam alanlarıyla yeni park hizmete açıldı.",
  },
  {
    id: 3,
    title: "Yaz Spor Okulları Başlıyor",
    category: "Spor",
    date: "21 Temmuz 2026",
    image: "/images/news/news3.jpg",
    excerpt: "Çocuklara yönelik ücretsiz spor eğitimleri başlıyor.",
  },
  {
    id: 4,
    title: "Yeni Yol Çalışmaları Tamamlandı",
    category: "Ulaşım",
    date: "18 Temmuz 2026",
    image: "/images/news/news4.jpg",
    excerpt:
      "İlçedeki ulaşımı rahatlatacak yeni yol vatandaşların kullanımına açıldı.",
  },
  {
    id: 5,
    title: "Sokak Hayvanları Rehabilitasyon Merkezi Hizmete Açıldı",
    category: "Sosyal",
    date: "15 Temmuz 2026",
    image: "/images/news/news5.jpg",
    excerpt:
      "Yeni merkez ile sokak hayvanlarının bakım ve tedavi süreçleri daha etkin yürütülecek.",
  },
];

const featured = news[0];
const smallNews = news.slice(1, 5);

const NewsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <section
      id="haberler"
       className="flex h-[calc(100vh-80px)] min-h-[420px] flex-col justify-center overflow-hidden bg-slate-50 py-2 lg:py-3">
        <div className="mx-auto flex h-full max-h-[750px] w-full max-w-7xl flex-col px-4 lg:px-6">
          <div className="mb-2 flex shrink-0 flex-col gap-1 md:flex-row md:items-end md:justify-between lg:mb-3 lg:gap-2">
            <div>
              <span className="text-[9px] font-semibold uppercase tracking-[2px] text-blue-600 lg:text-[10px] lg:tracking-[3px]">
                SON HABERLER
              </span>
              <h2 className="mt-0.5 text-lg font-black text-slate-900 lg:mt-1 lg:text-2xl">
                Güncel Gelişmeler
              </h2>
              <p className="mt-0.5 max-w-2xl text-[10px] leading-snug text-slate-600 lg:mt-1 lg:text-[11px]">
                Onikişubat Belediyesi tarafından gerçekleştirilen çalışmalar,
                etkinlikler ve duyuruları yakından takip edin.
              </p>
            </div>

            <button className="group flex w-max items-center gap-1.5 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-[10px] font-semibold text-blue-600 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white lg:px-4 lg:py-2 lg:text-[11px]">
              Tüm Haberler
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>

          <div className="grid min-h-0 flex-1 gap-2 lg:grid-cols-4 lg:gap-3">
            <motion.article
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative h-full overflow-hidden rounded-[20px] lg:col-span-2"
            >
              <img
                src={featured.image}
                alt={featured.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 lg:p-5">
                <div className="flex items-center gap-2">
                  <span className="inline-flex rounded-full bg-blue-600 px-2.5 py-1 text-[9px] font-semibold text-white lg:px-3 lg:py-1 lg:text-[10px]">
                    {featured.category}
                  </span>

                  <div className="flex items-center gap-1 text-white/80">
                    <CalendarDays size={12} />
                    <span className="text-[9px] lg:text-[10px]">
                      {featured.date}
                    </span>
                  </div>
                </div>

                <h3 className="mt-1.5 text-lg font-black leading-tight text-white lg:mt-2 lg:text-2xl">
                  {featured.title}
                </h3>

                <p className="mt-1 line-clamp-2 max-w-lg text-[10px] leading-relaxed text-white/90 lg:mt-1.5 lg:text-[11px]">
                  {featured.excerpt}
                </p>

                <button
                  onClick={() => {
  setCurrentIndex(0);
  setIsModalOpen(true);
}}
                  className="group mt-2 inline-flex w-max items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-slate-900 transition hover:bg-blue-600 hover:text-white lg:mt-3 lg:px-4 lg:py-2 lg:text-[11px]"
                >
                  Devamını Oku
                  <ArrowRight
                    size={14}
                    className="transition group-hover:translate-x-1"
                  />
                </button>
              </div>
            </motion.article>

            <div className="grid h-full grid-cols-1 grid-rows-4 gap-2 lg:col-span-2 lg:grid-cols-2 lg:grid-rows-2 lg:gap-3">
              {smallNews.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group flex h-full w-full flex-col overflow-hidden rounded-[16px] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:rounded-[20px]"
                >
                  <div className="relative h-[35%] shrink-0 overflow-hidden lg:h-[38%]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-2 top-2 rounded-full bg-blue-600 px-2 py-0.5 text-[8px] font-semibold text-white lg:left-2.5 lg:top-2.5 lg:px-2 lg:py-1 lg:text-[9px]">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-2.5 lg:p-3">
                    <div className="flex items-center gap-1 text-[8px] text-slate-500 lg:text-[9px]">
                      <CalendarDays size={10} />
                      <span>{item.date}</span>
                    </div>

                    <h3 className="mt-1 line-clamp-2 text-[11px] font-bold leading-tight text-slate-900 transition-colors group-hover:text-blue-600 lg:mt-1 lg:text-[12px]">
                      {item.title}
                    </h3>

                    <p className="mt-0.5 line-clamp-1 text-[9px] text-slate-600 lg:mt-1 lg:text-[10px]">
                      {item.excerpt}
                    </p>

                    <button
                      onClick={() => {
  setCurrentIndex(index + 1);
  setIsModalOpen(true);
}}
                      className="group/btn mt-auto inline-flex items-center gap-1 pt-1 text-[9px] font-semibold text-blue-600 lg:text-[10px]"
                    >
                      Devamını Oku
                      <ArrowRight
                        size={12}
                        className="transition-transform duration-300 group-hover/btn:translate-x-1"
                      />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

     <ContentModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  news={news}
  currentIndex={currentIndex}
  onNavigate={setCurrentIndex}
/>
    </>
  );
};

export default NewsSection;