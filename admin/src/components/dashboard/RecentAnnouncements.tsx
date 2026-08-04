import Card from "../ui/Card";
import { recentAnnouncements } from "../../data/recentAnnouncementsData";

const RecentAnnouncements = () => {
  return (
    <Card title="Son Duyurular">
      <div className="space-y-4">
        {recentAnnouncements.map((item) => (
          <div
            key={item.id}
            className="border-b border-slate-200 pb-3 last:border-none"
          >
            <h3 className="font-semibold text-slate-800">
              {item.title}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {item.date}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentAnnouncements;