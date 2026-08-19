import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Hero from "../components/home/Hero";
import MayorSection from "../components/home/MayorSection";
import QuickLinks from "../components/home/QuickLinks";
import NewsSection from "../components/home/NewsSection";
import AnnouncementSection from "../components/home/AnnouncementSection";

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/" || !location.hash) {
      return;
    }

    const targetId = location.hash.substring(1);

    const scrollToTarget = () => {
      const element = document.getElementById(targetId);

      if (!element) {
        return false;
      }

      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return true;
    };

    // Ana sayfanın DOM'a yerleşmesini bekliyoruz.
    let attempts = 0;
    const maxAttempts = 20;

    const interval = window.setInterval(() => {
      attempts += 1;

      if (scrollToTarget() || attempts >= maxAttempts) {
        window.clearInterval(interval);
      }
    }, 50);

    return () => {
      window.clearInterval(interval);
    };
  }, [location.pathname, location.hash]);

  return (
    <>
      <Hero />
      <QuickLinks />
      <MayorSection />
      <NewsSection />
      <AnnouncementSection />
    </>
  );
};

export default HomePage;