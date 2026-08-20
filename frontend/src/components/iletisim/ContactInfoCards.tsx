import {
  Phone,
  Mail,
  MapPin,
  Clock3,
} from "lucide-react";
import { motion } from "framer-motion";

import type { ContactSettings } from "../../services/contact.service";

interface ContactInfoCardsProps {
  contact: ContactSettings;
}

const ContactInfoCards = ({
  contact,
}: ContactInfoCardsProps) => {
  const cards = [
    {
      title: "Telefon",
      value: contact.phone || "-",
      icon: Phone,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "E-Posta",
      value: contact.email || "-",
      icon: Mail,
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "Adres",
      value: contact.address || "-",
      icon: MapPin,
      color: "bg-orange-100 text-orange-700",
    },
    {
      title: "Çalışma Saatleri",
      value: contact.working_hours || "-",
      icon: Clock3,
      color: "bg-violet-100 text-violet-700",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            whileHover={{
              y: -6,
              scale: 1.02,
            }}
            transition={{ duration: 0.25 }}
            className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:shadow-xl"
          >
            <div
              className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${card.color}`}
            >
              <Icon size={30} />
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              {card.title}
            </h3>

            <p className="mt-3 leading-7 text-slate-600">
              {card.value}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ContactInfoCards;