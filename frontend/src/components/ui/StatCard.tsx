import type { ReactNode } from "react";
import Card from "./Card";

type StatCardProps = {
  title: string;
  value: number;
  icon: ReactNode;
};

export default function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {value}
          </h2>
        </div>

        <div className="rounded-xl bg-slate-100 p-4">
          {icon}
        </div>
      </div>
    </Card>
  );
}