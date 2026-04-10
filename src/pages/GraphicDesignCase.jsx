import { useRef, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { TbPlayerPlay } from "react-icons/tb";
import ProjectCaseHeader from "../components/project-detail/ProjectCaseHeader";
import { publicAsset } from "../utils/publicAsset";
import CustomCursor from "../utils/CursorAnimation";

const sectionBase =
  "rounded-[1.5rem] border border-foreground/10 bg-card p-6 sm:p-8 lg:p-10";

const VISUAL_REEL_SOURCES = [
  publicAsset("/assets/1.mp4"),
  publicAsset("/assets/2.mp4"),
  publicAsset("/assets/3.mp4"),
];

const CREATIVE_POST_ASSETS = [
  {
    src: publicAsset(`/assets/${encodeURIComponent("image 1.png")}`),
    alt: "Social media managers at 3 AM — creative post with 3D character and thought bubble",
  },
  {
    src: publicAsset(`/assets/${encodeURIComponent("image 2.png")}`),
    alt: "Movie-themed branding graphic with clapperboard and headline",
  },
  {
    src: publicAsset(`/assets/${encodeURIComponent("image 3.png")}`),
    alt: "Instagram vs reality comparison creative for client expectations",
  },
  {
    src: publicAsset(`/assets/${encodeURIComponent("image 4.png")}`),
    alt: "Instagram algorithm humorous dialogue creative post",
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
    src: publicAsset("/assets/brand-design-pramukh-masala.jpg"),
    alt: "Pramukh Masala product mockup — packaging labels and premium spice branding",
    width: 1022,
    height: 735,
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
    src: publicAsset("/assets/logo-rupiya-app.png"),
    alt: "rupiya.app logo — golden R icon and wordmark",
    outerClass: "min-w-0 flex-1",
    frameClass: "h-full overflow-hidden p-0",
    imgClass: "aspect-square w-full object-cover",
  },
  {
    src: publicAsset("/assets/logo-akshar-agro.png"),
    alt: "Akshar Agro logo — windmill, fields, and wheat with wordmark",
    outerClass: "min-w-0 flex-1",
    frameClass: "h-full overflow-hidden p-0",
    imgClass: "aspect-square w-full object-cover",
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

  return (
    <div
      className="mt-8 flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden"
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
  );
}

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
              src={publicAsset("/assets/graphic-design-project.gif")}
              alt="Graphic design work shown across tablet, phone, and laptop mockups"
              className="h-auto w-full object-cover"
              width={1200}
              height={675}
            />
          </div>

          <div className="mt-14 space-y-12 sm:mt-16 sm:space-y-16">
            <section id="brand-design" className="scroll-mt-28">
              <div className={sectionBase}>
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                  Brand Design
                </h2>
                <p className="mt-3 max-w-2xl text-muted sm:text-lg">
                  Visual systems, color, and typography built to stay consistent
                  across every touchpoint—from social to print.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
                  {BRAND_DESIGN_ASSETS.map((asset, i) => (
                    <div
                      key={`${asset.src}-${i}`}
                      className="min-w-0 overflow-hidden rounded-xl border border-foreground/10 bg-card shadow-[0_12px_40px_-20px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.45)]"
                    >
                      <img
                        src={asset.src}
                        alt={asset.alt}
                        className="aspect-[4/3] h-full w-full object-cover"
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

            <section id="creative-post" className="scroll-mt-28">
              <div className={sectionBase}>
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                  Creative Post
                </h2>
                <p className="mt-3 max-w-2xl text-muted sm:text-lg">
                  Social-first layouts and campaign frames—crafted to stop the
                  scroll while staying true to the brand voice.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
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

            <section id="logo-design" className="scroll-mt-28">
              <div className={sectionBase}>
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                  Logo Design
                </h2>
                <p className="mt-3 max-w-2xl text-muted sm:text-lg">
                  Marks and lockups that read clearly at any size and feel
                  unmistakably yours.
                </p>
                <div className="mt-8 flex flex-row flex-nowrap items-stretch gap-3 sm:gap-4">
                  {LOGO_DESIGN_ASSETS.map((logo, i) => (
                    <div
                      key={`${logo.src}-${i}`}
                      className={`flex min-h-0 min-w-0 flex-col overflow-hidden rounded-2xl border border-foreground/10 shadow-sm dark:shadow-none ${logo.outerClass} ${logo.frameClass}`}
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

            <section id="visual-reel" className="scroll-mt-28">
              <div className="rounded-[1.5rem] border border-foreground/10 bg-card p-6 sm:p-8 lg:p-10 dark:bg-black">
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
