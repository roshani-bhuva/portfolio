import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { TbArrowUpRight } from "react-icons/tb";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const projects = [
  {
    id: "zaibatsu",
    title: "zaibatsutechnology",
    description:
      "A UK-based agency that offers bespoke AI & Digital Solutions with over 5+ years of driving business growth with the help of development & marketing solutions.",
    image: "/assets/zaibatsu-project.png",
    link: "https://zaibatsutechnology.co.uk/",
    tag: "Website Design",
  },
  {
    id: "trailx5",
    title: "Trailx5",
    description:
      "As a top digital marketing company, we craft customized strategies designed to boost your ROI while enhancing your brand’s growth and visibility.",
    image: "/assets/trailx5-project.png",
    link: "https://trailx5.com/",
    tag: "Website Design",
  },
  {
    id: "rupiya",
    title: "rupiya.app",
    description:
      "Rupiya.app helps farmers with tools like satellite monitoring, soil testing, and expert guidance. It also offers easy access to agricultural loans for growth.",
    image: "/assets/rupiya-project.jpg",
    link: "https://rupiya.app/",
    tag: "Website Design",
  },
  {
    id: "graphic-design",
    title: "Graphic Design Projects",
    description:
      "I design banners, posters, logos, and reels that communicate ideas and strengthen brand identity.",
    image: "/assets/graphic-design-project.png",
    internalPath: "/work/graphic-design",
    tag: "Graphic Design",
  },
];

function ProjectCarousel({ images, title }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [images.length]);

  const singleImage = images.length === 1;

  return (
    <div className="relative h-full min-h-0 w-full">
      {images.map((src, i) => (
        <motion.div
          key={src}
          className="absolute inset-0"
          aria-hidden={!singleImage && i !== index}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <img
            src={src}
            alt={singleImage ? `${title} preview` : ""}
            className="h-full w-full object-cover object-center"
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        </motion.div>
      ))}
      {images.length > 1 && (
        <div
          className="pointer-events-none absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-1.5"
          aria-hidden
        >
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === index ? "w-5 bg-accent" : "w-1 bg-foreground/30"
              }`}
            />
          ))}
        </div>
      )}
      {!singleImage && <span className="sr-only">{title}</span>}
    </div>
  );
}

ProjectCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

export default function Projects() {
  return (
    <section
      className="w-full py-12 lg:py-20 lg:my-5 my-4"
      id="projects"
      aria-labelledby="projects-heading"
    >
      {/* Centered block; lighter side padding than hero/nav so cards use more width */}
      <div className="mx-auto w-full max-w-[min(100%,88rem)] px-2 sm:px-3 md:px-4 lg:px-5">
        <p className="mx-auto mb-4 flex w-fit items-center justify-center rounded-full border border-foreground/10 bg-foreground/[0.06] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.22em] text-foreground/90 sm:text-[14px]">
          Design highlights
        </p>
        <h2
          id="projects-heading"
          className="mx-auto max-w-3xl text-center text-[2rem] font-bold leading-tight tracking-tight text-foreground sm:text-[2.375rem] lg:text-[2.775rem] lg:leading-[1.12]"
        >
          My work, your <span className="text-accent">next inspiration.</span>
        </h2>

        <div className="mx-auto mt-12 grid w-full max-w-4xl gap-6 sm:gap-7 lg:mt-14 lg:max-w-5xl lg:grid-cols-2 lg:gap-x-5 lg:gap-y-7 xl:max-w-6xl">
          {projects.map((project, index) => {
            const images =
              project.images || (project.image ? [project.image] : []);

            const isInternal = Boolean(project.internalPath);
            const isExternal =
              typeof project.link === "string" &&
              project.link.startsWith("http");

            const cardClass =
              "group relative block w-full max-w-2xl cursor-pointer justify-self-center overflow-hidden rounded-[1.5rem] border border-foreground/10 bg-card text-left shadow-sm no-underline transition-[box-shadow,border-color,transform] duration-300 sm:rounded-[1.65rem] lg:max-w-none lg:justify-self-stretch hover:border-accent/25 hover:shadow-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

            const motionProps = {
              initial: { opacity: 0, y: 36 },
              whileInView: { opacity: 1, y: 0 },
              whileHover: { y: -2 },
              transition: {
                type: "spring",
                stiffness: 80,
                damping: 14,
                delay: index * 0.12,
              },
              viewport: { once: true, margin: "-40px" },
              "aria-labelledby": `project-title-${project.id}`,
            };

            const inner = (
              <div className="flex flex-col gap-3.5 p-4 sm:gap-4 sm:p-5 md:p-6">
                <div className="group/media relative aspect-[2/1] w-full min-h-[180px] overflow-hidden rounded-xl border border-foreground/10 bg-elevated sm:min-h-[222px] sm:rounded-2xl sm:aspect-[21/8] lg:aspect-[11/4] lg:min-h-[238px]">
                  <span className="absolute left-3 top-3 z-10 rounded-full border border-accent/25 bg-card/90 px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-accent shadow-sm backdrop-blur-sm sm:left-4 sm:top-4 sm:px-3.5 sm:py-2 sm:text-[13px]">
                    {project.tag}
                  </span>
                  <div className="absolute inset-0 transition-[filter] duration-300 group-hover/media:brightness-[1.05]">
                    <ProjectCarousel images={images} title={project.title} />
                  </div>
                </div>

                <div className="relative min-h-[5.25rem] pr-14 sm:min-h-[5.5rem] sm:pr-16">
                  <h3
                    id={`project-title-${project.id}`}
                    className="text-xl font-bold tracking-tight text-foreground sm:text-[1.375rem] lg:text-[26px]"
                  >
                    {project.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-muted sm:text-[1.0625rem] lg:text-lg">
                    {project.description}
                  </p>
                  <span
                    className="pointer-events-none absolute bottom-0 right-0 inline-flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 bg-surface text-accent shadow-md transition-colors group-hover:border-accent/45 group-hover:bg-accent/15 group-hover:text-accent-bright sm:h-12 sm:w-12"
                    aria-hidden
                  >
                    <TbArrowUpRight className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                </div>
              </div>
            );

            if (isInternal) {
              return (
                <MotionLink
                  key={project.id}
                  to={project.internalPath}
                  className={cardClass}
                  {...motionProps}
                >
                  {inner}
                </MotionLink>
              );
            }

            return (
              <motion.a
                key={project.id}
                href={project.link}
                className={cardClass}
                {...motionProps}
                {...(isExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {inner}
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
