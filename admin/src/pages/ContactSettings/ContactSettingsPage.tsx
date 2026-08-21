import { useEffect, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Globe,
  Save,
} from "lucide-react";

import PageHeader from "../../components/common/PageHeader";

import {
  getContactSettings,
  updateContactSettings,
} from "../../services/contactSettingsService";

import type {
  ContactSettings,
  ContactSettingsUpdate,
} from "../../services/contactSettingsService";

const ContactSettingsPage = () => {
  const [contact, setContact] =
    useState<ContactSettings | null>(null);

  const [form, setForm] =
    useState<ContactSettingsUpdate>({});

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [successMessage, setSuccessMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  useEffect(() => {
    const loadContactSettings = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const data = await getContactSettings();

        setContact(data);

        setForm({
          phone: data.phone ?? "",
          fax: data.fax ?? "",
          email: data.email ?? "",
          kep: data.kep ?? "",
          address: data.address ?? "",
          working_hours: data.working_hours ?? "",
          website: data.website ?? "",
          whatsapp: data.whatsapp ?? "",
          instagram: data.instagram ?? "",
          facebook: data.facebook ?? "",
          x: data.x ?? "",
          youtube: data.youtube ?? "",
          e_belediye_url: data.e_belediye_url ?? "",
          alo_153: data.alo_153 ?? "",
          map_url: data.map_url ?? "",
        });
      } catch (error) {
        console.error(error);
        setErrorMessage(
          "İletişim bilgileri yüklenirken bir hata oluştu."
        );
      } finally {
        setLoading(false);
      }
    };

    loadContactSettings();
  }, []);

  const handleChange = (
    field: keyof ContactSettingsUpdate,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      setSaving(true);
      setSuccessMessage("");
      setErrorMessage("");

      const updated = await updateContactSettings(form);

      setContact(updated);

      setForm({
        phone: updated.phone ?? "",
        fax: updated.fax ?? "",
        email: updated.email ?? "",
        kep: updated.kep ?? "",
        address: updated.address ?? "",
        working_hours: updated.working_hours ?? "",
        website: updated.website ?? "",
        whatsapp: updated.whatsapp ?? "",
        instagram: updated.instagram ?? "",
        facebook: updated.facebook ?? "",
        x: updated.x ?? "",
        youtube: updated.youtube ?? "",
        e_belediye_url: updated.e_belediye_url ?? "",
        alo_153: updated.alo_153 ?? "",
        map_url: updated.map_url ?? "",
      });

      setSuccessMessage(
        "İletişim ayarları başarıyla güncellendi."
      );
    } catch (error) {
      console.error(error);

      setErrorMessage(
        "İletişim ayarları güncellenirken bir hata oluştu."
      );
    } finally {
      setSaving(false);
    }
  };

  const inputClassName =
    "mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

  const textareaClassName =
    "mt-2 min-h-28 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="İletişim Ayarları"
          description="Belediyenin iletişim bilgilerini buradan yönetin."
        />

        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-slate-500">
          İletişim bilgileri yükleniyor...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="İletişim Ayarları"
        description="Belediyenin iletişim bilgilerini buradan yönetin."
      />

      {successMessage && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {errorMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* TEMEL İLETİŞİM */}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <Phone
              size={22}
              className="text-blue-700"
            />

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Temel İletişim Bilgileri
              </h2>

              <p className="text-sm text-slate-500">
                Vatandaşların ulaşabileceği iletişim bilgileri.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Telefon
              </label>

              <input
                type="text"
                value={form.phone ?? ""}
                onChange={(event) =>
                  handleChange(
                    "phone",
                    event.target.value
                  )
                }
                className={inputClassName}
                placeholder="0344 123 45 67"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Faks
              </label>

              <input
                type="text"
                value={form.fax ?? ""}
                onChange={(event) =>
                  handleChange(
                    "fax",
                    event.target.value
                  )
                }
                className={inputClassName}
                placeholder="0344 123 45 68"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                E-Posta
              </label>

              <input
                type="email"
                value={form.email ?? ""}
                onChange={(event) =>
                  handleChange(
                    "email",
                    event.target.value
                  )
                }
                className={inputClassName}
                placeholder="info@onikisubat.bel.tr"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                KEP
              </label>

              <input
                type="text"
                value={form.kep ?? ""}
                onChange={(event) =>
                  handleChange(
                    "kep",
                    event.target.value
                  )
                }
                className={inputClassName}
                placeholder="kep adresi"
              />
            </div>
          </div>
        </section>

        {/* ADRES */}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <MapPin
              size={22}
              className="text-blue-700"
            />

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Adres ve Çalışma Bilgileri
              </h2>

              <p className="text-sm text-slate-500">
                Belediye adresi ve çalışma saatleri.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Adres
              </label>

              <textarea
                value={form.address ?? ""}
                onChange={(event) =>
                  handleChange(
                    "address",
                    event.target.value
                  )
                }
                className={textareaClassName}
                placeholder="Belediye adresi"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Clock size={16} />

                Çalışma Saatleri
              </label>

              <input
                type="text"
                value={form.working_hours ?? ""}
                onChange={(event) =>
                  handleChange(
                    "working_hours",
                    event.target.value
                  )
                }
                className={inputClassName}
                placeholder="08:00 - 17:00"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Harita URL
              </label>

              <input
                type="url"
                value={form.map_url ?? ""}
                onChange={(event) =>
                  handleChange(
                    "map_url",
                    event.target.value
                  )
                }
                className={inputClassName}
                placeholder="https://maps.google.com/..."
              />
            </div>
          </div>
        </section>

        {/* DİJİTAL KANALLAR */}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <Globe
              size={22}
              className="text-blue-700"
            />

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Dijital Kanallar
              </h2>

              <p className="text-sm text-slate-500">
                Web sitesi ve sosyal medya hesapları.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Web Sitesi
              </label>

              <input
                type="url"
                value={form.website ?? ""}
                onChange={(event) =>
                  handleChange(
                    "website",
                    event.target.value
                  )
                }
                className={inputClassName}
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                WhatsApp
              </label>

              <input
                type="text"
                value={form.whatsapp ?? ""}
                onChange={(event) =>
                  handleChange(
                    "whatsapp",
                    event.target.value
                  )
                }
                className={inputClassName}
                placeholder="WhatsApp numarası"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Instagram
              </label>

              <input
                type="url"
                value={form.instagram ?? ""}
                onChange={(event) =>
                  handleChange(
                    "instagram",
                    event.target.value
                  )
                }
                className={inputClassName}
                placeholder="https://instagram.com/..."
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Facebook
              </label>

              <input
                type="url"
                value={form.facebook ?? ""}
                onChange={(event) =>
                  handleChange(
                    "facebook",
                    event.target.value
                  )
                }
                className={inputClassName}
                placeholder="https://facebook.com/..."
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                X
              </label>

              <input
                type="url"
                value={form.x ?? ""}
                onChange={(event) =>
                  handleChange(
                    "x",
                    event.target.value
                  )
                }
                className={inputClassName}
                placeholder="https://x.com/..."
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                YouTube
              </label>

              <input
                type="url"
                value={form.youtube ?? ""}
                onChange={(event) =>
                  handleChange(
                    "youtube",
                    event.target.value
                  )
                }
                className={inputClassName}
                placeholder="https://youtube.com/..."
              />
            </div>
          </div>
        </section>

        {/* E-BELEDİYE */}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Online Hizmetler
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Vatandaşların online olarak kullanabileceği hizmet bağlantıları.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-slate-700">
                E-Belediye URL
              </label>

              <input
                type="url"
                value={form.e_belediye_url ?? ""}
                onChange={(event) =>
                  handleChange(
                    "e_belediye_url",
                    event.target.value
                  )
                }
                className={inputClassName}
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Alo 153
              </label>

              <input
                type="text"
                value={form.alo_153 ?? ""}
                onChange={(event) =>
                  handleChange(
                    "alo_153",
                    event.target.value
                  )
                }
                className={inputClassName}
                placeholder="153"
              />
            </div>
          </div>
        </section>

        {/* KAYDET */}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={19} />

            {saving
              ? "Kaydediliyor..."
              : "Değişiklikleri Kaydet"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactSettingsPage;