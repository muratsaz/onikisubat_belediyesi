import { useEffect, useState } from "react";
import {
  Shield,
  ShieldCheck,
  UserCheck,
  UserX,
  Trash2,
  RefreshCw,
  Plus,
  Pencil,
} from "lucide-react";

import UserModal from "../../components/users/UserModal";
import UserForm from "../../components/users/UserForm";

import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  type User,
  type UserCreateData,
  type UserUpdateData,
} from "../../services/userService";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllUsers();

      setUsers(data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError("Oturumunuz geçersiz. Lütfen tekrar giriş yapın.");
      } else if (err.response?.status === 403) {
        setError(
          "Bu sayfaya erişmek için SuperAdmin yetkisi gerekiyor."
        );
      } else {
        setError(
          err.response?.data?.detail ||
            "Kullanıcılar yüklenirken bir hata oluştu."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const openCreateModal = () => {
    setEditingUser(null);
    setError("");
    setSuccess("");
    setModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setError("");
    setSuccess("");
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;

    setModalOpen(false);
    setEditingUser(null);
  };

  const handleSubmit = async (
    data: UserCreateData | UserUpdateData
  ) => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (editingUser) {
        const updatedUser = await updateUser(
          editingUser.id,
          data as UserUpdateData
        );

        setUsers((prev) =>
          prev.map((item) =>
            item.id === updatedUser.id
              ? updatedUser
              : item
          )
        );

        setSuccess(
          `"${updatedUser.username}" kullanıcısı başarıyla güncellendi.`
        );
      } else {
        const newUser = await createUser(
          data as UserCreateData
        );

        setUsers((prev) => [newUser, ...prev]);

        setSuccess(
          `"${newUser.username}" kullanıcısı başarıyla oluşturuldu.`
        );
      }

      setModalOpen(false);
      setEditingUser(null);
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          "Kullanıcı işlemi sırasında bir hata oluştu."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (user: User) => {
    const confirmed = window.confirm(
      `"${user.username}" kullanıcısını silmek istediğinize emin misiniz?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(user.id);
      setError("");
      setSuccess("");

      await deleteUser(user.id);

      setUsers((prev) =>
        prev.filter((item) => item.id !== user.id)
      );

      setSuccess(
        `"${user.username}" kullanıcısı başarıyla silindi.`
      );
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          "Kullanıcı silinirken bir hata oluştu."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Kullanıcı Yönetimi
          </h1>

          <p className="mt-1 text-slate-500">
            Sistem kullanıcılarını ve yetkilerini yönetin.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadUsers}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw
              size={18}
              className={loading ? "animate-spin" : ""}
            />

            Yenile
          </button>

          <button
            type="button"
            onClick={openCreateModal}
            className="flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-800"
          >
            <Plus size={18} />

            Kullanıcı Oluştur
          </button>
        </div>
      </div>

      {/* ERROR */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
          {error}
        </div>
      )}

      {/* SUCCESS */}

      {success && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-green-700">
          {success}
        </div>
      )}

      {/* TABLE */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Kullanıcı
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  E-posta
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Yetki
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Durum
                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">
                  İşlemler
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    Kullanıcılar yükleniyor...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    Sistemde kayıtlı kullanıcı bulunmuyor.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="transition hover:bg-slate-50"
                  >
                    {/* USER */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                          {user.username
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <div className="font-semibold text-slate-800">
                            {user.username}
                          </div>

                          <div className="text-xs text-slate-400">
                            ID: {user.id}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* EMAIL */}

                    <td className="px-6 py-5 text-sm text-slate-600">
                      {user.email}
                    </td>

                    {/* ROLE */}

                    <td className="px-6 py-5">
                      {user.is_superadmin ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1.5 text-xs font-semibold text-purple-700">
                          <ShieldCheck size={15} />
                          SuperAdmin
                        </span>
                      ) : user.is_admin ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700">
                          <Shield size={15} />
                          Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                          Kullanıcı
                        </span>
                      )}
                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-5">
                      {user.is_active ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
                          <UserCheck size={15} />
                          Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700">
                          <UserX size={15} />
                          Pasif
                        </span>
                      )}
                    </td>

                    {/* ACTIONS */}

                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            openEditModal(user)
                          }
                          className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                        >
                          <Pencil size={16} />

                          Düzenle
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(user)
                          }
                          disabled={
                            deletingId === user.id
                          }
                          className="flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Trash2 size={16} />

                          {deletingId === user.id
                            ? "Siliniyor..."
                            : "Sil"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* USER MODAL */}

      <UserModal
        open={modalOpen}
        title={
          editingUser
            ? "Kullanıcı Düzenle"
            : "Yeni Kullanıcı Oluştur"
        }
        onClose={closeModal}
      >
        <UserForm
          user={editingUser}
          loading={saving}
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      </UserModal>
    </div>
  );
};

export default UsersPage;