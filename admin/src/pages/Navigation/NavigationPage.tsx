import { useEffect, useMemo, useState } from "react";
import {
  GripVertical,
  Pencil,
  Plus,
  Trash2,
  Save,
  X,
  Loader2,
} from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";

import {
  getAllNavigation,
  createNavigation,
  updateNavigation,
  deleteNavigation,
  updateNavigationOrder,
  type Navigation,
} from "../../services/navigationService";

interface FormData {
  title: string;
  path: string;
  item_type: string;
  parent_id: number | null;
  is_active: boolean;
}

interface NavigationTarget {
  title: string;
  path: string;
  item_type: "route" | "section" | "external";
  group: string;
}

const navigationTargets: NavigationTarget[] = [
  {
    title: "Ana Sayfa",
    path: "/",
    item_type: "route",
    group: "Genel",
  },
  {
    title: "Ana Sayfa → Haberler",
    path: "/#haberler",
    item_type: "section",
    group: "Ana Sayfa Bölümleri",
  },
  {
    title: "Ana Sayfa → Duyurular",
    path: "/#announcements",
    item_type: "section",
    group: "Ana Sayfa Bölümleri",
  },
  {
    title: "Ana Sayfa → Başkan",
    path: "/#baskan",
    item_type: "section",
    group: "Ana Sayfa Bölümleri",
  },
  {
    title: "Haberler",
    path: "/haberler",
    item_type: "route",
    group: "Sayfalar",
  },
  {
    title: "Duyurular",
    path: "/duyurular",
    item_type: "route",
    group: "Sayfalar",
  },
  {
    title: "İhaleler",
    path: "/ihaleler",
    item_type: "route",
    group: "Sayfalar",
  },
  {
    title: "Projeler",
    path: "/projeler",
    item_type: "route",
    group: "Sayfalar",
  },
  {
    title: "İletişim",
    path: "/iletisim",
    item_type: "route",
    group: "Sayfalar",
  },
  {
    title: "Kurumsal",
    path: "/kurumsal",
    item_type: "route",
    group: "Kurumsal",
  },
  {
    title: "Kurumsal → Başkan",
    path: "/kurumsal/baskan",
    item_type: "route",
    group: "Kurumsal",
  },
  {
    title: "Kurumsal → Başkan Yardımcıları",
    path: "/kurumsal/baskan-yardimcilari",
    item_type: "route",
    group: "Kurumsal",
  },
  {
    title: "Kurumsal → Meclis Üyeleri",
    path: "/kurumsal/meclis-uyeleri",
    item_type: "route",
    group: "Kurumsal",
  },
  {
    title: "Kurumsal → Müdürlükler",
    path: "/kurumsal/mudurlukler",
    item_type: "route",
    group: "Kurumsal",
  },
  {
    title: "Kurumsal → Organizasyon Şeması",
    path: "/kurumsal/organizasyon-semasi",
    item_type: "route",
    group: "Kurumsal",
  },
  {
    title: "Kurumsal → Misyon & Vizyon",
    path: "/kurumsal/misyon-vizyon",
    item_type: "route",
    group: "Kurumsal",
  },
];

const emptyForm: FormData = {
  title: "",
  path: "",
  item_type: "route",
  parent_id: null,
  is_active: true,
};

const NavigationPage = () => {
  const [items, setItems] = useState<Navigation[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const [editingItem, setEditingItem] =
    useState<Navigation | null>(null);

  const [form, setForm] =
    useState<FormData>(emptyForm);

  const [draggedId, setDraggedId] =
    useState<number | null>(null);

  const [message, setMessage] = useState("");

  /*
   * Sadece ana menü olabilecek kayıtlar
   * parent_id olarak kullanılabilir.
   */
  const parentMenuItems = useMemo(() => {
    return items.filter((item) => {
      if (
        editingItem &&
        item.id === editingItem.id
      ) {
        return false;
      }

      return item.parent_id === null;
    });
  }, [items, editingItem]);

  /*
   * Menüleri getir
   */
  const loadNavigation = async () => {
    try {
      setLoading(true);

      const data = await getAllNavigation();

      setItems(
        [...data].sort(
          (a, b) =>
            a.display_order -
            b.display_order
        )
      );
    } catch (error) {
      console.error(
        "Menü öğeleri alınamadı:",
        error
      );

      setMessage(
        "Menü öğeleri yüklenirken bir hata oluştu."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNavigation();
  }, []);

  /*
   * Yeni menü modalı
   */
  const openCreateModal = () => {
    setEditingItem(null);
    setForm(emptyForm);
    setMessage("");
    setModalOpen(true);
  };

  /*
   * Düzenleme modalı
   */
  const openEditModal = (
    item: Navigation
  ) => {
    setEditingItem(item);

    setForm({
      title: item.title,
      path: item.path,
      item_type: item.item_type,
      parent_id: item.parent_id ?? null,
      is_active: item.is_active,
    });

    setMessage("");
    setModalOpen(true);
  };

  /*
   * Modal kapat
   */
  const closeModal = () => {
    if (saving) return;

    setModalOpen(false);
    setEditingItem(null);
    setForm(emptyForm);
    setMessage("");
  };

  /*
   * Normal input değişikliği
   */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /*
   * Aktif / pasif
   */
  const handleActiveChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      is_active: e.target.checked,
    }));
  };

  /*
   * Hedef seçildiğinde:
   *
   * Kullanıcı path yazmaz.
   *
   * Örneğin:
   *
   * Kurumsal → Başkan
   *
   * seçerse:
   *
   * title = Başkan
   * path  = /kurumsal/baskan
   */
  const handleTargetChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedPath = e.target.value;

    if (!selectedPath) {
      setForm((prev) => ({
        ...prev,
        title: "",
        path: "",
        item_type: "route",
      }));

      return;
    }

    const target =
      navigationTargets.find(
        (item) =>
          item.path === selectedPath
      );

    if (!target) return;

    let title = target.title;

    /*
     * Admin panelinde görünen başlığı
     * daha temiz hale getiriyoruz.
     */
    if (title.includes(" → ")) {
      title =
        title.split(" → ").pop() ?? title;
    }

    setForm((prev) => ({
      ...prev,
      title,
      path: target.path,
      item_type: target.item_type,
    }));
  };

  /*
   * Üst menü değişikliği
   */
  const handleParentChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      parent_id:
        value === ""
          ? null
          : Number(value),
    }));
  };

  /*
   * Kaydet
   */
  const handleSave = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!form.title.trim()) {
      setMessage(
        "Menü başlığı boş bırakılamaz."
      );
      return;
    }

    if (!form.path.trim()) {
      setMessage(
        "Lütfen bir menü hedefi seçin."
      );
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      if (editingItem) {
        await updateNavigation(
          editingItem.id,
          {
            title: form.title.trim(),
            path: form.path.trim(),
            item_type: form.item_type,
            parent_id: form.parent_id,
            is_active: form.is_active,
          }
        );
      } else {
        await createNavigation({
          title: form.title.trim(),
          path: form.path.trim(),
          item_type: form.item_type,
          parent_id: form.parent_id,
          display_order: items.length,
          is_active: form.is_active,
        });
      }

      await loadNavigation();

      setModalOpen(false);
      setEditingItem(null);
      setForm(emptyForm);
    } catch (error) {
      console.error(
        "Menü öğesi kaydedilemedi:",
        error
      );

      setMessage(
        "Menü öğesi kaydedilirken bir hata oluştu."
      );
    } finally {
      setSaving(false);
    }
  };

  /*
   * Sil
   */
  const handleDelete = async (
    id: number
  ) => {
    const confirmed =
      window.confirm(
        "Bu menü öğesini silmek istediğinize emin misiniz?"
      );

    if (!confirmed) return;

    try {
      await deleteNavigation(id);

      await loadNavigation();
    } catch (error) {
      console.error(
        "Menü öğesi silinemedi:",
        error
      );

      setMessage(
        "Menü öğesi silinirken bir hata oluştu."
      );
    }
  };

  /*
   * Sürükleme başladı
   */
  const handleDragStart = (
    id: number
  ) => {
    setDraggedId(id);
  };

  /*
   * Sürükleme
   */
  const handleDragOver = (
    e: React.DragEvent<HTMLTableRowElement>
  ) => {
    e.preventDefault();
  };

  /*
   * Sürükleme bırakıldı
   */
  const handleDrop = async (
    targetId: number
  ) => {
    if (
      draggedId === null ||
      draggedId === targetId
    ) {
      setDraggedId(null);
      return;
    }

    const oldIndex =
      items.findIndex(
        (item) =>
          item.id === draggedId
      );

    const newIndex =
      items.findIndex(
        (item) =>
          item.id === targetId
      );

    if (
      oldIndex === -1 ||
      newIndex === -1
    ) {
      setDraggedId(null);
      return;
    }

    const reordered = [...items];

    const [movedItem] =
      reordered.splice(
        oldIndex,
        1
      );

    reordered.splice(
      newIndex,
      0,
      movedItem
    );

    const updatedItems =
      reordered.map(
        (item, index) => ({
          ...item,
          display_order: index,
        })
      );

    setItems(updatedItems);
    setDraggedId(null);

    try {
      await updateNavigationOrder(
        updatedItems.map(
          (item) => ({
            id: item.id,
            display_order:
              item.display_order,
          })
        )
      );

      setMessage(
        "Menü sırası güncellendi."
      );

      setTimeout(() => {
        setMessage("");
      }, 2500);
    } catch (error) {
      console.error(
        "Menü sırası güncellenemedi:",
        error
      );

      setMessage(
        "Menü sırası güncellenirken bir hata oluştu."
      );

      await loadNavigation();
    }
  };

  /*
   * Hedef bilgisini bul
   */
  const getTargetLabel = (
    path: string
  ) => {
    const target =
      navigationTargets.find(
        (item) =>
          item.path === path
      );

    return target?.title ?? path;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Menü Yönetimi"
        description="Web sitesindeki menüleri kolayca oluşturun, düzenleyin ve sıralayın."
        action={
          <Button
            onClick={openCreateModal}
          >
            <Plus className="mr-2 h-4 w-4" />
            Yeni Menü
          </Button>
        }
      />

      {message && (
        <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
          {message}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
          </div>
        ) : items.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
            <div className="mb-4 rounded-full bg-slate-100 p-4">
              <Plus className="h-7 w-7 text-slate-500" />
            </div>

            <h3 className="text-lg font-semibold text-slate-800">
              Henüz menü bulunmuyor
            </h3>

            <p className="mt-2 max-w-md text-sm text-slate-500">
              İlk menünüzü oluşturmak için
              "Yeni Menü" butonunu
              kullanabilirsiniz.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left">
                  <th className="w-12 px-4 py-4" />

                  <th className="px-4 py-4 text-sm font-semibold text-slate-600">
                    Menü
                  </th>

                  <th className="px-4 py-4 text-sm font-semibold text-slate-600">
                    Hedef
                  </th>

                  <th className="px-4 py-4 text-sm font-semibold text-slate-600">
                    Menü Türü
                  </th>

                  <th className="px-4 py-4 text-sm font-semibold text-slate-600">
                    Üst Menü
                  </th>

                  <th className="px-4 py-4 text-sm font-semibold text-slate-600">
                    Durum
                  </th>

                  <th className="px-4 py-4 text-right text-sm font-semibold text-slate-600">
                    İşlemler
                  </th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    draggable
                    onDragStart={() =>
                      handleDragStart(
                        item.id
                      )
                    }
                    onDragOver={
                      handleDragOver
                    }
                    onDrop={() =>
                      handleDrop(
                        item.id
                      )
                    }
                    className={`border-b border-slate-100 transition last:border-0 hover:bg-slate-50 ${
                      draggedId ===
                      item.id
                        ? "opacity-50"
                        : ""
                    }`}
                  >
                    <td className="px-4 py-4">
                      <div
                        className="cursor-grab text-slate-400 active:cursor-grabbing"
                        title="Sıralamak için sürükleyin"
                      >
                        <GripVertical className="h-5 w-5" />
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <div
                        className={
                          item.parent_id !==
                          null
                            ? "pl-6"
                            : ""
                        }
                      >
                        <p className="font-semibold text-slate-800">
                          {item.title}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Sıra:{" "}
                          {item.display_order +
                            1}
                        </p>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          {getTargetLabel(
                            item.path
                          )}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {item.path}
                        </p>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        {item.item_type ===
                        "route"
                          ? "Sayfa"
                          : item.item_type ===
                              "section"
                            ? "Bölüm"
                            : "Harici Bağlantı"}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      {item.parent_id !==
                      null ? (
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                          {items.find(
                            (parent) =>
                              parent.id ===
                              item.parent_id
                          )?.title ??
                            "Bilinmiyor"}
                        </span>
                      ) : (
                        <span className="text-sm text-slate-400">
                          Ana Menü
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-4">
                      {item.is_active ? (
                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                          Aktif
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                          Pasif
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            openEditModal(
                              item
                            )
                          }
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                          title="Düzenle"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              item.id
                            )
                          }
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                          title="Sil"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {editingItem
                    ? "Menüyü Düzenle"
                    : "Yeni Menü Oluştur"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Menü hedefini listeden
                  seçerek kolayca
                  oluşturabilirsiniz.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={handleSave}
              className="space-y-5 p-6"
            >
              {/* HEDEF SEÇİMİ */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Menü Hedefi
                </label>

                <select
                  value={form.path}
                  onChange={
                    handleTargetChange
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">
                    Menü hedefi seçin
                  </option>

                  {[
                    "Genel",
                    "Ana Sayfa Bölümleri",
                    "Sayfalar",
                    "Kurumsal",
                  ].map((group) => {
                    const groupItems =
                      navigationTargets.filter(
                        (item) =>
                          item.group ===
                          group
                      );

                    return (
                      <optgroup
                        key={group}
                        label={group}
                      >
                        {groupItems.map(
                          (target) => (
                            <option
                              key={
                                target.path
                              }
                              value={
                                target.path
                              }
                            >
                              {
                                target.title
                              }
                            </option>
                          )
                        )}
                      </optgroup>
                    );
                  })}
                </select>

                <p className="mt-2 text-xs text-slate-500">
                  Bağlantı adresini
                  kendiniz yazmanıza
                  gerek yok. Listeden
                  gitmek istediğiniz
                  yeri seçin.
                </p>
              </div>

              {/* MENÜ BAŞLIĞI */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Menü Başlığı
                </label>

                <input
                  name="title"
                  value={form.title}
                  onChange={
                    handleChange
                  }
                  placeholder="Örn: Başkan"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <p className="mt-2 text-xs text-slate-500">
                  İsterseniz otomatik
                  gelen başlığı
                  değiştirebilirsiniz.
                </p>
              </div>

              {/* OTOMATİK BAĞLANTI */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Bağlantı
                </label>

                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-sm font-medium text-slate-700">
                    {form.path ||
                      "Henüz hedef seçilmedi"}
                  </p>
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  Bu alan otomatik
                  olarak oluşturulur.
                </p>
              </div>

              {/* MENÜ TÜRÜ */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Menü Türü
                </label>

                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <span className="text-sm font-medium text-slate-700">
                    {form.item_type ===
                    "route"
                      ? "Sayfa"
                      : form.item_type ===
                          "section"
                        ? "Bölüm"
                        : "Harici Bağlantı"}
                  </span>
                </div>
              </div>

              {/* ÜST MENÜ */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Üst Menü
                </label>

                <select
                  value={
                    form.parent_id ===
                    null
                      ? ""
                      : String(
                          form.parent_id
                        )
                  }
                  onChange={
                    handleParentChange
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">
                    Üst Menü Yok
                  </option>

                  {parentMenuItems.map(
                    (item) => (
                      <option
                        key={item.id}
                        value={item.id}
                      >
                        {item.title}
                      </option>
                    )
                  )}
                </select>

                <p className="mt-2 text-xs text-slate-500">
                  Bir üst menü seçerseniz
                  bu öğe onun altında
                  gösterilir.
                </p>
              </div>

              {/* AKTİF */}
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4">
                <input
                  type="checkbox"
                  checked={
                    form.is_active
                  }
                  onChange={
                    handleActiveChange
                  }
                  className="h-4 w-4 rounded border-slate-300 text-blue-600"
                />

                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Menü aktif
                  </p>

                  <p className="text-xs text-slate-500">
                    Pasif menüler web
                    sitesinde
                    gösterilmez.
                  </p>
                </div>
              </label>

              {message && (
                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {message}
                </div>
              )}

              {/* BUTONLAR */}
              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={
                    closeModal
                  }
                  disabled={saving}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  İptal
                </button>

                <Button
                  type="submit"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Kaydediliyor...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      {editingItem
                        ? "Değişiklikleri Kaydet"
                        : "Menüyü Oluştur"}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationPage;