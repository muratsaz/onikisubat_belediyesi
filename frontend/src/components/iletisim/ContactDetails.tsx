import {
  Phone,
  Mail,
  MapPin,
  Clock3,
  Building2,
  Globe,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

import { motion } from "framer-motion";

import type { ReactNode } from "react";

import type { ContactSettings } from "../../services/contact.service";

interface ContactDetailsProps {
  contact: ContactSettings;
}

const normalizeUrl = (
  value: string | null | undefined
): string | null => {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://")
  ) {
    return trimmed;
  }

  return `https://${trimmed}`;
};

interface ContactItem {
  icon: typeof Phone;
  title: string;
  value: string;
  href?: string;
  external?: boolean;
}

const ContactDetails = ({
  contact,
}: ContactDetailsProps) => {
  const websiteUrl = normalizeUrl(
    contact.website
  );

  const instagramUrl = normalizeUrl(
    contact.instagram
  );

  const facebookUrl = normalizeUrl(
    contact.facebook
  );

  const xUrl = normalizeUrl(
    contact.x
  );

  const youtubeUrl = normalizeUrl(
    contact.youtube
  );

  const whatsappUrl = normalizeUrl(
    contact.whatsapp
  );

  const eBelediyeUrl = normalizeUrl(
    contact.e_belediye_url
  );

  const mapUrl = normalizeUrl(
    contact.map_url
  );

  const items: ContactItem[] = [
    {
      icon: Phone,
      title: "Telefon",
      value: contact.phone || "-",
      href: contact.phone
        ? `tel:${contact.phone.replace(/\s/g, "")}`
        : undefined,
    },

    {
      icon: Phone,
      title: "Fax",
      value: contact.fax || "-",
      href: contact.fax
        ? `tel:${contact.fax.replace(/\s/g, "")}`
        : undefined,
    },

    {
      icon: Mail,
      title: "E-Posta",
      value: contact.email || "-",
      href: contact.email
        ? `mailto:${contact.email}`
        : undefined,
    },

    {
      icon: Mail,
      title: "KEP",
      value: contact.kep || "-",
      href: contact.kep
        ? `mailto:${contact.kep}`
        : undefined,
    },

    {
      icon: Building2,
      title: "Web Sitesi",
      value: contact.website || "-",
      href: websiteUrl || undefined,
      external: true,
    },

    {
      icon: Clock3,
      title: "Çalışma Saatleri",
      value:
        contact.working_hours || "-",
    },

    {
      icon: MapPin,
      title: "Adres",
      value: contact.address || "-",
      href: mapUrl || undefined,
      external: true,
    },
  ];

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.5,
      }}
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

              {item.href ? (
                <a
                  href={item.href}
                  target={
                    item.external
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    item.external
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="mt-3 inline-flex items-center gap-2 whitespace-pre-line leading-7 text-slate-600 transition hover:text-blue-700"
                >
                  <span>{item.value}</span>

                  {item.external && (
                    <ExternalLink
                      size={16}
                      className="shrink-0"
                    />
                  )}
                </a>
              ) : (
                <p className="mt-3 whitespace-pre-line leading-7 text-slate-600">
                  {item.value}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* SOSYAL MEDYA */}

      {(instagramUrl ||
        facebookUrl ||
        xUrl ||
        youtubeUrl) && (
        <div className="mt-10 rounded-2xl border border-slate-200 p-6">
          <div className="mb-5 flex items-center gap-3">
            <Globe
              size={24}
              className="text-blue-700"
            />

            <div>
              <h3 className="font-bold text-slate-900">
                Sosyal Medya
              </h3>

              <p className="text-sm text-slate-500">
                Belediye sosyal medya hesapları
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {instagramUrl && (
              <SocialLink
                href={instagramUrl}
                label="Instagram"
              />
            )}

            {facebookUrl && (
              <SocialLink
                href={facebookUrl}
                label="Facebook"
              />
            )}

            {xUrl && (
              <SocialLink
                href={xUrl}
                label="X"
              />
            )}

            {youtubeUrl && (
              <SocialLink
                href={youtubeUrl}
                label="YouTube"
              />
            )}
          </div>
        </div>
      )}

      {/* ONLINE HİZMETLER */}

      {(whatsappUrl ||
        eBelediyeUrl ||
        mapUrl) && (
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {whatsappUrl && (
            <QuickLink
              href={whatsappUrl}
              label="WhatsApp"
              icon={
                <MessageCircle size={20} />
              }
            />
          )}

          {eBelediyeUrl && (
            <QuickLink
              href={eBelediyeUrl}
              label="E-Belediye"
              icon={<Globe size={20} />}
            />
          )}

          {mapUrl && (
            <QuickLink
              href={mapUrl}
              label="Haritada Görüntüle"
              icon={<MapPin size={20} />}
            />
          )}
        </div>
      )}
    </motion.section>
  );
};

interface SocialLinkProps {
  href: string;
  label: string;
}

const SocialLink = ({
  href,
  label,
}: SocialLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
    >
      <Globe size={18} />
      {label}
      <ExternalLink size={14} />
    </a>
  );
};

interface QuickLinkProps {
  href: string;
  label: string;
  icon: ReactNode;
}

const QuickLink = ({
  href,
  label,
  icon,
}: QuickLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-3 rounded-2xl border border-slate-200 px-5 py-4 font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
    >
      {icon}

      {label}

      <ExternalLink size={16} />
    </a>
  );
};

export default ContactDetails;