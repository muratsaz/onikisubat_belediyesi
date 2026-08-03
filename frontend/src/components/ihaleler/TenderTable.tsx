import {
  CalendarDays,
  FileText,
  ArrowRight,
  Building2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export interface Tender {
  id: number;
  title: string;
  department: string;
  publishDate: string;
  deadline: string;

  status: "Açık" | "Sonuçlandı";

  tenderNo: string;
  method: string;
  budget: string;
  location: string;
  description: string;
  pdf: string;
}

interface TenderTableProps {
  tenders: Tender[];
}

const TenderTable = ({ tenders }: TenderTableProps) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Başlık */}
      <div className="hidden bg-slate-100 px-8 py-5 font-bold text-slate-700 lg:grid lg:grid-cols-[3fr_1.3fr_1.3fr_.9fr_2fr]">
        <div>İhale Bilgileri</div>
        <div className="text-center">Yayın Tarihi</div>
        <div className="text-center">Son Başvuru</div>
        <div className="text-center">Durum</div>
        <div className="text-center">İşlemler</div>
      </div>

      {tenders.map((tender) => (
        <motion.div
          key={tender.id}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="border-t border-slate-200 px-8 py-7 transition hover:bg-slate-50 lg:grid lg:grid-cols-[3fr_1.3fr_1.3fr_.9fr_2fr] lg:items-center"
        >
          {/* Mobil */}
          <div className="space-y-5 lg:hidden">

            <div>
              <Link
                to={`/ihaleler/${tender.id}`}
                className="text-xl font-bold text-slate-800 hover:text-blue-700"
              >
                {tender.title}
              </Link>

              <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                <Building2 size={16} />
                {tender.department}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">

              <div>
                <p className="font-semibold text-slate-500">
                  Yayın Tarihi
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <CalendarDays
                    size={16}
                    className="text-blue-700"
                  />
                  {tender.publishDate}
                </div>
              </div>

              <div>
                <p className="font-semibold text-slate-500">
                  Son Başvuru
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <CalendarDays
                    size={16}
                    className="text-blue-700"
                  />
                  {tender.deadline}
                </div>
              </div>

            </div>

            <span
              className={`inline-flex rounded-full px-4 py-2 text-xs font-bold ${
                tender.status === "Açık"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {tender.status}
            </span>

            <div className="flex gap-3">

              <a
                href={tender.pdf}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
              >
                <FileText size={18} />
                Şartname
              </a>

              <Link
                to={`/ihaleler/${tender.id}`}
                className="flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
              >
                Detayı Gör
                <ArrowRight size={18} />
              </Link>

            </div>

          </div>

          {/* Desktop */}

          <div className="hidden lg:block">

            <Link
              to={`/ihaleler/${tender.id}`}
              className="text-xl font-bold text-slate-800 transition hover:text-blue-700"
            >
              {tender.title}
            </Link>

            <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
              <Building2 size={16} />
              {tender.department}
            </div>

          </div>

          <div className="hidden justify-center lg:flex">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <CalendarDays
                size={16}
                className="text-blue-700"
              />
              {tender.publishDate}
            </div>
          </div>

          <div className="hidden justify-center lg:flex">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <CalendarDays
                size={16}
                className="text-blue-700"
              />
              {tender.deadline}
            </div>
          </div>

          <div className="hidden justify-center lg:flex">
            <span
              className={`rounded-full px-4 py-2 text-xs font-bold ${
                tender.status === "Açık"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {tender.status}
            </span>
          </div>

          <div className="hidden justify-center gap-3 lg:flex">

            <a
              href={tender.pdf}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold transition hover:border-blue-600 hover:bg-blue-50"
            >
              <FileText size={18} />
              Şartname
            </a>

            <Link
              to={`/ihaleler/${tender.id}`}
              className="flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              Detayı Gör
              <ArrowRight size={18} />
            </Link>

          </div>

        </motion.div>
      ))}

      {tenders.length === 0 && (
        <div className="py-20 text-center">

          <h3 className="text-2xl font-bold text-slate-700">
            İhale Bulunamadı
          </h3>

          <p className="mt-3 text-slate-500">
            Arama kriterlerinize uygun ihale bulunamadı.
          </p>

        </div>
      )}
    </div>
  );
};

export default TenderTable;