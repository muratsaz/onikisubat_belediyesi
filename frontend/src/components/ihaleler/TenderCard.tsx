import { motion } from "framer-motion";
import {
  CalendarDays,
  Building2,
  FileText,
  ArrowRight,
  CircleDot,
} from "lucide-react";

interface TenderCardProps {
  id: number;
  title: string;
  department: string;
  tenderNo: string;
  publishDate: string;
  deadline: string;
  method: string;
  status: "Açık" | "Kapandı";
}

const TenderCard = ({
  title,
  department,
  tenderNo,
  publishDate,
  deadline,
  method,
  status,
}: TenderCardProps) => {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Üst Bilgiler */}
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 bg-slate-50 p-4">

        <span className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
          #{tenderNo}
        </span>

        <span className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
          <CalendarDays size={15} />
          {publishDate}
        </span>

        <span className="rounded-full bg-slate-900 px-4 py-1 text-sm font-medium text-white">
          {method}
        </span>

        <span
          className={`ml-auto flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${
            status === "Açık"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          <CircleDot size={12} />
          {status}
        </span>
      </div>

      {/* İçerik */}
      <div className="space-y-6 p-6">

        <div>
          <h3 className="text-2xl font-bold leading-snug text-slate-800">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-2 text-slate-600">
          <Building2 size={18} className="text-blue-700" />
          <span>{department}</span>
        </div>

        <div className="grid gap-4 border-t border-slate-100 pt-5 md:grid-cols-2">

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Son Teklif Tarihi
            </p>

            <p className="mt-1 font-semibold text-slate-700">
              {deadline}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">
              İhale No
            </p>

            <p className="mt-1 font-semibold text-slate-700">
              {tenderNo}
            </p>
          </div>

        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-6">

          <button className="flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800">
            <FileText size={18} />
            Şartname PDF
          </button>

          <button className="flex items-center gap-2 rounded-xl border border-blue-700 px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-700 hover:text-white">
            Detayları Gör
            <ArrowRight size={18} />
          </button>

        </div>

      </div>
    </motion.article>
  );
};

export default TenderCard;