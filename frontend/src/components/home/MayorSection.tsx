import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getMayor, type Mayor } from "../../services/mayor.service";

const API_URL = "http://127.0.0.1:8000";

const getImageUrl = (path: string | null) => {
  if (!path) {
    return "/images/mayor/mayor.jpg";
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${API_URL}${path}`;
};

const MayorSection = () => {
  const navigate = useNavigate();

  const [mayor, setMayor] = useState<Mayor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMayor = async () => {
      try {
        const data = await getMayor();
        setMayor(data);
      } catch (error) {
        console.error("Başkan bilgileri alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMayor();
  }, []);

  if (loading) {
    return (
      <section className="relative overflow-hidden bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <div className="animate-pulse">
              <div className="mb-4 h-4 w-40 rounded bg-slate-200" />

              <div className="h-16 w-80 rounded bg-slate-200" />

              <div className="mt-4 h-6 w-64 rounded bg-slate-200" />

              <div className="mt-6 h-24 max-w-lg rounded bg-slate-200" />
            </div>

            <div className="h-[430px] w-full animate-pulse rounded-[30px] bg-slate-200 lg:h-[520px]" />
          </div>
        </div>
      </section>
    );
  }

  if (!mayor) {
    return null;
  }

  const mayorImage = getImageUrl(mayor.image);

  return (
    <section
  id="baskan"
  className="relative overflow-hidden bg-white py-12 lg:py-16"
>
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">

          {/* SOL TARAF - BAŞKAN BİLGİLERİ */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative z-10"
          >
            {/* ÜST BAŞLIK */}

            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-10 bg-blue-600" />

              <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Belediye Başkanımız
              </span>
            </div>

            {/* BAŞKAN ADI */}

            <h2 className="text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {mayor.name}
            </h2>

            {/* BAŞKAN ÜNVANI */}

            <p className="mt-3 text-lg font-semibold text-blue-600">
              {mayor.title}
            </p>

            {/* BAŞKAN AÇIKLAMASI */}

            {mayor.description && (
              <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-500 lg:text-lg">
                {mayor.description}
              </p>
            )}

            {/* BUTONLAR */}

            <div className="mt-6 flex flex-wrap gap-3">

              {/* BAŞKANI TANIYIN */}

              <button
                type="button"
                onClick={() => navigate("/kurumsal/baskan")}
                className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-slate-900"
              >
                Başkanı Tanıyın

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              {/* BAŞKANLA FOTOĞRAFLAR */}

              <button
                type="button"
                onClick={() => navigate("/kurumsal/baskan")}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition-all duration-300 hover:border-blue-600 hover:text-blue-600"
              >
                Başkanla Fotoğraflar

                <Camera size={18} />
              </button>

            </div>
          </motion.div>

          {/* SAĞ TARAF - BAŞKAN FOTOĞRAFI */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[560px] overflow-hidden rounded-[30px] border border-slate-200 bg-slate-100 shadow-xl">

              <img
                src={mayorImage}
                alt={`${mayor.name} - ${mayor.title}`}
                className="h-[430px] w-full object-cover object-top transition duration-700 hover:scale-105 lg:h-[520px]"
              />

              {/* ALT GRADIENT */}

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent p-6 lg:p-7">

                <p className="text-sm font-medium text-white/80">
                  Onikişubat Belediyesi
                </p>

                <h3 className="mt-1 text-2xl font-bold text-white lg:text-3xl">
                  {mayor.name}
                </h3>

                <p className="mt-1 text-sm text-white/80 lg:text-base">
                  {mayor.title}
                </p>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default MayorSection;