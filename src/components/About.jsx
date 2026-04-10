import { motion } from "framer-motion";
import { SiOpenai, SiAdobexd } from "react-icons/si";
import PortraitImage from "./PortraitImage";

const STATS = [
  { value: "2+", label: "Years of Experience" },
  { value: "4+", label: "Projects Completed" },
  { value: "99%", label: "Client Satisfaction Rate" },
];

const EXPERIENCE = [
  {
    id: 1,
    role: "UI/UX & Graphic Designer",
    company: "Axire Infotech",
    location: "Ahmedabad, Gujarat",
    period: "April 2025 – Present",
    logo: "/assets/experience/axire-infotech.png",
  },
  {
    id: 2,
    role: "UI/UX & Graphic Designer",
    company: "Rupiya Finnovations Private Limited",
    location: "Ahmedabad, Gujarat",
    period: "Mar 2024 – Mar 2025",
    logo: "/assets/experience/rupiya-finnovations.png",
  },
  {
    id: 3,
    role: "Graphic Designer",
    company: "HIR Infotech Pvt Ltd (Brandsnap)",
    location: "Ahmedabad, Gujarat",
    period: "Oct 2023 – Mar 2024",
    logo: "/assets/experience/hir-infotech.png",
  },
];

const TOOLS = [
  {
    name: "Figma",
    logo: "/assets/tools/figma.png",
    cardClass:
      "rounded-xl border-[#A259FF]/30 bg-[#A259FF]/[0.12] hover:border-[#A259FF]/45",
  },
  {
    name: "Illustrator",
    logo: "/assets/tools/illustrator.png",
    cardClass:
      "rounded-xl border-[#FF9A00]/30 bg-[#FF9A00]/[0.12] hover:border-[#FF9A00]/45",
  },
  {
    name: "Photoshop",
    logo: "/assets/tools/photoshop.png",
    cardClass:
      "rounded-xl border-[#31A8FF]/30 bg-[#31A8FF]/[0.12] hover:border-[#31A8FF]/45",
  },
  {
    name: "Canva",
    logo: "/assets/tools/canva.png",
    cardClass:
      "rounded-xl border-[#00C4CC]/30 bg-[#00C4CC]/[0.12] hover:border-[#00C4CC]/45",
  },
  {
    name: "Lovable",
    logo: "/assets/tools/lovable.png",
    cardClass:
      "rounded-xl border-[#F472B6]/30 bg-[#F472B6]/[0.12] hover:border-[#F472B6]/45",
  },
  {
    name: "Claude",
    logo: "/assets/tools/claude.png",
    cardClass:
      "rounded-xl border-[#D97757]/30 bg-[#D97757]/[0.12] hover:border-[#D97757]/45",
  },
  {
    name: "ChatGPT",
    Icon: SiOpenai,
    iconClass: "text-[#10A37F]",
    cardClass:
      "rounded-xl border-[#10A37F]/30 bg-[#10A37F]/[0.12] hover:border-[#10A37F]/45",
  },
  {
    name: "Adobe XD",
    Icon: SiAdobexd,
    iconClass: "text-[#FF61F6]",
    cardClass:
      "rounded-xl border-[#FF61F6]/30 bg-[#FF61F6]/[0.12] hover:border-[#FF61F6]/45",
  },
  {
    name: "Copilot",
    logo: "/assets/tools/copilot.png",
    logoClassName: "rounded-xl",
    cardClass:
      "border-[#6366f1]/30 bg-[#6366f1]/[0.1] hover:border-[#6366f1]/45",
  },
];

const cardBase =
  "rounded-2xl border border-foreground/5 bg-surface p-5 sm:p-6 lg:p-7";

/** Tighter vertical padding than `cardBase` — shorter light-gray “outer box” for intro + portrait. */
const aboutIntroCard =
  "rounded-2xl border border-foreground/5 bg-surface px-5 py-3.5 sm:px-6 sm:py-4 lg:px-7 lg:py-5";

export default function About() {
  return (
    <section
      className="section-inset py-12 lg:py-20"
      id="about"
      aria-labelledby="about-heading"
    >
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-4 inline-flex rounded-full border border-foreground/10 bg-foreground/[0.04] px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.2em] text-foreground/90">
            About me
          </p>
          <h2
            id="about-heading"
            className="max-w-3xl text-[2rem] font-bold leading-tight tracking-tight text-foreground sm:text-[2.375rem] lg:text-[2.775rem] lg:leading-[1.12]"
          >
            Designing Clarity into{" "}
            <span className="text-accent">Every Click</span>
          </h2>
        </motion.div>

        {/* Top: full-width card (matches header bar width) + portrait inside */}
        <div className="mt-8 lg:mt-10">
          <motion.div
            className={`${aboutIntroCard} flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8 xl:gap-10`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <div className="min-w-0 flex flex-1 flex-col justify-center">
              <p className="text-[1.375rem] font-semibold text-foreground sm:text-2xl">
                I&apos;m Roshani{" "}
                <span className="text-accent">UI/UX, Graphic designer</span>{" "}
                based in Ahmedabad
              </p>
              <p className="mt-5 text-lg leading-relaxed text-muted sm:text-xl">
                With two plus years of experience in design, I focus on
                user-centered digital products—from research and branding to
                polished UI. I combine visual craft with clear UX so every
                screen feels intentional, accessible, and on brand.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted sm:text-xl">
                I collaborate closely with teams to turn fuzzy ideas into
                testable flows, design systems, and visuals that scale—without
                losing the human touch that makes interfaces memorable.
              </p>
            </div>

            <motion.div
              className="mx-auto flex w-full max-w-sm shrink-0 justify-center self-center lg:mx-0 lg:max-w-[min(100%,20rem)] lg:self-stretch xl:max-w-[22rem]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <PortraitImage compact />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom: stats + work | tools + CTA */}
        <div className="mt-5 grid gap-6 lg:mt-6 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  className={`${cardBase} text-center sm:text-left`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                >
                  <p className="text-[26px] font-bold tabular-nums text-accent sm:text-[32px]">
                    {s.value}
                  </p>
                  <p className="mt-2 text-[14px] font-medium leading-snug text-muted sm:text-base">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className={cardBase}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold text-foreground">
                Work experiences
              </h3>
              <p className="mt-2 max-w-xl text-base leading-relaxed text-muted">
                A snapshot of where I&apos;ve shaped product and brand design.
              </p>
              <ul className="mt-8 divide-y divide-foreground/[0.08]">
                {EXPERIENCE.map((job) => (
                  <li key={job.id} className="flex gap-4 py-6 sm:gap-5 sm:py-7">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-foreground/[0.04] p-1 ring-1 ring-foreground/10">
                      <img
                        src={job.logo}
                        alt=""
                        className="h-full w-full object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                        <div className="min-w-0 space-y-1">
                          <p className="text-base font-bold leading-snug text-foreground sm:text-[17px]">
                            {job.company}
                          </p>
                          <p className="text-sm font-normal leading-snug text-muted sm:text-[15px]">
                            {job.role}
                          </p>
                          <p className="text-sm text-muted/90">
                            {job.location}
                          </p>
                        </div>
                        <span className="inline-flex w-fit shrink-0 rounded-full border border-amber-600/45 bg-transparent px-3.5 py-1.5 text-xs font-medium tabular-nums text-muted shadow-[inset_0_1px_0_rgba(251,191,36,0.06)] dark:border-amber-500/35">
                          {job.period}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-5">
            <motion.div
              className={`${cardBase} flex flex-1 flex-col`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <h3 className="text-xl font-semibold text-foreground">
                Tools I use
              </h3>
              <p className="mt-2 text-base text-muted">
                From wireframes to high-fidelity UI and handoff—my everyday
                stack for design and collaboration.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
                {TOOLS.map((tool) => {
                  const ToolIcon = tool.Icon;
                  return (
                    <div
                      key={tool.name}
                      className={`flex flex-col items-center gap-2 border py-3 text-center transition ${tool.cardClass}`}
                    >
                      <span className="flex h-28 w-28 items-center justify-center">
                        {ToolIcon ? (
                          <ToolIcon
                            className={`h-20 w-20 ${tool.iconClass ?? ""}`}
                            aria-hidden
                          />
                        ) : (
                          <img
                            src={tool.logo}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className={`h-20 w-20 object-contain ${tool.logoClassName ?? ""}`}
                          />
                        )}
                      </span>
                      <span className="text-[14px] font-medium leading-tight text-foreground/90 sm:text-[16px]">
                        {tool.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
