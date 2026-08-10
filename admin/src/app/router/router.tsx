import { createBrowserRouter } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import DashboardPage from "../../pages/Dashboard/DashboardPage";
import LoginPage from "../../pages/Login/LoginPage";
import NewsPage from "../../pages/News/NewsPage";
import AnnouncementPage from "../../pages/Announcements/AnnouncementPage";
import ProjectPage from "../../pages/Projects/ProjectPage";
import TenderPage from "../../pages/Tenders/TenderPage";

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
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);