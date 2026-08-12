import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface PageHeroProps {
  title: string;
  description: string;
  backgroundImage?: string;
}

const PageHero = ({
  title,
  description,
  backgroundImage = "/images/municipality/belediye1.jpeg",
}: PageHeroProps) => {
  return (
    <section className="relative flex h-[260px] items-center overflow-hidden">
      {/* Arka Plan */}
      <img
        src={backgroundImage}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Karartma */}
      <div className="absolute inset-0 bg-slate-950/60" />

      {/* İçerik */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 lg:px-6">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4 flex items-center gap-2 text-sm text-white/80"
        >
          <Link
            to="/"
            className="flex items-center gap-1 transition-colors hover:text-white"
          >
            <Home size={15} />
            Ana Sayfa
          </Link>

          <ChevronRight size={15} />

          <Link
            to="/kurumsal"
            className="transition-colors hover:text-white"
          >
            Kurumsal
          </Link>

          <ChevronRight size={15} />

          <span className="font-semibold text-white">
            {title}
          </span>
        </motion.div>

        {/* Başlık */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-white"
        >
          {title}
        </motion.h1>

        {/* Açıklama */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-3 max-w-2xl text-base leading-7 text-slate-200"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
};

export default PageHero;