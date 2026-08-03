import { ArrowRight, Clock3 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import type { EService } from "./serviceData";

interface EServiceCardProps {
  service: EService;
}

const EServiceCard = ({ service }: EServiceCardProps) => {
  const Icon = service.icon;

  const isActive = service.path !== "#";

  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{ duration: 0.25 }}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-xl"
    >
      <div className="p-6">

        {/* Üst */}

        <div className="flex items-start justify-between">

          <div
            className={`flex h-14 w-14 items-center justify-center rounded-xl ${service.color}`}
          >
            <motion.div
              whileHover={{
                rotate: 10,
                scale: 1.08,
              }}
            >
              <Icon size={24} />
            </motion.div>
          </div>

          {!isActive && (
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-amber-700">
              Yakında
            </span>
          )}

        </div>

        {/* Başlık */}

        <h3 className="mt-5 text-xl font-bold leading-7 text-slate-900 transition group-hover:text-blue-700">
          {service.title}
        </h3>

        {/* Açıklama */}

        <p className="mt-3 line-clamp-2 min-h-[48px] text-sm leading-6 text-slate-600">
          {service.description}
        </p>

        {/* Alt */}

        <div className="mt-6">

          {isActive ? (
            <Link
              to={service.path}
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition group-hover:gap-3"
            >
              İşleme Git

              <ArrowRight size={16} />
            </Link>
          ) : (
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
              <Clock3 size={16} />
              Yakında Hizmette
            </div>
          )}

        </div>

      </div>
    </motion.div>
  );
};

export default EServiceCard;