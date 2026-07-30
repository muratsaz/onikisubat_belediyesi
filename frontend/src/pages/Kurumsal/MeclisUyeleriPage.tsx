import { motion } from "framer-motion";

import PageHero from "../../components/kurumsal/PageHero";

const meclisUyeleri = [
  {
    id: 1,
    ad: "Ad Soyad",
    foto: "/images/meclis/uye1.jpg",
  },
  {
    id: 2,
    ad: "Ad Soyad",
    foto: "/images/meclis/uye2.jpg",
  },
  {
    id: 3,
    ad: "Ad Soyad",
    foto: "/images/meclis/uye3.jpg",
  },
  {
    id: 4,
    ad: "Ad Soyad",
    foto: "/images/meclis/uye4.jpg",
  },
  {
    id: 5,
    ad: "Ad Soyad",
    foto: "/images/meclis/uye5.jpg",
  },
  {
    id: 6,
    ad: "Ad Soyad",
    foto: "/images/meclis/uye6.jpg",
  },
];

const MeclisUyeleriPage = () => {
  return (
    <>
      <PageHero
        title="Meclis Üyeleri"
        description="Onikişubat Belediyesi Meclis Üyeleri"
      />

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4">

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {meclisUyeleri.map((uye) => (
              <motion.div
                key={uye.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .4 }}
                className="overflow-hidden rounded-2xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-xl"
              >

                <img
                  src={uye.foto}
                  alt={uye.ad}
                  className="h-80 w-full object-cover"
                />

                <div className="p-5">

                  <h2 className="text-center text-lg font-bold text-slate-800">
                    {uye.ad}
                  </h2>

                  <p className="mt-2 text-center text-sm text-slate-500">
                    Meclis Üyesi
                  </p>

                </div>

              </motion.div>
            ))}

          </div>

        </div>
      </section>
    </>
  );
};

export default MeclisUyeleriPage;