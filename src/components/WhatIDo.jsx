import { motion } from "framer-motion";
import {
  HiOutlineSwatch,
  HiOutlineSquares2X2,
  HiOutlinePencilSquare,
  HiOutlineUserGroup,
  HiOutlineDevicePhoneMobile,
  HiOutlineComputerDesktop,
} from "react-icons/hi2";

const SERVICES = [
  {
    title: "UI/UX Design",
    icon: HiOutlineSwatch,
  },
  {
    title: "Design Systems",
    icon: HiOutlineSquares2X2,
  },
  {
    title: "Wireframing & Prototyping",
    icon: HiOutlinePencilSquare,
  },
  {
    title: "User Research",
    icon: HiOutlineUserGroup,
  },
  {
    title: "Mobile App Design",
    icon: HiOutlineDevicePhoneMobile,
  },
  {
    title: "Web App Design",
    icon: HiOutlineComputerDesktop,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function WhatIDo() {
  return (
    <section
      id="what-i-do"
      className="section-inset relative border-t border-foreground/5 bg-background py-12 lg:py-20"
      aria-labelledby="what-i-do-heading"
    >
      <div className="page-container">
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-6 inline-flex rounded-full border border-foreground/20 px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.2em] text-foreground/95">
            What I Do
          </p>
          <h2
            id="what-i-do-heading"
            className="max-w-3xl text-[2rem] font-bold leading-tight tracking-tight text-foreground sm:text-[2.375rem] lg:text-[2.775rem] lg:leading-[1.12]"
          >
            Design solutions that{" "}
            <span className="text-accent">make impact.</span>
          </h2>
        </motion.div>

        <div className="mt-10 flex flex-col gap-5 lg:mt-12 lg:flex-row lg:items-stretch lg:gap-5">
          <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            {SERVICES.map((item, i) => (
              <motion.article
                key={item.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                className="flex items-center gap-4 rounded-2xl border border-foreground/5 bg-surface p-5 transition hover:border-accent/20"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <item.icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
                </span>
                <h3 className="text-[17px] font-semibold leading-snug text-foreground sm:text-[18px]">
                  {item.title}
                </h3>
              </motion.article>
            ))}
          </div>

          <motion.aside
            className="flex lg:w-[min(100%,340px)] lg:shrink-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex h-full w-full flex-col justify-between gap-8 rounded-2xl border border-foreground/5 bg-surface p-6 sm:p-8">
              <div>
                <h3 className="text-[20px] font-semibold text-foreground sm:text-[22px]">
                  Curious what else I do?
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
                  Take a closer look at my complete design skillset. You might
                  find your perfect match.
                </p>
              </div>
              <motion.a
                href="#projects"
                className="inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3.5 text-base font-semibold text-[#0D0D0D] shadow-glow transition hover:bg-accent-bright"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                See My Projects
              </motion.a>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
