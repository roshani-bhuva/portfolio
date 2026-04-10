import Home from "./Home";
import WhatIDo from "../components/WhatIDo";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Footer from "../components/Footer";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import CustomCursor from "../utils/CursorAnimation";

export default function PortfolioHome() {
  return (
    <div className="font-sans min-h-screen overflow-x-hidden bg-background text-foreground">
      <CustomCursor />
      <Navbar />
      <Home />
      <WhatIDo />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
