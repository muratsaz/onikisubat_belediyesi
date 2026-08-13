import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "../../components/common/PageHeader";

import {
  getMayorPage,
  type MayorPage,
} from "../../services/mayorPageService";

const API_URL = "http://127.0.0.1:8000";

const getImageUrl = (path: string | null) => {
  if (!path) {
    return "/images/mayor/mayor.jpg";
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${API_URL}${path}`;
};

const BaskanPage = () => {
  const [mayor, setMayor] = useState<MayorPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMayorPage = async () => {
      try {
        const data = await getMayorPage();
        setMayor(data);
      } catch (error) {
        console.error(
          "Başkanı Tanıyın bilgileri alınamadı:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadMayorPage();
  }, []);

  if (loading) {
    return (
      <>
        <PageHeader
          title="Özgeçmiş"
          section="Başkan"
          description="Onikişubat Belediye Başkanı hakkında bilgiler."
        />

        <section className="bg-slate-50 py-12 lg:py-14">
          <div className="mx-auto max-w-[1660px] px-4 lg:px-8">
            <div className="flex items-start gap-[72px]">

              <aside className="hidden w-[245px] shrink-0 lg:block">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="h-16 animate-pulse bg-slate-100" />
                  <div className="h-16 animate-pulse border-t border-slate-100 bg-white" />
                  <div className="h-20 animate-pulse border-t border-slate-100 bg-white" />
                </div>
              </aside>

              <main className="min-w-0 flex-1">
                <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">

                  <div className="h-[430px] w-full animate-pulse bg-slate-200 sm:h-[510px] lg:h-[600px]" />

                  <div className="space-y-4 px-7 py-8 sm:px-10 lg:px-12 lg:py-10">
                    <div className="h-5 w-full animate-pulse rounded bg-slate-200" />
                    <div className="h-5 w-11/12 animate-pulse rounded bg-slate-200" />
                    <div className="h-5 w-10/12 animate-pulse rounded bg-slate-200" />
                    <div className="h-5 w-full animate-pulse rounded bg-slate-200" />
                  </div>

                </div>
              </main>

            </div>
          </div>
        </section>
      </>
    );
  }

  if (!mayor) {
    return (
      <>
        <PageHeader
          title="Özgeçmiş"
          section="Başkan"
          description="Onikişubat Belediye Başkanı hakkında bilgiler."
        />

        <section className="bg-slate-50 py-12 lg:py-14">
          <div className="mx-auto max-w-[1660px] px-4 lg:px-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <p className="text-sm text-slate-500">
                Başkan bilgileri şu anda alınamıyor.
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }

  const mayorImage = getImageUrl(mayor.image);

  return (
    <>
      <PageHeader
        title="Özgeçmiş"
        section="Başkan"
        description={`${mayor.name} hakkında bilgiler.`}
      />

      <section className="bg-slate-50 py-12 lg:py-14">
        <div className="mx-auto max-w-[1660px] px-4 lg:px-8">

          <div className="flex items-start gap-[72px]">

            {/* SOL MENÜ */}

            <aside className="hidden w-[245px] shrink-0 lg:block">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                <button
                  type="button"
                  className="w-full bg-slate-100 px-6 py-5 text-left text-base font-semibold text-blue-700"
                >
                  Özgeçmiş
                </button>

                <button
                  type="button"
                  className="w-full border-t border-slate-100 px-6 py-4 text-left text-base text-slate-700 transition hover:bg-slate-50 hover:text-blue-700"
                >
                  Başkana Mesaj
                </button>

                <button
                  type="button"
                  className="w-full border-t border-slate-100 px-6 py-5 text-left text-base leading-6 text-slate-700 transition hover:bg-slate-50 hover:text-blue-700"
                >
                  Başkanla
                  <br />
                  Fotoğraflarınız
                </button>

              </div>
            </aside>

            {/* ANA İÇERİK */}

            <motion.main
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="min-w-0 flex-1"
            >

              <article className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">

                {/* BAŞKAN FOTOĞRAFI */}

                <div className="w-full overflow-hidden">
                  <img
                    src={mayorImage}
                    alt={`${mayor.name} - ${mayor.title}`}
                    className="block h-[430px] w-full object-cover object-top sm:h-[510px] lg:h-[600px]"
                  />
                </div>

                {/* BAŞKAN BİLGİLERİ */}

                <div className="px-7 py-8 sm:px-10 lg:px-12 lg:py-10">

                  {/* İSİM */}

                  <h1 className="text-3xl font-black text-slate-900 lg:text-4xl">
                    {mayor.name}
                  </h1>

                  {/* ÜNVAN */}

                  <p className="mt-2 text-lg font-semibold text-blue-600">
                    {mayor.title}
                  </p>

                  {/* ÖZGEÇMİŞ */}

                  <div className="mt-7 space-y-4 text-[15px] leading-7 text-slate-700 lg:text-base lg:leading-8">

                    {mayor.description
                      ?.split(/\n\s*\n/)
                      .filter((paragraph) => paragraph.trim())
                      .map((paragraph, index) => (
                        <p key={index}>
                          {paragraph.trim()}
                        </p>
                      ))}

                  </div>

                </div>

              </article>

            </motion.main>

          </div>
        </div>
      </section>
    </>
  );
};

export default BaskanPage;