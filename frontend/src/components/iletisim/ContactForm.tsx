import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

import { sendContactMessage } from "../../services/contact.service";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await sendContactMessage(formData);

      setSuccess(
        "Mesajınız başarıyla gönderildi. En kısa sürede dönüş yapılacaktır."
      );

      setFormData({
        full_name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);

      setError(
        "Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      id="baskana-mesaj"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
        İletişim Formu
      </span>

      <h2 className="mt-5 text-3xl font-black text-slate-900">
        Bize Mesaj Gönderin
      </h2>

      <p className="mt-3 leading-7 text-slate-600">
        Görüş, öneri ve taleplerinizi aşağıdaki formu doldurarak
        bize iletebilirsiniz.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-6"
      >
        {/* Ad Soyad + Telefon */}

        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative">
            <User
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Ad Soyad"
              required
              className="h-14 w-full rounded-2xl border border-slate-200 pl-14 pr-4 outline-none transition focus:border-blue-700"
            />
          </div>

          <div className="relative">
            <Phone
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Telefon"
              required
              className="h-14 w-full rounded-2xl border border-slate-200 pl-14 pr-4 outline-none transition focus:border-blue-700"
            />
          </div>
        </div>

        {/* E-Posta */}

        <div className="relative">
          <Mail
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-Posta"
            required
            className="h-14 w-full rounded-2xl border border-slate-200 pl-14 pr-4 outline-none transition focus:border-blue-700"
          />
        </div>

        {/* Konu */}

        <div className="relative">
          <FileText
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Konu"
            required
            className="h-14 w-full rounded-2xl border border-slate-200 pl-14 pr-4 outline-none transition focus:border-blue-700"
          />
        </div>

        {/* Mesaj */}

        <div className="relative">
          <MessageSquare
            size={20}
            className="absolute left-5 top-7 text-slate-400"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={7}
            placeholder="Mesajınız..."
            required
            className="w-full rounded-2xl border border-slate-200 pl-14 pr-4 pt-5 outline-none transition focus:border-blue-700"
          />
        </div>

        {/* Başarı */}

        {success && (
          <div className="rounded-2xl bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-700">
            {success}
          </div>
        )}

        {/* Hata */}

        {error && (
          <div className="rounded-2xl bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {/* Gönder */}

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-3 rounded-2xl bg-blue-700 px-8 py-4 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send size={20} />

          {loading
            ? "Gönderiliyor..."
            : "Mesajı Gönder"}
        </button>
      </form>
    </motion.div>
  );
};

export default ContactForm;