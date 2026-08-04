

import {
  Newspaper,
  Megaphone,
  FolderKanban,
  FileText,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export interface QuickAction {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  path: string;
}

export const quickActions: QuickAction[] = [
  {
    id: 1,
    title: "Yeni Haber",
    description: "Haber ekle",
    icon: Newspaper,
    color: "bg-blue-600",
    path: "/news",
  },
  {
    id: 2,
    title: "Yeni Duyuru",
    description: "Duyuru ekle",
    icon: Megaphone,
    color: "bg-emerald-600",
    path: "/announcements",
  },
  {
    id: 3,
    title: "Yeni Proje",
    description: "Proje ekle",
    icon: FolderKanban,
    color: "bg-amber-500",
    path: "/projects",
  },
  {
    id: 4,
    title: "Yeni İhale",
    description: "İhale ekle",
    icon: FileText,
    color: "bg-rose-600",
    path: "/tenders",
  },
];
