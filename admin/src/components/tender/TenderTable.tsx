import {
  Pencil,
  Trash2,
} from "lucide-react";

import type { Tender } from "../../services/tenderService";

interface TenderTableProps {
  tenders: Tender[];
  onEdit: (item: Tender) => void;
  onDelete: (id: number) => void;
}

const formatDate = (date: string) => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const formatStatus = (status: string) => {
  switch (status.toUpperCase()) {
    case "ACTIVE":
      return "Açık";

    case "CLOSED":
      return "Sonuçlandı";

    default:
      return status;
  }
};

const TenderTable = ({
  tenders,
  onEdit,
  onDelete,
}: TenderTableProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-100 text-sm font-bold text-slate-700">
            <th className="px-6 py-5">
              İhale Başlığı
            </th>

            <th className="px-6 py-5">
              İhale No
            </th>

            <th className="px-6 py-5">
              Yayın Tarihi
            </th>

            <th className="px-6 py-5">
              Son Başvuru
            </th>

            <th className="px-6 py-5">
              Durum
            </th>

            <th className="px-6 py-5 text-center">
              İşlemler
            </th>
          </tr>
        </thead>

        <tbody>
          {tenders.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="py-12 text-center text-slate-500"
              >
                Henüz ihale bulunmuyor.
              </td>
            </tr>
          ) : (
            tenders.map((item) => (
              <tr
                key={item.id}
                className="border-t border-slate-200 hover:bg-slate-50"
              >
                <td className="px-6 py-5">
                  <div className="font-semibold text-slate-800">
                    {item.title}
                  </div>

                  {item.description && (
                    <div className="mt-1 line-clamp-1 text-sm text-slate-500">
                      {item.description}
                    </div>
                  )}
                </td>

                <td className="px-6 py-5">
                  {item.tender_number}
                </td>

                <td className="px-6 py-5">
                  {formatDate(item.publish_date)}
                </td>

                <td className="px-6 py-5">
                  {formatDate(item.deadline)}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                      item.status.toUpperCase() === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {formatStatus(item.status)}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(item)}
                      className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                      title="Düzenle"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(item.id)}
                      className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                      title="Sil"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TenderTable;