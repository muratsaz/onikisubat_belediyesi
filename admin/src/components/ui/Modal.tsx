import type { ReactNode } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface ModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({
  open,
  title,
  children,
  onClose,
}: ModalProps) => {
  return (
    <AnimatePresence>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: .95,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: .95,
              y: 20,
            }}
            transition={{
              duration: .2,
            }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl"
          >

            {/* Header */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

              <h2 className="text-xl font-bold text-slate-800">
                {title}
              </h2>

              <button
                onClick={onClose}
                className="rounded-lg p-2 transition hover:bg-slate-100"
              >
                <X size={22} />
              </button>

            </div>

            {/* Body */}

            <div className="p-6">

              {children}

            </div>

          </motion.div>
        </motion.div>
      )}

    </AnimatePresence>
  );
};

export default Modal;