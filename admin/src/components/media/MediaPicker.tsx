import { useEffect, useState } from "react";
import { Check, Image, X } from "lucide-react";

import {
  getAllMedia,
  type Media,
  type MediaCategory,
} from "../../services/mediaService";

interface MediaPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (media: Media) => void;
  selectedMediaId?: number | null;
  category?: MediaCategory;
}

const API_URL = "http://127.0.0.1:8000";

const categories: {
  label: string;
  value?: MediaCategory;
}[] = [
  {
    label: "Tümü",
    value: undefined,
  },
  {
    label: "Kurumsal",
    value: "kurumsal",
  },
  {
    label: "Genel",
    value: "genel",
  },
  {
    label: "Haberler",
    value: "haberler",
  },
  {
    label: "Projeler",
    value: "projeler",
  },
  {
    label: "Başkan",
    value: "baskan",
  },
];

const MediaPicker = ({
  isOpen,
  onClose,
  onSelect,
  selectedMediaId = null,
  category,
}: MediaPickerProps) => {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(
    selectedMediaId
  );

  const [selectedCategory, setSelectedCategory] = useState<
    MediaCategory | undefined
  >(category);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setSelectedCategory(category);
  }, [isOpen, category]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const loadMedia = async () => {
      try {
        setLoading(true);

        const data = await getAllMedia(selectedCategory);

        setMedia(data);
      } catch (error) {
        console.error("Medya listesi alınamadı:", error);
        alert("Medya listesi alınamadı.");
      } finally {
        setLoading(false);
      }
    };

    loadMedia();
  }, [isOpen, selectedCategory]);

  useEffect(() => {
    setSelectedId(selectedMediaId ?? null);
  }, [selectedMediaId, isOpen]);

  if (!isOpen) {
    return null;
  }

  const selectedMedia = media.find(
    (item) => item.id === selectedId
  );

  const handleCategoryChange = (
    newCategory: MediaCategory | undefined
  ) => {
    setSelectedCategory(newCategory);
    setSelectedId(null);
  };

  const handleSelect = () => {
    if (!selectedMedia) {
      alert("Lütfen bir medya seçin.");
      return;
    }

    onSelect(selectedMedia);
    onClose();
  };

  const selectedCategoryLabel =
    categories.find(
      (item) => item.value === selectedCategory
    )?.label ?? "Tümü";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
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

        {/* KATEGORİLER */}

        <div className="border-b border-slate-200 px-6 py-5">
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => {
              const isActive =
                selectedCategory === item.value;

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() =>
                    handleCategoryChange(item.value)
                  }
                  className={`rounded-xl border px-5 py-2.5 text-sm font-semibold transition ${
                    isActive
                      ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3">
            <p className="text-sm text-slate-600">
              <span className="font-semibold text-slate-800">
                {selectedCategoryLabel}
              </span>{" "}
              kategorisindeki medyalar gösteriliyor.
            </p>
          </div>
        </div>

        {/* CONTENT */}

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

              <p className="mt-1 text-center text-sm text-slate-500">
                Farklı bir kategori seçebilir veya önce medya
                yükleyebilirsiniz.
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
                    onClick={() =>
                      setSelectedId(item.id)
                    }
                    className={`group overflow-hidden rounded-2xl border-2 bg-white text-left transition ${
                      isSelected
                        ? "border-blue-600 shadow-lg"
                        : "border-slate-200 hover:border-blue-300 hover:shadow-md"
                    }`}
                  >
                    {/* IMAGE */}

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

                    {/* INFO */}

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

        {/* FOOTER */}

        <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
          <div className="min-w-0 flex-1 pr-4 text-sm text-slate-500">
            {selectedMedia ? (
              <span className="block truncate">
                Seçilen: {selectedMedia.file_name}
              </span>
            ) : (
              "Henüz medya seçilmedi"
            )}
          </div>

          <div className="flex shrink-0 gap-3">
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