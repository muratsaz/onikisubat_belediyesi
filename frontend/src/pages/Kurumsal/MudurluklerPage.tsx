import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  Building2,
  PhoneCall,
} from "lucide-react";
import { motion } from "framer-motion";

import PageHero from "../../components/kurumsal/PageHero";

interface Department {
  id: number;
  name: string;
  manager_name: string | null;
  manager_image: string | null;
  phone: string | null;
  extension: string | null;
  email: string | null;
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
        title="Müdürlükler"
        description="Onikişubat Belediyesi Müdürlükleri"
      />

      <section className="bg-slate-50 py-12">
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
              <div className="grid items-start gap-7 md:grid-cols-2 xl:grid-cols-3">
                {mudurlukler.map((item) => {
                  const imageUrl = getImageUrl(
                    item.manager_image
                  );

                  return (
                    <motion.article
                      key={item.id}
                      initial={{
                        opacity: 0,
                        y: 20,
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
                      className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >

                      {/* =========================
                          IMAGE
                      ========================== */}
                      <div className="relative flex h-[300px] w-full shrink-0 items-center justify-center overflow-hidden bg-slate-100">

                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={
                              item.manager_name ||
                              item.name
                            }
                            className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.02]"
                            onError={(e) => {
                              e.currentTarget.style.display =
                                "none";
                            }}
                          />
                        ) : (
                          <Building2 className="h-24 w-24 text-slate-300" />
                        )}

                        {/* IMAGE OVERLAY */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-5 pb-4 pt-14">
                          <div className="flex items-center gap-2 text-white">
                            <Building2 size={17} />

                            <span className="text-sm font-medium">
                              Onikişubat Belediyesi
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* =========================
                          CONTENT
                      ========================== */}
                      <div className="flex flex-col p-5">

                        {/* DEPARTMENT NAME */}
                        <div className="mb-4">
                          <h2 className="line-clamp-2 text-[22px] font-bold leading-tight text-slate-900">
                            {item.name}
                          </h2>

                          <div className="mt-2 h-1 w-12 rounded-full bg-blue-700" />
                        </div>

                        {/* =========================
                            CONTACT INFORMATION
                        ========================== */}
                        <div className="space-y-2.5">

                          {/* PHONE */}
                          {item.phone && (
                            <div className="flex min-h-[70px] items-center gap-3 rounded-xl bg-slate-50 px-3.5 py-3 transition-colors hover:bg-blue-50">

                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                                <Phone size={18} />
                              </div>

                              <div className="min-w-0">
                                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                  Telefon
                                </p>

                                <p className="mt-0.5 truncate text-[15px] font-semibold text-slate-800">
                                  {item.phone}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* EXTENSION */}
                          {item.extension && (
                            <div className="flex min-h-[70px] items-center gap-3 rounded-xl bg-slate-50 px-3.5 py-3 transition-colors hover:bg-blue-50">

                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                                <PhoneCall size={18} />
                              </div>

                              <div className="min-w-0">
                                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                  Dahili
                                </p>

                                <p className="mt-0.5 truncate text-[15px] font-semibold text-slate-800">
                                  {item.extension}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* EMAIL */}
                          {item.email && (
                            <div className="flex min-h-[70px] items-center gap-3 rounded-xl bg-slate-50 px-3.5 py-3 transition-colors hover:bg-blue-50">

                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                                <Mail size={18} />
                              </div>

                              <div className="min-w-0">
                                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                  E-posta
                                </p>

                                <p className="mt-0.5 truncate text-[15px] font-semibold text-slate-800">
                                  {item.email}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* =========================
                            MANAGER
                        ========================== */}
                        {item.manager_name && (
                          <div className="mt-4 border-t border-slate-100 pt-3">

                            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                              Müdür
                            </p>

                            <p className="mt-1 text-[15px] font-bold text-slate-800">
                              {item.manager_name}
                            </p>

                          </div>
                        )}
                      </div>
                    </motion.article>
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