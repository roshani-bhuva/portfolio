import { motion } from "framer-motion";
import ProjectCaseHeader from "../components/project-detail/ProjectCaseHeader";
import CustomCursor from "../utils/CursorAnimation";

const sectionBase =
  "rounded-[1.5rem] border border-white/10 bg-[#111413] p-6 sm:p-8 lg:p-10";

export default function GraphicDesignCase() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#060807] text-foreground">
      <CustomCursor />
      <ProjectCaseHeader />

      <main className="section-inset pb-20 pt-[5.5rem] sm:pt-[6rem]">
        <div className="page-container max-w-4xl lg:max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-center"
          >
            <p className="mb-3 inline-flex rounded-full border border-emerald-500/25 bg-emerald-500/[0.08] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400 sm:text-xs">
              Graphic Design
            </p>
            <h1 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
              Graphic Design <span className="text-emerald-400">Projects</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
              I design banners, posters, logos, and reels that communicate ideas
              and strengthen brand identity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-[#0c1010] shadow-[0_24px_80px_-20px_rgba(0,0,0,0.65)] sm:mt-12 sm:rounded-[1.35rem]"
          >
            <img
              src="/assets/graphic-design-project.png"
              alt="Graphic design work shown across tablet, phone, and laptop mockups"
              className="h-auto w-full object-cover"
              width={1200}
              height={675}
            />
          </motion.div>

          <div className="mt-14 space-y-12 sm:mt-16 sm:space-y-16">
            <section id="brand-design" className="scroll-mt-28">
              <div className={sectionBase}>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Brand Design
                </h2>
                <p className="mt-3 max-w-2xl text-zinc-400 sm:text-lg">
                  Visual systems, color, and typography built to stay consistent
                  across every touchpoint—from social to print.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="aspect-[4/3] rounded-xl border border-white/10 bg-gradient-to-br from-violet-950/40 to-zinc-950" />
                  <div className="aspect-[4/3] rounded-xl border border-white/10 bg-gradient-to-br from-emerald-950/30 to-zinc-950" />
                </div>
              </div>
            </section>

            <section id="logo-design" className="scroll-mt-28">
              <div className={sectionBase}>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Logo Design
                </h2>
                <p className="mt-3 max-w-2xl text-zinc-400 sm:text-lg">
                  Marks and lockups that read clearly at any size and feel
                  unmistakably yours.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="flex h-32 w-32 items-center justify-center rounded-2xl border border-white/10 bg-zinc-900/80 sm:h-40 sm:w-40" />
                  <div className="flex h-32 w-32 items-center justify-center rounded-2xl border border-white/10 bg-zinc-900/80 sm:h-40 sm:w-40" />
                  <div className="flex h-32 w-32 items-center justify-center rounded-2xl border border-white/10 bg-zinc-900/80 sm:h-40 sm:w-40" />
                </div>
              </div>
            </section>

            <section id="visual-reel" className="scroll-mt-28">
              <div className={sectionBase}>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Visual Reel
                </h2>
                <p className="mt-3 max-w-2xl text-zinc-400 sm:text-lg">
                  Motion-forward layouts for reels and short-form—paced for
                  attention and on-brand frames.
                </p>
                <div className="mt-8 aspect-video w-full rounded-xl border border-white/10 bg-gradient-to-tr from-zinc-900 via-[#0f1915] to-emerald-950/40" />
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
