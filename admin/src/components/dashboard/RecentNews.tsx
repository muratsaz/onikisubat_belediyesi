import Card from "../ui/Card";
import { recentNews } from "../../data/recentNewsData";

const RecentNews = () => {
  return (
    <Card title="Son Haberler">
      <div className="space-y-4">

        {recentNews.map((item) => (
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

export default RecentNews;