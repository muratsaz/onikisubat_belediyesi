import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
} from "lucide-react";
import { motion } from "framer-motion";

const ContactForm = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
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

      <form className="mt-10 space-y-6">

        <div className="grid gap-6 md:grid-cols-2">

          <div className="relative">
            <User
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Ad Soyad"
              className="h-14 w-full rounded-2xl border border-slate-200 pl-14 pr-4 outline-none transition focus:border-blue-700"
            />
          </div>

          <div className="relative">
            <Phone
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Telefon"
              className="h-14 w-full rounded-2xl border border-slate-200 pl-14 pr-4 outline-none transition focus:border-blue-700"
            />
          </div>

        </div>

        <div className="relative">

          <Mail
            size={20}
            className="absolute left-5 top-7 text-slate-400"
          />

          <input
            type="email"
            placeholder="E-Posta"
            className="h-14 w-full rounded-2xl border border-slate-200 pl-14 pr-4 outline-none transition focus:border-blue-700"
          />

        </div>

        <div className="relative">

          <MessageSquare
            size={20}
            className="absolute left-5 top-7 text-slate-400"
          />

          <textarea
            rows={7}
            placeholder="Mesajınız..."
            className="w-full rounded-2xl border border-slate-200 pl-14 pr-4 pt-5 outline-none transition focus:border-blue-700"
          />

        </div>

        <button
          type="submit"
          className="flex items-center gap-3 rounded-2xl bg-blue-700 px-8 py-4 font-semibold text-white transition hover:bg-blue-800"
        >
          <Send size={20} />
          Mesajı Gönder
        </button>

      </form>
    </motion.div>
  );
};

export default ContactForm;