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
  UserRound,
  UserCog,
  Building2,
  Network,
  Target,
  Menu,
  MessageSquare,
} from "lucide-react";

export interface SidebarMenuChild {
  title: string;
  path: string;
  icon?: LucideIcon;
}

export interface SidebarMenuItem {
  title: string;
  path?: string;
  icon: LucideIcon;
  superadminOnly?: boolean;
  children?: SidebarMenuChild[];
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
    title: "Kurumsal",
    icon: Building2,
    children: [
      {
        title: "Başkan",
        path: "/mayor",
        icon: UserRound,
      },

      {
        title: "Başkan Yardımcıları",
        path: "/kurumsal/baskan-yardimcilari",
        icon: UserCog,
      },

      {
        title: "Meclis Üyeleri",
        path: "/kurumsal/meclis-uyeleri",
        icon: Users,
      },

      {
        title: "Müdürlükler",
        path: "/kurumsal/mudurlukler",
        icon: Building2,
      },

      {
        title: "Organizasyon Şeması",
        path: "/kurumsal/organizasyon-semasi",
        icon: Network,
      },

      {
        title: "Misyon & Vizyon",
        path: "/kurumsal/misyon-vizyon",
        icon: Target,
      },
    ],
  },

  {
    title: "İletişim Mesajları",
    path: "/contact-messages",
    icon: MessageSquare,
  },

  {
    title: "Menü Yönetimi",
    path: "/navigation",
    icon: Menu,
  },

  {
    title: "Kullanıcılar",
    path: "/users",
    icon: Users,
    superadminOnly: true,
  },

  {
    title: "Ayarlar",
    path: "/settings",
    icon: Settings,
  },
];