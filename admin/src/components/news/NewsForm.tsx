import { useEffect, useState } from "react";
import type { News } from "../../data/newsData";
import { ImagePlus } from "lucide-react";
import { uploadImage } from "../../services/uploadService";
import MediaPicker from "../media/MediaPicker";
import type { Media } from "../../services/mediaService";

export interface NewsFormData {
  title: string;
  category: string;
  status: "Taslak" | "Yayında";
  summary: string;
  content: string;
  author: string;
  publishDate: string;
  image: string;
}

interface NewsFormProps {
  onCancel: () => void;
  onSave: (data: NewsFormData) => void;
  initialData?: News | null;
  isEditing?: boolean;
}

const categories = [
  "Projeler",
  "Duyuru",
  "Etkinlik",
  "Spor",
  "Kültür",
  "Sosyal Yardım",
  "Çevre",
  "Ulaşım",
  "Eğitim",
  "Diğer",
];

const NewsForm = ({
  onCancel,
  onSave,
  initialData,
  isEditing,
}: NewsFormProps) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] =
    useState<"Taslak" | "Yayında">("Taslak");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("Admin");
  const [publishDate, setPublishDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] =
    useState<Media | null>(null);

  useEffect(() => {
    if (initialData && isEditing) {
      setTitle(initialData.title ?? "");
      setCategory(initialData.category ?? "");
      setStatus(initialData.status ?? "Taslak");
      setSummary(initialData.summary ?? "");
      setContent(initialData.content ?? "");
      setAuthor(initialData.author ?? "Admin");

      setPublishDate(
        initialData.publishDate ??
          new Date().toISOString().split("T")[0]
      );

      setImage(initialData.image ?? "");
      setPreview(initialData.image ?? "");
      setSelectedMedia(null);
    } else {
      setTitle("");
      setCategory("");
      setStatus("Taslak");
      setSummary("");
      setContent("");
      setAuthor("Admin");

      setPublishDate(
        new Date().toISOString().split("T")[0]
      );

      setImage("");
      setPreview("");
      setSelectedMedia(null);
    }
  }, [initialData, isEditing]);

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (
      ![
        "image/jpeg",
        "image/png",
        "image/webp",
      ].includes(file.type)
    ) {
      alert(
        "Sadece JPG, JPEG ve WEBP dosyaları yüklenebilir."
      );
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Dosya boyutu maksimum 5 MB olabilir.");
      e.target.value = "";
      return;
    }

    const objectUrl = URL.createObjectURL(file);

    setPreview(objectUrl);
    setSelectedMedia(null);

    try {
      const response = await uploadImage(
        file,
        "news"
      );

      setImage(response.path);
    } catch (err) {
      console.error(err);

      URL.revokeObjectURL(objectUrl);
      setPreview("");
      setImage("");

      alert("Fotoğraf yüklenemedi.");
    }
  };

  const handleMediaSelect = (media: Media) => {
    setSelectedMedia(media);

    setImage(media.file_path);

    setPreview(
      `http://127.0.0.1:8000${media.file_path}`
    );

    setMediaPickerOpen(false);
  };

  const clearSelectedImage = () => {
    setImage("");
    setPreview("");
    setSelectedMedia(null);
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("Başlık zorunludur.");
      return;
    }

    if (!category) {
      alert("Kategori seçiniz.");
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

    onSave({
      title,
      category,
      status,
      summary,
      content,
      author,
      publishDate,
      image,
    });
  };

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => e.preventDefault()}
    >
      <div>
        <label className="mb-2 block font-medium text-slate-700">
          Haber Başlığı
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Haber başlığı..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Kategori
          </label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
          >
            <option value="">
              Kategori Seçiniz
            </option>

            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Durum
          </label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value as
                  | "Taslak"
                  | "Yayında"
              )
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
          >
            <option value="Taslak">
              Taslak
            </option>

            <option value="Yayında">
              Yayında
            </option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Yazar
          </label>

          <input
            type="text"
            value={author}
            onChange={(e) =>
              setAuthor(e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Yayın Tarihi
          </label>

          <input
            type="date"
            value={publishDate}
            onChange={(e) =>
              setPublishDate(e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block font-medium text-slate-700">
          Kapak Fotoğrafı
        </label>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label
            htmlFor="news-image"
            className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 transition hover:border-blue-500 hover:bg-blue-50"
          >
            <ImagePlus
              size={42}
              className="mb-3 text-blue-600"
            />

            <p className="font-semibold text-slate-700">
              Bilgisayardan Yükle
            </p>

            <p className="mt-2 text-sm text-slate-500">
              JPG, PNG veya WEBP
            </p>
          </label>

          <button
            type="button"
            onClick={() =>
              setMediaPickerOpen(true)
            }
            className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 transition hover:border-blue-500 hover:bg-blue-50"
          >
            <ImagePlus
              size={42}
              className="mb-3 text-blue-600"
            />

            <p className="font-semibold text-slate-700">
              Medyadan Seç
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Medya kütüphanesinden seç
            </p>
          </button>
        </div>

        <input
          id="news-image"
          type="file"
          accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
          onChange={handleImageChange}
          className="hidden"
        />

        {preview && (
          <div className="relative mt-5">
            <img
              src={
                preview.startsWith("http")
                  ? preview
                  : `http://127.0.0.1:8000${preview}`
              }
              alt="Önizleme"
              className="h-64 w-full rounded-2xl border object-cover"
            />

            <button
              type="button"
              onClick={clearSelectedImage}
              className="absolute right-3 top-3 rounded-xl bg-black/70 px-3 py-2 text-sm font-medium text-white transition hover:bg-black"
            >
              Fotoğrafı Kaldır
            </button>

            {selectedMedia && (
              <div className="mt-2 text-sm text-slate-500">
                Medya kütüphanesinden seçildi:{" "}
                <span className="font-medium">
                  {selectedMedia.file_name}
                </span>
              </div>
            )}
          </div>
        )}

        <MediaPicker
          isOpen={mediaPickerOpen}
          onClose={() =>
            setMediaPickerOpen(false)
          }
          onSelect={handleMediaSelect}
        />
      </div>

      <div>
        <label className="mb-2 block font-medium text-slate-700">
          Haber Özeti
        </label>

        <textarea
          rows={4}
          value={summary}
          onChange={(e) =>
            setSummary(e.target.value)
          }
          placeholder="Kısa özet..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium text-slate-700">
          Haber İçeriği
        </label>

        <textarea
          rows={10}
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          placeholder="Haber içeriğini yazın..."
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

export default NewsForm;