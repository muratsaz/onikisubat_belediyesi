import { Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

import PageHero from "../../components/kurumsal/PageHero";

const mudurlukler = [
  {
    id: 1,
    ad: "Fen İşleri Müdürlüğü",
    mudur: "Ahmet YILMAZ",
    telefon: "0344 211 46 46",
    mail: "fenisleri@onikisubat.bel.tr",
    foto: "/images/mudurlukler/fenisleri.jpg",
  },
  {
    id: 2,
    ad: "Park ve Bahçeler Müdürlüğü",
    mudur: "Mehmet KAYA",
    telefon: "0344 211 46 46",
    mail: "parkbahceler@onikisubat.bel.tr",
    foto: "/images/mudurlukler/parkbahceler.jpg",
  },
  {
    id: 3,
    ad: "Zabıta Müdürlüğü",
    mudur: "Ali DEMİR",
    telefon: "0344 211 46 46",
    mail: "zabita@onikisubat.bel.tr",
    foto: "/images/mudurlukler/zabita.jpg",
  },
];

const MudurluklerPage = () => {
  return (
    <>
      <PageHero
        title="Müdürlükler"
        description="Onikişubat Belediyesi Müdürlükleri"
      />

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4">

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

            {mudurlukler.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .4 }}
                className="overflow-hidden rounded-2xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
              >
                <img
                  src={item.foto}
                  alt={item.ad}
                  className="h-72 w-full object-cover"
                />

                <div className="p-6">

                  <h2 className="text-xl font-bold text-slate-800">
                    {item.ad}
                  </h2>

                  <p className="mt-3 text-lg font-semibold text-blue-700">
                    {item.mudur}
                  </p>

                  <p className="mb-6 text-sm text-slate-500">
                    Müdür
                  </p>

                  <div className="space-y-3">

                    <div className="flex items-center gap-3 rounded-lg bg-slate-100 p-3">
                      <Phone
                        size={18}
                        className="text-blue-700"
                      />
                      <span>{item.telefon}</span>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg bg-slate-100 p-3">
                      <Mail
                        size={18}
                        className="text-blue-700"
                      />
                      <span>{item.mail}</span>
                    </div>

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

export default MudurluklerPage;