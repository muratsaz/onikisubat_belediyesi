import { useEffect, useState } from "react";

import PageHeader from "../components/common/PageHeader";

import ContactInfoCards from "../components/iletisim/ContactInfoCards";
import ContactForm from "../components/iletisim/ContactForm";
import ContactMap from "../components/iletisim/ContactMap";
import ContactDetails from "../components/iletisim/ContactDetails";
import EmergencyCard from "../components/iletisim/EmergencyCard";
import DepartmentContacts from "../components/iletisim/DepartmentContacts.";
import FaqAccordion from "../components/iletisim/FaqAccordion";

import {
  getContactSettings,
  type ContactSettings,
} from "../services/contact.service";

const ContactPage = () => {
  const [contact, setContact] = useState<ContactSettings | null>(null);

  useEffect(() => {
    const fetchContactSettings = async () => {
      try {
        const data = await getContactSettings();
        setContact(data);
      } catch (error) {
        console.error(
          "İletişim ayarları alınamadı:",
          error
        );
      }
    };

    fetchContactSettings();
  }, []);

  // Başkana Mesaj bağlantısından gelindiğinde
  // doğrudan mesaj formuna kaydır.
  useEffect(() => {
    if (window.location.hash !== "#baskana-mesaj") {
      return;
    }

    const scrollToContactForm = () => {
      const element = document.getElementById("baskana-mesaj");

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        return true;
      }

      return false;
    };

    // Sayfanın DOM'a tamamen yerleşmesini bekle.
    const timeout = window.setTimeout(() => {
      scrollToContactForm();
    }, 100);

    return () => {
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <PageHeader
        title="İletişim"
        section="Bize Ulaşın"
        description="Onikişubat Belediyesi ile iletişime geçebilir, talep ve önerilerinizi iletebilir, adres ve iletişim bilgilerimize ulaşabilirsiniz."
      />

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl space-y-12 px-4 lg:px-6">

          {contact && (
            <ContactInfoCards contact={contact} />
          )}

          <div className="grid gap-8 lg:grid-cols-[1fr_520px]">
            <ContactForm />
            <ContactMap />
          </div>

          {contact && (
            <ContactDetails contact={contact} />
          )}

          {contact && (
            <EmergencyCard contact={contact} />
          )}

          <DepartmentContacts />

          <FaqAccordion />

        </div>
      </section>
    </>
  );
};

export default ContactPage;