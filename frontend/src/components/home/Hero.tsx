import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { heroSlides } from "./heroData";

const Hero = () => {
  return (
    // Yükseklik tamamen menü altına kilitlendi (beyaz kısımların sızması engellendi)
    <section className="relative h-[calc(100vh-80px)] w-full overflow-hidden bg-slate-950">
      <Swiper
        modules={[
          Navigation,
          Pagination,
          Autoplay,
          EffectFade,
        ]}
        fadeEffect={{
          crossFade: true,
        }}
        effect="fade"
        speed={1200}
        loop
        navigation={{
          prevEl: ".hero-prev",
          nextEl: ".hero-next",
        }}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        className="h-full w-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full overflow-hidden">
              
              {/* Background - bg-center yerine bg-top kullanıldı, zoom (scale) hafifletildi */}
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 1.05 }}
                transition={{
                  duration: 12,
                  ease: "linear",
                }}
                className="absolute inset-0 bg-cover bg-top"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/55 to-slate-900/20" />

              {/* Blur Efektleri */}
              <div className="absolute -left-56 -top-56 h-[550px] w-[550px] rounded-full bg-blue-600/20 blur-[170px]" />
              <div className="absolute -bottom-56 -right-56 h-[550px] w-[550px] rounded-full bg-cyan-500/20 blur-[170px]" />

              {/* Content */}
              <div className="relative z-20 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-12">
                <div className="max-w-3xl">
                  
                  <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold tracking-[3px] text-white backdrop-blur"
                  >
                    {slide.subtitle}
                  </motion.h2>

                  <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.7 }}
                    className="relative text-5xl font-black leading-tight text-white md:text-7xl"
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    className="mt-8 max-w-2xl text-lg leading-9 text-slate-200"
                  >
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.7 }}
                    className="mt-10 flex flex-wrap gap-4"
                  >
                    <button className="group flex items-center gap-3 rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700">
                      Hizmetleri İncele
                      <ArrowRight
                        size={18}
                        className="transition group-hover:translate-x-1"
                      />
                    </button>

                    <button className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur transition hover:bg-white hover:text-slate-900">
                      E-Belediye
                    </button>
                  </motion.div>
                  
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Prev Button */}
        <div className="hero-prev absolute left-6 top-1/2 z-30 flex h-14 w-14 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-white hover:text-slate-900">
          <ChevronLeft size={24} />
        </div>

        {/* Next Button */}
        <div className="hero-next absolute right-6 top-1/2 z-30 flex h-14 w-14 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-white hover:text-slate-900">
          <ChevronRight size={24} />
        </div>
      </Swiper>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center">
        <span className="mb-3 text-xs font-semibold uppercase tracking-[4px] text-white/70">
          Aşağı Kaydır
        </span>

        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="flex h-12 w-7 justify-center rounded-full border border-white/40"
        >
          <motion.div
            animate={{ y: [0, 18, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="mt-2 h-3 w-3 rounded-full bg-white"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;