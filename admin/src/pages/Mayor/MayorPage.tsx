import { useEffect, useRef, useState } from "react";
import { Image, Pencil, Save, Upload, UserRound, X } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import MediaPicker from "../../components/media/MediaPicker";

import {
  getMayor,
  updateMayor,
  uploadMayorImage,
  type Mayor,
} from "../../services/mayorService";

import {
  getMayorPage,
  updateMayorPage,
  type MayorPage as MayorPageType,
} from "../../services/mayorPageService";

import type { Media } from "../../services/mediaService";

const API_URL = "http://127.0.0.1:8000";

const getImageUrl = (path: string | null) => {
  if (!path) {
    return null;
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${API_URL}${path}`;
};

type ActiveTab = "home" | "page";

const MayorPage = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [activeTab, setActiveTab] = useState<ActiveTab>("home");

  // ============================================================
  // ANA SAYFA BAŞKANI
  // ============================================================

  const [mayor, setMayor] = useState<Mayor | null>(null);

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const [selectedMediaId, setSelectedMediaId] = useState<number | null>(
    null
  );

  // ============================================================
  // BAŞKANI TANIYIN SAYFASI
  // ============================================================

  const [mayorPage, setMayorPage] = useState<MayorPageType | null>(null);

  const [pageName, setPageName] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const [pageDescription, setPageDescription] = useState("");
  const [pageImage, setPageImage] = useState<string | null>(null);

  const [selectedPageMediaId, setSelectedPageMediaId] = useState<
    number | null
  >(null);

  // ============================================================
  // GENEL STATE
  // ============================================================

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);

  // ============================================================
  // ANA SAYFA BAŞKANINI GETİR
  // ============================================================

  const loadMayor = async () => {
    try {
      const data = await getMayor();

      setMayor(data);

      setName(data.name);
      setTitle(data.title);
      setDescription(data.description ?? "");
      setImage(data.image);
      setSelectedMediaId(null);
    } catch (error) {
      console.error("Başkan bilgileri alınamadı:", error);
      alert("Başkan bilgileri alınamadı.");
    }
  };

  // ============================================================
  // BAŞKANI TANIYIN SAYFASINI GETİR
  // ============================================================

  const loadMayorPage = async () => {
    try {
      const data = await getMayorPage();

      setMayorPage(data);

      setPageName(data.name);
      setPageTitle(data.title);
      setPageDescription(data.description ?? "");
      setPageImage(data.image);
      setSelectedPageMediaId(null);
    } catch (error) {
      console.error("Başkanı Tanıyın bilgileri alınamadı:", error);
      alert("Başkanı Tanıyın bilgileri alınamadı.");
    }
  };

  // ============================================================
  // İLK YÜKLEME
  // ============================================================

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        await Promise.all([loadMayor(), loadMayorPage()]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // ============================================================
  // ANA SAYFA FOTOĞRAF YÜKLEME
  // ============================================================

  const handleHomeComputerUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setUploading(true);

      const response = await uploadMayorImage(file);

      setImage(response.file_path);
      setSelectedMediaId(response.id);

      alert("Fotoğraf başarıyla yüklendi.");
    } catch (error) {
      console.error("Başkan fotoğrafı yüklenemedi:", error);
      alert("Başkan fotoğrafı yüklenemedi.");
    } finally {
      setUploading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // ============================================================
  // MEDYA SEÇ
  // ============================================================

  const handleMediaSelect = (media: Media) => {
    if (activeTab === "home") {
      setImage(media.file_path);
      setSelectedMediaId(media.id);
    } else {
      setPageImage(media.file_path);
      setSelectedPageMediaId(media.id);
    }

    setIsMediaPickerOpen(false);
  };

  // ============================================================
  // ANA SAYFA KAYDET
  // ============================================================

  const handleSaveHome = async () => {
    if (!name.trim()) {
      alert("Başkan adı boş bırakılamaz.");
      return;
    }

    if (!title.trim()) {
      alert("Başkan ünvanı boş bırakılamaz.");
      return;
    }

    try {
      setSaving(true);

      const updatedMayor = await updateMayor({
        name: name.trim(),
        title: title.trim(),
        description: description.trim() || null,
        image,
      });

      setMayor(updatedMayor);

      setName(updatedMayor.name);
      setTitle(updatedMayor.title);
      setDescription(updatedMayor.description ?? "");
      setImage(updatedMayor.image);
      setSelectedMediaId(null);

      setIsEditing(false);

      alert("Ana sayfa başkan bilgileri başarıyla güncellendi.");
    } catch (error) {
      console.error("Başkan bilgileri güncellenemedi:", error);
      alert("Başkan bilgileri güncellenemedi.");
    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // BAŞKANI TANIYIN KAYDET
  // ============================================================

  const handleSavePage = async () => {
    if (!pageName.trim()) {
      alert("Başkan adı boş bırakılamaz.");
      return;
    }

    if (!pageTitle.trim()) {
      alert("Başkan ünvanı boş bırakılamaz.");
      return;
    }

    try {
      setSaving(true);

      const updatedPage = await updateMayorPage({
        name: pageName.trim(),
        title: pageTitle.trim(),
        description: pageDescription.trim(),
        image: pageImage,
      });

      setMayorPage(updatedPage);

      setPageName(updatedPage.name);
      setPageTitle(updatedPage.title);
      setPageDescription(updatedPage.description ?? "");
      setPageImage(updatedPage.image);
      setSelectedPageMediaId(null);

      setIsEditing(false);

      alert("Başkanı Tanıyın sayfası başarıyla güncellendi.");
    } catch (error) {
      console.error("Başkanı Tanıyın sayfası güncellenemedi:", error);
      alert("Başkanı Tanıyın sayfası güncellenemedi.");
    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // KAYDET
  // ============================================================

  const handleSave = async () => {
    if (activeTab === "home") {
      await handleSaveHome();
    } else {
      await handleSavePage();
    }
  };

  // ============================================================
  // İPTAL
  // ============================================================

  const handleCancel = () => {
    if (activeTab === "home") {
      if (!mayor) {
        return;
      }

      setName(mayor.name);
      setTitle(mayor.title);
      setDescription(mayor.description ?? "");
      setImage(mayor.image);
      setSelectedMediaId(null);
    } else {
      if (!mayorPage) {
        return;
      }

      setPageName(mayorPage.name);
      setPageTitle(mayorPage.title);
      setPageDescription(mayorPage.description ?? "");
      setPageImage(mayorPage.image);
      setSelectedPageMediaId(null);
    }

    setIsEditing(false);
  };

  // ============================================================
  // SEKME DEĞİŞTİR
  // ============================================================

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    setIsEditing(false);
    setSelectedMediaId(null);
    setSelectedPageMediaId(null);
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Başkan"
          description="Onikişubat Belediye Başkanı bilgilerini yönetin."
        />

        <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
          <p className="text-sm text-slate-500">
            Başkan bilgileri yükleniyor...
          </p>
        </div>
      </div>
    );
  }

  // ============================================================
  // AKTİF VERİ
  // ============================================================

  const currentName = activeTab === "home" ? name : pageName;

  const currentTitle = activeTab === "home" ? title : pageTitle;

  const currentDescription =
    activeTab === "home" ? description : pageDescription;

  const currentImage = activeTab === "home" ? image : pageImage;

  const currentSelectedMediaId =
    activeTab === "home" ? selectedMediaId : selectedPageMediaId;

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="space-y-6">
      <PageHeader
        title="Başkan"
        description="Ana sayfadaki başkan alanını ve Başkanı Tanıyın sayfasını yönetin."
        action={
          !isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-800"
            >
              <Pencil className="h-4 w-4" />
              Düzenle
            </button>
          ) : null
        }
      />

      {/* SEKME BUTONLARI */}

      <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleTabChange("home")}
            className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
              activeTab === "home"
                ? "bg-blue-700 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Ana Sayfa
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("page")}
            className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
              activeTab === "page"
                ? "bg-blue-700 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Başkanı Tanıyın
          </button>
        </div>
      </div>

      {/* İÇERİK */}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        {/* SOL */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              {activeTab === "home"
                ? "Ana Sayfa Başkan Bilgileri"
                : "Başkanı Tanıyın Bilgileri"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {activeTab === "home"
                ? "Ana sayfada gösterilecek başkan bilgilerini düzenleyin."
                : "Başkanı Tanıyın sayfasında gösterilecek bilgileri düzenleyin."}
            </p>
          </div>

          <div className="space-y-5">
            {/* AD */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Başkan Adı
              </label>

              <input
                type="text"
                value={currentName}
                onChange={(event) =>
                  activeTab === "home"
                    ? setName(event.target.value)
                    : setPageName(event.target.value)
                }
                disabled={!isEditing}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500"
                placeholder="Başkan adı"
              />
            </div>

            {/* ÜNVAN */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Ünvan
              </label>

              <input
                type="text"
                value={currentTitle}
                onChange={(event) =>
                  activeTab === "home"
                    ? setTitle(event.target.value)
                    : setPageTitle(event.target.value)
                }
                disabled={!isEditing}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500"
                placeholder="Onikişubat Belediye Başkanı"
              />
            </div>

            {/* AÇIKLAMA */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                {activeTab === "home"
                  ? "Kısa Açıklama"
                  : "Başkan Hakkında"}
              </label>

              <textarea
                value={currentDescription}
                onChange={(event) =>
                  activeTab === "home"
                    ? setDescription(event.target.value)
                    : setPageDescription(event.target.value)
                }
                disabled={!isEditing}
                rows={activeTab === "home" ? 7 : 14}
                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500"
                placeholder={
                  activeTab === "home"
                    ? "Ana sayfada gösterilecek kısa açıklama..."
                    : "Başkan hakkında detaylı bilgi..."
                }
              />
            </div>
          </div>

          {/* BUTONLAR */}

          {isEditing && (
            <div className="mt-8 flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-6">
              <button
                type="button"
                onClick={handleCancel}
                disabled={saving || uploading}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X className="h-4 w-4" />
                İptal
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving || uploading}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Save className="h-4 w-4" />

                {saving ? "Kaydediliyor..." : "Güncelle"}
              </button>
            </div>
          )}
        </div>

        {/* SAĞ - FOTOĞRAF */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              {activeTab === "home"
                ? "Ana Sayfa Fotoğrafı"
                : "Başkanı Tanıyın Fotoğrafı"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Web sitesinde kullanılacak fotoğrafı seçin.
            </p>
          </div>

          {/* FOTOĞRAF */}

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
            {currentImage ? (
              <img
                src={getImageUrl(currentImage) ?? ""}
                alt={currentName}
                className="h-[360px] w-full object-cover object-top"
              />
            ) : (
              <div className="flex h-[360px] flex-col items-center justify-center text-slate-400">
                <UserRound className="h-16 w-16" />

                <p className="mt-3 text-sm">
                  Başkan fotoğrafı bulunmuyor.
                </p>
              </div>
            )}
          </div>

          {/* FOTOĞRAF İŞLEMLERİ */}

          {isEditing && (
            <div className="mt-5 space-y-3">
              {/* MEDYADAN SEÇ */}

              <button
                type="button"
                onClick={() => setIsMediaPickerOpen(true)}
                disabled={uploading || saving}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-blue-600 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Image className="h-4 w-4" />
                Medyadan Seç
              </button>

              {/* BİLGİSAYARDAN YÜKLE */}

              {activeTab === "home" && (
                <>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading || saving}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Upload className="h-4 w-4" />

                    {uploading
                      ? "Fotoğraf yükleniyor..."
                      : "Bilgisayardan Yükle"}
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                    onChange={handleHomeComputerUpload}
                    className="hidden"
                  />
                </>
              )}

              {currentSelectedMediaId && (
                <p className="text-center text-xs text-green-600">
                  Fotoğraf seçildi. Güncelle butonuna basarak kaydedin.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* MEDYA SEÇİCİ */}

      <MediaPicker
        isOpen={isMediaPickerOpen}
        category="baskan"
        selectedMediaId={currentSelectedMediaId}
        onSelect={handleMediaSelect}
        onClose={() => setIsMediaPickerOpen(false)}
      />
    </div>
  );
};

export default MayorPage;