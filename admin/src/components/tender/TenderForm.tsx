import { useEffect, useState } from "react";
import { FileText, UploadCloud, X } from "lucide-react";

export interface TenderFormData {
  title: string;
  tenderNumber: string;
  description: string;
  publishDate: string;
  deadline: string;
  status: string;
  documentFile?: File | null;
}

interface TenderFormProps {
  onCancel: () => void;
  onSave: (data: TenderFormData) => void;
  initialData?: TenderFormData | null;
  isEditing?: boolean;
}

const TenderForm = ({
  onCancel,
  onSave,
  initialData,
  isEditing,
}: TenderFormProps) => {
  const [title, setTitle] = useState("");
  const [tenderNumber, setTenderNumber] = useState("");
  const [description, setDescription] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [documentFile, setDocumentFile] = useState<File | null>(null);

  useEffect(() => {
    if (initialData && isEditing) {
      setTitle(initialData.title ?? "");
      setTenderNumber(initialData.tenderNumber ?? "");
      setDescription(initialData.description ?? "");

      setPublishDate(
        initialData.publishDate
          ? initialData.publishDate.slice(0, 16)
          : ""
      );

      setDeadline(
        initialData.deadline
          ? initialData.deadline.slice(0, 16)
          : ""
      );

      setStatus(initialData.status ?? "ACTIVE");
      setDocumentFile(null);
    } else {
      setTitle("");
      setTenderNumber("");
      setDescription("");

      const now = new Date();

      const localNow = new Date(
        now.getTime() -
          now.getTimezoneOffset() * 60000
      )
        .toISOString()
        .slice(0, 16);

      setPublishDate(localNow);
      setDeadline("");
      setStatus("ACTIVE");
      setDocumentFile(null);
    }
  }, [initialData, isEditing]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Sadece PDF dosyası yükleyebilirsiniz.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("PDF dosyası maksimum 5 MB olabilir.");
      e.target.value = "";
      return;
    }

    setDocumentFile(file);
  };

  const removeFile = () => {
    setDocumentFile(null);

    const input = document.getElementById(
      "tender-document"
    ) as HTMLInputElement | null;

    if (input) {
      input.value = "";
    }
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("İhale başlığı zorunludur.");
      return;
    }

    if (!tenderNumber.trim()) {
      alert("İhale numarası zorunludur.");
      return;
    }

    if (!publishDate) {
      alert("Yayın tarihi zorunludur.");
      return;
    }

    if (!deadline) {
      alert("Son başvuru tarihi zorunludur.");
      return;
    }

    if (new Date(deadline) <= new Date(publishDate)) {
      alert(
        "Son başvuru tarihi yayın tarihinden sonra olmalıdır."
      );
      return;
    }

    if (!isEditing && !documentFile) {
      alert("Şartname PDF dosyası zorunludur.");
      return;
    }

    onSave({
      title: title.trim(),
      tenderNumber: tenderNumber.trim(),
      description: description.trim(),
      publishDate,
      deadline,
      status,
      documentFile,
    });
  };

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => e.preventDefault()}
    >
      <div>
        <label className="mb-2 block font-medium text-slate-700">
          İhale Başlığı
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="İhale başlığı..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="mb-2 block font-medium text-slate-700">
            İhale Numarası
          </label>

          <input
            type="text"
            value={tenderNumber}
            onChange={(e) =>
              setTenderNumber(e.target.value)
            }
            placeholder="Örn: 2026/001"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Durum
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
          >
            <option value="ACTIVE">Açık</option>
            <option value="CLOSED">Sonuçlandı</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Yayın Tarihi
          </label>

          <input
            type="datetime-local"
            value={publishDate}
            onChange={(e) =>
              setPublishDate(e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Son Başvuru Tarihi
          </label>

          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) =>
              setDeadline(e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block font-medium text-slate-700">
          İhale Açıklaması
        </label>

        <textarea
          rows={10}
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          placeholder="İhale açıklamasını yazın..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
        />
      </div>

      {/* ŞARTNAME */}
      <div>
        <label className="mb-2 block font-medium text-slate-700">
          Şartname PDF
        </label>

        <label
          htmlFor="tender-document"
          className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 transition hover:border-blue-500 hover:bg-blue-50"
        >
          <UploadCloud
            size={44}
            className="mb-3 text-blue-600"
          />

          <p className="font-semibold text-slate-700">
            Şartname PDF Seç
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Sadece PDF • Maksimum 5 MB
          </p>
        </label>

        <input
          id="tender-document"
          type="file"
          accept="application/pdf,.pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        {documentFile && (
          <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-3">
              <FileText
                size={24}
                className="text-red-600"
              />

              <div>
                <p className="font-semibold text-slate-700">
                  {documentFile.name}
                </p>

                <p className="text-sm text-slate-500">
                  {(documentFile.size / 1024 / 1024).toFixed(
                    2
                  )}{" "}
                  MB
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={removeFile}
              className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {isEditing && !documentFile && (
          <p className="mt-3 text-sm text-slate-500">
            Mevcut şartnameyi değiştirmek istemiyorsanız
            yeni dosya seçmenize gerek yoktur.
          </p>
        )}
      </div>

      <div className="flex justify-end gap-4 border-t border-slate-200 pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-slate-300 px-6 py-3 transition hover:bg-slate-100"
        >
          İptal
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-xl bg-blue-700 px-6 py-3 font-medium text-white transition hover:bg-blue-800"
        >
          {isEditing ? "Güncelle" : "Kaydet"}
        </button>
      </div>
    </form>
  );
};

export default TenderForm;