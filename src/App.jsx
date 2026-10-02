import { useLayoutEffect } from "react";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import { DISABLE_SITE_CONTEXT_MENU } from "./config/site";
import { useSiteInteractionGuards } from "./hooks/useSiteInteractionGuards";
import PortfolioHome from "./pages/PortfolioHome";

/** Reset scroll on client-side navigation. */
function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  useSiteInteractionGuards(DISABLE_SITE_CONTEXT_MENU);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<PortfolioHome />} />
        {/* Design work now lives on the home page; keep old links working. */}
        <Route
          path="/work/graphic-design"
          element={<Navigate to="/#design" replace />}
        />
      </Routes>
    </>
  );
}
