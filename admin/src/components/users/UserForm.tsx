import { useEffect, useState } from "react";
import type {
  User,
  UserCreateData,
  UserUpdateData,
} from "../../services/userService";

interface UserFormProps {
  user?: User | null;
  loading?: boolean;
  onSubmit: (
    data: UserCreateData | UserUpdateData
  ) => void;
  onCancel: () => void;
}

const UserForm = ({
  user,
  loading = false,
  onSubmit,
  onCancel,
}: UserFormProps) => {
  const isEdit = !!user;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setPassword("");
      setIsAdmin(user.is_admin);
      setIsSuperAdmin(user.is_superadmin);
      setIsActive(user.is_active);
    } else {
      setUsername("");
      setEmail("");
      setPassword("");
      setIsAdmin(true);
      setIsSuperAdmin(false);
      setIsActive(true);
    }
  }, [user]);

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!isEdit && !password.trim()) {
      return;
    }

    if (isEdit) {
      const data: UserUpdateData = {
        username,
        email,
        is_admin: isAdmin,
        is_superadmin: isSuperAdmin,
        is_active: isActive,
      };

      onSubmit(data);
      return;
    }

    const data: UserCreateData = {
      username,
      email,
      password,
      is_admin: true,
    };

    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Kullanıcı Adı
        </label>

        <input
          type="text"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          placeholder="kullaniciadi"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          E-posta
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          placeholder="admin@onikisubat.bel.tr"
        />
      </div>

      {!isEdit && (
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Şifre
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
            minLength={6}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            placeholder="••••••••"
          />
        </div>
      )}

      {isEdit && (
        <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-700">
            Yetki ve Durum
          </p>

          <label className="flex cursor-pointer items-center justify-between rounded-lg bg-white p-3">
            <span className="text-sm text-slate-700">
              Admin Yetkisi
            </span>

            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) =>
                setIsAdmin(e.target.checked)
              }
              className="h-5 w-5"
            />
          </label>

          <label className="flex cursor-pointer items-center justify-between rounded-lg bg-white p-3">
            <span className="text-sm text-slate-700">
              SuperAdmin Yetkisi
            </span>

            <input
              type="checkbox"
              checked={isSuperAdmin}
              onChange={(e) =>
                setIsSuperAdmin(e.target.checked)
              }
              className="h-5 w-5"
            />
          </label>

          <label className="flex cursor-pointer items-center justify-between rounded-lg bg-white p-3">
            <span className="text-sm text-slate-700">
              Aktif Hesap
            </span>

            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) =>
                setIsActive(e.target.checked)
              }
              className="h-5 w-5"
            />
          </label>
        </div>
      )}

      {!isEdit && (
        <div className="rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-700">
          Yeni kullanıcı Admin olarak oluşturulacaktır.
        </div>
      )}

      <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-xl border border-slate-300 px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
        >
          İptal
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-blue-700 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-800 disabled:opacity-50"
        >
          {loading
            ? "Kaydediliyor..."
            : isEdit
              ? "Değişiklikleri Kaydet"
              : "Kullanıcı Oluştur"}
        </button>
      </div>
    </form>
  );
};

export default UserForm;