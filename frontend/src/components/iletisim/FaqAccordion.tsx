import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  HelpCircle,
} from "lucide-react";

const faqs = [
  {
    question: "Başvuruma ne zaman dönüş yapılır?",
    answer:
      "Başvurularınız ilgili müdürlüğe yönlendirilir ve en kısa sürede değerlendirilerek tarafınıza dönüş sağlanır.",
  },
  {
    question: "Beyaz Masa başvurumu nasıl takip edebilirim?",
    answer:
      "Başvuru numaranız ile Beyaz Masa sistemi üzerinden veya çağrı merkezimiz aracılığıyla başvurunuzun durumunu takip edebilirsiniz.",
  },
  {
    question: "İletişim formundan gönderilen mesajlar güvenli midir?",
    answer:
      "Evet. Gönderdiğiniz bilgiler güvenli şekilde saklanır ve yalnızca ilgili birimler tarafından değerlendirilir.",
  },
  {
    question: "E-Belediye hizmetlerine nasıl ulaşabilirim?",
    answer:
      "E-Belediye sistemine ana menüde bulunan E-Belediye bağlantısından veya hızlı işlem kartları üzerinden ulaşabilirsiniz.",
  },
  {
    question: "Mesai saatleri dışında belediyeye nasıl ulaşabilirim?",
    answer:
      "Mesai saatleri dışında Alo 153 Beyaz Masa ve resmi sosyal medya hesaplarımız üzerinden bize ulaşabilirsiniz.",
  },
];

const FaqAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm"
    >
      <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
        Sık Sorulan Sorular
      </span>

      <h2 className="mt-5 text-3xl font-black text-slate-900">
        Merak Ettikleriniz
      </h2>

      <p className="mt-4 max-w-3xl leading-7 text-slate-600">
        Belediyemiz ile iletişim süreci hakkında en çok sorulan
        soruların cevaplarını aşağıda bulabilirsiniz.
      </p>

      <div className="mt-10 space-y-4">

        {faqs.map((faq, index) => {

          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-slate-200"
            >

              <button
                onClick={() =>
                  setOpenIndex(isOpen ? null : index)
                }
                className="flex w-full items-center justify-between px-8 py-6 text-left transition hover:bg-slate-50"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                    <HelpCircle
                      size={22}
                      className="text-blue-700"
                    />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {faq.question}
                  </h3>

                </div>

                <ChevronDown
                  className={`transition duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />

              </button>

              <AnimatePresence>

                {isOpen && (

                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                  >

                    <div className="border-t border-slate-200 px-8 py-6">

                      <p className="leading-8 text-slate-600">
                        {faq.answer}
                      </p>

                    </div>

                  </motion.div>

                )}

              </AnimatePresence>

            </div>
          );
        })}

      </div>
    </motion.section>
  );
};

export default FaqAccordion;