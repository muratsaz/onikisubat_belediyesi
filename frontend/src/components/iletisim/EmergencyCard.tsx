import {
  Phone,
  MessageCircle,
  FileText,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Alo 153 Beyaz Masa",
    description:
      "Talep, öneri ve şikayetlerinizi 7/24 iletebilirsiniz.",
    icon: Phone,
    color: "bg-blue-100 text-blue-700",
    href: "tel:153",
  },
  {
    title: "WhatsApp Destek",
    description:
      "Mobil cihazınızdan hızlı şekilde bize ulaşın.",
    icon: MessageCircle,
    color: "bg-emerald-100 text-emerald-700",
    href: "https://wa.me/905000000000",
  },
  {
    title: "E-Belediye",
    description:
      "Online işlemlerinizi güvenle gerçekleştirin.",
    icon: FileText,
    color: "bg-orange-100 text-orange-700",
    href: "#",
  },
];

const EmergencyCard = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 to-sky-600 text-white shadow-xl"
    >
      <div className="grid items-center gap-10 p-10 lg:grid-cols-[340px_1fr]">

        <div>

          <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
            Hızlı İletişim
          </span>

          <h2 className="mt-5 text-4xl font-black">
            Size Nasıl Yardımcı Olabiliriz?
          </h2>

          <p className="mt-5 leading-8 text-blue-100">
            Talep, öneri, şikayet ve bilgi edinme başvurularınızı
            hızlı iletişim kanallarımız üzerinden kolayca
            oluşturabilirsiniz.
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-3">

          {services.map((service) => {
            const Icon = service.icon;

            return (
              <motion.a
                whileHover={{
                  y: -6,
                  scale: 1.03,
                }}
                transition={{ duration: 0.25 }}
                key={service.title}
                href={service.href}
                target="_blank"
                rel="noreferrer"
                className="group rounded-3xl bg-white p-7 text-slate-900 transition hover:shadow-2xl"
              >
                <div
                  className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${service.color}`}
                >
                  <Icon size={30} />
                </div>

                <h3 className="text-xl font-bold">
                  {service.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {service.description}
                </p>

                <div className="mt-8 flex items-center gap-2 font-semibold text-blue-700 transition group-hover:gap-4">
                  Hemen Git
                  <ArrowRight size={18} />
                </div>

              </motion.a>
            );
          })}

        </div>

      </div>
    </motion.section>
  );
};

export default EmergencyCard;