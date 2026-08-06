import { useEffect, useState } from "react";
import type { Project } from "../../data/projectData";
import { ImagePlus } from "lucide-react";
import { uploadImage } from "../../services/uploadService";

export interface ProjectFormData {
  title: string;
  summary: string;
  content: string;
  image: string;
  location: string;
  status: "Planlanıyor" | "Devam Ediyor" | "Tamamlandı";
  publishDate: string;
  isPublished: boolean;
}

interface ProjectFormProps {
  onCancel: () => void;
  onSave: (data: ProjectFormData) => void;
  initialData?: Project | null;
  isEditing?: boolean;
}

const ProjectForm = ({
  onCancel,
  onSave,
  initialData,
  isEditing,
}: ProjectFormProps) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState<"Planlanıyor" | "Devam Ediyor" | "Tamamlandı">("Planlanıyor");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [publishDate, setPublishDate] = useState(new Date().toISOString().split("T")[0]);
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (initialData && isEditing) {
      setTitle(initialData.title ?? "");
      setLocation(initialData.location ?? "");
      setStatus(
        (initialData.status as "Planlanıyor" | "Devam Ediyor" | "Tamamlandı") ?? "Planlanıyor"
      );
      setSummary(initialData.summary ?? "");
      setContent(initialData.content ?? "");
      setPublishDate(
        initialData.publishDate ?? new Date().toISOString().split("T")[0]
      );
      setImage(initialData.image ?? "");
      setPreview(initialData.image ?? "");
    } else {
      setTitle("");
      setLocation("");
      setStatus("Planlanıyor");
      setSummary("");
      setContent("");
      setPublishDate(new Date().toISOString().split("T")[0]);
      setImage("");
      setPreview("");
    }
  }, [initialData, isEditing]);

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));

    try {
      const response = await uploadImage(file, "projects");
      setImage(response.path);
    } catch (err) {
      console.error(err);
      alert("Fotoğraf yüklenemedi.");
    }
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("Proje başlığı zorunludur.");
      return;
    }

    if (!location.trim()) {
      alert("Konum zorunludur.");
      return;
    }

    if (!summary.trim()) {
      alert("Özet zorunludur.");
      return;
    }

    if (!content.trim()) {
      alert("İçerik zorunludur.");
      return;
    }

    if (!image) {
      alert("Proje fotoğrafı zorunludur.");
      return;
    }

    onSave({
      title,
      summary,
      content,
      image,
      location,
      status,
      publishDate,
      isPublished: true,
    });
  };

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label className="mb-2 block font-medium text-slate-700">
          Proje Başlığı
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Proje başlığı..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Konum
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Proje konumu..."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Durum
          </label>
          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value as "Planlanıyor" | "Devam Ediyor" | "Tamamlandı"
              )
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
          >
            <option value="Planlanıyor">Planlanıyor</option>
            <option value="Devam Ediyor">Devam Ediyor</option>
            <option value="Tamamlandı">Tamamlandı</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-2 block font-medium text-slate-700">
          Yayın Tarihi
        </label>
        <input
          type="date"
          value={publishDate}
          onChange={(e) => setPublishDate(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium text-slate-700">
          Proje Fotoğrafı
        </label>
        <label
          htmlFor="project-image"
          className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 transition hover:border-blue-500 hover:bg-blue-50"
        >
          <ImagePlus size={48} className="mb-3 text-blue-600" />
          <p className="font-semibold text-slate-700">Proje Fotoğrafı Seç</p>
          <p className="mt-2 text-sm text-slate-500">JPG, PNG veya WEBP</p>
        </label>
        <input
          id="project-image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        {preview && (
          <div className="mt-5">
            <img
              src={preview}
              alt="Önizleme"
              className="h-64 w-full rounded-2xl border object-cover"
            />
          </div>
        )}
      </div>

      <div>
        <label className="mb-2 block font-medium text-slate-700">
          Proje Özeti
        </label>
        <textarea
          rows={4}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Kısa özet..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium text-slate-700">
          Proje İçeriği
        </label>
        <textarea
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Proje içeriğini yazın..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
        />
      </div>

      <div className="flex justify-end gap-4 border-t border-slate-200 pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-slate-300 px-6 py-3 transition hover:bg-slate-100"
        >
          İptal
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-xl bg-blue-700 px-6 py-3 font-medium text-white transition hover:bg-blue-800"
        >
          {isEditing ? "Güncelle" : "Kaydet"}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;