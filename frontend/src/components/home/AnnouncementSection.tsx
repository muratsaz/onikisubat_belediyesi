import { motion } from "framer-motion";
import { Bell, ArrowRight } from "lucide-react";

const announcements = [
  {
    id: 1,
    title: "Su Kesintisi Duyurusu",
    date: "27 Temmuz 2026",
  },
  {
    id: 2,
    title: "Emlak Vergisi Son Ödeme Tarihi",
    date: "24 Temmuz 2026",
  },
  {
    id: 3,
    title: "Kurban Pazarı Bilgilendirmesi",
    date: "20 Temmuz 2026",
  },
  {
    id: 4,
    title: "Yol Bakım Çalışmaları",
    date: "18 Temmuz 2026",
  },
];

const AnnouncementSection = () => {
  return (
    // Yükseklik h-[calc(100vh-80px)] yapılarak tam ekrana kilitlendi, taşma gizlendi
    <section className="flex h-[calc(100vh-80px)] min-h-[450px] flex-col justify-center overflow-hidden bg-slate-50 py-4 lg:py-6">
      <div className="mx-auto flex h-full max-h-[750px] w-full max-w-7xl flex-col px-4 lg:px-6">
        
        {/* Başlık Alanı - Dikey alan kazanmak için margin ve padding'ler küçültüldü */}
        <div className="mb-4 flex shrink-0 flex-col gap-2 md:flex-row md:items-end md:justify-between lg:mb-6">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[3px] text-blue-600 lg:text-xs lg:tracking-[4px]">
              Duyurular
            </span>
            <h2 className="mt-1 text-2xl font-black text-slate-900 lg:mt-2 lg:text-4xl">
              Güncel Duyurular
            </h2>
          </div>

          <button className="group flex w-max items-center gap-1.5 text-xs font-semibold text-blue-600 transition-colors hover:text-blue-700 lg:text-sm">
            Tümünü Gör
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1 lg:h-5 lg:w-5"
            />
          </button>
        </div>

        {/* Liste Alanı - min-h-0 ve flex-1 ile kalan alanı dinamik bir şekilde kullanır */}
        <div className="flex min-h-0 flex-1 flex-col gap-3 lg:gap-4">
          {announcements.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              // flex-1 eklenerek her duyurunun ekranı taşırmadan eşit esnemesi sağlandı
              className="group flex flex-1 flex-col justify-center gap-3 rounded-[16px] bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:gap-4 lg:rounded-[24px] lg:p-5"
            >
              <div className="flex items-center gap-3 lg:gap-5">
                
                {/* İkon kutusu */}
                <div className="flex shrink-0 items-center justify-center rounded-xl bg-blue-50 p-2.5 transition-colors group-hover:bg-blue-100 lg:p-3.5">
                  <Bell className="h-5 w-5 text-blue-600 lg:h-6 lg:w-6" />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 transition-colors group-hover:text-blue-600 lg:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 text-[10px] font-medium text-slate-500 lg:mt-1 lg:text-xs">
                    {item.date}
                  </p>
                </div>
              </div>

              {/* Buton - Alan darsa sıkışmaması için shrink-0 kullanıldı */}
              <button className="w-full shrink-0 rounded-xl bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700 transition-colors group-hover:bg-blue-600 group-hover:text-white sm:w-auto lg:px-6 lg:py-3 lg:text-sm">
                İncele
              </button>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default AnnouncementSection;