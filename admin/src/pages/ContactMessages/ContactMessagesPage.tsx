import { useEffect, useState } from "react";
import { X } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";

import {
  getAllContactMessages,
  updateContactMessage,
  deleteContactMessage,
  type ContactMessage,
} from "../../services/contactMessageService";

const ContactMessagesPage = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] =
    useState<ContactMessage | null>(null);

  const loadMessages = async () => {
    try {
      setLoading(true);

      const data = await getAllContactMessages();

      setMessages(data);
    } catch (error) {
      console.error(
        "İletişim mesajları alınamadı:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleOpenMessage = async (
    message: ContactMessage
  ) => {
    setSelectedMessage(message);

    if (!message.is_read) {
      try {
        const updated = await updateContactMessage(
          message.id,
          {
            is_read: true,
          }
        );

        setMessages((prev) =>
          prev.map((item) =>
            item.id === updated.id
              ? updated
              : item
          )
        );

        setSelectedMessage(updated);
      } catch (error) {
        console.error(
          "Mesaj okundu olarak işaretlenemedi:",
          error
        );
      }
    }
  };

  const handleDelete = async (
    id: number
  ) => {
    const confirmed = window.confirm(
      "Bu mesajı silmek istediğinize emin misiniz?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteContactMessage(id);

      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }

      await loadMessages();
    } catch (error) {
      console.error(
        "Mesaj silinemedi:",
        error
      );
    }
  };

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="İletişim Mesajları"
          description="Vatandaşlardan gelen iletişim mesajlarını buradan yönetebilirsiniz."
        />

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {loading ? (
            <div className="p-8 text-center text-slate-500">
              Mesajlar yükleniyor...
            </div>
          ) : messages.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              Henüz iletişim mesajı bulunmuyor.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                      Ad Soyad
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                      Konu
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                      E-Posta
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                      Tarih
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                      Durum
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                      İşlem
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {messages.map((message) => (
                    <tr
                      key={message.id}
                      className="border-b last:border-b-0 hover:bg-slate-50"
                    >
                      <td className="px-6 py-5">
                        <button
                          type="button"
                          onClick={() =>
                            handleOpenMessage(message)
                          }
                          className="text-left"
                        >
                          <p className="font-semibold text-slate-900 hover:text-blue-700">
                            {message.full_name}
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            {message.phone}
                          </p>
                        </button>
                      </td>

                      <td className="max-w-[260px] px-6 py-5">
                        <button
                          type="button"
                          onClick={() =>
                            handleOpenMessage(message)
                          }
                          className="truncate text-sm font-medium text-slate-800 hover:text-blue-700"
                        >
                          {message.subject}
                        </button>
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-600">
                        {message.email}
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-600">
                        {new Date(
                          message.created_at
                        ).toLocaleDateString("tr-TR")}
                      </td>

                      <td className="px-6 py-5">
                        {message.is_read ? (
                          <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                            Okundu
                          </span>
                        ) : (
                          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                            Yeni
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-5">
                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(message.id)
                          }
                          className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                        >
                          Sil
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  İletişim Mesajı
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {new Date(
                    selectedMessage.created_at
                  ).toLocaleString("tr-TR")}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedMessage(null)
                }
                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Ad Soyad
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {selectedMessage.full_name}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Telefon
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {selectedMessage.phone}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    E-Posta
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {selectedMessage.email}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Konu
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {selectedMessage.subject}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Mesaj
                </p>

                <div className="mt-3 rounded-2xl bg-slate-50 p-5">
                  <p className="whitespace-pre-wrap leading-7 text-slate-700">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-200 px-6 py-5">
              <button
                type="button"
                onClick={() =>
                  setSelectedMessage(null)
                }
                className="rounded-xl bg-blue-700 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-800"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactMessagesPage;