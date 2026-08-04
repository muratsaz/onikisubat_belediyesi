import { createBrowserRouter } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import DashboardPage from "../../pages/Dashboard/DashboardPage";
import LoginPage from "../../pages/Login/LoginPage";
import NewsPage from "../../pages/News/NewsPage";

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
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);