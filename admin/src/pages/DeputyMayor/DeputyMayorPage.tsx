import { useEffect, useRef, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Phone,
  UserRound,
  ImagePlus,
  X,
  Search,
  Loader2,
} from "lucide-react";

import {
  getDeputyMayors,
  createDeputyMayor,
  updateDeputyMayor,
  deleteDeputyMayor,
} from "../../services/deputyMayorService";

import type {
  DeputyMayor,
  DeputyMayorCreateData,
} from "../../services/deputyMayorService";

import api from "../../services/api";

interface FormData {
  name: string;
  phone: string;
  image: string | null;
}

const emptyForm: FormData = {
  name: "",
  phone: "",
  image: null,
};

const DeputyMayorPage = () => {
  const [deputyMayors, setDeputyMayors] = useState<DeputyMayor[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDeputyMayor, setEditingDeputyMayor] =
    useState<DeputyMayor | null>(null);

  const [form, setForm] = useState<FormData>(emptyForm);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [search, setSearch] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const API_URL = (
    api.defaults.baseURL || "http://localhost:8000"
  ).replace(/\/$/, "");

  const getImageUrl = (image: string | null) => {
    if (!image) {
      return null;
    }

    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    if (image.startsWith("/")) {
      return `${API_URL}${image}`;
    }

    return `${API_URL}/${image}`;
  };

  const loadDeputyMayors = async () => {
    try {
      setLoading(true);

      const data = await getDeputyMayors();

      setDeputyMayors(data);
    } catch (error) {
      console.error(
        "Başkan yardımcıları alınırken hata oluştu:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDeputyMayors();
  }, []);

  const openCreateModal = () => {
    setEditingDeputyMayor(null);
    setForm(emptyForm);
    setSelectedFile(null);
    setPreviewUrl(null);
    setIsModalOpen(true);
  };

  const openEditModal = (deputyMayor: DeputyMayor) => {
    setEditingDeputyMayor(deputyMayor);

    setForm({
      name: deputyMayor.name,
      phone: deputyMayor.phone,
      image: deputyMayor.image,
    });

    setSelectedFile(null);
    setPreviewUrl(getImageUrl(deputyMayor.image));

    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (saving) {
      return;
    }

    setIsModalOpen(false);
    setEditingDeputyMayor(null);
    setForm(emptyForm);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Lütfen bir görsel dosyası seçin.");
      return;
    }

    setSelectedFile(file);

    const objectUrl = URL.createObjectURL(file);

    setPreviewUrl(objectUrl);
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(
      "/upload/deputy_mayor",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.url;
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!form.name.trim()) {
      alert("Başkan yardımcısının adını girin.");
      return;
    }

    if (!form.phone.trim()) {
      alert("Telefon numarasını girin.");
      return;
    }

    try {
      setSaving(true);

      let image = form.image;

      if (selectedFile) {
        image = await uploadImage(selectedFile);
      }

      const data: DeputyMayorCreateData = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        image,
      };

      if (editingDeputyMayor) {
        await updateDeputyMayor(
          editingDeputyMayor.id,
          data
        );
      } else {
        await createDeputyMayor(data);
      }

      await loadDeputyMayors();

      closeModal();
    } catch (error) {
      console.error(
        "Başkan yardımcısı kaydedilirken hata oluştu:",
        error
      );

      alert(
        "Başkan yardımcısı kaydedilirken bir hata oluştu."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Bu başkan yardımcısını silmek istediğinize emin misiniz?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      await deleteDeputyMayor(id);

      setDeputyMayors((current) =>
        current.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error(
        "Başkan yardımcısı silinirken hata oluştu:",
        error
      );

      alert(
        "Başkan yardımcısı silinirken bir hata oluştu."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const filteredDeputyMayors = deputyMayors.filter(
    (deputyMayor) =>
      deputyMayor.name
        .toLocaleLowerCase("tr-TR")
        .includes(search.toLocaleLowerCase("tr-TR")) ||
      deputyMayor.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Başkan Yardımcıları
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Belediye başkan yardımcılarını buradan
            yönetebilirsiniz.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-blue-800"
        >
          <Plus size={20} />

          Yeni Başkan Yardımcısı
        </button>
      </div>

      {/* Search */}

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="İsim veya telefon ara..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Content */}

      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 text-slate-500">
            <Loader2
              size={24}
              className="animate-spin"
            />

            <span>Başkan yardımcıları yükleniyor...</span>
          </div>
        </div>
      ) : filteredDeputyMayors.length === 0 ? (
        <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 text-center shadow-sm">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
            <UserRound
              size={30}
              className="text-blue-600"
            />
          </div>

          <h2 className="text-lg font-semibold text-slate-900">
            Başkan yardımcısı bulunamadı
          </h2>

          <p className="mt-2 max-w-md text-sm text-slate-500">
            Henüz başkan yardımcısı eklenmemiş veya arama
            kriterinize uygun kayıt bulunamadı.
          </p>

          {!search && (
            <button
              type="button"
              onClick={openCreateModal}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-800"
            >
              <Plus size={18} />
              İlk Başkan Yardımcısını Ekle
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredDeputyMayors.map((deputyMayor) => {
            const imageUrl = getImageUrl(
              deputyMayor.image
            );

            return (
              <div
                key={deputyMayor.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                {/* Image */}

                <div className="relative h-64 overflow-hidden bg-slate-100">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={deputyMayor.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <UserRound
                        size={70}
                        strokeWidth={1.3}
                        className="text-slate-300"
                      />
                    </div>
                  )}

                  <div className="absolute right-3 top-3 rounded-lg bg-white/90 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur">
                    Başkan Yardımcısı
                  </div>
                </div>

                {/* Information */}

                <div className="p-5">
                  <h2 className="text-lg font-bold text-slate-900">
                    {deputyMayor.name}
                  </h2>

                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                    <Phone
                      size={17}
                      className="text-blue-600"
                    />

                    <span>{deputyMayor.phone}</span>
                  </div>

                  {/* Actions */}

                  <div className="mt-5 flex gap-3 border-t border-slate-100 pt-4">
                    <button
                      type="button"
                      onClick={() =>
                        openEditModal(deputyMayor)
                      }
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-blue-200 px-4 py-2.5 text-sm font-medium text-blue-700 transition hover:bg-blue-50"
                    >
                      <Pencil size={17} />
                      Düzenle
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(deputyMayor.id)
                      }
                      disabled={
                        deletingId === deputyMayor.id
                      }
                      className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deletingId === deputyMayor.id ? (
                        <Loader2
                          size={17}
                          className="animate-spin"
                        />
                      ) : (
                        <Trash2 size={17} />
                      )}

                      Sil
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingDeputyMayor
                    ? "Başkan Yardımcısını Düzenle"
                    : "Yeni Başkan Yardımcısı"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Bilgileri doldurarak kaydı
                  {editingDeputyMayor
                    ? " güncelleyebilirsiniz."
                    : " oluşturabilirsiniz."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={22} />
              </button>
            </div>

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-6"
            >
              {/* Image */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Fotoğraf
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="group relative h-64 w-full overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-blue-400 hover:bg-blue-50"
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Fotoğraf önizleme"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center text-slate-400">
                      <ImagePlus size={42} />

                      <span className="mt-3 text-sm font-medium">
                        Bilgisayardan fotoğraf seç
                      </span>

                      <span className="mt-1 text-xs">
                        JPG, PNG, WEBP veya GIF
                      </span>
                    </div>
                  )}

                  {previewUrl && (
                    <div className="absolute inset-x-0 bottom-0 bg-slate-950/60 px-4 py-3 text-center text-sm font-medium text-white opacity-0 transition group-hover:opacity-100">
                      Fotoğrafı değiştirmek için tıklayın
                    </div>
                  )}
                </button>
              </div>

              {/* Name */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Ad Soyad
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  placeholder="Örn. Ahmet Yılmaz"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Phone */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Telefon
                </label>

                <input
                  type="tel"
                  value={form.phone}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      phone: event.target.value,
                    }))
                  }
                  placeholder="Örn. 0344 123 45 67"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Buttons */}

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  İptal
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex min-w-[150px] items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving && (
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                  )}

                  {saving
                    ? "Kaydediliyor..."
                    : editingDeputyMayor
                    ? "Güncelle"
                    : "Kaydet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeputyMayorPage;