import { useEffect, useState } from "react";
import {
  Building2,
  Edit,
  Mail,
  Phone,
  Plus,
  Trash2,
  Upload,
  User,
  X,
} from "lucide-react";

import MediaPicker from "../../components/media/MediaPicker";
import { uploadImage } from "../../services/uploadService";

import {
  createDepartment,
  deleteDepartment,
  getDepartments,
  updateDepartment,
  type Department,
} from "../../services/departmentService";

const API_URL = "http://127.0.0.1:8000";

interface FormState {
  name: string;
  manager_name: string;
  manager_image: string | null;
  phone: string;
  extension: string;
  email: string;
}

const emptyForm: FormState = {
  name: "",
  manager_name: "",
  manager_image: null,
  phone: "",
  extension: "",
  email: "",
};

const MudurluklerPage = () => {
  const [departments, setDepartments] = useState<Department[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);

  const [editingDepartment, setEditingDepartment] =
    useState<Department | null>(null);

  const [form, setForm] = useState<FormState>(emptyForm);

  // =========================================================
  // MÜDÜRLÜKLERİ GETİR
  // =========================================================

  const loadDepartments = async () => {
    try {
      setLoading(true);

      const data = await getDepartments();

      setDepartments(data);
    } catch (error) {
      console.error("Müdürlükler alınamadı:", error);

      alert("Müdürlükler alınamadı.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  // =========================================================
  // YENİ MÜDÜRLÜK
  // =========================================================

  const openCreateModal = () => {
    setEditingDepartment(null);
    setForm({ ...emptyForm });
    setIsModalOpen(true);
  };

  // =========================================================
  // MÜDÜRLÜK DÜZENLE
  // =========================================================

  const openEditModal = (department: Department) => {
    setEditingDepartment(department);

    setForm({
      name: department.name,
      manager_name: department.manager_name ?? "",
      manager_image: department.manager_image,
      phone: department.phone ?? "",
      extension: department.extension ?? "",
      email: department.email ?? "",
    });

    setIsModalOpen(true);
  };

  // =========================================================
  // MODAL KAPAT
  // =========================================================

  const closeModal = () => {
    if (saving || uploadingImage) {
      return;
    }

    setIsModalOpen(false);
    setEditingDepartment(null);
    setForm({ ...emptyForm });
  };

  // =========================================================
  // FORM DEĞİŞİKLİĞİ
  // =========================================================

  const handleChange = (
    field: keyof FormState,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // =========================================================
  // MEDYA KÜTÜPHANESİNDEN FOTOĞRAF SEÇ
  // =========================================================

  const handleMediaSelect = (media: any) => {
    setForm((previous) => ({
      ...previous,
      manager_image: media.file_path,
    }));

    setIsMediaPickerOpen(false);
  };

  // =========================================================
  // BİLGİSAYARDAN FOTOĞRAF YÜKLE
  // =========================================================

  const handleComputerUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert(
        "Lütfen JPG, PNG, WEBP veya GIF formatında bir görsel seçin."
      );

      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Görsel boyutu maksimum 5 MB olabilir.");

      event.target.value = "";
      return;
    }

    try {
      setUploadingImage(true);

      const result = await uploadImage(
        file,
        "departments"
      );

      setForm((previous) => ({
        ...previous,
        manager_image: result.url,
      }));
    } catch (error) {
      console.error(
        "Müdür fotoğrafı yüklenemedi:",
        error
      );

      alert(
        "Müdür fotoğrafı yüklenirken bir hata oluştu."
      );
    } finally {
      setUploadingImage(false);
      event.target.value = "";
    }
  };

  // =========================================================
  // FOTOĞRAFI KALDIR
  // =========================================================

  const removeImage = () => {
    if (saving || uploadingImage) {
      return;
    }

    setForm((previous) => ({
      ...previous,
      manager_image: null,
    }));
  };

  // =========================================================
  // KAYDET / GÜNCELLE
  // =========================================================

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (!form.name.trim()) {
      alert("Lütfen müdürlük adını girin.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        name: form.name.trim(),

        manager_name:
          form.manager_name.trim() || null,

        manager_image:
          form.manager_image || null,

        phone:
          form.phone.trim() || null,

        extension:
          form.extension.trim() || null,

        email:
          form.email.trim() || null,
      };

      if (editingDepartment) {
        await updateDepartment(
          editingDepartment.id,
          payload
        );
      } else {
        await createDepartment(payload);
      }

      await loadDepartments();

      closeModal();
    } catch (error) {
      console.error(
        "Müdürlük kaydedilemedi:",
        error
      );

      alert(
        editingDepartment
          ? "Müdürlük güncellenemedi."
          : "Müdürlük eklenemedi."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // SİL
  // =========================================================

  const handleDelete = async (
    department: Department
  ) => {
    const confirmed = window.confirm(
      `"${department.name}" müdürlüğünü silmek istediğinize emin misiniz?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteDepartment(department.id);

      await loadDepartments();
    } catch (error) {
      console.error(
        "Müdürlük silinemedi:",
        error
      );

      alert("Müdürlük silinemedi.");
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Müdürlükler
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Belediye müdürlüklerini buradan yönetebilirsiniz.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
        >
          <Plus size={18} />

          Müdürlük Ekle
        </button>
      </div>

      {/* LIST */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {loading ? (
          <div className="flex min-h-64 items-center justify-center text-sm text-slate-500">
            Müdürlükler yükleniyor...
          </div>
        ) : departments.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center">
            <Building2 className="mb-4 h-12 w-12 text-slate-300" />

            <h3 className="font-semibold text-slate-700">
              Henüz müdürlük bulunmuyor
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              İlk müdürlüğü eklemek için yukarıdaki butonu kullanın.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">

            {departments.map((department) => (
              <div
                key={department.id}
                className="flex flex-col gap-5 p-5 transition hover:bg-slate-50 lg:flex-row lg:items-center"
              >

                {/* MÜDÜR FOTOĞRAFI */}

                <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-slate-100">
                  {department.manager_image ? (
                    <img
                      src={
                        department.manager_image.startsWith(
                          "http"
                        )
                          ? department.manager_image
                          : `${API_URL}${department.manager_image}`
                      }
                      alt={
                        department.manager_name ||
                        department.name
                      }
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <User className="h-10 w-10 text-slate-300" />
                    </div>
                  )}
                </div>

                {/* INFO */}

                <div className="min-w-0 flex-1">

                  <h2 className="text-lg font-bold text-slate-900">
                    {department.name}
                  </h2>

                  {department.manager_name && (
                    <p className="mt-1 text-sm font-semibold text-blue-700">
                      {department.manager_name}
                    </p>
                  )}

                  <div className="mt-3 flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:flex-wrap sm:gap-x-6">

                    {department.phone && (
                      <span className="inline-flex items-center gap-2">
                        <Phone
                          size={15}
                          className="text-blue-700"
                        />

                        {department.phone}
                      </span>
                    )}

                    {department.extension && (
                      <span>
                        Dahili:{" "}
                        <strong className="text-slate-700">
                          {department.extension}
                        </strong>
                      </span>
                    )}

                    {department.email && (
                      <span className="inline-flex items-center gap-2">
                        <Mail
                          size={15}
                          className="text-blue-700"
                        />

                        {department.email}
                      </span>
                    )}

                  </div>
                </div>

                {/* ACTIONS */}

                <div className="flex shrink-0 gap-2">

                  <button
                    type="button"
                    onClick={() =>
                      openEditModal(department)
                    }
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                  >
                    <Edit size={16} />

                    Düzenle
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(department)
                    }
                    className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <Trash2 size={16} />

                    Sil
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>

      {/* MODAL */}

      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingDepartment
                    ? "Müdürlük Düzenle"
                    : "Müdürlük Ekle"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Müdürlük ve müdür bilgilerini doldurun.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={
                  saving || uploadingImage
                }
                className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={20} />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >

              {/* MÜDÜRLÜK ADI */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Müdürlük Adı
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(event) =>
                    handleChange(
                      "name",
                      event.target.value
                    )
                  }
                  placeholder="Örn. İnsan Kaynakları Müdürlüğü"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* MÜDÜR ADI */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Müdür Adı
                </label>

                <input
                  type="text"
                  value={form.manager_name}
                  onChange={(event) =>
                    handleChange(
                      "manager_name",
                      event.target.value
                    )
                  }
                  placeholder="Örn. Ahmet YILMAZ"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* TELEFON / DAHİLİ */}

              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Telefon
                  </label>

                  <input
                    type="text"
                    value={form.phone}
                    onChange={(event) =>
                      handleChange(
                        "phone",
                        event.target.value
                      )
                    }
                    placeholder="0344 123 45 67"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Dahili
                  </label>

                  <input
                    type="text"
                    value={form.extension}
                    onChange={(event) =>
                      handleChange(
                        "extension",
                        event.target.value
                      )
                    }
                    placeholder="3800"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

              </div>

              {/* EMAIL */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  E-posta
                </label>

                <input
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    handleChange(
                      "email",
                      event.target.value
                    )
                  }
                  placeholder="mudurluk@onikisubat.bel.tr"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* MÜDÜR FOTOĞRAFI */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Müdür Fotoğrafı
                </label>

                {form.manager_image ? (

                  <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">

                    <img
                      src={
                        form.manager_image.startsWith(
                          "http"
                        )
                          ? form.manager_image
                          : `${API_URL}${form.manager_image}`
                      }
                      alt="Müdür"
                      className="h-56 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={removeImage}
                      disabled={
                        saving || uploadingImage
                      }
                      className="absolute right-3 top-3 rounded-xl bg-white p-2 text-red-600 shadow-lg transition hover:bg-red-50 disabled:opacity-50"
                    >
                      <X size={18} />
                    </button>

                  </div>

                ) : (

                  <div className="grid gap-4 md:grid-cols-2">

                    {/* MEDYA */}

                    <button
                      type="button"
                      onClick={() =>
                        setIsMediaPickerOpen(true)
                      }
                      disabled={
                        saving || uploadingImage
                      }
                      className="flex h-44 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 text-slate-500 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 disabled:opacity-50"
                    >
                      <Building2
                        size={36}
                        className="mb-3"
                      />

                      <span className="font-semibold">
                        Medyadan Seç
                      </span>

                      <span className="mt-1 text-center text-xs">
                        Medya kütüphanesinden fotoğraf seçin
                      </span>
                    </button>

                    {/* BİLGİSAYARDAN */}

                    <label
                      className={`flex h-44 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 text-slate-500 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 ${
                        saving || uploadingImage
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer"
                      }`}
                    >

                      {uploadingImage ? (
                        <>
                          <div className="mb-3 h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-blue-700" />

                          <span className="font-semibold">
                            Yükleniyor...
                          </span>
                        </>
                      ) : (
                        <>
                          <Upload
                            size={36}
                            className="mb-3"
                          />

                          <span className="font-semibold">
                            Bilgisayardan Yükle
                          </span>

                          <span className="mt-1 text-center text-xs">
                            JPG, PNG, WEBP veya GIF
                          </span>
                        </>
                      )}

                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        onChange={
                          handleComputerUpload
                        }
                        disabled={
                          saving || uploadingImage
                        }
                        className="hidden"
                      />

                    </label>

                  </div>
                )}

              </div>

              {/* BUTTONS */}

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={
                    saving || uploadingImage
                  }
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  İptal
                </button>

                <button
                  type="submit"
                  disabled={
                    saving || uploadingImage
                  }
                  className="rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Kaydediliyor..."
                    : editingDepartment
                    ? "Güncelle"
                    : "Kaydet"}
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

      {/* MEDIA PICKER */}

      <MediaPicker
        isOpen={isMediaPickerOpen}
        onClose={() =>
          setIsMediaPickerOpen(false)
        }
        onSelect={handleMediaSelect}
      />

    </div>
  );
};

export default MudurluklerPage;