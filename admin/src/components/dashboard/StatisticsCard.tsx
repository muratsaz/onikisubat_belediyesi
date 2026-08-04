import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatisticsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color: string;
}

const StatisticsCard = ({
  title,
  value,
  icon: Icon,
  color,
}: StatisticsCardProps) => {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.2,
      }}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-black text-slate-800">
            {value}
          </h2>

        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl ${color}`}
        >
          <Icon
            size={30}
            className="text-white"
          />
        </div>

      </div>
    </motion.div>
  );
};

export default StatisticsCard;