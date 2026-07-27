import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import HomePage from "../../pages/HomePage";
import CorporatePage from "../../pages/CorporatePage";
import NewsPage from "../../pages/NewsPage";
import AnnouncementsPage from "../../pages/AnnouncementsPage";
import ProjectsPage from "../../pages/ProjectsPage";
import ServicesPage from "../../pages/ServicesPage";
import ContactPage from "../../pages/ContactPage";
import NotFoundPage from "../../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "kurumsal",
        element: <CorporatePage />,
      },
      {
        path: "haberler",
        element: <NewsPage />,
      },
      {
        path: "duyurular",
        element: <AnnouncementsPage />,
      },
      {
        path: "projeler",
        element: <ProjectsPage />,
      },
      {
        path: "hizmetler",
        element: <ServicesPage />,
      },
      {
        path: "iletisim",
        element: <ContactPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);