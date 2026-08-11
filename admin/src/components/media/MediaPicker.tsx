import { useEffect, useState } from "react";
import { Check, Image, X } from "lucide-react";
import {
  getAllMedia,
  type Media,
} from "../../services/mediaService";

interface MediaPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (media: Media) => void;
  selectedMediaId?: number | null;
}

const API_URL = "http://127.0.0.1:8000";

const MediaPicker = ({
  isOpen,
  onClose,
  onSelect,
  selectedMediaId = null,
}: MediaPickerProps) => {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<
    "all" | "genel" | "kurumsal"
  >("all");
  const [selectedId, setSelectedId] = useState<number | null>(
    selectedMediaId
  );

  useEffect(() => {
    if (!isOpen) return;

    const loadMedia = async () => {
      try {
        setLoading(true);

        const data =
          category === "all"
            ? await getAllMedia()
            : await getAllMedia(category);

        setMedia(data);
      } catch (error) {
        console.error("Medya listesi alınamadı:", error);
        alert("Medya listesi alınamadı.");
      } finally {
        setLoading(false);
      }
    };

    loadMedia();
  }, [isOpen, category]);

  useEffect(() => {
    setSelectedId(selectedMediaId ?? null);
  }, [selectedMediaId, isOpen]);

  if (!isOpen) {
    return null;
  }

  const selectedMedia = media.find(
    (item) => item.id === selectedId
  );

  const handleSelect = () => {
    if (!selectedMedia) {
      alert("Lütfen bir medya seçin.");
      return;
    }

    onSelect(selectedMedia);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Medya Seç
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Web sitesinde kullanmak istediğiniz görseli seçin.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Categories */}
        <div className="border-b border-slate-200 px-6 py-4">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCategory("all")}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                category === "all"
                  ? "bg-blue-700 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Tümü
            </button>

            <button
              type="button"
              onClick={() => setCategory("genel")}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                category === "genel"
                  ? "bg-blue-700 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Genel
            </button>

            <button
              type="button"
              onClick={() => setCategory("kurumsal")}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                category === "kurumsal"
                  ? "bg-blue-700 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Kurumsal
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="min-h-0 flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex min-h-64 items-center justify-center text-sm text-slate-500">
              Medyalar yükleniyor...
            </div>
          ) : media.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300">
              <Image className="mb-3 h-12 w-12 text-slate-300" />

              <p className="font-medium text-slate-700">
                Bu kategoride medya bulunamadı.
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Önce Medya bölümünden bir görsel yükleyebilirsiniz.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {media.map((item) => {
                const isSelected = selectedId === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    className={`group overflow-hidden rounded-2xl border-2 bg-white text-left transition ${
                      isSelected
                        ? "border-blue-600 shadow-lg"
                        : "border-slate-200 hover:border-blue-300 hover:shadow-md"
                    }`}
                  >
                    <div className="relative aspect-video overflow-hidden bg-slate-100">
                      <img
                        src={`${API_URL}${item.file_path}`}
                        alt={item.file_name}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />

                      {isSelected && (
                        <div className="absolute inset-0 flex items-center justify-center bg-blue-700/30">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-white shadow-lg">
                            <Check className="h-5 w-5" />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-3">
                      <p
                        className="truncate text-sm font-medium text-slate-800"
                        title={item.file_name}
                      >
                        {item.file_name}
                      </p>

                      <p className="mt-1 text-xs capitalize text-slate-500">
                        {item.category}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
          <div className="text-sm text-slate-500">
            {selectedMedia
              ? `Seçilen: ${selectedMedia.file_name}`
              : "Henüz medya seçilmedi"}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              İptal
            </button>

            <button
              type="button"
              onClick={handleSelect}
              disabled={!selectedMedia}
              className="rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Medyayı Seç
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaPicker;