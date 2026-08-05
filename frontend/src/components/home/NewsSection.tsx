import { motion } from "framer-motion";
import { ArrowRight, CalendarDays } from "lucide-react";

import ContentModal from "../common/ContentModal/ContentModal";
import { useEffect, useState } from "react";
import api from "../../services/api";

const NewsSection = () => {
  const [news, setNews] = useState<any[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const response = await api.get("/news/?published=true");
      
      const data = response.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        category: item.category,
        date: item.published_at
          ? new Date(item.published_at).toLocaleDateString("tr-TR")
          : "",
        image: item.image
          ? `http://127.0.0.1:8000${item.image}`
          : "/images/news/default.jpg",
        excerpt: item.summary,
        content: item.content,
      }));

      // Verileri ID'ye göre büyükten küçüğe sıralıyoruz.
      const sortedData = data.sort((a: any, b: any) => b.id - a.id);
      
      setNews(sortedData);
    } catch (err) {
      console.error(err);
    }
  };

  const featured = news.length > 0 ? news[0] : null;
  const smallNews = news.slice(1, 5);

  if (news.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-xl text-slate-500">
        Haber yükleniyor veya henüz haber eklenmemiş...
      </div>
    );
  }

  return (
    <>
      <section
        id="haberler"
        className="flex min-h-[650px] flex-col justify-center overflow-hidden bg-[#FAFBFF] py-10 lg:py-16"
      >
        <div className="mx-auto flex h-full w-full max-w-7xl flex-col px-4 lg:px-6">
          
          {/* HEADER ALANI */}
          <div className="mb-6 flex shrink-0 flex-col gap-4 md:flex-row md:items-end md:justify-between lg:mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-[3px] text-blue-600">
                SON HABERLER
              </span>
              <h2 className="mt-2 text-2xl font-black text-slate-900 lg:text-4xl">
                Güncel Gelişmeler
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500 lg:text-base">
                Onikişubat Belediyesi tarafından gerçekleştirilen çalışmalar,
                etkinlikler ve duyuruları yakından takip edin.
              </p>
            </div>

            <button className="group flex w-max items-center gap-2 rounded-full border border-blue-200 bg-white px-5 py-2.5 text-sm font-semibold text-blue-600 transition-all hover:border-blue-600 hover:bg-blue-600 hover:text-white lg:px-6 lg:py-3">
              Tüm Haberler
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>

          {/* KARTLARIN GRID ALANI */}
          <div className="grid min-h-[500px] flex-1 gap-4 lg:grid-cols-4 lg:gap-6">
            
            {/* SOL BÜYÜK KART (FEATURED) */}
            {featured && (
              <motion.article
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group relative w-full overflow-hidden rounded-[32px] lg:col-span-2 lg:h-[560px]"
              >
                {/* En alt katman: Resim (z-0) */}
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Orta katman: Gradyan (z-10) */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Üst katman: İçerik (z-20) */}
                <div className="absolute bottom-0 left-0 z-20 flex flex-col justify-end p-6 lg:p-8">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="inline-flex rounded-full bg-blue-600 px-3 py-1 text-[11px] font-bold text-white shadow-sm lg:text-xs">
                      {featured.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-white/90">
                      <CalendarDays size={14} />
                      <span className="text-[11px] font-medium lg:text-xs">
                        {featured.date}
                      </span>
                    </div>
                  </div>

                  <h3 className="mb-2 text-2xl font-black leading-tight text-white lg:text-[32px]">
                    {featured.title}
                  </h3>

                  <p className="mb-5 line-clamp-2 max-w-xl text-sm leading-relaxed text-white/80 lg:text-base">
                    {featured.excerpt}
                  </p>

                  <button
                    onClick={() => {
                      setCurrentIndex(0);
                      setIsModalOpen(true);
                    }}
                    className="group/btn inline-flex w-max items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-slate-100 lg:px-6 lg:py-3"
                  >
                    Devamını Oku
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover/btn:translate-x-1"
                    />
                  </button>
                </div>
              </motion.article>
            )}

            {/* SAĞ KÜÇÜK KARTLAR (4'LÜ GRID) */}
            <div className="grid h-[560px] grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-2 lg:grid-rows-2">
              {smallNews.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group flex h-[270px] flex-col overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
                >
                  {/* Küçük Kart Görseli */}
                  <div className="relative h-[135px] shrink-0 overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Görsel Üzeri Rozet */}
                    <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-bold text-white shadow-md">
                      {item.category}
                    </span>
                  </div>

                  {/* Küçük Kart Metin Alanı */}
                  <div className="flex h-[135px] flex-col p-4">
                    <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-slate-400">
                      <CalendarDays size={14} />
                      <span>{item.date}</span>
                    </div>

                    <h3 className="mb-2 line-clamp-2 text-[15px] font-bold leading-5 text-slate-900 transition-colors group-hover:text-blue-600">
                      {item.title}
                    </h3>

                    <p className="mb-auto line-clamp-2 text-[12px] leading-5 text-slate-500">
                      {item.excerpt}
                    </p>

                    <button
                      onClick={() => {
                        setCurrentIndex(index + 1);
                        setIsModalOpen(true);
                      }}
                      className="group/smallbtn mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-blue-600"
                    >
                      Devamını Oku
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover/smallbtn:translate-x-1"
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