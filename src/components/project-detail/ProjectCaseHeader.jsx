import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TbArrowLeft, TbSparkles } from "react-icons/tb";

const NAV_ITEMS = [
  { id: "brand-design", label: "Brand Design" },
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
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="section-inset pointer-events-none fixed left-0 right-0 top-0 z-50 flex justify-center pt-3 sm:pt-4"
    >
      <nav
        className="pointer-events-auto page-container flex w-full max-w-6xl items-center gap-2 rounded-full border border-emerald-500/20 bg-[#0a0f0d]/75 py-2 pl-2 pr-2 shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:gap-4 sm:py-2.5 sm:pl-3 sm:pr-3 md:max-w-7xl 2xl:max-w-[min(100%,85rem)]"
        aria-label="Project case navigation"
      >
        <motion.button
          type="button"
          onClick={goBack}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-emerald-400/45 bg-emerald-500/[0.08] text-emerald-400 shadow-[0_0_24px_-4px_rgba(52,211,153,0.35)] transition-colors hover:border-emerald-300/60 hover:bg-emerald-500/[0.14] hover:text-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400/70"
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
              className="shrink-0 rounded-full px-2.5 py-2 text-[13px] font-medium text-white/85 transition-colors hover:bg-white/[0.06] hover:text-emerald-300 sm:px-3 sm:text-[15px]"
            >
              {item.label}
            </button>
          ))}
        </div>

        <motion.button
          type="button"
          onClick={() => {
            navigate("/");
            requestAnimationFrame(() => {
              document.getElementById("contact")?.scrollIntoView({
                behavior: "smooth",
              });
            });
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex max-w-[min(100%,11rem)] shrink-0 items-center gap-2 rounded-full border border-white/10 bg-black/55 px-2.5 py-2 text-left text-[11px] font-semibold leading-snug text-white/95 shadow-inner transition hover:border-emerald-500/30 hover:bg-black/70 sm:max-w-none sm:gap-2.5 sm:px-4 sm:text-[14px] sm:leading-normal"
        >
          <span className="min-w-0">
            Available for <span className="whitespace-nowrap">Opportunity</span>
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-[#052e1f] shadow-[0_0_16px_rgba(52,211,153,0.45)]">
            <TbSparkles className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
          </span>
        </motion.button>
      </nav>
    </motion.header>
  );
}
