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
import FAQPage from "../../pages/FAQ/FAQPage";
import MayorPage from "../../pages/Mayor/MayorPage";
import DeputyMayorPage from "../../pages/DeputyMayor/DeputyMayorPage";
import MeclisUyeleriPage from "../../pages/Kurumsal/MeclisUyeleriPage";
import MudurluklerPage from "../../pages/Kurumsal/MudurluklerPage";
import MisyonVizyonPage from "../../pages/Kurumsal/MisyonVizyonPage";
import OrganizasyonSemasiPage from "../../pages/Kurumsal/OrganizasyonSemasiPage";

import NavigationPage from "../../pages/Navigation/NavigationPage";

import ContactMessagesPage from "../../pages/ContactMessages/ContactMessagesPage";
import ContactSettingsPage from "../../pages/ContactSettings/ContactSettingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,

    children: [
      // DASHBOARD
      {
        index: true,
        element: <DashboardPage />,
      },

      // HABERLER
      {
        path: "news",
        element: <NewsPage />,
      },

      // DUYURULAR
      {
        path: "announcements",
        element: <AnnouncementPage />,
      },

      // PROJELER
      {
        path: "projects",
        element: <ProjectPage />,
      },

      // İHALELER
      {
        path: "tenders",
        element: <TenderPage />,
      },

      // MEDYA
      {
        path: "media",
        element: <MediaPage />,
      },

      // KULLANICILAR
      {
        path: "users",
        element: <UsersPage />,
      },

      // AYARLAR
      {
        path: "settings",
        element: <SettingsPage />,
      },

      // MENÜ YÖNETİMİ
      {
        path: "navigation",
        element: <NavigationPage />,
      },

      // =========================
      // KURUMSAL
      // =========================

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
        element: <OrganizasyonSemasiPage />,
      },

      {
        path: "kurumsal/misyon-vizyon",
        element: <MisyonVizyonPage />,
      },

      // =========================
      // İLETİŞİM
      // =========================

      {
        path: "contact-messages",
        element: <ContactMessagesPage />,
      },

      {
        path: "contact-settings",
        element: <ContactSettingsPage />,
      },
      {
  path: "faqs",
  element: <FAQPage />,
},
    ],
  },

  // LOGIN
  {
    path: "/login",
    element: <LoginPage />,
  },
]);