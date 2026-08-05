import { motion } from "framer-motion";
import { Bell, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import api from "../../services/api";
import ContentModal from "../common/ContentModal/ContentModal";

const AnnouncementSection = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      const response = await api.get(
  "/announcements/?published=true"
);

      const data = response.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        category: "Duyuru",
        date: item.published_at
          ? new Date(item.published_at).toLocaleDateString("tr-TR")
          : "",
        image: "",
        excerpt: item.summary,
        content: item.content,
      }));

      setAnnouncements(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpen = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const handleNavigate = (index: number) => {
    if (index < 0 || index >= announcements.length) return;
    setCurrentIndex(index);
  };

  if (announcements.length === 0) {
    return null;
  }

  return (
    <>
      <section
        id="announcements"
        className="flex h-[calc(100vh-80px)] min-h-[450px] flex-col justify-center overflow-hidden bg-slate-50 py-4 lg:py-6"
      >
        <div className="mx-auto flex h-full max-h-[750px] w-full max-w-7xl flex-col px-4 lg:px-6">
          <div className="mb-4 flex shrink-0 flex-col gap-2 md:flex-row md:items-end md:justify-between lg:mb-6">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[3px] text-blue-600 lg:text-xs lg:tracking-[4px]">
                Duyurular
              </span>

              <h2 className="mt-1 text-2xl font-black text-slate-900 lg:mt-2 lg:text-4xl">
                Güncel Duyurular
              </h2>
            </div>

            <button
              onClick={() => handleOpen(0)}
              className="group flex w-max items-center gap-1.5 text-xs font-semibold text-blue-600 transition-colors hover:text-blue-700 lg:text-sm"
            >
              Tümünü Gör

              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1 lg:h-5 lg:w-5"
              />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-3 lg:gap-4">
            {announcements.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                }}
                className="group flex flex-1 flex-col justify-center gap-3 rounded-[16px] bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:gap-4 lg:rounded-[24px] lg:p-5"
              >
                <div className="flex items-center gap-3 lg:gap-5">
                  <div className="flex shrink-0 items-center justify-center rounded-xl bg-blue-50 p-2.5 transition-colors group-hover:bg-blue-100 lg:p-3.5">
                    <Bell className="h-5 w-5 text-blue-600 lg:h-6 lg:w-6" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 transition-colors group-hover:text-blue-600 lg:text-lg">
                      {item.title}
                    </h3>

                    <p className="mt-0.5 text-[10px] font-medium text-slate-500 lg:mt-1 lg:text-xs">
                      {item.date}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleOpen(index)}
                  className="w-full shrink-0 rounded-xl bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700 transition-colors group-hover:bg-blue-600 group-hover:text-white sm:w-auto lg:px-6 lg:py-3 lg:text-sm"
                >
                  İncele
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        news={announcements}
        currentIndex={currentIndex}
        onNavigate={handleNavigate}
      />
    </>
  );
};

export default AnnouncementSection;