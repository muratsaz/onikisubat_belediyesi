import StatisticsCard from "./StatisticsCard";
import { dashboardStatistics } from "../../data/dashboardData";

const DashboardCards = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {dashboardStatistics.map((item) => (
        <StatisticsCard
          key={item.id}
          title={item.title}
          value={item.value}
          icon={item.icon}
          color={item.color}
        />
      ))}
    </div>
  );
};

export default DashboardCards;