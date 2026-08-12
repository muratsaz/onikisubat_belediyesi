import { useEffect, useState } from "react";
import {
  Lock,
  User as UserIcon,
  ShieldCheck,
  Mail,
  CheckCircle2,
} from "lucide-react";

import {
  getCurrentUser,
  changeOwnPassword,
  type User,
} from "../../services/userService";

const SettingsPage = () => {
  const [user, setUser] = useState<User | null>(null);

  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingPassword, setLoadingPassword] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =====================================================
  // CURRENT USER
  // =====================================================

  const loadCurrentUser = async () => {
    try {
      setLoadingUser(true);
      setError("");

      const data = await getCurrentUser();

      setUser(data);
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          "Kullanıcı bilgileri alınamadı."
      );
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    loadCurrentUser();
  }, []);

  // =====================================================
  // CHANGE PASSWORD
  // =====================================================

  const handlePasswordChange = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !currentPassword ||
      !newPassword ||
      !newPasswordAgain
    ) {
      setError(
        "Lütfen tüm şifre alanlarını doldurun."
      );

      return;
    }

    if (newPassword !== newPasswordAgain) {
      setError(
        "Yeni şifreler eşleşmiyor."
      );

      return;
    }

    if (currentPassword === newPassword) {
      setError(
        "Yeni şifre mevcut şifre ile aynı olamaz."
      );

      return;
    }

    try {
      setLoadingPassword(true);

      await changeOwnPassword({
        current_password: currentPassword,
        new_password: newPassword,
      });

      setCurrentPassword("");
      setNewPassword("");
      setNewPasswordAgain("");

      setSuccess(
        "Şifreniz başarıyla değiştirildi."
      );
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          "Şifre değiştirilirken bir hata oluştu."
      );
    } finally {
      setLoadingPassword(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loadingUser) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-slate-500">
          Kullanıcı bilgileri yükleniyor...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Ayarlar
        </h1>

        <p className="mt-1 text-slate-500">
          Hesap bilgilerinizi ve güvenlik ayarlarınızı yönetin.
        </p>
      </div>

      {/* ================================================= */}
      {/* ERROR */}
      {/* ================================================= */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
          {error}
        </div>
      )}

      {/* ================================================= */}
      {/* SUCCESS */}
      {/* ================================================= */}

      {success && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-green-700">
          {success}
        </div>
      )}

      {/* ================================================= */}
      {/* ACCOUNT INFORMATION */}
      {/* ================================================= */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-6 flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
            <UserIcon size={22} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Hesap Bilgileri
            </h2>

            <p className="text-sm text-slate-500">
              Giriş yaptığınız kullanıcı hesabının bilgileri.
            </p>
          </div>

        </div>

        {user && (
          <div className="grid gap-4 md:grid-cols-2">

            {/* USERNAME */}

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

              <div className="mb-1 flex items-center gap-2 text-sm text-slate-500">
                <UserIcon size={16} />
                Kullanıcı Adı
              </div>

              <p className="font-semibold text-slate-800">
                {user.username}
              </p>

            </div>

            {/* EMAIL */}

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

              <div className="mb-1 flex items-center gap-2 text-sm text-slate-500">
                <Mail size={16} />
                E-posta
              </div>

              <p className="font-semibold text-slate-800">
                {user.email}
              </p>

            </div>

            {/* ROLE */}

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

              <div className="mb-1 flex items-center gap-2 text-sm text-slate-500">
                <ShieldCheck size={16} />
                Yetki
              </div>

              {user.is_superadmin ? (
                <p className="font-semibold text-purple-700">
                  SuperAdmin
                </p>
              ) : user.is_admin ? (
                <p className="font-semibold text-blue-700">
                  Admin
                </p>
              ) : (
                <p className="font-semibold text-slate-600">
                  Kullanıcı
                </p>
              )}

            </div>

            {/* STATUS */}

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

              <div className="mb-1 flex items-center gap-2 text-sm text-slate-500">
                <CheckCircle2 size={16} />
                Durum
              </div>

              {user.is_active ? (
                <p className="font-semibold text-green-600">
                  Aktif
                </p>
              ) : (
                <p className="font-semibold text-red-600">
                  Pasif
                </p>
              )}

            </div>

          </div>
        )}

      </div>

      {/* ================================================= */}
      {/* PASSWORD */}
      {/* ================================================= */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-6 flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
            <Lock size={22} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Şifre Değiştir
            </h2>

            <p className="text-sm text-slate-500">
              Sadece kendi hesabınızın şifresini değiştirebilirsiniz.
            </p>
          </div>

        </div>

        <form
          onSubmit={handlePasswordChange}
          className="max-w-xl space-y-5"
        >

          {/* CURRENT PASSWORD */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Mevcut Şifre
            </label>

            <input
              type="password"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(e.target.value)
              }
              placeholder="Mevcut şifreniz"
              autoComplete="current-password"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* NEW PASSWORD */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Yeni Şifre
            </label>

            <input
              type="password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              placeholder="Yeni şifreniz"
              autoComplete="new-password"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* NEW PASSWORD AGAIN */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Yeni Şifre Tekrar
            </label>

            <input
              type="password"
              value={newPasswordAgain}
              onChange={(e) =>
                setNewPasswordAgain(e.target.value)
              }
              placeholder="Yeni şifrenizi tekrar girin"
              autoComplete="new-password"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={loadingPassword}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Lock size={18} />

            {loadingPassword
              ? "Değiştiriliyor..."
              : "Şifreyi Değiştir"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default SettingsPage;