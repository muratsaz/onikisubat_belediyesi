import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

import PageHero from "../../components/kurumsal/PageHero";
import {
  getOrganization,
  type Organization,
} from "../../services/organizationService";

const API_URL = "http://127.0.0.1:8000";

const OrganizasyonSemasiPage = () => {
  const [organization, setOrganization] =
    useState<Organization | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const data = await getOrganization();
        setOrganization(data);
      } catch (error) {
        console.error(
          "Organizasyon şeması alınamadı:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrganization();
  }, []);

  const imageUrl = organization?.image_url
    ? `${API_URL}${organization.image_url}`
    : null;

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
            {loading ? (
              <div className="flex min-h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : imageUrl ? (
              <img
                src={imageUrl}
                alt="Organizasyon Şeması"
                className="w-full rounded-2xl border object-contain"
              />
            ) : (
              <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-slate-500">
                  Organizasyon şeması henüz eklenmemiş.
                </p>
              </div>
            )}
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default OrganizasyonSemasiPage;