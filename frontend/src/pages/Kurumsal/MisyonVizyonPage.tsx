import { useEffect, useState } from "react";
import { Eye, Target, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

import PageHero from "../../components/kurumsal/PageHero";

import {
  getMissionVision,
  type MissionVision,
} from "../../services/missionVisionService";

const MisyonVizyonPage = () => {
  const [missionVision, setMissionVision] =
    useState<MissionVision | null>(null);

  useEffect(() => {
    getMissionVision()
      .then((data) => {
        setMissionVision(data);
      })
      .catch((error) => {
        console.error(
          "Misyon ve vizyon alınamadı:",
          error
        );
      });
  }, []);

  return (
    <>
      <PageHero
        title="Misyon & Vizyon"
        description="Onikişubat Belediyesinin misyonu, vizyonu ve temel değerleri"
      />

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-3">

            {/* Misyon */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl bg-white p-8 shadow-xl"
            >
              <Target
                size={50}
                className="mb-6 text-blue-700"
              />

              <h2 className="mb-4 text-3xl font-bold">
                Misyon
              </h2>

              <p className="leading-8 text-slate-600">
                {missionVision?.mission}
              </p>
            </motion.div>

            {/* Vizyon */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl bg-white p-8 shadow-xl"
            >
              <Eye
                size={50}
                className="mb-6 text-blue-700"
              />

              <h2 className="mb-4 text-3xl font-bold">
                Vizyon
              </h2>

              <p className="leading-8 text-slate-600">
                {missionVision?.vision}
              </p>
            </motion.div>

            {/* Temel Değerler */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-3xl bg-white p-8 shadow-xl"
            >
              <ShieldCheck
                size={50}
                className="mb-6 text-blue-700"
              />

              <h2 className="mb-4 text-3xl font-bold">
                Temel Değerler
              </h2>

              <ul className="space-y-3 text-slate-600">
                <li>• Şeffaflık</li>
                <li>• Güvenilirlik</li>
                <li>• Katılımcılık</li>
                <li>• Sürdürülebilirlik</li>
                <li>• Yenilikçilik</li>
                <li>• Vatandaş Memnuniyeti</li>
              </ul>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
};

export default MisyonVizyonPage;