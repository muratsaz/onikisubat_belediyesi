import { useEffect, useRef, useState } from "react";
import {
  Edit,
  ImagePlus,
  Loader2,
  Plus,
  Search,
  Trash2,
  UserRound,
  X,
} from "lucide-react";

import {
  createCouncilMember,
  deleteCouncilMember,
  getCouncilMembers,
  updateCouncilMember,
  type CouncilMember,
} from "../../services/councilMemberService";

import { uploadImage } from "../../services/uploadService";

import api from "../../services/api";

interface FormData {
  name: string;
  party: string;
  image: string | null;
}

const emptyForm: FormData = {
  name: "",
  party: "",
  image: null,
};

const MeclisUyeleriPage = () => {
  const [members, setMembers] = useState<CouncilMember[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] =
    useState<CouncilMember | null>(null);

  const [form, setForm] = useState<FormData>(emptyForm);

  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

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

    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    if (image.startsWith("/")) {
      return `${API_URL}${image}`;
    }

    return `${API_URL}/${image}`;
  };

  const loadMembers = async () => {
    try {
      setLoading(true);

      const data = await getCouncilMembers();

      setMembers(data);
    } catch (error) {
      console.error(
        "Meclis üyeleri alınırken hata oluştu:",
        error
      );

      alert("Meclis üyeleri alınamadı.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const openCreateModal = () => {
    setEditingMember(null);
    setForm(emptyForm);

    setSelectedFile(null);
    setPreviewUrl(null);

    setIsModalOpen(true);
  };

  const openEditModal = (member: CouncilMember) => {
    setEditingMember(member);

    setForm({
      name: member.name,
      party: member.party,
      image: member.image,
    });

    setSelectedFile(null);
    setPreviewUrl(null);

    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (saving || uploadingImage) {
      return;
    }

    setIsModalOpen(false);

    setEditingMember(null);
    setForm(emptyForm);

    setSelectedFile(null);
    setPreviewUrl(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Lütfen bir görsel dosyası seçin.");

      event.target.value = "";

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Fotoğraf boyutu maksimum 5 MB olabilir.");

      event.target.value = "";

      return;
    }

    setSelectedFile(file);

    const objectUrl = URL.createObjectURL(file);

    setPreviewUrl(objectUrl);
  };

  const removeSelectedImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setForm((previous) => ({
      ...previous,
      image: null,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!form.name.trim()) {
      alert("Ad Soyad alanını doldurun.");
      return;
    }

    if (!form.party.trim()) {
      alert("Parti alanını doldurun.");
      return;
    }

    try {
      setSaving(true);

      let imagePath = form.image;

      /*
       * Yeni fotoğraf seçildiyse önce backend'e yükle.
       */
      if (selectedFile) {
        try {
          setUploadingImage(true);

          const uploadResponse = await uploadImage(
            selectedFile,
            "council_members"
          );

          imagePath = uploadResponse.path;
        } catch (error) {
          console.error(
            "Meclis üyesi fotoğrafı yüklenemedi:",
            error
          );

          alert(
            "Fotoğraf yüklenemedi. Lütfen tekrar deneyin."
          );

          return;
        } finally {
          setUploadingImage(false);
        }
      }

      const payload = {
        name: form.name.trim(),
        party: form.party.trim(),
        image: imagePath,
      };

      if (editingMember) {
        await updateCouncilMember(
          editingMember.id,
          payload
        );
      } else {
        await createCouncilMember(payload);
      }

      await loadMembers();

      closeModal();
    } catch (error) {
      console.error(
        "Meclis üyesi kaydedilirken hata oluştu:",
        error
      );

      alert("Meclis üyesi kaydedilemedi.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Bu meclis üyesini silmek istediğinize emin misiniz?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      await deleteCouncilMember(id);

      await loadMembers();
    } catch (error) {
      console.error(
        "Meclis üyesi silinirken hata oluştu:",
        error
      );

      alert("Meclis üyesi silinemedi.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredMembers = members.filter((member) => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) {
      return true;
    }

    return (
      member.name.toLowerCase().includes(searchText) ||
      member.party.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Meclis Üyeleri
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Belediye meclis üyelerini yönetin.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
        >
          <Plus size={18} />
          Meclis Üyesi Ekle
        </button>

      </div>

      {/* Search */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

        <div className="relative max-w-md">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Meclis üyesi ara..."
            className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

        </div>

      </div>

      {/* Content */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">

            <Loader2
              size={32}
              className="animate-spin text-blue-700"
            />

          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">

            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <UserRound
                size={30}
                className="text-slate-400"
              />
            </div>

            <h2 className="text-lg font-semibold text-slate-700">
              Meclis üyesi bulunamadı
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Henüz meclis üyesi eklenmemiş.
            </p>

          </div>
        ) : (
          <div className="grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-3">

            {filteredMembers.map((member) => {
              const imageUrl = getImageUrl(member.image);

              return (
                <div
                  key={member.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >

                  {/* Image */}
                  <div className="relative h-72 bg-slate-100">

                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={member.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <UserRound
                          size={80}
                          strokeWidth={1.2}
                          className="text-slate-300"
                        />
                      </div>
                    )}

                  </div>

                  {/* Information */}
                  <div className="p-5">

                    <h2 className="text-xl font-bold text-slate-800">
                      {member.name}
                    </h2>

                    <div className="mt-3">
                      <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                        {member.party}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 flex gap-3">

                      <button
                        type="button"
                        onClick={() =>
                          openEditModal(member)
                        }
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                      >
                        <Edit size={16} />
                        Düzenle
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(member.id)
                        }
                        disabled={deletingId === member.id}
                        className="inline-flex items-center justify-center rounded-xl border border-red-200 px-4 py-2.5 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deletingId === member.id ? (
                          <Loader2
                            size={16}
                            className="animate-spin"
                          />
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </button>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-200 p-6">

              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {editingMember
                    ? "Meclis Üyesini Düzenle"
                    : "Meclis Üyesi Ekle"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Meclis üyesi bilgilerini girin.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving || uploadingImage}
                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
              >
                <X size={24} />
              </button>

            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-6"
            >

              {/* Name */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Ad Soyad
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      name: event.target.value,
                    }))
                  }
                  placeholder="Örn. Ahmet Yılmaz"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* Party */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Parti
                </label>

                <input
                  type="text"
                  value={form.party}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      party: event.target.value,
                    }))
                  }
                  placeholder="Örn. AK Parti"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* Image */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Fotoğraf
                </label>

                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">

                  {previewUrl || form.image ? (
                    <div className="space-y-4">

                      <div className="relative overflow-hidden rounded-xl bg-white">

                        <img
  src={previewUrl || getImageUrl(form.image) || ""}
  alt="Meclis üyesi"
  className="h-64 w-full object-cover"
/>

                      </div>

                      <div className="flex gap-3">

                        <button
                          type="button"
                          onClick={() =>
                            fileInputRef.current?.click()
                          }
                          disabled={uploadingImage}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                          <ImagePlus size={18} />
                          Fotoğrafı Değiştir
                        </button>

                        <button
                          type="button"
                          onClick={removeSelectedImage}
                          disabled={uploadingImage}
                          className="rounded-xl border border-red-200 bg-white px-4 py-3 text-red-600 transition hover:bg-red-50"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        fileInputRef.current?.click()
                      }
                      className="flex w-full flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-10 transition hover:border-blue-400 hover:bg-blue-50"
                    >

                      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
                        <ImagePlus
                          size={26}
                          className="text-blue-700"
                        />
                      </div>

                      <span className="text-sm font-semibold text-slate-700">
                        Bilgisayardan fotoğraf seç
                      </span>

                      <span className="mt-1 text-xs text-slate-500">
                        JPG, JPEG, PNG veya WEBP — maksimum 5 MB
                      </span>

                    </button>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                </div>

                {selectedFile && (
                  <p className="mt-2 text-xs text-slate-500">
                    Seçilen dosya: {selectedFile.name}
                  </p>
                )}

                <p className="mt-2 text-xs text-slate-400">
                  Fotoğrafı seçtiğinizde sistem otomatik olarak
                  sunucuya yükleyecektir.
                </p>

              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving || uploadingImage}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  İptal
                </button>

                <button
                  type="submit"
                  disabled={saving || uploadingImage}
                  className="inline-flex min-w-[150px] items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {(saving || uploadingImage) && (
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                  )}

                  {uploadingImage
                    ? "Fotoğraf yükleniyor..."
                    : saving
                    ? "Kaydediliyor..."
                    : editingMember
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

export default MeclisUyeleriPage;