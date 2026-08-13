import { useEffect, useState } from "react";
import { Image, Trash2, Upload, X } from "lucide-react";

import {
  deleteMedia,
  getAllMedia,
  uploadMedia,
  type Media,
  type MediaCategory,
} from "../../services/mediaService";

const MediaPage = () => {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] =
    useState<MediaCategory>("genel");

  const [activeFilter, setActiveFilter] = useState<
    "all" | MediaCategory
  >("all");

  const loadMedia = async () => {
    try {
      setLoading(true);

      const data =
        activeFilter === "all"
          ? await getAllMedia()
          : await getAllMedia(activeFilter);

      setMedia(data);
    } catch (error) {
      console.error("Medya listesi alınamadı:", error);
      alert("Medya listesi alınamadı.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, [activeFilter]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert(
        "Sadece JPG, JPEG, PNG ve WEBP dosyaları yüklenebilir."
      );

      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Dosya boyutu maksimum 5 MB olabilir.");

      event.target.value = "";
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Lütfen bir dosya seçin.");
      return;
    }

    try {
      setUploading(true);

      await uploadMedia(
        selectedFile,
        selectedCategory
      );

      clearSelectedFile();

      await loadMedia();

      alert("Medya başarıyla yüklendi.");
    } catch (error) {
      console.error("Medya yüklenemedi:", error);
      alert("Medya yüklenirken bir hata oluştu.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Bu medyayı silmek istediğinize emin misiniz?"
    );

    if (!confirmed) return;

    try {
      await deleteMedia(id);

      setMedia((current) =>
        current.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Medya silinemedi:", error);
      alert("Medya silinirken bir hata oluştu.");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("tr-TR");
  };

  const getCategoryLabel = (
    category: MediaCategory
  ) => {
    switch (category) {
      case "kurumsal":
        return "Kurumsal";

      case "haberler":
        return "Haberler";

      case "projeler":
        return "Projeler";

      case "baskan":
        return "Başkan";

      case "genel":
      default:
        return "Genel";
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Medya
          </h1>

          <p className="mt-2 text-slate-500">
            Web sitesinde kullanılacak görselleri yönetin.
          </p>
        </div>
      </div>

      {/* UPLOAD */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-blue-50 p-3">
            <Upload className="h-5 w-5 text-blue-700" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Yeni Medya Yükle
            </h2>

            <p className="text-sm text-slate-500">
              JPG, JPEG, PNG veya WEBP — maksimum 5 MB
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end">
          {/* FILE */}
          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Görsel
            </label>

            <input
              type="file"
              accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-medium file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* CATEGORY */}
          <div className="w-full lg:w-48">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Kategori
            </label>

            <select
              value={selectedCategory}
              onChange={(event) =>
                setSelectedCategory(
                  event.target.value as MediaCategory
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="genel">Genel</option>
              <option value="kurumsal">Kurumsal</option>
              <option value="haberler">Haberler</option>
              <option value="projeler">Projeler</option>
              <option value="baskan">Başkan</option>
            </select>
          </div>

          {/* PREVIEW */}
          {previewUrl && (
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-slate-200">
              <img
                src={previewUrl}
                alt="Önizleme"
                className="h-full w-full object-cover"
              />

              <button
                type="button"
                onClick={clearSelectedFile}
                className="absolute right-1 top-1 rounded-full bg-black/70 p-1 text-white hover:bg-black"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* UPLOAD BUTTON */}
          <button
            type="button"
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className="rounded-xl bg-blue-700 px-6 py-3 font-medium text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {uploading ? "Yükleniyor..." : "Yükle"}
          </button>
        </div>
      </div>

      {/* MEDIA LIBRARY */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Medya Kütüphanesi
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Toplam {media.length} medya
            </p>
          </div>

          {/* FILTERS */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                activeFilter === "all"
                  ? "bg-blue-700 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              Tümü
            </button>

            <button
              type="button"
              onClick={() =>
                setActiveFilter("kurumsal")
              }
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                activeFilter === "kurumsal"
                  ? "bg-blue-700 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              Kurumsal
            </button>

            <button
              type="button"
              onClick={() =>
                setActiveFilter("genel")
              }
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                activeFilter === "genel"
                  ? "bg-blue-700 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              Genel
            </button>

            <button
              type="button"
              onClick={() =>
                setActiveFilter("haberler")
              }
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                activeFilter === "haberler"
                  ? "bg-blue-700 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              Haberler
            </button>

            <button
              type="button"
              onClick={() =>
                setActiveFilter("projeler")
              }
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                activeFilter === "projeler"
                  ? "bg-blue-700 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              Projeler
            </button>

            <button
              type="button"
              onClick={() =>
                setActiveFilter("baskan")
              }
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                activeFilter === "baskan"
                  ? "bg-blue-700 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              Başkan
            </button>
          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="py-16 text-center text-slate-500">
            Medyalar yükleniyor...
          </div>
        ) : media.length === 0 ? (
          /* EMPTY */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 py-16">
            <Image className="mb-4 h-12 w-12 text-slate-300" />

            <h3 className="text-lg font-semibold text-slate-700">
              Henüz medya yok
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Bu kategoride henüz medya bulunmuyor.
            </p>
          </div>
        ) : (
          /* MEDIA GRID */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {media.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="aspect-video overflow-hidden bg-slate-100">
                  <img
                    src={`http://127.0.0.1:8000${item.file_path}`}
                    alt={item.file_name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        item.category === "kurumsal"
                          ? "bg-purple-50 text-purple-700"
                          : item.category === "haberler"
                          ? "bg-blue-50 text-blue-700"
                          : item.category === "projeler"
                          ? "bg-emerald-50 text-emerald-700"
                          : item.category === "baskan"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {getCategoryLabel(item.category)}
                    </span>
                  </div>

                  <p
                    className="truncate font-medium text-slate-800"
                    title={item.file_name}
                  >
                    {item.file_name}
                  </p>

                  <div className="mt-2 space-y-1 text-xs text-slate-500">
                    <p>
                      Boyut:{" "}
                      {formatFileSize(item.file_size)}
                    </p>

                    <p>
                      Tarih:{" "}
                      {formatDate(item.created_at)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(item.id)
                    }
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaPage;