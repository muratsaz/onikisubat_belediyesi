import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  User,
  Eye,
  Trash2,
  Check,
  X,
} from "lucide-react";

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

  const handleRead = async (
    message: ContactMessage
  ) => {
    try {
      if (!message.is_read) {
        const updated =
          await updateContactMessage(
            message.id,
            {
              is_read: true,
            }
          );

        setMessages((current) =>
          current.map((item) =>
            item.id === updated.id
              ? updated
              : item
          )
        );

        setSelectedMessage(updated);
      } else {
        setSelectedMessage(message);
      }
    } catch (error) {
      console.error(
        "Mesaj okundu olarak işaretlenemedi:",
        error
      );
    }
  };

  const handleUnread = async (
    message: ContactMessage
  ) => {
    try {
      const updated =
        await updateContactMessage(
          message.id,
          {
            is_read: false,
          }
        );

      setMessages((current) =>
        current.map((item) =>
          item.id === updated.id
            ? updated
            : item
        )
      );

      setSelectedMessage(updated);
    } catch (error) {
      console.error(
        "Mesaj okunmadı olarak işaretlenemedi:",
        error
      );
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

      setMessages((current) =>
        current.filter(
          (message) => message.id !== id
        )
      );

      if (
        selectedMessage?.id === id
      ) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error(
        "Mesaj silinemedi:",
        error
      );
    }
  };

  const unreadCount = messages.filter(
    (message) => !message.is_read
  ).length;

  return (
    <div className="space-y-6">

      <PageHeader
        title="İletişim Mesajları"
        description="Vatandaşlardan gelen iletişim mesajlarını buradan yönetebilirsiniz."
      />

      <div className="grid gap-4 md:grid-cols-3">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Toplam Mesaj
              </p>

              <p className="mt-2 text-3xl font-black text-slate-900">
                {messages.length}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
              <Mail size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Okunmamış
              </p>

              <p className="mt-2 text-3xl font-black text-slate-900">
                {unreadCount}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
              <Mail size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Okunmuş
              </p>

              <p className="mt-2 text-3xl font-black text-slate-900">
                {messages.length - unreadCount}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <Check size={24} />
            </div>
          </div>
        </div>

      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        {loading ? (
          <div className="p-10 text-center text-slate-500">
            Mesajlar yükleniyor...
          </div>
        ) : messages.length === 0 ? (
          <div className="p-10 text-center">
            <Mail
              size={42}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              Henüz mesaj yok
            </h3>

            <p className="mt-2 text-slate-500">
              Vatandaşlardan gelen mesajlar burada
              görünecek.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    Gönderen
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    Konu
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    Tarih
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    Durum
                  </th>

                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">
                    İşlemler
                  </th>

                </tr>
              </thead>

              <tbody>

                {messages.map((message) => (
                  <tr
                    key={message.id}
                    className={`border-b border-slate-100 transition hover:bg-slate-50 ${
                      !message.is_read
                        ? "bg-blue-50/40"
                        : ""
                    }`}
                  >

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                          <User size={18} />
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {message.full_name}
                          </p>

                          <p className="text-sm text-slate-500">
                            {message.email}
                          </p>
                        </div>

                      </div>

                    </td>

                    <td className="px-6 py-5">

                      <p
                        className={`max-w-xs truncate ${
                          !message.is_read
                            ? "font-bold text-slate-900"
                            : "font-medium text-slate-700"
                        }`}
                      >
                        {message.subject}
                      </p>

                    </td>

                    <td className="px-6 py-5 text-sm text-slate-500">
                      {new Date(
                        message.created_at
                      ).toLocaleDateString(
                        "tr-TR"
                      )}
                    </td>

                    <td className="px-6 py-5">

                      {message.is_read ? (
                        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                          <Check size={14} />
                          Okundu
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                          <Mail size={14} />
                          Yeni
                        </span>
                      )}

                    </td>

                    <td className="px-6 py-5">

                      <div className="flex justify-end gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            handleRead(
                              message
                            )
                          }
                          title="Mesajı Görüntüle"
                          className="rounded-xl p-2 text-blue-600 transition hover:bg-blue-50"
                        >
                          <Eye size={19} />
                        </button>

                        {message.is_read && (
                          <button
                            type="button"
                            onClick={() =>
                              handleUnread(
                                message
                              )
                            }
                            title="Okunmadı olarak işaretle"
                            className="rounded-xl p-2 text-orange-600 transition hover:bg-orange-50"
                          >
                            <Mail size={19} />
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              message.id
                            )
                          }
                          title="Mesajı Sil"
                          className="rounded-xl p-2 text-red-600 transition hover:bg-red-50"
                        >
                          <Trash2 size={19} />
                        </button>

                      </div>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b border-slate-200 p-6">

              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Mesaj Detayı
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
                className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <X size={22} />
              </button>

            </div>

            <div className="space-y-6 p-6">

              <div className="grid gap-4 md:grid-cols-2">

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <User size={16} />
                    Ad Soyad
                  </div>

                  <p className="mt-2 font-semibold text-slate-900">
                    {selectedMessage.full_name}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <Mail size={16} />
                    E-Posta
                  </div>

                  <p className="mt-2 break-all font-semibold text-slate-900">
                    {selectedMessage.email}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <Phone size={16} />
                    Telefon
                  </div>

                  <p className="mt-2 font-semibold text-slate-900">
                    {selectedMessage.phone}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-500">
                    Konu
                  </p>

                  <p className="mt-2 font-semibold text-slate-900">
                    {selectedMessage.subject}
                  </p>
                </div>

              </div>

              <div>
                <p className="mb-2 text-sm font-semibold text-slate-500">
                  Mesaj
                </p>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 leading-7 text-slate-700">
                  {selectedMessage.message}
                </div>
              </div>

              <div className="flex justify-end">

                <button
                  type="button"
                  onClick={() =>
                    setSelectedMessage(null)
                  }
                  className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
                >
                  Kapat
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default ContactMessagesPage;