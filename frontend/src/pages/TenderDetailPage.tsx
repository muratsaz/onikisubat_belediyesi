import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  FileText,
  Download,
  Clock,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { getTender } from "../services/tender.service";
import type {
  TenderDetail,
} from "../services/tender.service";

const API_URL = "http://127.0.0.1:8000";

const TenderDetailPage = () => {
  const { id } = useParams();

  const [tender, setTender] =
    useState<TenderDetail | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const loadTender = async () => {
      try {
        setLoading(true);
        setError("");

        if (!id) {
          setError("İhale ID bulunamadı.");
          return;
        }

        const data = await getTender(Number(id));

        setTender(data);
      } catch (err) {
        console.error(err);
        setError("İhale bilgileri alınamadı.");
      } finally {
        setLoading(false);
      }
    };

    loadTender();
  }, [id]);

  const formatDate = (value: string) => {
    if (!value) return "-";

    return new Date(value).toLocaleString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDocumentUrl = (path: string) => {
    if (path.startsWith("http")) {
      return path;
    }

    return `${API_URL}${path}`;
  };

  if (loading) {
    return (
      <section className="min-h-[70vh] bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
            <p className="text-lg text-slate-600">
              İhale bilgileri yükleniyor...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !tender) {
    return (
      <section className="min-h-[70vh] bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
            <h1 className="text-3xl font-black text-slate-900">
              İhale Bulunamadı
            </h1>

            <p className="mt-4 text-slate-600">
              {error ||
                "Aradığınız ihale mevcut değil."}
            </p>

            <Link
              to="/ihaleler"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
            >
              <ArrowLeft size={18} />
              İhalelere Dön
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4">

          <Link
            to="/ihaleler"
            className="mb-10 inline-flex items-center gap-2 text-blue-700 hover:underline"
          >
            <ArrowLeft size={18} />
            İhalelere Geri Dön
          </Link>

          <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">

            {/* SOL TARAF */}
            <div className="space-y-8">

              <div className="rounded-3xl bg-white p-10 shadow-sm">

                <div className="mb-6 flex flex-wrap items-center gap-3">

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-bold ${
                      tender.status === "ACTIVE"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {tender.status === "ACTIVE"
                      ? "Açık"
                      : "Sonuçlandı"}
                  </span>

                  <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
                    {tender.tender_number}
                  </span>

                </div>

                <h1 className="text-4xl font-black text-slate-900">
                  {tender.title}
                </h1>

                <div className="mt-8 flex items-center gap-3 text-slate-600">
                  <Clock
                    size={20}
                    className="text-blue-700"
                  />

                  <span>
                    Son başvuru:{" "}
                    <strong>
                      {formatDate(tender.deadline)}
                    </strong>
                  </span>
                </div>

                <div className="mt-10 border-t border-slate-200 pt-8">

                  <h2 className="text-2xl font-bold text-slate-900">
                    İhale Açıklaması
                  </h2>

                  <p className="mt-5 whitespace-pre-line text-lg leading-9 text-slate-600">
                    {tender.description ||
                      "Bu ihale için açıklama bulunmamaktadır."}
                  </p>

                </div>

              </div>

              {/* BELGELER */}
              <div className="rounded-3xl bg-white p-10 shadow-sm">

                <div className="flex items-center gap-3">

                  <FileText
                    size={26}
                    className="text-blue-700"
                  />

                  <h2 className="text-2xl font-bold text-slate-900">
                    İhale Belgeleri
                  </h2>

                </div>

                <p className="mt-3 text-slate-600">
                  Bu ihaleye ait şartname ve diğer
                  belgeleri buradan görüntüleyebilir
                  veya indirebilirsiniz.
                </p>

                {tender.documents.length === 0 ? (
                  <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">

                    <FileText
                      size={36}
                      className="mx-auto text-slate-400"
                    />

                    <p className="mt-4 font-semibold text-slate-600">
                      Bu ihaleye ait belge bulunmuyor.
                    </p>

                  </div>
                ) : (
                  <div className="mt-8 space-y-4">

                    {tender.documents.map((document) => {

                      const documentUrl =
                        getDocumentUrl(
                          document.file_path
                        );

                      return (
                        <div
                          key={document.id}
                          className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50/40 sm:flex-row sm:items-center sm:justify-between"
                        >

                          <div className="flex items-center gap-4">

                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                              <FileText size={24} />
                            </div>

                            <div>
                              <p className="font-semibold text-slate-800">
                                {document.file_name}
                              </p>

                              <p className="mt-1 text-sm text-slate-500">
                                İhale Şartnamesi / Belgesi
                              </p>
                            </div>

                          </div>

                          <a
                            href={documentUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800"
                          >
                            <Download size={18} />
                            Görüntüle / İndir
                          </a>

                        </div>
                      );
                    })}

                  </div>
                )}

              </div>

            </div>

            {/* SAĞ TARAF */}
            <div>

              <div className="rounded-3xl bg-white p-8 shadow-sm">

                <h2 className="mb-8 text-2xl font-bold text-slate-900">
                  İhale Bilgileri
                </h2>

                <div className="space-y-7">

                  <div className="flex gap-4">

                    <FileText
                      className="mt-1 shrink-0 text-blue-700"
                    />

                    <div>
                      <p className="font-semibold text-slate-900">
                        İhale Numarası
                      </p>

                      <p className="mt-1 text-slate-600">
                        {tender.tender_number}
                      </p>
                    </div>

                  </div>

                  <div className="flex gap-4">

                    <CalendarDays
                      className="mt-1 shrink-0 text-blue-700"
                    />

                    <div>
                      <p className="font-semibold text-slate-900">
                        Yayın Tarihi
                      </p>

                      <p className="mt-1 text-slate-600">
                        {formatDate(
                          tender.publish_date
                        )}
                      </p>
                    </div>

                  </div>

                  <div className="flex gap-4">

                    <CalendarDays
                      className="mt-1 shrink-0 text-blue-700"
                    />

                    <div>
                      <p className="font-semibold text-slate-900">
                        Son Başvuru
                      </p>

                      <p className="mt-1 text-slate-600">
                        {formatDate(tender.deadline)}
                      </p>
                    </div>

                  </div>

                  <div className="flex gap-4">

                    <FileText
                      className="mt-1 shrink-0 text-blue-700"
                    />

                    <div>
                      <p className="font-semibold text-slate-900">
                        Durum
                      </p>

                      <p className="mt-1 text-slate-600">
                        {tender.status === "ACTIVE"
                          ? "Açık"
                          : "Sonuçlandı"}
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>
    </>
  );
};

export default TenderDetailPage;