import {
  Phone,
  Mail,
  MapPin,
  Clock3,
  Building2,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";

import type { ContactSettings } from "../../services/contact.service";

interface ContactDetailsProps {
  contact: ContactSettings;
}

const ContactDetails = ({
  contact,
}: ContactDetailsProps) => {
  const items = [
    {
      icon: Phone,
      title: "Telefon",
      value: contact.phone || "-",
    },
    {
      icon: Phone,
      title: "Fax",
      value: contact.fax || "-",
    },
    {
      icon: Mail,
      title: "E-Posta",
      value: contact.email || "-",
    },
    {
      icon: Mail,
      title: "KEP",
      value: contact.kep || "-",
    },
    {
      icon: Building2,
      title: "Web Sitesi",
      value: contact.website || "-",
    },
    {
      icon: Clock3,
      title: "Çalışma Saatleri",
      value: contact.working_hours || "-",
    },
    {
      icon: MapPin,
      title: "Adres",
      value: contact.address || "-",
    },
    {
      icon: Globe,
      title: "Sosyal Medya",
      value: [
        contact.instagram && "Instagram",
        contact.facebook && "Facebook",
        contact.x && "X",
        contact.youtube && "YouTube",
      ]
        .filter(Boolean)
        .join(" • ") || "-",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm"
    >
      <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
        Kurumsal Bilgiler
      </span>

      <h2 className="mt-5 text-3xl font-black text-slate-900">
        İletişim Bilgileri
      </h2>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 p-6 transition hover:border-blue-200 hover:shadow-md"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                <Icon
                  size={26}
                  className="text-blue-700"
                />
              </div>

              <h3 className="font-bold text-slate-900">
                {item.title}
              </h3>

              <p className="mt-3 whitespace-pre-line leading-7 text-slate-600">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default ContactDetails;