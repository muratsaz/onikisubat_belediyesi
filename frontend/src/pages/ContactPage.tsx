import PageHeader from "../components/common/PageHeader";

import ContactInfoCards from "../components/iletisim/ContactInfoCards";
import ContactForm from "../components/iletisim/ContactForm";
import ContactMap from "../components/iletisim/ContactMap";
import ContactDetails from "../components/iletisim/ContactDetails";
import EmergencyCard from "../components/iletisim/EmergencyCard";
import DepartmentContacts from "../components/iletisim/DepartmentContacts.";
import FaqAccordion from "../components/iletisim/FaqAccordion";

const ContactPage = () => {
  return (
    <>
      <PageHeader
        title="İletişim"
        section="Bize Ulaşın"
        description="Onikişubat Belediyesi ile iletişime geçebilir, talep ve önerilerinizi iletebilir, adres ve iletişim bilgilerimize ulaşabilirsiniz."
      />

      <section className="bg-slate-100 py-16">

        <div className="mx-auto max-w-7xl space-y-12 px-4 lg:px-6">

          <ContactInfoCards />

          <div className="grid gap-8 lg:grid-cols-[1fr_520px]">
            <ContactForm />
            <ContactMap />
          </div>

          <ContactDetails />

          <EmergencyCard />

          <DepartmentContacts />

          <FaqAccordion />

        </div>

      </section>
    </>
  );
};

export default ContactPage;