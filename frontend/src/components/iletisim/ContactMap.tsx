import { MapPin, Navigation } from "lucide-react";
import { motion } from "framer-motion";

const ContactMap = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
    >
      {/* Başlık */}

      <div className="border-b border-slate-200 p-8">

        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
          Konumumuz
        </span>

        <h2 className="mt-5 text-3xl font-black text-slate-900">
          Onikişubat Belediyesi
        </h2>

        <p className="mt-3 leading-7 text-slate-600">
          Belediyemizin hizmet binasına harita üzerinden kolayca
          ulaşabilir, yol tarifi oluşturabilirsiniz.
        </p>

      </div>

      {/* Harita */}

      <div className="h-[430px] w-full">

        <iframe
          title="Onikişubat Belediyesi"
          src="https://www.google.com/maps?q=Onikişubat+Belediyesi+Kahramanmaraş&output=embed"
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

      </div>

      {/* Alt Bilgi */}

      <div className="flex flex-col gap-5 p-8">

        <div className="flex items-start gap-3">

          <MapPin
            size={22}
            className="mt-1 text-blue-700"
          />

          <div>

            <h3 className="font-bold text-slate-900">
              Belediye Hizmet Binası
            </h3>

            <p className="mt-2 leading-7 text-slate-600">
              Onikişubat Belediyesi
              <br />
              Kahramanmaraş / Türkiye
            </p>

          </div>

        </div>

        <a
          href="https://maps.google.com/?q=Onikişubat+Belediyesi+Kahramanmaraş"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 rounded-2xl bg-blue-700 py-4 font-semibold text-white transition hover:bg-blue-800"
        >
          <Navigation size={20} />
          Yol Tarifi Al
        </a>

      </div>

    </motion.div>
  );
};

export default ContactMap;