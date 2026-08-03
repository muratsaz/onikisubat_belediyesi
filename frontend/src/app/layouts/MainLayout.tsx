import { Outlet } from "react-router-dom";

import Header from "../../components/navigation/Header";
import Footer from "../../components/navigation/Footer";
import ScrollToTop from "../../components/common/ScrollToTop";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ScrollToTop />

      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;