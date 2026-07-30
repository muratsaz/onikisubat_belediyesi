import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MayorSection = () => {
  const navigate = useNavigate();

  return (
    <section className="flex h-[calc(100vh-80px)] min-h-[500px] items-center bg-white py-4 lg:py-6">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center px-4 lg:px-6">
        <div className="flex h-full w-full overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-xl">
          <div className="grid h-full w-full lg:grid-cols-2">

            {/* Fotoğraf */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative h-full overflow-hidden"
            >
              <img
                src="/images/mayor/mayor.jpg"
                alt="Hanifi Toptaş"
                className="h-full w-full object-cover object-top transition duration-700 hover:scale-105"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 lg:p-8">
                <h3 className="text-xl font-black text-white lg:text-3xl">
                  Hanifi Toptaş
                </h3>

                <p className="mt-1 text-sm text-white/90 lg:mt-2 lg:text-base">
                  Onikişubat Belediye Başkanı
                </p>
              </div>
            </motion.div>

            {/* Yazılar */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex h-full flex-col justify-center overflow-y-auto p-6 lg:p-10"
            >
              <div>
                <span className="inline-flex rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700 lg:px-4 lg:py-2 lg:text-sm">
                  Belediye Başkanımız
                </span>

                <h3 className="mt-2 text-2xl font-black text-slate-900 lg:mt-3 lg:text-3xl">
                  Hanifi Toptaş
                </h3>
              </div>

              <div className="mt-3 space-y-2 text-sm leading-normal text-slate-600 lg:mt-4 lg:text-base lg:leading-relaxed">
                <p>Değerli Hemşehrilerimiz,</p>

                <p>
                  Onikişubat'ımızı daha yaşanabilir, daha modern ve daha güçlü
                  bir ilçe haline getirmek amacıyla ekip arkadaşlarımızla
                  birlikte gece gündüz çalışıyoruz. Şeffaf, katılımcı ve insan
                  odaklı belediyecilik anlayışımız doğrultusunda her
                  vatandaşımıza eşit hizmet sunmaya devam ediyoruz.
                </p>
              </div>

              <div className="mt-4 border-l-4 border-blue-600 pl-4 lg:mt-5 lg:pl-5">
                <h4 className="text-lg font-bold text-slate-900 lg:text-xl">
                  Hanifi Toptaş
                </h4>

                <p className="mt-0.5 text-xs text-slate-500 lg:mt-1 lg:text-sm">
                  Onikişubat Belediye Başkanı
                </p>
              </div>

              <div className="mt-5 lg:mt-6">
                <button
                  onClick={() => navigate("/kurumsal/baskan")}
                  className="group inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-900 lg:px-6 lg:py-3 lg:text-base"
                >
                  Başkanı Tanıyın

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default MayorSection;