import { useState, useEffect } from "react";

export interface NewsFormData {
  title: string;
  category: string;
  status: "Taslak" | "Yayında";
  summary: string;
  content: string;
}

interface NewsFormProps {
  onCancel: () => void;
  onSave: (data: NewsFormData) => void;
  // Ana sayfadan (NewsPage) gönderilen propları burada karşılıyoruz
  initialData?: any; 
  isEditing?: boolean;
}

const NewsForm = ({
  onCancel,
  onSave,
  initialData,
  isEditing,
}: NewsFormProps) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState<"Taslak" | "Yayında">("Taslak");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

  // Düzenleme modunda modal açıldığında, form alanlarını mevcut verilerle doldurur
  useEffect(() => {
    if (initialData && isEditing) {
      setTitle(initialData.title || "");
      setCategory(initialData.category || "");
      setStatus(initialData.status || "Taslak");
      setSummary(initialData.summary || "");
      setContent(initialData.content || "");
    } else {
      // Yeni haber eklenirken formu temizler
      setTitle("");
      setCategory("");
      setStatus("Taslak");
      setSummary("");
      setContent("");
    }
  }, [initialData, isEditing]);

  const handleSubmit = () => {
    onSave({
      title,
      category,
      status,
      summary,
      content,
    });

    // Kaydettikten sonra state'i sıfırlama (Modal zaten kapanacağı için opsiyoneldir)
    setTitle("");
    setCategory("");
    setStatus("Taslak");
    setSummary("");
    setContent("");
  };

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => e.preventDefault()}
    >
      {/* Başlık */}
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

      {/* Kategori + Durum */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Kategori
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Kategori..."
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
              setStatus(e.target.value as "Taslak" | "Yayında")
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
          >
            <option value="Taslak">Taslak</option>
            <option value="Yayında">Yayında</option>
          </select>
        </div>
      </div>

      {/* Özet */}
      <div>
        <label className="mb-2 block font-medium text-slate-700">
          Haber Özeti
        </label>
        <textarea
          rows={4}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Kısa özet..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
        />
      </div>

      {/* İçerik */}
      <div>
        <label className="mb-2 block font-medium text-slate-700">
          Haber İçeriği
        </label>
        <textarea
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Haber içeriğini yazın..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
        />
      </div>

      {/* Butonlar */}
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