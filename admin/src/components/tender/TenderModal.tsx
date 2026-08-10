import type { ReactNode } from "react";
import { X } from "lucide-react";

interface TenderModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

const TenderModal = ({
  open,
  title,
  children,
  onClose,
}: TenderModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-8 py-6">
          <h2 className="text-2xl font-bold text-slate-800">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default TenderModal;