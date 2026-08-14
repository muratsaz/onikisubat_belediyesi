import { createBrowserRouter } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import DashboardPage from "../../pages/Dashboard/DashboardPage";
import LoginPage from "../../pages/Login/LoginPage";
import NewsPage from "../../pages/News/NewsPage";
import AnnouncementPage from "../../pages/Announcements/AnnouncementPage";
import ProjectPage from "../../pages/Projects/ProjectPage";
import TenderPage from "../../pages/Tenders/TenderPage";
import MediaPage from "../../pages/Media/MediaPage";
import UsersPage from "../../pages/Users/UsersPage";
import SettingsPage from "../../pages/Settings/SettingsPage";
import MayorPage from "../../pages/Mayor/MayorPage";
import KurumsalPage from "../../pages/Kurumsal/KurumsalPage";
import DeputyMayorPage from "../../pages/DeputyMayor/DeputyMayorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },

      {
        path: "news",
        element: <NewsPage />,
      },

      {
        path: "announcements",
        element: <AnnouncementPage />,
      },

      {
        path: "projects",
        element: <ProjectPage />,
      },

      {
        path: "tenders",
        element: <TenderPage />,
      },

      {
        path: "media",
        element: <MediaPage />,
      },

      {
        path: "users",
        element: <UsersPage />,
      },

      {
        path: "settings",
        element: <SettingsPage />,
      },

      {
        path: "mayor",
        element: <MayorPage />,
      },

      {
        path: "kurumsal/baskan-yardimcilari",
        element: <DeputyMayorPage />,
      },

      {
        path: "kurumsal/meclis-uyeleri",
        element: (
          <KurumsalPage title="Meclis Üyeleri" />
        ),
      },

      {
        path: "kurumsal/mudurlukler",
        element: (
          <KurumsalPage title="Müdürlükler" />
        ),
      },

      {
        path: "kurumsal/organizasyon-semasi",
        element: (
          <KurumsalPage title="Organizasyon Şeması" />
        ),
      },

      {
        path: "kurumsal/misyon-vizyon",
        element: (
          <KurumsalPage title="Misyon & Vizyon" />
        ),
      },
    ],
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
]);