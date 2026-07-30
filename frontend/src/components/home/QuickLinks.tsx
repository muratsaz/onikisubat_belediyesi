import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  FolderKanban,
  MapPinned,
  Megaphone,
  Newspaper,
  Phone,
} from "lucide-react";

const links = [
  {
    title: "E-Belediye",
    desc: "Online belediye hizmetlerine erişin",
    icon: Building2,
  },
  {
    title: "Haberler",
    desc: "Güncel gelişmeleri takip edin",
    icon: Newspaper,
  },
  {
    title: "Duyurular",
    desc: "Resmî duyuruları görüntüleyin",
    icon: Megaphone,
  },
  {
    title: "Projeler",
    desc: "Devam eden projeleri inceleyin",
    icon: FolderKanban,
  },
  {
    title: "Hizmet Noktaları",
    desc: "Size en yakın hizmet noktasını bulun",
    icon: MapPinned,
  },
  {
    title: "İletişim",
    desc: "Bizimle iletişime geçin",
    icon: Phone,
  },
];

const QuickLinks = () => {
  return (
    // Yükseklik 124px yerine 80px çıkarılarak tam ekrana (Hero ile aynı orana) sıfırlandı
    <section className="flex h-[calc(100vh-80px)] min-h-[500px] flex-col justify-center overflow-hidden bg-white py-4 lg:py-6">
      <div className="mx-auto flex h-full max-h-[750px] w-full max-w-7xl flex-col justify-center px-4 lg:px-6">
        
        {/* Başlık alanı */}
        <div className="mb-6 shrink-0 lg:mb-8">
          <span className="text-[10px] font-semibold uppercase tracking-[2px] text-blue-600 lg:text-xs lg:tracking-[4px]">
            HIZLI İŞLEMLER
          </span>

          <h2 className="mt-1 text-2xl font-black text-slate-900 lg:mt-2 lg:text-4xl">
            Belediye Hizmetlerine
            <br className="hidden lg:block" />
            {" "}Tek Tıkla Ulaşın
          </h2>

          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-slate-600 lg:mt-3 lg:text-base">
            En sık kullanılan belediye hizmetlerine hızlı ve kolay bir şekilde
            erişebilirsiniz.
          </p>
        </div>

        {/* Buton Grid Alanı - Kalan alanı dinamik olarak eşit dağıtır */}
        <div className="grid min-h-0 flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {links.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.button
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.08,
                }}
                viewport={{ once: true }}
                className="group relative flex flex-col justify-center overflow-hidden rounded-[24px] border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl lg:p-6"
              >
                <ArrowRight className="absolute right-5 top-5 h-4 w-4 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-600 lg:right-6 lg:top-6 lg:h-5 lg:w-5" />

                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 transition-all duration-300 group-hover:rotate-6 group-hover:from-blue-600 group-hover:to-cyan-500 lg:mb-5 lg:h-14 lg:w-14">
                  <Icon className="h-6 w-6 text-blue-700 transition-all duration-300 group-hover:scale-110 group-hover:text-white lg:h-7 lg:w-7" />
                </div>

                <h3 className="text-base font-bold text-slate-900 lg:text-xl">
                  {item.title}
                </h3>

                <p className="mt-1 text-[11px] leading-relaxed text-slate-600 lg:mt-2 lg:text-sm">
                  {item.desc}
                </p>

                <div className="absolute bottom-0 left-0 h-1 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
              </motion.button>
            );
          })}
        </div>
        
      </div>
    </section>
  );
};

export default QuickLinks;