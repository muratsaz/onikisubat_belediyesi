import {
  Pencil,
  Trash2,
} from "lucide-react";

import type { Project } from "../../data/projectData";

interface ProjectTableProps {
  projects: Project[];
  onEdit: (item: Project) => void;
  onDelete: (id: number) => void;
}

const ProjectTable = ({
  projects,
  onEdit,
  onDelete,
}: ProjectTableProps) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr className="text-left text-sm text-slate-600">
            <th className="px-6 py-4">Başlık</th>
            <th className="px-6 py-4">Konum</th>
            <th className="px-6 py-4">Proje Durumu</th>
            <th className="px-6 py-4">Yayın Tarihi</th>
            <th className="px-6 py-4 text-center">İşlemler</th>
          </tr>
        </thead>

        <tbody>
          {projects.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="py-12 text-center text-slate-500"
              >
                Henüz proje bulunmuyor.
              </td>
            </tr>
          ) : (
            projects.map((item) => (
              <tr
                key={item.id}
                className="border-t hover:bg-slate-50"
              >
                <td className="px-6 py-5">
                  <div className="font-semibold">
                    {item.title}
                  </div>

                  <div className="mt-1 line-clamp-1 text-sm text-slate-500">
                    {item.summary}
                  </div>
                </td>

                <td className="px-6 py-5">
                  {item.location}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                      item.status === "Tamamlandı"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Devam Ediyor"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {item.status}
                  </span>
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

export default ProjectTable;