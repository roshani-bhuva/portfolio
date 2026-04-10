import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TbArrowLeft, TbDownload } from "react-icons/tb";
import { publicAsset } from "../../utils/publicAsset";

const NAV_ITEMS = [
  { id: "brand-design", label: "Brand Design" },
  { id: "creative-post", label: "Creative Post" },
  { id: "logo-design", label: "Logo Design" },
  { id: "visual-reel", label: "Visual Reel" },
];

export default function ProjectCaseHeader() {
  const navigate = useNavigate();

  const scrollToId = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const goBack = useCallback(() => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate("/");
    requestAnimationFrame(() => {
      document.getElementById("projects")?.scrollIntoView({
        behavior: "smooth",
      });
    });
  }, [navigate]);

  return (
    <header className="section-inset pointer-events-none fixed left-0 right-0 top-0 z-50 flex justify-center pt-3 sm:pt-4">
      <nav
        className="pointer-events-auto page-container flex w-full max-w-6xl items-center gap-2 rounded-full border border-foreground/10 bg-nav-surface/90 py-2 pl-2 pr-2 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-2xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.45)] sm:gap-4 sm:py-2.5 sm:pl-3 sm:pr-3 md:max-w-7xl 2xl:max-w-[min(100%,85rem)]"
        aria-label="Project case navigation"
      >
        <motion.button
          type="button"
          onClick={goBack}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-orange-500 bg-orange-50/90 text-orange-600 shadow-[0_0_24px_-4px_rgba(249,115,22,0.35)] transition-colors hover:border-orange-400 hover:bg-orange-100 hover:text-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 dark:bg-black/60 dark:text-orange-500 dark:hover:bg-orange-500/10 dark:hover:text-orange-400"
          aria-label="Back to portfolio"
        >
          <TbArrowLeft
            className="h-5 w-5 transition-transform group-hover:-translate-x-0.5"
            strokeWidth={2}
            aria-hidden
          />
        </motion.button>

        <div className="flex min-w-0 flex-1 items-center justify-center gap-1 overflow-x-auto px-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:justify-start sm:gap-0.5 md:gap-1 [&::-webkit-scrollbar]:hidden">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToId(item.id)}
              className="shrink-0 rounded-full px-2.5 py-2 text-[13px] font-medium text-foreground/85 transition-colors hover:bg-foreground/[0.06] hover:text-orange-600 dark:hover:text-orange-500 sm:px-3 sm:text-[15px]"
            >
              {item.label}
            </button>
          ))}
        </div>

        <motion.a
          href={publicAsset("/Roshani_Bhuva_Resume.pdf")}
          download="Roshani_Bhuva_Resume.pdf"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex max-w-[min(100%,11rem)] shrink-0 flex-row items-center gap-2 rounded-full border border-foreground/12 bg-elevated px-2.5 py-2 text-left text-[11px] font-semibold leading-snug text-foreground/95 shadow-inner transition hover:border-orange-500/50 hover:bg-foreground/[0.04] sm:max-w-none sm:gap-2.5 sm:px-4 sm:text-[14px] sm:leading-normal dark:hover:border-orange-500/60 dark:hover:bg-black/40"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-500 text-zinc-950 shadow-[0_0_16px_rgba(249,115,22,0.45)] dark:text-black dark:shadow-[0_0_16px_rgba(249,115,22,0.55)]">
            <TbDownload
              className="h-3.5 w-3.5"
              strokeWidth={2.25}
              aria-hidden
            />
          </span>
          <span className="min-w-0 whitespace-nowrap">Download CV</span>
        </motion.a>
      </nav>
    </header>
  );
}
