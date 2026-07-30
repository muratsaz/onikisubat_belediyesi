import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useEffect } from "react";
type Content = {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
  content?: string;
};

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  news: Content[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

const ContentModal = ({
  isOpen,
  onClose,
  news,
  currentIndex,
  onNavigate,
}: ContentModalProps) => {
  const currentContent = news[currentIndex];

  useEffect(() => {
    if (!isOpen || !currentContent) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose, currentContent]);

  if (!isOpen || !currentContent) return null;

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
            className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 40,
            }}
            transition={{
              duration: 0.3,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Kapat */}
            <button
              onClick={onClose}
              className="absolute right-5 top-5 z-20 rounded-full bg-white/90 p-2 text-slate-700 shadow transition hover:bg-red-500 hover:text-white"
            >
              <X size={22} />
            </button>

            <div className="max-h-[90vh] overflow-y-auto">
              {/* Resim */}
              <div className="relative h-[350px] w-full overflow-hidden">
                <img
                  src={currentContent.image}
                  alt={currentContent.title}
                  className="h-full w-full object-cover"
                />
                {/* Önceki Haber */}
<button
  onClick={() => onNavigate(currentIndex - 1)}
  disabled={currentIndex === 0}
  className={`absolute left-5 top-[68%] -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ${
    currentIndex === 0
      ? "cursor-not-allowed bg-white/50 text-slate-400"
      : "bg-black/40 text-white backdrop-blur-sm hover:bg-blue-600 hover:scale-110"
  }`}
>
  <ChevronLeft size={26} />
</button>

{/* Sonraki Haber */}
<button
  onClick={() => onNavigate(currentIndex + 1)}
  disabled={currentIndex === news.length - 1}
  className={`absolute right-5 top-[68%] -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ${
    currentIndex === news.length - 1
      ? "cursor-not-allowed bg-white/50 text-slate-400"
      : "bg-black/40 text-white backdrop-blur-sm hover:bg-blue-600 hover:scale-110"
  }`}
>
  <ChevronRight size={26} />
</button>
              </div>

              {/* İçerik */}
              <div className="p-8">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
                    {currentContent.category}
                  </span>

                  <div className="flex items-center gap-2 text-slate-500">
                    <CalendarDays size={18} />
                    <span>{currentContent.date}</span>
                  </div>
                </div>

                <h2 className="mb-6 text-4xl font-black leading-tight text-slate-900">
                  {currentContent.title}
                </h2>

                <div className="space-y-5 text-[17px] leading-8 text-slate-700">
                  <p>{currentContent.excerpt}</p>

                  <p>
                    {currentContent.content ??
                      "Bu haberin detaylı içeriği yönetim panelinden eklenecektir. Şu anda örnek içerik gösterilmektedir. Daha sonra haber editörü tarafından girilen tüm metinler, fotoğraflar ve diğer içerikler burada görüntülenecektir."}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContentModal;