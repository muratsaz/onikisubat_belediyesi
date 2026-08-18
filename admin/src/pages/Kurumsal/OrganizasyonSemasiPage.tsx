import { useEffect, useState } from "react";
import { Loader2, Upload, Trash2 } from "lucide-react";

import {
  getOrganization,
  type Organization,
} from "../../services/organizationService";

const API_URL = "http://127.0.0.1:8000";

const OrganizasyonSemasiPage = () => {
  const [organization, setOrganization] =
    useState<Organization | null>(null);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchOrganization();
  }, []);

  const fetchOrganization = async () => {
    try {
      setLoading(true);

      const data = await getOrganization();

      setOrganization(data);
    } catch (error) {
      console.error(
        "Organizasyon şeması alınamadı:",
        error
      );

      setMessage(
        "Organizasyon şeması alınırken bir hata oluştu."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setUploading(true);
      setMessage("");

      const token = localStorage.getItem("token");

      /*
       * 1. ADIM
       * Dosyayı upload servisine gönderiyoruz.
       */
      const formData = new FormData();

      formData.append("file", file);

      const uploadResponse = await fetch(
        `${API_URL}/upload/organization`,
        {
          method: "POST",

          headers: {
            ...(token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {}),
          },

          body: formData,
        }
      );

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse
          .json()
          .catch(() => null);

        throw new Error(
          errorData?.detail ||
            "Organizasyon şeması dosyası yüklenemedi."
        );
      }

      const uploadData = await uploadResponse.json();

      /*
       * 2. ADIM
       * Upload servisinden gelen URL'yi
       * organization tablosuna kaydediyoruz.
       */
      const organizationResponse = await fetch(
        `${API_URL}/organization/`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",

            ...(token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {}),
          },

          body: JSON.stringify({
            image_url: uploadData.url,
          }),
        }
      );

      if (!organizationResponse.ok) {
        const errorData = await organizationResponse
          .json()
          .catch(() => null);

        throw new Error(
          errorData?.detail ||
            "Organizasyon şeması kaydedilemedi."
        );
      }

      const data: Organization =
        await organizationResponse.json();

      setOrganization(data);

      setMessage(
        organization
          ? "Organizasyon şeması başarıyla güncellendi."
          : "Organizasyon şeması başarıyla yüklendi."
      );
    } catch (error) {
      console.error(
        "Organizasyon şeması yüklenemedi:",
        error
      );

      setMessage(
        error instanceof Error
          ? error.message
          : "Yükleme sırasında bir hata oluştu."
      );
    } finally {
      setUploading(false);

      event.target.value = "";
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Organizasyon şemasını silmek istediğinize emin misiniz?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);
      setMessage("");

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/organization/`,
        {
          method: "DELETE",

          headers: {
            ...(token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {}),
          },
        }
      );

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => null);

        throw new Error(
          errorData?.detail ||
            "Organizasyon şeması silinemedi."
        );
      }

      setOrganization(null);

      setMessage(
        "Organizasyon şeması başarıyla silindi."
      );
    } catch (error) {
      console.error(
        "Organizasyon şeması silinemedi:",
        error
      );

      setMessage(
        error instanceof Error
          ? error.message
          : "Silme sırasında bir hata oluştu."
      );
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Organizasyon Şeması
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Belediyenin organizasyon şemasını
            buradan görüntüleyebilir ve
            güncelleyebilirsiniz.
          </p>
        </div>

        {/* MESSAGE */}
        {message && (
          <div
            className={`mb-5 rounded-xl px-4 py-3 text-sm font-medium ${
              message.includes("başarıyla")
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* CONTENT */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          {/* ACTIONS */}
          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-lg font-semibold text-slate-800">
              Şema Görseli
            </h2>

            <div className="flex items-center gap-3">

              {/* UPLOAD / UPDATE */}
              <label
                className={`flex cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 ${
                  uploading || deleting
                    ? "cursor-not-allowed opacity-60"
                    : ""
                }`}
              >
                {uploading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Yükleniyor...
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5" />

                    {organization
                      ? "Şemayı Değiştir"
                      : "Şema Yükle"}
                  </>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  disabled={uploading || deleting}
                  className="hidden"
                />
              </label>

              {/* DELETE */}
              {organization && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={uploading || deleting}
                  className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {deleting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Siliniyor...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-5 w-5" />
                      Şemayı Sil
                    </>
                  )}
                </button>
              )}

            </div>
          </div>

          {/* IMAGE */}
          {organization?.image_url ? (
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-4">

              <img
                src={`${API_URL}${organization.image_url}`}
                alt="Organizasyon Şeması"
                className="mx-auto h-auto max-h-[800px] max-w-full object-contain"
              />

            </div>
          ) : (
            <div className="flex min-h-[350px] items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50">

              <div className="text-center">

                <Upload className="mx-auto mb-4 h-10 w-10 text-slate-400" />

                <p className="font-medium text-slate-600">
                  Henüz organizasyon şeması yüklenmemiş.
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Yukarıdaki butondan bir görsel
                  yükleyebilirsiniz.
                </p>

              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default OrganizasyonSemasiPage;