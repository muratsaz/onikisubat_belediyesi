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
import DeputyMayorPage from "../../pages/DeputyMayor/DeputyMayorPage";
import MeclisUyeleriPage from "../../pages/Kurumsal/MeclisUyeleriPage";
import MudurluklerPage from "../../pages/Kurumsal/MudurluklerPage";
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
        element: <MeclisUyeleriPage />,
      },

      {
  path: "kurumsal/mudurlukler",
  element: <MudurluklerPage />,
},

      {
        path: "kurumsal/organizasyon-semasi",
        element: (
          <div>
            Organizasyon Şeması
          </div>
        ),
      },

      {
        path: "kurumsal/misyon-vizyon",
        element: (
          <div>
            Misyon & Vizyon
          </div>
        ),
      },
    ],
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
]);