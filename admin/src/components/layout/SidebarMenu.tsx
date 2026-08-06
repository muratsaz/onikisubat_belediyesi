import {
  LayoutDashboard,
  Newspaper,
  Megaphone,
  FolderKanban,
} from "lucide-react";

export const sidebarMenu = [
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
];