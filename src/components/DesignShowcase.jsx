import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import MockupScenes from "./project-detail/MockupScenes";
import SlideCarousel from "./design/SlideCarousel";
import VisualReelsRow from "./design/VisualReels";
import { BrandGrid, LogoGrid, PostGrid } from "./design/DesignGrids";
import { RBLoader } from "./design/RBLoader";
import {
  BRAND_DESIGN_ASSETS,
  CAROUSEL_SETS,
  CREATIVE_POST_ASSETS,
  LOGO_DESIGN_ASSETS,
} from "../data/designWork";

/** Mounts children only once they come near the viewport (keeps videos off the initial load). */
function MountWhenNear({ children, minHeight }) {
  const ref = useRef(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || near) return undefined;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setNear(true),
      { rootMargin: "600px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [near]);

  return (
    <div ref={ref} className="relative" style={near ? undefined : { minHeight }}>
      {near ? children : <RBLoader className="rounded-xl" />}
    </div>
  );
}

MountWhenNear.propTypes = {
  children: PropTypes.node.isRequired,
  minHeight: PropTypes.number.isRequired,
};

const CATEGORIES = [
  {
    id: "posts",
    label: "Posts",
    title: "Creative Posts",
    blurb: "Social-first layouts made to stop the scroll.",
    content: <PostGrid items={CREATIVE_POST_ASSETS} />,
  },
  {
    id: "carousels",
    label: "Carousels",
    title: "Carousel Design",
    blurb: "Multi-slide stories that keep people swiping to the last frame.",
    content: (
      <div className="mt-6 space-y-10 sm:mt-8">
        {CAROUSEL_SETS.map((set) => (
          <SlideCarousel key={set.id} {...set} tone="accent" />
        ))}
      </div>
    ),
  },
  {
    id: "logos",
    label: "Logos",
    title: "Logo Design",
    blurb: "Marks and lockups that read clearly at any size.",
    content: <LogoGrid items={LOGO_DESIGN_ASSETS} />,
  },
  {
    id: "mockups",
    label: "Mockups",
    title: "Mockup Design",
    blurb: "The same designs in context—on phones, in print, and out in the world.",
    content: <MockupScenes />,
  },
  {
    id: "brand",
    label: "Brand",
    title: "Brand Design",
    blurb: "Visual systems that stay consistent across every touchpoint.",
    content: <BrandGrid items={BRAND_DESIGN_ASSETS} />,
  },
  {
    id: "reels",
    label: "Reels",
    title: "Visual Reels",
    blurb: "Motion-first short-form, paced for attention.",
    content: (
      <MountWhenNear minHeight={420}>
        <VisualReelsRow tone="accent" />
      </MountWhenNear>
    ),
  },
];

const sectionId = (id) => `design-${id}`;

export default function DesignShowcase() {
  const [activeId, setActiveId] = useState(CATEGORIES[0].id);
  const barRef = useRef(null);
  const stripRef = useRef(null);
  const tabRefs = useRef({});
  const lockUntil = useRef(0);

  // Scroll spy: the active category is the last one whose top has passed the tab bar.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (Date.now() < lockUntil.current) return;
      const line = (barRef.current?.getBoundingClientRect().bottom ?? 0) + 24;
      let current = CATEGORIES[0].id;
      for (const { id } of CATEGORIES) {
        const el = document.getElementById(sectionId(id));
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActiveId(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Keep the active tab visible inside the horizontally scrolling strip (mobile).
  useEffect(() => {
    const strip = stripRef.current;
    const tab = tabRefs.current[activeId];
    if (!strip || !tab || strip.scrollWidth <= strip.clientWidth) return;
    strip.scrollTo({
      left: tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [activeId]);

  const goTo = useCallback((id) => {
    const el = document.getElementById(sectionId(id));
    if (!el) return;
    const offset = (barRef.current?.getBoundingClientRect().bottom ?? 96) + 12;
    // Hold the highlight on the clicked tab while the page glides past the others.
    lockUntil.current = Date.now() + 900;
    setActiveId(id);
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - offset,
      behavior: "smooth",
    });
  }, []);

  return (
    <section
      className="my-4 w-full py-12 lg:my-5 lg:py-20"
      id="design"
      aria-labelledby="design-heading"
    >
      <div className="mx-auto w-full max-w-[min(100%,88rem)] px-2 sm:px-3 md:px-4 lg:px-5">
        <p className="mx-auto mb-4 flex w-fit items-center justify-center rounded-full border border-foreground/10 bg-foreground/[0.06] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.22em] text-foreground/90 sm:text-[14px]">
          Graphic design
        </p>
        <h2
          id="design-heading"
          className="mx-auto max-w-3xl text-center text-[2rem] font-bold leading-tight tracking-tight text-foreground sm:text-[2.375rem] lg:text-[2.775rem] lg:leading-[1.12]"
        >
          Designs that <span className="text-accent">speak for the brand.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-muted sm:text-lg">
          Banners, posts, carousels, logos, and reels that communicate ideas and
          strengthen brand identity.
        </p>

        <div className="mx-auto mt-10 w-full max-w-4xl rounded-[1.5rem] border border-foreground/10 bg-card p-3 shadow-sm sm:rounded-[1.65rem] sm:p-6 lg:mt-12 lg:max-w-5xl lg:p-8 xl:max-w-6xl">
          <div
            ref={barRef}
            className="sticky top-[82px] z-30 -mx-1 rounded-full border border-foreground/10 bg-card/85 p-1 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:top-[92px] sm:mx-auto sm:w-fit"
          >
            <nav
              ref={stripRef}
              aria-label="Design categories"
              className="relative flex gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {CATEGORIES.map((cat) => {
                const active = cat.id === activeId;
                return (
                  <a
                    key={cat.id}
                    ref={(el) => {
                      tabRefs.current[cat.id] = el;
                    }}
                    href={`#${sectionId(cat.id)}`}
                    aria-current={active ? "true" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(cat.id);
                    }}
                    className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-5 sm:text-[15px] ${
                      active ? "text-[#0D0D0D]" : "text-foreground/75 hover:text-foreground"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="design-tab-pill"
                        className="absolute inset-0 rounded-full bg-accent shadow-[0_0_20px_rgba(192,132,252,0.35)]"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative">{cat.label}</span>
                  </a>
                );
              })}
            </nav>
          </div>

          <div className="mt-8 space-y-16 sm:mt-10 sm:space-y-20">
            {CATEGORIES.map((cat, i) => (
              <motion.section
                key={cat.id}
                id={sectionId(cat.id)}
                aria-labelledby={`${sectionId(cat.id)}-title`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-sm font-semibold tabular-nums text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    id={`${sectionId(cat.id)}-title`}
                    className="text-xl font-bold tracking-tight text-foreground sm:text-2xl"
                  >
                    {cat.title}
                  </h3>
                </div>
                <p className="mt-1.5 text-sm text-muted sm:text-base">{cat.blurb}</p>
                {cat.content}
              </motion.section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
