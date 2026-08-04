import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Newspaper,
  Megaphone,
  FolderKanban,
  FileText,
  Image,
  Users,
  Settings,
} from "lucide-react";

export interface SidebarMenuItem {
  title: string;
  path: string;
  icon: LucideIcon;
}

export const sidebarMenu: SidebarMenuItem[] = [
  {
    title: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Haberler",
    path: "/news",
    icon: Newspaper,
  },
  {
    title: "Duyurular",
    path: "/announcements",
    icon: Megaphone,
  },
  {
    title: "Projeler",
    path: "/projects",
    icon: FolderKanban,
  },
  {
    title: "İhaleler",
    path: "/tenders",
    icon: FileText,
  },
  {
    title: "Medya",
    path: "/media",
    icon: Image,
  },
  {
    title: "Kullanıcılar",
    path: "/users",
    icon: Users,
  },
  {
    title: "Ayarlar",
    path: "/settings",
    icon: Settings,
  },
];