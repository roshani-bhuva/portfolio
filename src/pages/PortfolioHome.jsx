import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Home from "./Home";
import WhatIDo from "../components/WhatIDo";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Footer from "../components/Footer";
import Projects from "../components/Projects";
import DesignShowcase from "../components/DesignShowcase";
import Contact from "../components/Contact";
import CustomCursor from "../utils/CursorAnimation";

const SCROLL_OFFSET = 96;

export default function PortfolioHome() {
  const { hash } = useLocation();

  // Deep links such as /#design (the old design page redirects here).
  useEffect(() => {
    if (!hash) return undefined;
    const id = window.setTimeout(() => {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET,
          behavior: "smooth",
        });
      }
    }, 120);
    return () => window.clearTimeout(id);
  }, [hash]);

  return (
    <div className="font-sans min-h-screen overflow-x-clip bg-background text-foreground">
      <CustomCursor />
      <Navbar />
      <Home />
      <WhatIDo />
      <About />
      <DesignShowcase />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
