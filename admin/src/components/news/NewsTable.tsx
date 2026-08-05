import { Pencil, Trash2 } from "lucide-react";
import type { News } from "../../data/newsData";

interface NewsTableProps {
  news: News[];
  onEdit: (item: News) => void;
  onDelete: (id: number) => void;
}

const NewsTable = ({
  news,
  onEdit,
  onDelete,
}: NewsTableProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Haber Listesi
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Sistemde kayıtlı tüm haberler
          </p>
        </div>

        <span className="rounded-lg bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
          Toplam {news.length} Haber
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                ID
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Görsel
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Başlık
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Kategori
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Durum
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Yazar
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Yayın Tarihi
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                İşlemler
              </th>
            </tr>
          </thead>

          <tbody>
            {news.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-12 text-center text-slate-500"
                >
                  Henüz haber eklenmedi.
                </td>
              </tr>
            ) : (
              news.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-slate-100 transition hover:bg-slate-50"
                >
                  <td className="px-6 py-4 font-medium">
                    #{item.id}
                  </td>

                  <td className="px-6 py-4">
                    {item.image ? (
                      <img
                        src={
                          typeof item.image === "string"
                            ? item.image
                            : URL.createObjectURL(item.image)
                        }
                        alt={item.title}
                        className="h-16 w-24 rounded-lg border object-cover"
                      />
                    ) : (
                      <div className="flex h-16 w-24 items-center justify-center rounded-lg bg-slate-100 text-xs text-slate-400">
                        Görsel Yok
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-slate-800">
                        {item.title}
                      </p>

                      <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                        {item.summary}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {item.category}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.status === "Yayında"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {item.author}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4">
                    {item.publishDate}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        type="button"
                        title="Düzenle"
                        onClick={() => onEdit(item)}
                        className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-100"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        type="button"
                        title="Sil"
                        onClick={() => onDelete(item.id)}
                        className="rounded-lg p-2 text-red-600 transition hover:bg-red-100"
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
    </div>
  );
};

export default NewsTable;