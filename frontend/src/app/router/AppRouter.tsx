import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ProjectDetailPage from "../../pages/ProjectDetailPage";
import HomePage from "../../pages/HomePage";
import CorporatePage from "../../pages/CorporatePage";
import NewsPage from "../../pages/NewsPage";
import AnnouncementsPage from "../../pages/AnnouncementsPage";
import ProjectsPage from "../../pages/ProjectsPage";
import ServicesPage from "../../pages/ServicesPage";
import ContactPage from "../../pages/ContactPage";
import TendersPage from "../../pages/TendersPage";
import TenderDetailPage from "../../pages/TenderDetailPage";
import NotFoundPage from "../../pages/NotFoundPage";

import BaskanPage from "../../pages/Kurumsal/BaskanPage";
import BaskanYardimcilariPage from "../../pages/Kurumsal/BaskanYardimcilariPage";
import MeclisUyeleriPage from "../../pages/Kurumsal/MeclisUyeleriPage";
import MudurluklerPage from "../../pages/Kurumsal/MudurluklerPage";
import OrganizasyonSemasiPage from "../../pages/Kurumsal/OrganizasyonSemasiPage";
import MisyonVizyonPage from "../../pages/Kurumsal/MisyonVizyonPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      // Kurumsal
      {
        path: "kurumsal",
        element: <CorporatePage />,
      },
      {
        path: "kurumsal/baskan",
        element: <BaskanPage />,
      },
      {
        path: "kurumsal/baskan-yardimcilari",
        element: <BaskanYardimcilariPage />,
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
        element: <OrganizasyonSemasiPage />,
      },
      {
        path: "kurumsal/misyon-vizyon",
        element: <MisyonVizyonPage />,
      },

      // Diğer Sayfalar
      {
        path: "haberler",
        element: <NewsPage />,
      },
      {
        path: "duyurular",
        element: <AnnouncementsPage />,
      },
      {
        path: "ihaleler",
        element: <TendersPage />,
      },
      {
  path: "ihaleler/:id",
  element: <TenderDetailPage />,
},
      {
        path: "projeler",
        element: <ProjectsPage />,
      },
      {
    path: "projeler",
    element: <ProjectsPage />,
},
{
    path: "projeler/:id",
    element: <ProjectDetailPage />,
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