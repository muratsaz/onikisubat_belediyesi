import { motion } from "framer-motion";

import EServiceCard from "./EServiceCard";
import { services } from "./serviceData";

const EServiceGrid = () => {
  return (
    <section className="py-12">

      <div className="mx-auto max-w-7xl px-4 lg:px-6">

        {/* Başlık */}

        <div className="mb-10 text-center">

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Online Hizmetler
          </span>

          <h2 className="mt-4 text-4xl font-black text-slate-900">
            E-Belediye Hizmetleri
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Belediyemizin dijital hizmetlerine hızlıca ulaşabilir,
            işlemlerinizi güvenli şekilde internet üzerinden
            gerçekleştirebilirsiniz.
          </p>

        </div>

        {/* Kartlar */}

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.06,
              },
            },
          }}
          className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
        >

          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 25,
                },
                show: {
                  opacity: 1,
                  y: 0,
                },
              }}
              transition={{
                duration: 0.35,
              }}
            >
              <EServiceCard service={service} />
            </motion.div>
          ))}

        </motion.div>

      </div>

    </section>
  );
};

export default EServiceGrid;