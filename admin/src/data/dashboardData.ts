import {
  Newspaper,
  Megaphone,
  FolderKanban,
  FileText,
} from "lucide-react";

export interface DashboardStatistic {
  id: number;
  title: string;
  value: number;
  icon: any;
  color: string;
}

export const dashboardStatistics: DashboardStatistic[] = [
  {
    id: 1,
    title: "Toplam Haber",
    value: 42,
    icon: Newspaper,
    color: "bg-blue-700",
  },
  {
    id: 2,
    title: "Toplam Duyuru",
    value: 18,
    icon: Megaphone,
    color: "bg-emerald-600",
  },
  {
    id: 3,
    title: "Toplam Proje",
    value: 24,
    icon: FolderKanban,
    color: "bg-amber-500",
  },
  {
    id: 4,
    title: "Toplam İhale",
    value: 7,
    icon: FileText,
    color: "bg-rose-600",
  },
];