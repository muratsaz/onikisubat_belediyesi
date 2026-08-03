import {
  ArrowLeft,
  Building2,
  CalendarDays,
  FileText,
  MapPin,
  Wallet,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import PageHeader from "../components/common/PageHeader";
import { tenderData } from "../components/ihaleler/tenderData";

const TenderDetailPage = () => {
  const { id } = useParams();

  const tender = tenderData.find(
    (item) => item.id === Number(id)
  );

  if (!tender) {
    return (
      <section className="py-24 text-center">
        <h2 className="text-4xl font-bold">
          İhale Bulunamadı
        </h2>

        <Link
          to="/ihaleler"
          className="mt-8 inline-flex rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white"
        >
          İhalelere Dön
        </Link>
      </section>
    );
  }

  const handleDownload = async () => {
    try {
      const response = await fetch(tender.pdf);

      if (!response.ok) {
        alert("Şartname dosyası bulunamadı.");
        return;
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = `${tender.tenderNo}.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch {
      alert("Şartname indirilemedi.");
    }
  };

  return (
    <>
      <PageHeader
        title={tender.title}
        section="İhaleler"
        description="İhale detay bilgileri"
      />

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

            {/* Sol */}
            <div className="rounded-3xl bg-white p-10 shadow-sm">

              <h1 className="text-4xl font-black text-slate-900">
                {tender.title}
              </h1>

              <p className="mt-8 leading-8 text-slate-600">
                {tender.description}
              </p>

            </div>

            {/* Sağ */}
            <div className="space-y-6">

              <div className="rounded-3xl bg-white p-8 shadow-sm">

                <h3 className="mb-6 text-2xl font-bold">
                  İhale Bilgileri
                </h3>

                <div className="space-y-5">

                  <div className="flex gap-3">
                    <FileText className="text-blue-700" />
                    <div>
                      <p className="font-semibold">
                        İhale No
                      </p>
                      <p>{tender.tenderNo}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Building2 className="text-blue-700" />
                    <div>
                      <p className="font-semibold">
                        Müdürlük
                      </p>
                      <p>{tender.department}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CalendarDays className="text-blue-700" />
                    <div>
                      <p className="font-semibold">
                        Yayın Tarihi
                      </p>
                      <p>{tender.publishDate}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CalendarDays className="text-blue-700" />
                    <div>
                      <p className="font-semibold">
                        Son Başvuru
                      </p>
                      <p>{tender.deadline}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Wallet className="text-blue-700" />
                    <div>
                      <p className="font-semibold">
                        Yaklaşık Maliyet
                      </p>
                      <p>{tender.budget}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <MapPin className="text-blue-700" />
                    <div>
                      <p className="font-semibold">
                        Yer
                      </p>
                      <p>{tender.location}</p>
                    </div>
                  </div>

                </div>

              </div>

              <button
                onClick={handleDownload}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-700 py-4 text-lg font-semibold text-white transition hover:bg-blue-800"
              >
                <FileText size={22} />
                Şartnameyi İndir
              </button>

            </div>

          </div>

        </div>
      </section>
    </>
  );
};

export default TenderDetailPage;