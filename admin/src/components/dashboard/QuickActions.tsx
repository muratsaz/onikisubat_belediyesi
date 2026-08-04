import { Link } from "react-router-dom";

import Card from "../ui/Card";
import { quickActions } from "../../data/quickActionsData";

const QuickActions = () => {
  return (
    <Card title="Hızlı İşlemler">
      <div className="grid gap-4 md:grid-cols-2">
        {quickActions.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              to={item.path}
              className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-500 hover:shadow-md"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}
              >
                <Icon
                  size={22}
                  className="text-white"
                />
              </div>

              <div>
                <h3 className="font-semibold text-slate-800">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-500">
                  {item.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </Card>
  );
};

export default QuickActions;