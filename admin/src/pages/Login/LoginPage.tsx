import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  login,
  saveToken,
  getCurrentUser,
  saveCurrentUser,
} from "../../services/authService";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await login({
        email,
        password,
      });

      saveToken(response.access_token);

      const currentUser = await getCurrentUser();

      saveCurrentUser(currentUser);

      navigate("/");
    } catch (err: any) {
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");

      if (err.response?.status === 401) {
        setError("E-posta veya şifre hatalı.");
      } else if (err.response?.status === 403) {
        setError("Bu hesaba erişim izni yok.");
      } else {
        setError("Sunucuya bağlanılamadı.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

        <h1 className="mb-2 text-center text-3xl font-bold text-slate-800">
          Admin Girişi
        </h1>

        <p className="mb-8 text-center text-slate-500">
          Onikişubat Belediyesi Yönetim Paneli
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block font-medium">
              E-posta
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
              placeholder="admin@mail.com"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Şifre
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
              placeholder="********"
              required
            />
          </div>

          {error && (
            <div className="rounded-xl bg-red-100 px-4 py-3 text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-700 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:opacity-50"
          >
            {loading
              ? "Giriş Yapılıyor..."
              : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;