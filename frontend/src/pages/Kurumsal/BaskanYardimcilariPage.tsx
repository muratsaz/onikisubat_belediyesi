import { Phone } from "lucide-react";
import { motion } from "framer-motion";

import PageHero from "../../components/kurumsal/PageHero";

const baskanYardimcilari = [
  {
    id: 1,
    ad: "Ad Soyad",
    telefon: "0344 211 46 46",
    foto: "/images/baskan-yardimcilari/yardimci1.jpg",
  },
  {
    id: 2,
    ad: "Ad Soyad",
    telefon: "0344 211 46 46",
    foto: "/images/baskan-yardimcilari/yardimci2.jpg",
  },
  {
    id: 3,
    ad: "Ad Soyad",
    telefon: "0344 211 46 46",
    foto: "/images/baskan-yardimcilari/yardimci3.jpg",
  },
];

const BaskanYardimcilariPage = () => {
  return (
    <>
      <PageHero
        title="Başkan Yardımcıları"
        description="Onikişubat Belediyesi Başkan Yardımcıları"
      />

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4">

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

            {baskanYardimcilari.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .4 }}
                className="overflow-hidden rounded-2xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
              >

                <img
                  src={item.foto}
                  alt={item.ad}
                  className="h-96 w-full object-cover"
                />

                <div className="p-6">

                  <h2 className="text-2xl font-bold text-slate-800">
                    {item.ad}
                  </h2>

                  <div className="mt-6 flex items-center gap-3 rounded-xl bg-slate-100 p-4">
                    <Phone
                      size={20}
                      className="text-blue-700"
                    />

                    <span>{item.telefon}</span>
                  </div>

                </div>

              </motion.div>
            ))}

          </div>

        </div>
      </section>
    </>
  );
};

export default BaskanYardimcilariPage;