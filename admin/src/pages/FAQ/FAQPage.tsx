import { useEffect, useState } from "react";
import {
  HelpCircle,
  Plus,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

import PageHeader from "../../components/common/PageHeader";

import {
  getFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  type FAQ,
} from "../../services/faqService";

const FAQPage = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Düzenlenen kayıt
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);

  // Form
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [saving, setSaving] = useState(false);

  // --------------------------------------------------
  // FAQ'LARI GETİR
  // --------------------------------------------------

  const loadFAQs = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getFAQs();

      setFaqs(data);
    } catch (error) {
      console.error(
        "FAQ'lar yüklenirken hata oluştu:",
        error
      );

      setError(
        "Sık sorulan sorular yüklenirken bir hata oluştu."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFAQs();
  }, []);

  // --------------------------------------------------
  // YENİ SORU MODALI
  // --------------------------------------------------

  const handleOpenCreateModal = () => {
    setEditingFAQ(null);
    setQuestion("");
    setAnswer("");
    setError("");

    setIsModalOpen(true);
  };

  // --------------------------------------------------
  // DÜZENLEME MODALI
  // --------------------------------------------------

  const handleOpenEditModal = (faq: FAQ) => {
    setEditingFAQ(faq);

    setQuestion(faq.question);
    setAnswer(faq.answer);

    setError("");

    setIsModalOpen(true);
  };

  // --------------------------------------------------
  // MODALI KAPAT
  // --------------------------------------------------

  const handleCloseModal = () => {
    if (saving) {
      return;
    }

    setIsModalOpen(false);
    setEditingFAQ(null);
    setQuestion("");
    setAnswer("");
  };

  // --------------------------------------------------
  // KAYDET
  // --------------------------------------------------

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!question.trim()) {
      setError("Lütfen soru alanını doldurun.");
      return;
    }

    if (!answer.trim()) {
      setError("Lütfen cevap alanını doldurun.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      // DÜZENLE
      if (editingFAQ) {
        const updatedFAQ = await updateFAQ(
          editingFAQ.id,
          {
            question: question.trim(),
            answer: answer.trim(),
          }
        );

        setFaqs((current) =>
          current.map((faq) =>
            faq.id === updatedFAQ.id
              ? updatedFAQ
              : faq
          )
        );
      }

      // YENİ KAYIT
      else {
        const newFAQ = await createFAQ({
          question: question.trim(),
          answer: answer.trim(),
        });

        setFaqs((current) => [
          ...current,
          newFAQ,
        ]);
      }

      handleCloseModal();
    } catch (error) {
      console.error(
        "FAQ kaydedilirken hata oluştu:",
        error
      );

      setError(
        "Soru kaydedilirken bir hata oluştu."
      );
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------------------------
  // SİL
  // --------------------------------------------------

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Bu soruyu silmek istediğinize emin misiniz?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteFAQ(id);

      setFaqs((current) =>
        current.filter((faq) => faq.id !== id)
      );
    } catch (error) {
      console.error(
        "FAQ silinirken hata oluştu:",
        error
      );

      setError(
        "Soru silinirken bir hata oluştu."
      );
    }
  };

  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}

      <PageHeader
        title="Sık Sorulan Sorular"
        description="Vatandaşların merak ettiği soruları ve cevapları buradan yönetin."
        action={
          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus size={20} />
            Yeni Soru
          </button>
        }
      />

      {/* ERROR */}

      {error && !isModalOpen && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-600">
          {error}
        </div>
      )}

      {/* LIST */}

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* HEADER */}

        <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-5">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
            <HelpCircle
              size={24}
              className="text-blue-600"
            />
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              Sorular ve Cevaplar
            </h2>

            <p className="text-sm text-slate-500">
              Merak Ettikleriniz bölümünde gösterilecek içerikler.
            </p>
          </div>

        </div>

        {/* CONTENT */}

        {loading ? (
          <div className="px-6 py-12 text-center text-slate-500">
            Sorular yükleniyor...
          </div>
        ) : faqs.length === 0 ? (
          <div className="px-6 py-12 text-center text-slate-500">

            <HelpCircle
              size={40}
              className="mx-auto mb-4 text-slate-300"
            />

            <p className="font-medium">
              Henüz kayıtlı soru bulunmuyor.
            </p>

            <p className="mt-1 text-sm">
              Yeni Soru butonunu kullanarak ilk soruyu ekleyebilirsiniz.
            </p>

          </div>
        ) : (
          <div className="divide-y divide-slate-100">

            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className="flex items-start justify-between gap-6 px-6 py-5"
              >

                <div className="flex min-w-0 gap-4">

                  {/* NUMBER */}

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-600">
                    {index + 1}
                  </div>

                  {/* CONTENT */}

                  <div className="min-w-0">

                    <h3 className="font-semibold text-slate-900">
                      {faq.question}
                    </h3>

                    <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-500">
                      {faq.answer}
                    </p>

                  </div>

                </div>

                {/* ACTIONS */}

                <div className="flex shrink-0 items-center gap-2">

                  <button
                    type="button"
                    onClick={() =>
                      handleOpenEditModal(faq)
                    }
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                    title="Düzenle"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(faq.id)
                    }
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                    title="Sil"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* ================================================= */}
      {/* MODAL */}
      {/* ================================================= */}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">

          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingFAQ
                    ? "Soruyu Düzenle"
                    : "Yeni Soru Ekle"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Soru ve cevabı vatandaşların göreceği şekilde girin.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                disabled={saving}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={22} />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-6"
            >

              {/* MODAL ERROR */}

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* QUESTION */}

              <div>
                <label
                  htmlFor="faq-question"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Soru
                </label>

                <input
                  id="faq-question"
                  type="text"
                  value={question}
                  onChange={(event) =>
                    setQuestion(event.target.value)
                  }
                  placeholder="Örneğin: Belediyeye nasıl ulaşabilirim?"
                  disabled={saving}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
                />
              </div>

              {/* ANSWER */}

              <div>
                <label
                  htmlFor="faq-answer"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Cevap
                </label>

                <textarea
                  id="faq-answer"
                  value={answer}
                  onChange={(event) =>
                    setAnswer(event.target.value)
                  }
                  placeholder="Sorunun cevabını yazın..."
                  rows={7}
                  disabled={saving}
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
                />
              </div>

              {/* BUTTONS */}

              <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">

                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={saving}
                  className="rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  İptal
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Kaydediliyor..."
                    : editingFAQ
                      ? "Değişiklikleri Kaydet"
                      : "Soruyu Kaydet"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default FAQPage;