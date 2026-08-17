import { useEffect, useState } from "react";
import { Mail, Phone, Building2 } from "lucide-react";
import { motion } from "framer-motion";

import PageHero from "../../components/kurumsal/PageHero";

interface Department {
  id: number;
  name: string;
  phone: string | null;
  extension: string | null;
  email: string | null;
  image: string | null;
  created_at: string;
  updated_at: string;
}

const API_URL = "http://127.0.0.1:8000";

const MudurluklerPage = () => {
  const [mudurlukler, setMudurlukler] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMudurlukler = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/departments/`
        );

        if (!response.ok) {
          throw new Error("Müdürlükler alınamadı.");
        }

        const data: Department[] = await response.json();

        setMudurlukler(data);
      } catch (err) {
        console.error(
          "Müdürlükler yüklenirken hata:",
          err
        );

        setError(
          "Müdürlükler yüklenirken bir hata oluştu."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMudurlukler();
  }, []);

  const getImageUrl = (image: string | null) => {
    if (!image) {
      return null;
    }

    if (image.startsWith("http://") || image.startsWith("https://")) {
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
        title="Müdürlükler"
        description="Onikişubat Belediyesi Müdürlükleri"
      />

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4">

          {/* LOADING */}

          {loading && (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-700" />

                <p className="text-slate-500">
                  Müdürlükler yükleniyor...
                </p>
              </div>
            </div>
          )}

          {/* ERROR */}

          {!loading && error && (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="rounded-2xl bg-white px-8 py-10 text-center shadow-lg">
                <p className="font-medium text-red-600">
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* EMPTY */}

          {!loading &&
            !error &&
            mudurlukler.length === 0 && (
              <div className="flex min-h-[300px] items-center justify-center">
                <div className="rounded-2xl bg-white px-8 py-10 text-center shadow-lg">
                  <Building2 className="mx-auto mb-4 h-12 w-12 text-slate-300" />

                  <h2 className="text-xl font-bold text-slate-800">
                    Henüz müdürlük bulunmuyor
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Admin panelinden müdürlük ekleyebilirsiniz.
                  </p>
                </div>
              </div>
            )}

          {/* DEPARTMENTS */}

          {!loading &&
            !error &&
            mudurlukler.length > 0 && (
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

                {mudurlukler.map((item) => {
                  const imageUrl = getImageUrl(item.image);

                  return (
                    <motion.div
                      key={item.id}
                      initial={{
                        opacity: 0,
                        y: 25,
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
                      }}
                      className="overflow-hidden rounded-2xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
                    >

                      {/* IMAGE */}

                      <div className="relative h-72 w-full overflow-hidden bg-slate-100">

                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={item.name}
                            className="h-full w-full object-cover transition duration-500 hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Building2 className="h-20 w-20 text-slate-300" />
                          </div>
                        )}

                      </div>

                      {/* CONTENT */}

                      <div className="p-6">

                        <h2 className="text-xl font-bold text-slate-800">
                          {item.name}
                        </h2>

                        <p className="mt-3 text-lg font-semibold text-blue-700">
                          {item.name}
                        </p>

                        <p className="mb-6 text-sm text-slate-500">
                          Onikişubat Belediyesi
                        </p>

                        <div className="space-y-3">

                          {/* PHONE */}

                          {item.phone && (
                            <div className="flex items-center gap-3 rounded-lg bg-slate-100 p-3">
                              <Phone
                                size={18}
                                className="shrink-0 text-blue-700"
                              />

                              <span className="text-sm text-slate-700">
                                {item.phone}

                                {item.extension && (
                                  <span className="ml-2 text-slate-500">
                                    Dahili:{" "}
                                    {item.extension}
                                  </span>
                                )}
                              </span>
                            </div>
                          )}

                          {/* EMAIL */}

                          {item.email && (
                            <div className="flex items-center gap-3 rounded-lg bg-slate-100 p-3">
                              <Mail
                                size={18}
                                className="shrink-0 text-blue-700"
                              />

                              <span className="truncate text-sm text-slate-700">
                                {item.email}
                              </span>
                            </div>
                          )}

                        </div>

                      </div>
                    </motion.div>
                  );
                })}

              </div>
            )}

        </div>
      </section>
    </>
  );
};

export default MudurluklerPage;