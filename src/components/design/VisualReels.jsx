import { useRef, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { MdSwipeRight } from "react-icons/md";
import { TbPlayerPlay } from "react-icons/tb";
import { VISUAL_REEL_SOURCES } from "../../data/designWork";
import { RBLoader } from "./RBLoader";

const PLAY_TONES = {
  orange: {
    button: "focus-visible:outline-orange-500",
    badge:
      "border-orange-500/80 text-orange-600 shadow-[0_0_28px_rgba(249,115,22,0.35)] dark:text-orange-500 dark:shadow-[0_0_36px_rgba(249,115,22,0.45)]",
  },
  accent: {
    button: "focus-visible:outline-accent",
    badge: "border-accent/80 text-accent shadow-glow",
  },
};

/** Timestamp (seconds) used as the idle thumbnail; playback always starts at 0. */
const THUMB_AT_SEC = 2;

function previewTime(el) {
  if (!el || !Number.isFinite(el.duration) || el.duration <= 0) return 0;
  return Math.min(THUMB_AT_SEC, Math.max(0, el.duration - 0.05));
}

function ReelVideo({ videoRef, src, label, onPlayPeer, tone = "orange" }) {
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
      <RBLoader visible={!thumbReady} className="z-20" />
      {!playing && (
        <button
          type="button"
          disabled={!thumbReady}
          onClick={(e) => {
            e.stopPropagation();
            toggle();
          }}
          className={`absolute inset-0 z-10 flex items-center justify-center bg-foreground/10 transition hover:bg-foreground/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${PLAY_TONES[tone].button} disabled:cursor-wait disabled:opacity-70 dark:bg-black/25 dark:hover:bg-black/35`}
          aria-label={`Play ${label}`}
        >
          <span className={`flex h-16 w-16 items-center justify-center rounded-full border-2 bg-white/85 backdrop-blur-sm dark:bg-black/70 sm:h-[4.5rem] sm:w-[4.5rem] ${PLAY_TONES[tone].badge}`}>
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
  tone: PropTypes.oneOf(["orange", "accent"]),
};

function VisualReelsRow({ tone = "orange" }) {
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
              tone={tone}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

VisualReelsRow.propTypes = {
  tone: PropTypes.oneOf(["orange", "accent"]),
};

export default VisualReelsRow;
