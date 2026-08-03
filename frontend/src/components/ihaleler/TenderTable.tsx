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
  status: string;
}

interface TenderTableProps {
  tenders: Tender[];
}

const TenderTable = ({ tenders }: TenderTableProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Başlık */}
      <div className="grid grid-cols-12 bg-slate-100 px-6 py-4 font-semibold text-slate-700">
        <div className="col-span-5">İhale Bilgileri</div>
        <div className="col-span-2 text-center">Yayın Tarihi</div>
        <div className="col-span-2 text-center">Son Başvuru</div>
        <div className="col-span-1 text-center">Durum</div>
        <div className="col-span-2 text-center">İşlemler</div>
      </div>

      {/* Satırlar */}
      {tenders.map((tender) => (
        <motion.div
          key={tender.id}
          whileHover={{
            backgroundColor: "#f8fafc",
          }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-12 items-center border-t border-slate-200 px-6 py-5"
        >
          {/* İhale Bilgisi */}
          <div className="col-span-5">
            <Link
              to={`/ihaleler/${tender.id}`}
              className="text-lg font-semibold text-slate-800 transition hover:text-blue-700"
            >
              {tender.title}
            </Link>

            <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
              <Building2 size={15} />
              <span>{tender.department}</span>
            </div>
          </div>

          {/* Yayın Tarihi */}
          <div className="col-span-2 flex justify-center">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <CalendarDays size={16} />
              <span>{tender.publishDate}</span>
            </div>
          </div>

          {/* Son Başvuru */}
          <div className="col-span-2 flex justify-center">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <CalendarDays size={16} />
              <span>{tender.deadline}</span>
            </div>
          </div>

          {/* Durum */}
          <div className="col-span-1 flex justify-center">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                tender.status === "Açık"
                  ? "bg-emerald-100 text-emerald-700"
                  : tender.status === "Sonuçlandı"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {tender.status}
            </span>
          </div>

          {/* İşlemler */}
          <div className="col-span-2 flex justify-center gap-2">

            {/* PDF */}
            <button
              title="Şartname (Yakında)"
              className="rounded-lg border border-slate-300 p-2 transition hover:bg-slate-100"
            >
              <FileText size={18} />
            </button>

            {/* Detay */}
            <Link
              to={`/ihaleler/${tender.id}`}
              title="Detayları Gör"
              className="rounded-lg bg-blue-700 p-2 text-white transition hover:bg-blue-800"
            >
              <ArrowRight size={18} />
            </Link>

          </div>
        </motion.div>
      ))}

      {/* Veri Yok */}
      {tenders.length === 0 && (
        <div className="py-16 text-center">
          <h3 className="text-xl font-semibold text-slate-700">
            İhale Bulunamadı
          </h3>

          <p className="mt-2 text-slate-500">
            Arama kriterlerinize uygun ihale bulunamadı.
          </p>
        </div>
      )}
    </div>
  );
};

export default TenderTable;