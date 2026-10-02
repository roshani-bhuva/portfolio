import { useRef, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { MdSwipeRight } from "react-icons/md";
import { TbChevronLeft, TbChevronRight, TbPlayerPlay } from "react-icons/tb";
import ProjectCaseHeader from "../components/project-detail/ProjectCaseHeader";
import MockupScenes from "../components/project-detail/MockupScenes";
import { publicAsset } from "../utils/publicAsset";
import CustomCursor from "../utils/CursorAnimation";

const sectionBase =
  "rounded-[1.25rem] border border-foreground/10 bg-card p-4 sm:rounded-[1.5rem] sm:p-8 lg:p-10";

const VISUAL_REEL_SOURCES = [
  publicAsset("/assets/1.mp4"),
  publicAsset("/assets/2.mp4"),
  publicAsset("/assets/3.mp4"),
];

const CREATIVE_POST_ASSETS = [
  {
    src: publicAsset("/assets/post-edra-boa.webp"),
    alt: "EDRA Boa poster — the icon returns, a nest not a sofa, by Fernando & Humberto Campana",
  },
  {
    src: publicAsset("/assets/post-greensense-live-smart-g.webp"),
    alt: "GreenSense smart home device post — live smart, live green, live better",
  },
  {
    src: publicAsset("/assets/post-ambli-office.webp"),
    alt: "Own your dream office at Ambli — real estate ad, from ₹53 lacs",
  },
  {
    src: publicAsset("/assets/post-svitch-csr-762.webp"),
    alt: "Svitch CSR 762 electric motorcycle ad — unleash the beast, raw power, zero emissions",
  },
  {
    src: publicAsset("/assets/post-shreeji-red.webp"),
    alt: "Shreeji Elevator Service post — excellence in every lift, trusted since 1976",
  },
  {
    src: publicAsset(`/assets/${encodeURIComponent("post-1.png")}`),
    alt: "Social media managers at 3 AM — creative post with 3D character and thought bubble",
  },
  {
    src: publicAsset("/assets/post-shreeji-future-of-elevators.webp"),
    alt: "Shreeji Elevator Services post — the future of elevators",
  },
  {
    src: publicAsset(`/assets/${encodeURIComponent("post-3.png")}`),
    alt: "Instagram vs reality comparison creative for client expectations",
  },
  {
    src: publicAsset("/assets/post-greensense-live-smart-bulb.webp"),
    alt: "GreenSense smart device ad with light-bulb logo — small device, big impact",
  },
  {
    src: publicAsset(`/assets/${encodeURIComponent("post-2.png")}`),
    alt: "Movie-themed branding graphic with clapperboard and headline",
  },
  {
    src: publicAsset("/assets/post-shreeji-grey.webp"),
    alt: "Shreeji Elevator Service post — excellence in every lift, grey edition",
  },
  {
    src: publicAsset(`/assets/${encodeURIComponent("post-4.png")}`),
    alt: "Social media managers at 3 AM — creative post with 3D character and thought bubble",
  },
  {
    src: publicAsset(`/assets/${encodeURIComponent("post-8.webp")}`),
    alt: "Jal brand design and packaging.",
  },
  {
    src: publicAsset(`/assets/${encodeURIComponent("post-11.jpg")}`),
    alt: "The Universe brand design.",
  },
];

const BRAND_DESIGN_ASSETS = [
  {
    src: publicAsset("/assets/brand-design-trailx5-brochure.jpg"),
    alt: "TrailX5 tri-fold brochure mockup — brand identity, typography, and print layout",
    width: 1024,
    height: 769,
  },
  {
    src: publicAsset("/assets/brand-design-pramukh-masala.webp"),
    alt: "Pramukh Masala product mockup — packaging labels and premium spice branding",
    width: 1022,
    height: 735,
  },
  {
    src: publicAsset("/assets/brand-design-jal.jpeg"),
    alt: "Jal brand design and packaging.",
    width: 1024,
    height: 769,
  },
  {
    src: publicAsset("/assets/brand-design-the-universe.webp"),
    alt: "The Universe brand design.",
    width: 1024,
    height: 769,
  },
];

const LOGO_DESIGN_ASSETS = [
  {
    src: publicAsset("/assets/logo-trailx5.png"),
    alt: "TrailX5 wordmark — Trail and 5 with orange X mark",
    outerClass: "min-w-0 flex-1",
    frameClass: "h-full overflow-hidden p-0",
    imgClass: "aspect-square w-full object-cover",
  },
  {
    src: publicAsset("/assets/logo-respl.webp"),
    alt: "RESPL logo — R monogram in an open gradient frame",
    outerClass: "min-w-0 flex-1",
    frameClass: "h-full overflow-hidden p-0",
    imgClass: "aspect-square w-full object-cover",
  },
  {
    src: publicAsset("/assets/logo-green-sense-g.webp"),
    alt: "Green Sense logo — G monogram with a leaf, smart living, sustainable future",
    outerClass: "min-w-0 flex-1",
    frameClass: "h-full overflow-hidden p-0",
    imgClass: "aspect-square w-full object-cover",
  },
  {
    src: publicAsset("/assets/logo-vidyarthi-motors.webp"),
    alt: "Vidyarthi Motors logo — layered blue V with speed lines",
    outerClass: "min-w-0 flex-1",
    frameClass: "h-full overflow-hidden p-0",
    imgClass: "aspect-square w-full object-cover",
  },
  {
    src: publicAsset("/assets/logo-shreeji-elevator-est-1976.webp"),
    alt: "Shreeji Elevator Services logo — S mark with up-down arrow, est. 1976",
    outerClass: "min-w-0 flex-1",
    frameClass: "h-full overflow-hidden p-0",
    imgClass: "aspect-square w-full object-cover",
  },
  {
    src: publicAsset("/assets/logo-rupiya-app.webp"),
    alt: "rupiya.app logo — golden R icon and wordmark",
    outerClass: "min-w-0 flex-1",
    frameClass: "h-full overflow-hidden p-0",
    imgClass: "aspect-square w-full object-cover",
  },
  {
    src: publicAsset("/assets/logo-shreeji-elevator.webp"),
    alt: "Shreeji Elevator Services logo — red and grey up-down arrow S mark",
    outerClass: "min-w-0 flex-1",
    frameClass: "h-full overflow-hidden p-0",
    imgClass: "aspect-square w-full object-cover",
  },
  {
    src: publicAsset("/assets/logo-green-sense-bulb.webp"),
    alt: "Green Sense logo — light bulb with smart home, Wi-Fi signal, and leaf",
    outerClass: "min-w-0 flex-1",
    frameClass: "h-full overflow-hidden p-0",
    imgClass: "aspect-square w-full object-cover",
  },
  {
    src: publicAsset("/assets/logo-jal.webp"),
    alt: "Jal logo",
    outerClass: "min-w-0 flex-1",
    frameClass: "h-full overflow-hidden p-0",
    imgClass: "aspect-square w-full object-cover",
  },
  {
    src: publicAsset("/assets/logo-the-univers.webp"),
    alt: "Jal logo",
    outerClass: "min-w-0 flex-1",
    frameClass: "h-full overflow-hidden p-0",
    imgClass: "aspect-square w-full object-cover",
  },
];

const CAROUSEL_SETS = [
  {
    id: "traveltekpro",
    title: "TravelTekPro × TBO",
    caption:
      "Six-slide explainer for OTA platforms, following one flight path.",
    slides: [
      "How OTA platforms use TBO as a flight supplier",
      "What exactly is TBO? Travel Boutique Online",
      "What TBO provides to your OTA",
      "How OTAs plug into TBO",
      "Why OTAs pick TBO over direct airline connections",
      "We are TravelTekPro — contact TravelTekPro today",
    ].map((alt, i) => ({
      src: publicAsset(`/assets/carousel-tbo-${i + 1}.webp`),
      alt,
    })),
  },
  {
    id: "edra-boa",
    title: "EDRA — Boa",
    caption:
      "Five-slide launch story for the Boa sofa by the Campana brothers.",
    slides: [
      "EDRA Boa cover — the icon returns, a nest not a sofa",
      "The story — born in São Paulo, woven in Tuscany",
      "The craft — one endless tube, knotted by hand",
      "The experience — sit, sink, stay",
      "Discover Boa — link in bio",
    ].map((alt, i) => ({
      src: publicAsset(`/assets/carousel-edra-${i + 1}.webp`),
      alt,
    })),
  },
  {
    id: "the-universe",
    title: "The Universe by Laxmi",
    caption:
      "Six-frame story series for a 3 BHK premium living project in Ahmedabad.",
    story: true,
    slides: [
      "The Universe by Laxmi — universe of 3 BHK premium living",
      "Come alive in the captivating world of The Universe",
      "Futuristic structure — amenities for recreation, wellness, and community",
      "Perfect place for family — buy your dream flat now",
      "Splash of elegance — where relaxation meets recreation",
      "Presenting the world of Universe by Laxmi — site and corporate offices",
    ].map((alt, i) => ({
      src: publicAsset(`/assets/carousel-universe-${i + 1}.webp`),
      alt,
    })),
  },
];

/** Timestamp (seconds) used as the idle thumbnail; playback always starts at 0. */
const THUMB_AT_SEC = 2;

function previewTime(el) {
  if (!el || !Number.isFinite(el.duration) || el.duration <= 0) return 0;
  return Math.min(THUMB_AT_SEC, Math.max(0, el.duration - 0.05));
}

function ReelVideo({ videoRef, src, label, onPlayPeer }) {
  const [playing, setPlaying] = useState(false);
  const [thumbReady, setThumbReady] = useState(false);
  const thumbSeekDone = useRef(false);

  useEffect(() => {
    setThumbReady(false);
    thumbSeekDone.current = false;
    const el = videoRef.current;
    if (!el) return;

    const onLoadedMetadata = () => {
      el.currentTime = previewTime(el);
    };

    const onSeeked = () => {
      if (!thumbSeekDone.current) {
        thumbSeekDone.current = true;
        setThumbReady(true);
      }
    };

    el.addEventListener("loadedmetadata", onLoadedMetadata);
    el.addEventListener("seeked", onSeeked);

    if (el.readyState >= 1) {
      onLoadedMetadata();
    }

    return () => {
      el.removeEventListener("loadedmetadata", onLoadedMetadata);
      el.removeEventListener("seeked", onSeeked);
    };
  }, [src, videoRef]);

  const goToThumbnail = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = previewTime(el);
  }, [videoRef]);

  const toggle = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      if (!thumbReady) return;
      onPlayPeer?.();
      el.currentTime = 0;
      void el.play();
    } else {
      el.pause();
      goToThumbnail();
    }
  }, [videoRef, onPlayPeer, goToThumbnail, thumbReady]);

  return (
    <div className="relative aspect-[9/16] w-[min(72vw,280px)] shrink-0 overflow-hidden rounded-xl border border-foreground/10 bg-zinc-200 shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:bg-black dark:shadow-[0_20px_50px_rgba(0,0,0,0.55)] sm:w-full sm:max-w-none">
      <video
        ref={videoRef}
        src={src}
        className={`h-full w-full cursor-pointer object-cover transition-opacity duration-200 ${thumbReady ? "opacity-100" : "opacity-0"}`}
        playsInline
        preload="auto"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          const el = videoRef.current;
          if (el) {
            el.pause();
            goToThumbnail();
          }
          setPlaying(false);
        }}
        onClick={() => {
          if (thumbReady) toggle();
        }}
      />
      {!playing && (
        <button
          type="button"
          disabled={!thumbReady}
          onClick={(e) => {
            e.stopPropagation();
            toggle();
          }}
          className="absolute inset-0 z-10 flex items-center justify-center bg-foreground/10 transition hover:bg-foreground/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:cursor-wait disabled:opacity-70 dark:bg-black/25 dark:hover:bg-black/35"
          aria-label={`Play ${label}`}
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-orange-500/80 bg-white/85 text-orange-600 shadow-[0_0_28px_rgba(249,115,22,0.35)] backdrop-blur-sm dark:bg-black/70 dark:text-orange-500 dark:shadow-[0_0_36px_rgba(249,115,22,0.45)] sm:h-[4.5rem] sm:w-[4.5rem]">
            <TbPlayerPlay
              className="ml-1 h-8 w-8 sm:h-9 sm:w-9"
              strokeWidth={1.75}
              aria-hidden
            />
          </span>
        </button>
      )}
    </div>
  );
}

ReelVideo.propTypes = {
  videoRef: PropTypes.shape({
    current: PropTypes.oneOfType([
      PropTypes.instanceOf(
        typeof HTMLVideoElement !== "undefined" ? HTMLVideoElement : Object,
      ),
      PropTypes.oneOf([null]),
    ]),
  }).isRequired,
  src: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onPlayPeer: PropTypes.func,
};

function VisualReelsRow() {
  const r0 = useRef(null);
  const r1 = useRef(null);
  const r2 = useRef(null);
  const refs = [r0, r1, r2];
  const wrapperRef = useRef(null);
  const rowRef = useRef(null);
  const dismissedRef = useRef(false);
  const [showSwipeHint, setShowSwipeHint] = useState(false);

  const pauseExcept = useCallback(
    (keepIndex) => {
      [r0, r1, r2].forEach((r, j) => {
        const v = r.current;
        if (!v || j === keepIndex) return;
        v.pause();
        if (Number.isFinite(v.duration)) v.currentTime = previewTime(v);
      });
    },
    [r0, r1, r2],
  );

  useEffect(() => {
    const rowEl = rowRef.current;
    if (!rowEl) return undefined;

    const onScroll = () => {
      if (rowEl.scrollLeft > 8) {
        dismissedRef.current = true;
        setShowSwipeHint(false);
      }
    };

    rowEl.addEventListener("scroll", onScroll, { passive: true });
    return () => rowEl.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const host = wrapperRef.current;
    if (!host) return undefined;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        if (dismissedRef.current) return;
        setShowSwipeHint(true);
      },
      { threshold: 0.35 },
    );

    obs.observe(host);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="relative mt-8">
      {showSwipeHint && (
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 flex items-center pr-2 sm:hidden">
          <div
            className="flex h-7 w-10 items-center justify-center"
            aria-hidden
          >
            {/* Light-mode animated glow */}
            <motion.span
              className="inline-flex text-zinc-900/70 dark:hidden"
              animate={{
                x: [0, 7, 0],
                opacity: [0.35, 0.95, 0.35],
                filter: [
                  "drop-shadow(0 6px 14px rgba(0,0,0,0.10))",
                  "drop-shadow(0 10px 22px rgba(0,0,0,0.22))",
                  "drop-shadow(0 6px 14px rgba(0,0,0,0.10))",
                ],
              }}
              transition={{
                duration: 1.05,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            >
              <MdSwipeRight className="h-6 w-6" aria-hidden />
            </motion.span>

            {/* Dark-mode animated glow */}
            <motion.span
              className="hidden text-white/80 dark:inline-flex"
              animate={{
                x: [0, 7, 0],
                opacity: [0.35, 0.95, 0.35],
                filter: [
                  "drop-shadow(0 10px 20px rgba(0,0,0,0.55))",
                  "drop-shadow(0 14px 26px rgba(0,0,0,0.75))",
                  "drop-shadow(0 10px 20px rgba(0,0,0,0.55))",
                ],
              }}
              transition={{
                duration: 1.05,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            >
              <MdSwipeRight className="h-6 w-6" aria-hidden />
            </motion.span>
          </div>
        </div>
      )}
      <div
        ref={rowRef}
        className="flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden"
        role="list"
      >
        {VISUAL_REEL_SOURCES.map((src, i) => (
          <div key={src} className="sm:min-w-0" role="listitem">
            <ReelVideo
              videoRef={refs[i]}
              src={src}
              label={`Visual reel ${i + 1}`}
              onPlayPeer={() => pauseExcept(i)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideCarousel({ title, caption, slides, story = false }) {
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
    "flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 bg-card text-foreground transition hover:border-orange-500 hover:text-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:pointer-events-none disabled:opacity-35 dark:hover:text-orange-500";

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
            <img
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
            className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-orange-500" : "w-2 bg-foreground/20 hover:bg-foreground/40"}`}
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
};

export default function GraphicDesignCase() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <CustomCursor variant="orange" />
      <ProjectCaseHeader />

      <main className="section-inset pb-20 pt-[5.5rem] sm:pt-[6rem]">
        <div className="page-container max-w-4xl lg:max-w-5xl">
          <div className="text-center">
            <p className="mb-3 inline-flex rounded-full border-2 border-orange-500 bg-orange-50/90 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-orange-700 sm:text-xs dark:bg-black dark:text-orange-500">
              Graphic Design
            </p>
            <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
              Graphic Design{" "}
              <span className="text-orange-600 dark:text-orange-500">
                Projects
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              I design banners, posters, logos, and reels that communicate ideas
              and strengthen brand identity.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-foreground/10 bg-card shadow-[0_20px_50px_-24px_rgba(0,0,0,0.12)] sm:mt-12 sm:rounded-[1.35rem] dark:shadow-[0_24px_80px_-20px_rgba(0,0,0,0.65)]">
            <img
              src={publicAsset("/assets/graphic-design-project.webp")}
              alt="Graphic design work shown across tablet, phone, and laptop mockups"
              className="h-auto w-full object-cover"
              width={1200}
              height={675}
            />
          </div>

          <div className="mt-14 space-y-12 sm:mt-16 sm:space-y-16">
            <section id="creative-post" className="scroll-mt-28">
              <div className={sectionBase}>
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                  Creative Post
                </h2>
                <p className="mt-3 max-w-2xl text-muted sm:text-lg">
                  Social-first layouts and campaign frames—crafted to stop the
                  scroll while staying true to the brand voice.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:grid-cols-3 sm:gap-4">
                  {CREATIVE_POST_ASSETS.map((asset, i) => (
                    <div
                      key={`${asset.src}-${i}`}
                      className="overflow-hidden rounded-xl border border-foreground/10 bg-elevated shadow-sm dark:bg-zinc-950 dark:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.5)]"
                    >
                      <img
                        src={asset.src}
                        alt={asset.alt}
                        className="aspect-[4/5] w-full object-cover"
                        loading="lazy"
                        decoding="async"
                        width={800}
                        height={1000}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="carousel-design" className="scroll-mt-28">
              <div className={sectionBase}>
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                  Carousel Design
                </h2>
                <p className="mt-3 max-w-2xl text-muted sm:text-lg">
                  Multi-slide stories that flow from one frame into the next and
                  keep people swiping to the last slide.
                </p>
                <div className="mt-8 space-y-12">
                  {CAROUSEL_SETS.map((set) => (
                    <SlideCarousel key={set.id} {...set} />
                  ))}
                </div>
              </div>
            </section>

            <section id="logo-design" className="scroll-mt-28">
              <div className={sectionBase}>
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                  Logo Design
                </h2>
                <p className="mt-3 max-w-2xl text-muted sm:text-lg">
                  Marks and lockups that read clearly at any size and feel
                  unmistakably yours.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:grid-cols-4 sm:gap-4">
                  {LOGO_DESIGN_ASSETS.map((logo, i) => (
                    <div
                      key={`${logo.src}-${i}`}
                      className={`flex min-h-0 min-w-0 flex-col overflow-hidden rounded-2xl border border-foreground/10 shadow-sm dark:shadow-none ${logo.frameClass}`}
                    >
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className={logo.imgClass}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="mockup-design" className="scroll-mt-28">
              <div className={sectionBase}>
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                  Mockup Design
                </h2>
                <p className="mt-3 max-w-2xl text-muted sm:text-lg">
                  The same designs shown in context—on phones, in feeds and
                  stories, and framed in print—one brand per scene.
                </p>
                <MockupScenes />
              </div>
            </section>

            <section id="brand-design" className="scroll-mt-28">
              <div className={sectionBase}>
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                  Brand Design
                </h2>
                <p className="mt-3 max-w-2xl text-muted sm:text-lg">
                  Visual systems, color, and typography built to stay consistent
                  across every touchpoint—from social to print.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4">
                  {BRAND_DESIGN_ASSETS.map((asset, i) => (
                    <div
                      key={`${asset.src}-${i}`}
                      className={`min-w-0 overflow-hidden rounded-xl border border-foreground/10 bg-card shadow-[0_12px_40px_-20px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.45)] ${asset.wide ? "sm:col-span-2" : ""}`}
                    >
                      <img
                        src={asset.src}
                        alt={asset.alt}
                        className="w-full h-auto block"
                        width={asset.width}
                        height={asset.height}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="visual-reel" className="scroll-mt-28">
              <div className="rounded-[1.25rem] border border-foreground/10 bg-card px-4 py-6 sm:rounded-[1.5rem] sm:p-8 lg:p-10 dark:bg-black">
                <h2 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">
                  <span className="text-foreground">Visual </span>
                  <span className="text-orange-600 dark:text-orange-500">
                    Reel
                  </span>
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-center text-muted sm:text-lg">
                  Motion-forward layouts for reels and short-form—paced for
                  attention and on-brand frames.
                </p>
                <VisualReelsRow />
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
