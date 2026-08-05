import {
  Pencil,
  Trash2,
  BadgeCheck,
  Clock3,
} from "lucide-react";

import type { Announcement } from "../../data/announcementData";

interface AnnouncementTableProps {
  announcements: Announcement[];
  onEdit: (item: Announcement) => void;
  onDelete: (id: number) => void;
}

const AnnouncementTable = ({
  announcements,
  onEdit,
  onDelete,
}: AnnouncementTableProps) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr className="text-left text-sm text-slate-600">
            <th className="px-6 py-4">Başlık</th>
            <th className="px-6 py-4">Kategori</th>
            <th className="px-6 py-4">Durum</th>
            <th className="px-6 py-4">Yayın Tarihi</th>
            <th className="px-6 py-4 text-center">İşlemler</th>
          </tr>
        </thead>

        <tbody>
          {announcements.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="py-12 text-center text-slate-500"
              >
                Henüz duyuru bulunmuyor.
              </td>
            </tr>
          ) : (
            announcements.map((item) => (
              <tr
                key={item.id}
                className="border-t hover:bg-slate-50"
              >
                <td className="px-6 py-5">
                  <div className="font-semibold">
                    {item.title}
                  </div>

                  <div className="mt-1 text-sm text-slate-500 line-clamp-1">
                    {item.summary}
                  </div>
                </td>

                <td className="px-6 py-5">
                  {item.category}
                </td>

                <td className="px-6 py-5">
                  {item.status === "Yayında" ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                      <BadgeCheck size={15} />
                      Yayında
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-700">
                      <Clock3 size={15} />
                      Taslak
                    </span>
                  )}
                </td>

                <td className="px-6 py-5">
                  {item.publishDate}
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(item)}
                      className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(item.id)}
                      className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
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

export default AnnouncementTable;