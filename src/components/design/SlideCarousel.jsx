import { useRef, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { LoadingImage } from "./RBLoader";

const TONES = {
  orange: {
    arrow:
      "hover:border-orange-500 hover:text-orange-600 focus-visible:outline-orange-500 dark:hover:text-orange-500",
    dot: "bg-orange-500",
  },
  accent: {
    arrow: "hover:border-accent hover:text-accent focus-visible:outline-accent",
    dot: "bg-accent",
  },
};

function SlideCarousel({ title, caption, slides, story = false, tone = "orange" }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const onScroll = () => {
      const slideWidth = track.firstElementChild?.clientWidth || 1;
      setActive(
        Math.min(slides.length - 1, Math.round(track.scrollLeft / slideWidth)),
      );
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [slides.length]);

  const goTo = useCallback((index) => {
    const track = trackRef.current;
    const slide = track?.children[index];
    if (!track || !slide) return;
    track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
  }, []);

  const atEnd = (() => {
    const track = trackRef.current;
    if (!track) return false;
    return track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
  })();

  const arrowClass =
    `flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 bg-card text-foreground transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-35 ${TONES[tone].arrow}`;

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-foreground sm:text-xl">
            {title}
          </h3>
          <p className="mt-1 text-sm text-muted sm:text-base">{caption}</p>
        </div>
        <div className="hidden shrink-0 gap-2 sm:flex">
          <button
            type="button"
            className={arrowClass}
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label={`Previous ${title} slide`}
          >
            <TbChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            className={arrowClass}
            onClick={() => goTo(active + 1)}
            disabled={atEnd || active === slides.length - 1}
            aria-label={`Next ${title} slide`}
          >
            <TbChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-5 flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-xl border border-foreground/10 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.12)] [-ms-overflow-style:none] [scrollbar-width:none] dark:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.45)] [&::-webkit-scrollbar]:hidden"
        role="list"
        aria-label={`${title} carousel`}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className={`shrink-0 snap-start ${story ? "w-[62%] sm:w-[32%] lg:w-[25%]" : "w-[78%] sm:w-[42%] lg:w-[34%]"}`}
            role="listitem"
            aria-label={`Slide ${i + 1} of ${slides.length}`}
          >
            <LoadingImage
              src={slide.src}
              alt={slide.alt}
              className={`block w-full object-cover ${story ? "aspect-[9/16]" : "aspect-[4/5]"}`}
              width={story ? 900 : 1080}
              height={story ? 1600 : 1350}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all ${i === active ? `w-6 ${TONES[tone].dot}` : "w-2 bg-foreground/20 hover:bg-foreground/40"}`}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === active ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}

SlideCarousel.propTypes = {
  title: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }),
  ).isRequired,
  story: PropTypes.bool,
  tone: PropTypes.oneOf(["orange", "accent"]),
};

export default SlideCarousel;
