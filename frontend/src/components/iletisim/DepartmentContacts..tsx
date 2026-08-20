import { useEffect, useState } from "react";
import {
  Building2,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

import {
  getDepartments,
  type Department,
} from "../../services/department.service";

const DepartmentContacts = () => {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getDepartments();
        setDepartments(data);
      } catch (error) {
        console.error(
          "Müdürlük bilgileri alınamadı:",
          error
        );
      }
    };

    fetchDepartments();
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm"
    >
      <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
        Müdürlük Rehberi
      </span>

      <h2 className="mt-5 text-3xl font-black text-slate-900">
        Müdürlük İletişim Bilgileri
      </h2>

      <p className="mt-4 max-w-3xl leading-7 text-slate-600">
        İlgili müdürlüklere doğrudan ulaşabilir, telefon veya
        e-posta yoluyla iletişim sağlayabilirsiniz.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {departments.map((department) => (
          <motion.div
            key={department.id}
            whileHover={{
              y: -6,
              scale: 1.02,
            }}
            transition={{ duration: 0.25 }}
            className="group rounded-3xl border border-slate-200 p-6 transition hover:border-blue-200 hover:shadow-xl"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
              <Building2
                size={30}
                className="text-blue-700"
              />
            </div>

            <h3 className="min-h-[64px] text-xl font-bold text-slate-900">
              {department.name}
            </h3>

            <div className="mt-6 space-y-4">
              {department.phone && (
                <div className="flex items-center gap-3">
                  <Phone
                    size={18}
                    className="text-blue-700"
                  />

                  <span className="text-sm text-slate-600">
                    {department.phone}
                    {department.extension &&
                      ` / ${department.extension}`}
                  </span>
                </div>
              )}

              {department.email && (
                <div className="flex items-center gap-3">
                  <Mail
                    size={18}
                    className="text-blue-700"
                  />

                  <span className="break-all text-sm text-slate-600">
                    {department.email}
                  </span>
                </div>
              )}
            </div>

            <button className="mt-8 flex items-center gap-2 font-semibold text-blue-700 transition group-hover:gap-4">
              Detaylı Bilgi
              <ArrowRight size={18} />
            </button>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default DepartmentContacts;