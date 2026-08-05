import { useEffect, useState } from "react";

import type { Announcement } from "../../data/announcementData";



export interface AnnouncementFormData {

  title: string;

  category: string;

  status: "Taslak" | "Yayında";

  summary: string;

  content: string;

  publishDate: string;

}



interface AnnouncementFormProps {

  onCancel: () => void;

  onSave: (data: AnnouncementFormData) => void;

  initialData?: Announcement | null;

  isEditing?: boolean;

}



const categories = [

  "Genel",

  "İhale",

  "Duyuru",

  "Etkinlik",

  "Sosyal",

  "Kültür",

  "Spor",

  "Eğitim",

  "Diğer",

];



const AnnouncementForm = ({

  onCancel,

  onSave,

  initialData,

  isEditing,

}: AnnouncementFormProps) => {

  const [title, setTitle] = useState("");

  const [category, setCategory] = useState("");

  const [status, setStatus] =

    useState<"Taslak" | "Yayında">("Taslak");

  const [summary, setSummary] = useState("");

  const [content, setContent] = useState("");

  const [publishDate, setPublishDate] = useState(

    new Date().toISOString().split("T")[0]

  );



  useEffect(() => {

    if (initialData && isEditing) {

      setTitle(initialData.title ?? "");

      setCategory(initialData.category ?? "");

      setStatus(initialData.status ?? "Taslak");

      setSummary(initialData.summary ?? "");

      setContent(initialData.content ?? "");

      setPublishDate(

        initialData.publishDate ??

          new Date().toISOString().split("T")[0]

      );

    } else {

      setTitle("");

      setCategory("");

      setStatus("Taslak");

      setSummary("");

      setContent("");

      setPublishDate(

        new Date().toISOString().split("T")[0]

      );

    }

  }, [initialData, isEditing]);



  const handleSubmit = () => {

    if (!title.trim()) {

      alert("Başlık zorunludur.");

      return;

    }



    if (!category) {

      alert("Kategori seçiniz.");

      return;

    }



    if (!summary.trim()) {

      alert("Özet zorunludur.");

      return;

    }



    if (!content.trim()) {

      alert("İçerik zorunludur.");

      return;

    }



    onSave({

      title,

      category,

      status,

      summary,

      content,

      publishDate,

    });

  };



  return (

    <form

      className="space-y-6"

      onSubmit={(e) => e.preventDefault()}

    >

      <div>

        <label className="mb-2 block font-medium text-slate-700">

          Duyuru Başlığı

        </label>



        <input

          type="text"

          value={title}

          onChange={(e) => setTitle(e.target.value)}

          placeholder="Duyuru başlığı..."

          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"

        />

      </div>



      <div className="grid grid-cols-2 gap-6">

        <div>

          <label className="mb-2 block font-medium text-slate-700">

            Kategori

          </label>



          <select

            value={category}

            onChange={(e) => setCategory(e.target.value)}

            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"

          >

            <option value="">

              Kategori Seçiniz

            </option>



            {categories.map((item) => (

              <option key={item} value={item}>

                {item}

              </option>

            ))}

          </select>

        </div>



        <div>

          <label className="mb-2 block font-medium text-slate-700">

            Durum

          </label>



          <select

            value={status}

            onChange={(e) =>

              setStatus(

                e.target.value as "Taslak" | "Yayında"

              )

            }

            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"

          >

            <option value="Taslak">Taslak</option>

            <option value="Yayında">Yayında</option>

          </select>

        </div>

      </div>



      <div>

        <label className="mb-2 block font-medium text-slate-700">

          Yayın Tarihi

        </label>



        <input

          type="date"

          value={publishDate}

          onChange={(e) =>

            setPublishDate(e.target.value)

          }

          className="w-full rounded-xl border border-slate-300 px-4 py-3"

        />

      </div>



      <div>

        <label className="mb-2 block font-medium text-slate-700">

          Duyuru Özeti

        </label>



        <textarea

          rows={4}

          value={summary}

          onChange={(e) => setSummary(e.target.value)}

          placeholder="Kısa özet..."

          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"

        />

      </div>



      <div>

        <label className="mb-2 block font-medium text-slate-700">

          Duyuru İçeriği

        </label>



        <textarea

          rows={10}

          value={content}

          onChange={(e) => setContent(e.target.value)}

          placeholder="Duyuru içeriğini yazın..."

          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"

        />

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



export default AnnouncementForm;