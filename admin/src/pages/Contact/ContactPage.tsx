import { useEffect, useState } from "react";

import PageHeader from "../../components/common/PageHeader";

import {
  getContactSettings,
  createContactSettings,
  updateContactSettings,
  type ContactSettingsFormData,
} from "../../services/contactSettingsService";

const emptyForm: ContactSettingsFormData = {
  phone: "",
  fax: "",
  email: "",
  kep: "",
  website: "",
  working_hours: "",
  address: "",
  instagram: "",
  facebook: "",
  x: "",
  youtube: "",
  whatsapp: "",
  alo_153: "",
  e_belediye_url: "",
};

const ContactPage = () => {
  const [form, setForm] =
    useState<ContactSettingsFormData>(emptyForm);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [exists, setExists] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadContactSettings = async () => {
      try {
        const data = await getContactSettings();

        setForm({
          phone: data.phone ?? "",
          fax: data.fax ?? "",
          email: data.email ?? "",
          kep: data.kep ?? "",
          website: data.website ?? "",
          working_hours: data.working_hours ?? "",
          address: data.address ?? "",
          instagram: data.instagram ?? "",
          facebook: data.facebook ?? "",
          x: data.x ?? "",
          youtube: data.youtube ?? "",
          whatsapp: data.whatsapp ?? "",
          alo_153: data.alo_153 ?? "",
          e_belediye_url: data.e_belediye_url ?? "",
        });

        setExists(true);
      } catch (error) {
        console.error(
          "İletişim bilgileri alınamadı:",
          error
        );

        setExists(false);
      } finally {
        setLoading(false);
      }
    };

    loadContactSettings();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setSaving(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      if (exists) {
        await updateContactSettings(form);
      } else {
        await createContactSettings(form);
        setExists(true);
      }

      setSuccessMessage(
        "İletişim bilgileri başarıyla kaydedildi."
      );
    } catch (error) {
      console.error(
        "İletişim bilgileri kaydedilemedi:",
        error
      );

      setErrorMessage(
        "İletişim bilgileri kaydedilemedi."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="İletişim Yönetimi"
          description="Belediyenin iletişim bilgilerini yönetin."
        />

        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
          İletişim bilgileri yükleniyor...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="İletişim Yönetimi"
        description="Web sitesinde gösterilen iletişim bilgilerini buradan düzenleyebilirsiniz."
      />

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* GENEL BİLGİLER */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Genel İletişim Bilgileri
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Telefon
              </label>

              <input
                name="phone"
                value={form.phone ?? ""}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Fax
              </label>

              <input
                name="fax"
                value={form.fax ?? ""}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                E-Posta
              </label>

              <input
                name="email"
                type="email"
                value={form.email ?? ""}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                KEP
              </label>

              <input
                name="kep"
                value={form.kep ?? ""}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Web Sitesi
              </label>

              <input
                name="website"
                value={form.website ?? ""}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Çalışma Saatleri
              </label>

              <input
                name="working_hours"
                value={form.working_hours ?? ""}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Adres
              </label>

              <textarea
                name="address"
                rows={3}
                value={form.address ?? ""}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* SOSYAL MEDYA */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Sosyal Medya
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Instagram
              </label>

              <input
                name="instagram"
                value={form.instagram ?? ""}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Facebook
              </label>

              <input
                name="facebook"
                value={form.facebook ?? ""}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                X
              </label>

              <input
                name="x"
                value={form.x ?? ""}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                YouTube
              </label>

              <input
                name="youtube"
                value={form.youtube ?? ""}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* HIZLI İLETİŞİM */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Hızlı İletişim
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Alo 153
              </label>

              <input
                name="alo_153"
                value={form.alo_153 ?? ""}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                WhatsApp
              </label>

              <input
                name="whatsapp"
                value={form.whatsapp ?? ""}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                E-Belediye
              </label>

              <input
                name="e_belediye_url"
                value={form.e_belediye_url ?? ""}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {successMessage && (
          <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {errorMessage}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Kaydediliyor..."
              : "Değişiklikleri Kaydet"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;