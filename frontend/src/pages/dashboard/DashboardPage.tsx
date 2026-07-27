import {
  CalendarDays,
  Images,
  Megaphone,
  Newspaper,
} from "lucide-react";

import DashboardHero from "../../components/dashboard/DashboardHero";
import StatCard from "../../components/ui/StatCard";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <DashboardHero />

      <div className="grid grid-cols-4 gap-6">
        <StatCard
          title="Toplam Haber"
          value={42}
          icon={<Newspaper size={26} />}
        />

        <StatCard
          title="Duyurular"
          value={18}
          icon={<Megaphone size={26} />}
        />

        <StatCard
          title="Etkinlikler"
          value={9}
          icon={<CalendarDays size={26} />}
        />

        <StatCard
          title="Galeri"
          value={125}
          icon={<Images size={26} />}
        />
      </div>
    </div>
  );
}