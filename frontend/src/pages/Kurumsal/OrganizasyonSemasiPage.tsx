import { motion } from "framer-motion";
import PageHero from "../../components/kurumsal/PageHero";

const OrganizasyonSemasiPage = () => {
  return (
    <>
      <PageHero
        title="Organizasyon Şeması"
        description="Onikişubat Belediyesi Organizasyon Şeması"
      />

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-3xl bg-white p-8 shadow-xl"
          >
            <img
              src="/images/organizasyon-semasi/sema.png"
              alt="Organizasyon Şeması"
              className="w-full rounded-2xl border object-contain"
            />
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default OrganizasyonSemasiPage;