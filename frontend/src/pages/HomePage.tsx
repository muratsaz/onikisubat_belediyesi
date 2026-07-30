import { useEffect } from "react";

import Hero from "../components/home/Hero";
import MayorSection from "../components/home/MayorSection";
import QuickLinks from "../components/home/QuickLinks";
import NewsSection from "../components/home/NewsSection";
import AnnouncementSection from "../components/home/AnnouncementSection";

const HomePage = () => {
  useEffect(() => {
    const hash = window.location.hash;

    if (!hash) return;

    const element = document.getElementById(hash.replace("#", ""));

    if (!element) return;

    setTimeout(() => {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 250);
  }, []);

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