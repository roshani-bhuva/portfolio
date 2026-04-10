import { useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PortfolioHome from "./pages/PortfolioHome";
import GraphicDesignCase from "./pages/GraphicDesignCase";

/** Reset scroll on client-side navigation (e.g. Work → Graphic Design case). */
function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<PortfolioHome />} />
        <Route path="/work/graphic-design" element={<GraphicDesignCase />} />
      </Routes>
    </>
  );
}
