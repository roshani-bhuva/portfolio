import { motion } from "framer-motion";
import { TbArrowUp } from "react-icons/tb";

const SCROLL_OFFSET = 96;

const FOOTER_LINKS = [
  { id: "about", label: "About" },
  { id: "what-i-do", label: "What I do" },
  { id: "projects", label: "Work" },
  { id: "contact", label: "Connect" },
];

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    window.scrollTo({
      top: section.offsetTop - SCROLL_OFFSET,
      behavior: "smooth",
    });
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Footer() {
  return (
    <footer className="section-inset relative mt-8 border-t border-foreground/10 bg-gradient-to-b from-background via-footer-mid to-footer-end pb-10 pt-12 lg:mt-12 lg:pb-14 lg:pt-16">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
        aria-hidden
      />

      <div className="page-container">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4 lg:max-w-sm"
          >
            <button
              type="button"
              onClick={() => scrollToSection("home")}
              className="flex w-fit shrink-0 items-center gap-2 rounded-full outline-none ring-accent/0 transition hover:ring-2 focus-visible:ring-2 focus-visible:ring-accent/50"
              aria-label="Home"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-lg text-[#0D0D0D] shadow-[0_0_20px_rgba(192,132,252,0.35)]">
                <span className="font-['Pacifico'] text-xl leading-none tracking-tight">
                  RB
                </span>
              </span>
            </button>
            <p className="text-sm leading-relaxed text-muted">
              Portfolio — interfaces, motion, and thoughtful details.
            </p>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Footer"
            className="flex flex-col gap-4 lg:items-end"
          >
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-accent">
              Explore
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2.5 lg:justify-end">
              {FOOTER_LINKS.map(({ id, label }) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(id)}
                    className="text-sm text-foreground/85 transition hover:text-accent"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.nav>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-foreground/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 text-sm">
            <p className="font-medium text-foreground/90">Roshani Bhuva</p>
            <p className="text-muted">© {new Date().getFullYear()} Personal Portfolio. All rights reserved.</p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 self-start rounded-full border border-foreground/15 bg-foreground/[0.03] px-4 py-2.5 text-xs font-medium text-muted transition hover:border-accent/40 hover:text-accent sm:self-auto"
          >
            <span>Back to top</span>
            <TbArrowUp className="h-4 w-4 transition group-hover:-translate-y-0.5" aria-hidden />
          </button>
        </div>
      </div>
    </footer>
  );
}
