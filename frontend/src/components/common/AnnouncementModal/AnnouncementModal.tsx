import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useEffect } from "react";

type Announcement = {
  id: number;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content?: string;
};

interface AnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  announcements: Announcement[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

const AnnouncementModal = ({
  isOpen,
  onClose,
  announcements,
  currentIndex,
  onNavigate,
}: AnnouncementModalProps) => {
  const currentAnnouncement = announcements[currentIndex];

  useEffect(() => {
    if (!isOpen || !currentAnnouncement) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }

      if (e.key === "ArrowLeft" && currentIndex > 0) {
        onNavigate(currentIndex - 1);
      }

      if (e.key === "ArrowRight" && currentIndex < announcements.length - 1) {
        onNavigate(currentIndex + 1);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [
    isOpen,
    onClose,
    currentAnnouncement,
    currentIndex,
    announcements.length,
    onNavigate,
  ]);

  if (!isOpen || !currentAnnouncement) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 z-20 rounded-full bg-white p-2 shadow transition hover:bg-red-500 hover:text-white"
            >
              <X size={22} />
            </button>

            <div className="max-h-[90vh] overflow-y-auto">
              <div className="border-b border-slate-200 bg-slate-50 px-10 py-8">
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
                    {currentAnnouncement.category}
                  </span>

                  <div className="flex items-center gap-2 text-slate-500">
                    <CalendarDays size={18} />
                    <span>{currentAnnouncement.date}</span>
                  </div>
                </div>

                <h2 className="text-4xl font-black leading-tight text-slate-900">
                  {currentAnnouncement.title}
                </h2>
              </div>

              <div className="px-10 py-8">
                <div className="space-y-6 text-[17px] leading-8 text-slate-700">
                  <p className="text-lg font-medium text-slate-600">
                    {currentAnnouncement.excerpt}
                  </p>
                  <p>{currentAnnouncement.content}</p>
                </div>

                {/* 2. Parçanın eklendiği bölüm başlangıcı */}
                <div className="mt-12 flex items-center justify-between border-t border-slate-200 pt-8">
                  <button
                    onClick={() => onNavigate(currentIndex - 1)}
                    disabled={currentIndex === 0}
                    className={`flex items-center gap-2 rounded-xl px-5 py-3 font-semibold transition-all ${
                      currentIndex === 0
                        ? "cursor-not-allowed bg-slate-100 text-slate-400"
                        : "bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white"
                    }`}
                  >
                    <ChevronLeft size={20} />
                    Önceki
                  </button>

                  <span className="text-sm font-medium text-slate-500">
                    {currentIndex + 1} / {announcements.length}
                  </span>

                  <button
                    onClick={() => onNavigate(currentIndex + 1)}
                    disabled={currentIndex === announcements.length - 1}
                    className={`flex items-center gap-2 rounded-xl px-5 py-3 font-semibold transition-all ${
                      currentIndex === announcements.length - 1
                        ? "cursor-not-allowed bg-slate-100 text-slate-400"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    Sonraki
                    <ChevronRight size={20} />
                  </button>
                </div>
                {/* 2. Parçanın eklendiği bölüm sonu */}
                
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementModal;