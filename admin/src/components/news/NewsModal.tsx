import type { ReactNode } from "react";
import { X } from "lucide-react";

interface NewsModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

const NewsModal = ({
  open,
  title,
  children,
  onClose,
}: NewsModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

          <h2 className="text-2xl font-bold text-slate-800">
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

        <div className="max-h-[70vh] overflow-y-auto p-6">

          {children}

        </div>

      </div>

    </div>
  );
};

export default NewsModal;