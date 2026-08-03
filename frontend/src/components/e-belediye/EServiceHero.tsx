import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Landmark,
} from "lucide-react";
import { Link } from "react-router-dom";

const EServiceHero = () => {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500">

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-8 py-12 lg:grid-cols-2">

        {/* Sol */}

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >

          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
            <ShieldCheck size={16} />
            Güvenli Dijital Hizmet
          </span>

          <h1 className="mt-6 text-4xl font-black leading-tight text-white xl:text-5xl">
            7/24 E-Belediye
            <br />
            Hizmetleri
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-blue-100">
            Belediyemize ait dijital hizmetlere tek noktadan
            ulaşabilir, başvurularınızı oluşturabilir,
            ödemelerinizi gerçekleştirebilir ve işlemlerinizi
            güvenli şekilde takip edebilirsiniz.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">

            <button className="rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 transition hover:scale-105">
              E-Belediye Girişi
            </button>

            <button className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20">
              e-Devlet ile Giriş
            </button>

          </div>

        </motion.div>

        {/* Sağ */}

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
          className="relative flex justify-center"
        >

          <div className="absolute h-52 w-52 rounded-full bg-white/10 blur-3xl" />

          <div className="relative w-full max-w-sm rounded-3xl bg-white p-7 shadow-2xl">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">

              <Landmark
                size={34}
                className="text-blue-700"
              />

            </div>

            <h3 className="mt-6 text-2xl font-black text-slate-900">
              Dijital Belediye
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Vergi ödeme, başvuru, belge doğrulama ve birçok
              belediye hizmetini internet üzerinden kolayca
              gerçekleştirebilirsiniz.
            </p>

            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-700 transition hover:gap-4"
            >
              Ana Sayfaya Dön
              <ArrowRight size={18} />
            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  );
};

export default EServiceHero;