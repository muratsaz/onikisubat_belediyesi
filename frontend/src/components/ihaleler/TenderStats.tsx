import {
  FileText,
  FolderOpen,
  CheckCircle2,
} from "lucide-react";

interface TenderStatsProps {
  total: number;
  open: number;
  closed: number;
}

const TenderStats = ({
  total,
  open,
  closed,
}: TenderStatsProps) => {
  const stats = [
    {
      title: "Toplam İhale",
      value: total,
      icon: FileText,
      color: "text-blue-700 bg-blue-100",
    },
    {
      title: "Açık İhale",
      value: open,
      icon: FolderOpen,
      color: "text-emerald-700 bg-emerald-100",
    },
    {
      title: "Sonuçlanan",
      value: closed,
      icon: CheckCircle2,
      color: "text-orange-700 bg-orange-100",
    },
  ];

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-3">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div
              className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}
            >
              <Icon size={28} />
            </div>

            <h3 className="text-sm font-semibold text-slate-500">
              {item.title}
            </h3>

            <p className="mt-2 text-4xl font-black text-slate-900">
              {item.value}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default TenderStats;