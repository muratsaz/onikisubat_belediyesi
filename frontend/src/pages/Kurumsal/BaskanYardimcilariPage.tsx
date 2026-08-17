import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";

import PageHero from "../../components/kurumsal/PageHero";

interface DeputyMayor {
  id: number;
  name: string;
  phone: string;
  image: string | null;
  created_at: string;
  updated_at: string;
}

const API_URL = "http://localhost:8000";

const DEFAULT_IMAGE = "/images/baskan-yardimcilari/yardimci1.jpg";

const BaskanYardimcilariPage = () => {
  const [baskanYardimcilari, setBaskanYardimcilari] = useState<
    DeputyMayor[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeputyMayors = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/deputy-mayors/`);

        if (!response.ok) {
          throw new Error(
            `API isteği başarısız oldu: ${response.status}`
          );
        }

        const data: DeputyMayor[] = await response.json();

        setBaskanYardimcilari(data);
      } catch (err) {
        console.error(
          "Başkan yardımcıları alınırken hata oluştu:",
          err
        );

        setError(
          "Başkan yardımcıları bilgileri alınırken bir hata oluştu."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDeputyMayors();
  }, []);

  const getImageUrl = (image: string | null) => {
    if (!image) {
      return DEFAULT_IMAGE;
    }

    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    if (image.startsWith("/")) {
      return `${API_URL}${image}`;
    }

    return `${API_URL}/${image}`;
  };

  return (
    <>
      <PageHero
        title="Başkan Yardımcıları"
        description="Onikişubat Belediyesi Başkan Yardımcıları"
      />

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          {loading && (
            <div className="flex min-h-[300px] items-center justify-center">
              <p className="text-lg text-slate-500">
                Başkan yardımcıları yükleniyor...
              </p>
            </div>
          )}

          {!loading && error && (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="rounded-xl bg-white px-8 py-6 text-center shadow">
                <p className="text-red-600">
                  {error}
                </p>
              </div>
            </div>
          )}

          {!loading &&
            !error &&
            baskanYardimcilari.length === 0 && (
              <div className="flex min-h-[300px] items-center justify-center">
                <div className="rounded-xl bg-white px-8 py-6 text-center shadow">
                  <p className="text-lg text-slate-500">
                    Henüz başkan yardımcısı eklenmemiş.
                  </p>
                </div>
              </div>
            )}

          {!loading &&
            !error &&
            baskanYardimcilari.length > 0 && (
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {baskanYardimcilari.map(
                  (item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{
                        opacity: 0,
                        y: 35,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.05,
                      }}
                      className="overflow-hidden rounded-2xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
                    >
                      <div className="h-96 w-full overflow-hidden bg-slate-100">
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.name}
                          className="h-full w-full object-cover"
                          onError={(event) => {
                            event.currentTarget.src =
                              DEFAULT_IMAGE;
                          }}
                        />
                      </div>

                      <div className="p-6">
                        <h2 className="text-2xl font-bold text-slate-800">
                          {item.name}
                        </h2>

                        <div className="mt-6 flex items-center gap-3 rounded-xl bg-slate-100 p-4">
                          <Phone
                            size={20}
                            className="text-blue-700"
                          />

                          <span className="text-slate-700">
                            {item.phone}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )
                )}
              </div>
            )}
        </div>
      </section>
    </>
  );
};

export default BaskanYardimcilariPage;