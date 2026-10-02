import PropTypes from "prop-types";
import {
  FiBookmark,
  FiCalendar,
  FiCamera,
  FiClock,
  FiCloud,
  FiCompass,
  FiFilm,
  FiHeart,
  FiHome,
  FiImage,
  FiMail,
  FiMap,
  FiMessageCircle,
  FiMessageSquare,
  FiMoreHorizontal,
  FiMusic,
  FiPhone,
  FiPlusSquare,
  FiSearch,
  FiSend,
  FiSettings,
  FiUser,
} from "react-icons/fi";
import { publicAsset } from "../../utils/publicAsset";

/*
 * Mockups are drawn with CSS instead of photo templates, so they stay sharp at
 * any size and cost almost nothing to load. Every length is in `cqw` (percent
 * of the scene's width), which makes a whole scene scale like a single image.
 */

// `--k` lets a scene enlarge its contents on small screens without changing the layout.
const cq = (n) => `calc(var(--k, 1) * ${n}cqw)`;

const asset = (name) => publicAsset(`/assets/${name}`);

/** Phone body; `w` is the phone width as a percent of the scene width. */
function Phone({ w, rotate = 0, lift = 0, z = 0, overlap = 0, children }) {
  return (
    <div
      className="relative shrink-0"
      style={{
        width: cq(w),
        zIndex: z,
        marginLeft: overlap ? cq(-overlap) : undefined,
        transform: `translateY(${cq(-lift)}) rotate(${rotate}deg)`,
      }}
    >
      <div
        className="relative bg-zinc-900"
        style={{
          padding: cq(w * 0.035),
          borderRadius: cq(w * 0.165),
          boxShadow: `0 ${cq(w * 0.12)} ${cq(w * 0.25)} rgba(0,0,0,0.35), inset 0 0 0 ${cq(w * 0.008)} rgba(255,255,255,0.18)`,
        }}
      >
        <span
          aria-hidden
          className="absolute bg-zinc-800"
          style={{
            right: cq(-w * 0.012),
            top: "24%",
            width: cq(w * 0.012),
            height: "9%",
            borderRadius: cq(w * 0.01),
          }}
        />
        <div
          className="relative overflow-hidden bg-white"
          style={{ borderRadius: cq(w * 0.13), aspectRatio: "9 / 19.5" }}
        >
          {children}
          <span
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black"
            style={{
              top: cq(w * 0.03),
              width: cq(w * 0.3),
              height: cq(w * 0.085),
            }}
          />
        </div>
      </div>
    </div>
  );
}

Phone.propTypes = {
  w: PropTypes.number.isRequired,
  rotate: PropTypes.number,
  lift: PropTypes.number,
  z: PropTypes.number,
  overlap: PropTypes.number,
  children: PropTypes.node,
};

function StatusBar({ w, dark = false }) {
  const color = dark ? "text-white" : "text-zinc-900";
  return (
    <div
      className={`flex items-center justify-between font-semibold ${color}`}
      style={{
        height: cq(w * 0.13),
        padding: `0 ${cq(w * 0.09)}`,
        fontSize: cq(w * 0.042),
      }}
    >
      <span>9:41</span>
      <span className="flex items-center" style={{ gap: cq(w * 0.015) }}>
        {[0.35, 0.55, 0.75, 1].map((h) => (
          <span
            key={h}
            className="block rounded-[1px] bg-current"
            style={{ width: cq(w * 0.012), height: cq(w * 0.03 * h) }}
          />
        ))}
        <span
          className="ml-[2px] block rounded-[2px] border border-current"
          style={{ width: cq(w * 0.06), height: cq(w * 0.03) }}
        />
      </span>
    </div>
  );
}

StatusBar.propTypes = { w: PropTypes.number.isRequired, dark: PropTypes.bool };

function Avatar({ w, initial, color, size = 0.085 }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full font-bold text-white"
      style={{
        width: cq(w * size),
        height: cq(w * size),
        fontSize: cq(w * size * 0.5),
        background: color,
        boxShadow: `0 0 0 ${cq(w * 0.006)} #fff, 0 0 0 ${cq(w * 0.014)} #e1306c`,
      }}
    >
      {initial}
    </span>
  );
}

Avatar.propTypes = {
  w: PropTypes.number.isRequired,
  initial: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.number,
};

/** Instagram-style feed post inside a phone. */
function FeedPost({
  w,
  src,
  alt,
  handle,
  initial,
  color,
  caption,
  slides = 0,
}) {
  const icon = { width: cq(w * 0.07), height: cq(w * 0.07) };
  return (
    <div className="flex h-full flex-col bg-white text-zinc-900">
      <StatusBar w={w} />
      <div
        className="flex items-center"
        style={{
          gap: cq(w * 0.03),
          padding: `${cq(w * 0.025)} ${cq(w * 0.04)}`,
          fontSize: cq(w * 0.04),
        }}
      >
        <Avatar w={w} initial={initial} color={color} />
        <span className="min-w-0 flex-1 truncate font-semibold">{handle}</span>
        <FiMoreHorizontal style={icon} aria-hidden />
      </div>
      <div className="relative">
        <img
          src={src}
          alt={alt}
          className="block aspect-[4/5] w-full object-cover"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        {slides > 1 && (
          <span
            className="absolute rounded-full bg-black/70 font-semibold text-white"
            style={{
              top: cq(w * 0.035),
              right: cq(w * 0.035),
              padding: `${cq(w * 0.008)} ${cq(w * 0.025)}`,
              fontSize: cq(w * 0.034),
            }}
          >
            1/{slides}
          </span>
        )}
      </div>
      <div
        className="relative flex items-center"
        style={{
          gap: cq(w * 0.04),
          padding: `${cq(w * 0.03)} ${cq(w * 0.04)}`,
        }}
      >
        <FiHeart style={icon} aria-hidden />
        <FiMessageCircle style={icon} aria-hidden />
        <FiSend style={icon} aria-hidden />
        {slides > 1 && (
          <span
            className="absolute left-1/2 flex -translate-x-1/2"
            style={{ gap: cq(w * 0.012) }}
          >
            {Array.from({ length: Math.min(slides, 6) }, (_, i) => (
              <span
                key={i}
                className={`block rounded-full ${i === 0 ? "bg-sky-500" : "bg-zinc-300"}`}
                style={{ width: cq(w * 0.016), height: cq(w * 0.016) }}
              />
            ))}
          </span>
        )}
        <FiBookmark style={{ ...icon, marginLeft: "auto" }} aria-hidden />
      </div>
      <div
        style={{
          padding: `0 ${cq(w * 0.04)}`,
          fontSize: cq(w * 0.036),
          lineHeight: 1.35,
        }}
      >
        <p className="font-semibold">2,481 likes</p>
        <p className="truncate">
          <span className="font-semibold">{handle}</span>{" "}
          <span className="text-zinc-600">{caption}</span>
        </p>
        <span
          className="mt-[4%] block rounded-full bg-zinc-200"
          style={{ height: cq(w * 0.016), width: "55%" }}
        />
      </div>
    </div>
  );
}

FeedPost.propTypes = {
  w: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  handle: PropTypes.string.isRequired,
  initial: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  slides: PropTypes.number,
};

/** Instagram-style story inside a phone. */
function StoryScreen({ w, src, alt, handle, initial, color, index, total }) {
  return (
    <div className="flex h-full flex-col bg-black">
      <StatusBar w={w} dark />
      <div>
        <div style={{ padding: `0 ${cq(w * 0.03)} ${cq(w * 0.02)}` }}>
          <div className="flex" style={{ gap: cq(w * 0.01) }}>
            {Array.from({ length: total }, (_, i) => (
              <span
                key={i}
                className={`block flex-1 rounded-full ${i <= index ? "bg-white" : "bg-white/40"}`}
                style={{ height: cq(w * 0.008) }}
              />
            ))}
          </div>
          <div
            className="flex items-center font-semibold text-white"
            style={{
              gap: cq(w * 0.025),
              fontSize: cq(w * 0.034),
              marginTop: cq(w * 0.02),
            }}
          >
            <Avatar w={w} initial={initial} color={color} size={0.06} />
            <span className="truncate">{handle}</span>
            <span className="font-normal text-white/70">2h</span>
          </div>
        </div>
        <img
          src={src}
          alt={alt}
          className="block aspect-[9/16] w-full object-cover"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>
      <div
        className="mt-auto flex items-center"
        style={{
          gap: cq(w * 0.035),
          padding: `0 ${cq(w * 0.04)} ${cq(w * 0.04)}`,
        }}
      >
        <span
          className="flex-1 rounded-full border border-white/50 text-white/80"
          style={{
            padding: `${cq(w * 0.022)} ${cq(w * 0.04)}`,
            fontSize: cq(w * 0.034),
          }}
        >
          Send message
        </span>
        <FiHeart
          className="text-white"
          style={{ width: cq(w * 0.065), height: cq(w * 0.065) }}
          aria-hidden
        />
        <FiSend
          className="text-white"
          style={{ width: cq(w * 0.065), height: cq(w * 0.065) }}
          aria-hidden
        />
      </div>
    </div>
  );
}

StoryScreen.propTypes = {
  w: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  handle: PropTypes.string.isRequired,
  initial: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

/** Poster in a thin black frame with a white mat, hung on the scene wall. */
function FramedPoster({
  w,
  src,
  alt,
  ratio,
  rotate = 0,
  lift = 0,
  z = 0,
  frame = "#18181b",
}) {
  return (
    <div
      className="relative shrink-0"
      style={{
        width: cq(w),
        background: frame,
        zIndex: z,
        padding: cq(w * 0.035),
        transform: `translateY(${cq(-lift)}) rotate(${rotate}deg)`,
        boxShadow: `0 ${cq(w * 0.06)} ${cq(w * 0.16)} rgba(0,0,0,0.35), 0 ${cq(w * 0.01)} ${cq(w * 0.02)} rgba(0,0,0,0.25)`,
      }}
    >
      <div className="bg-white" style={{ padding: cq(w * 0.06) }}>
        <img
          src={src}
          alt={alt}
          className="block w-full object-cover shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]"
          style={{ aspectRatio: ratio }}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>
    </div>
  );
}

FramedPoster.propTypes = {
  w: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  ratio: PropTypes.string.isRequired,
  rotate: PropTypes.number,
  lift: PropTypes.number,
  z: PropTypes.number,
  frame: PropTypes.string,
};

/** Floating carousel slide card used behind a phone. */
function SlideCard({ w, src, alt, rotate, overlap = 0, lift = 0, z = 0 }) {
  return (
    <img
      src={src}
      alt={alt}
      className="block aspect-[4/5] shrink-0 object-cover"
      style={{
        width: cq(w),
        zIndex: z,
        marginLeft: overlap ? cq(-overlap) : undefined,
        borderRadius: cq(w * 0.04),
        transform: `translateY(${cq(-lift)}) rotate(${rotate}deg)`,
        boxShadow: `0 ${cq(w * 0.08)} ${cq(w * 0.2)} rgba(0,0,0,0.35)`,
      }}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
}

SlideCard.propTypes = {
  w: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  rotate: PropTypes.number.isRequired,
  overlap: PropTypes.number,
  lift: PropTypes.number,
  z: PropTypes.number,
};

/** Roadside billboard: printed board in a steel frame on two posts with lamps. */
function Billboard({ w, src, alt, ratio, board = "#18181b" }) {
  return (
    <div className="relative" style={{ width: cq(w) }}>
      <div
        className="relative flex justify-around"
        style={{ height: cq(w * 0.035), padding: `0 ${cq(w * 0.12)}` }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="relative block"
            style={{ width: cq(w * 0.06) }}
          >
            <span
              className="absolute left-1/2 top-0 -translate-x-1/2 bg-zinc-700"
              style={{ width: cq(w * 0.004), height: "100%" }}
            />
            <span
              className="absolute left-0 top-0 block rounded-sm bg-zinc-600"
              style={{ width: "100%", height: cq(w * 0.012) }}
            />
          </span>
        ))}
      </div>
      <div
        className="relative bg-zinc-800"
        style={{
          padding: cq(w * 0.008),
          borderRadius: cq(w * 0.006),
          boxShadow: `0 ${cq(w * 0.02)} ${cq(w * 0.05)} rgba(0,0,0,0.35)`,
        }}
      >
        <div style={{ background: board, borderRadius: cq(w * 0.004) }}>
          <img
            src={src}
            alt={alt}
            className="block w-full"
            style={{ aspectRatio: ratio, borderRadius: cq(w * 0.028) }}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.12), transparent 35%, transparent 70%, rgba(0,0,0,0.18))",
          }}
        />
      </div>
      <div
        className="mx-auto bg-zinc-700"
        style={{ width: "86%", height: cq(w * 0.012) }}
      />
      <div
        className="flex justify-between"
        style={{ padding: `0 ${cq(w * 0.22)}` }}
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            className="block"
            style={{
              width: cq(w * 0.025),
              height: cq(w * 0.2),
              background:
                "linear-gradient(90deg, #3f3f46, #71717a 45%, #3f3f46)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

Billboard.propTypes = {
  w: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  ratio: PropTypes.string.isRequired,
  board: PropTypes.string,
};

/** Printed card lying on a surface; `x`/`y` are its top-left in scene units. */
function Card({ w, src, alt, ratio, x, y, rotate = 0, z = 0 }) {
  return (
    <img
      src={src}
      alt={alt}
      className="absolute block"
      style={{
        width: cq(w),
        left: cq(x),
        top: cq(y),
        zIndex: z,
        aspectRatio: ratio,
        borderRadius: cq(w * 0.026),
        transform: `rotate(${rotate}deg)`,
        boxShadow: `0 ${cq(w * 0.03)} ${cq(w * 0.08)} rgba(0,0,0,0.45), 0 ${cq(w * 0.004)} ${cq(w * 0.01)} rgba(0,0,0,0.35)`,
      }}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
}

Card.propTypes = {
  w: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  ratio: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  rotate: PropTypes.number,
  z: PropTypes.number,
};

/** Open magazine: two pages meeting at a shaded spine, slightly tilted back. */
function MagazineSpread({ w, left, right, leftAlt, rightAlt }) {
  const page = (src, alt, side) => (
    <div className="relative w-1/2 overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="block aspect-[4/5] w-full object-cover"
        loading="lazy"
        decoding="async"
        draggable={false}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            side === "left"
              ? "linear-gradient(90deg, rgba(255,255,255,0.06) 0%, transparent 70%, rgba(0,0,0,0.28) 100%)"
              : "linear-gradient(270deg, rgba(255,255,255,0.06) 0%, transparent 70%, rgba(0,0,0,0.3) 100%)",
        }}
      />
    </div>
  );
  return (
    <div
      className="relative"
      style={{ width: cq(w), transform: "perspective(1400px) rotateX(16deg)" }}
    >
      <div
        className="flex bg-white"
        style={{
          padding: cq(w * 0.008),
          boxShadow: `0 ${cq(w * 0.05)} ${cq(w * 0.1)} rgba(0,0,0,0.35)`,
        }}
      >
        {page(left, leftAlt, "left")}
        {page(right, rightAlt, "right")}
      </div>
      <span
        aria-hidden
        className="absolute inset-y-0 left-1/2 -translate-x-1/2"
        style={{
          width: cq(w * 0.03),
          background:
            "linear-gradient(90deg, transparent, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.25) 55%, transparent)",
        }}
      />
    </div>
  );
}

MagazineSpread.propTypes = {
  w: PropTypes.number.isRequired,
  left: PropTypes.string.isRequired,
  right: PropTypes.string.isRequired,
  leftAlt: PropTypes.string.isRequired,
  rightAlt: PropTypes.string.isRequired,
};

/** Instagram Reels screen: video frame with the side action rail and bottom nav. */
function ReelScreen({ w, src, alt, handle, initial, color, caption }) {
  const icon = { width: cq(w * 0.075), height: cq(w * 0.075) };
  const count = { fontSize: cq(w * 0.03) };
  return (
    <div className="flex h-full flex-col bg-black text-white">
      <StatusBar w={w} dark />
      <div className="relative">
        <img
          src={src}
          alt={alt}
          className="block aspect-[9/16] w-full object-cover"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.35), transparent 18%, transparent 62%, rgba(0,0,0,0.65))",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 flex items-center justify-between font-bold"
          style={{ padding: cq(w * 0.04), fontSize: cq(w * 0.055) }}
        >
          <span>Reels</span>
          <FiCamera style={icon} aria-hidden />
        </div>
        <div
          className="absolute flex flex-col items-center"
          style={{
            right: cq(w * 0.03),
            bottom: cq(w * 0.2),
            gap: cq(w * 0.04),
          }}
        >
          {[
            [FiHeart, "12.4K"],
            [FiMessageCircle, "318"],
            [FiSend, "1.1K"],
          ].map(([Icon, n]) => (
            <span key={n} className="flex flex-col items-center">
              <Icon style={icon} aria-hidden />
              <span style={count}>{n}</span>
            </span>
          ))}
          <FiMoreHorizontal style={icon} aria-hidden />
        </div>
        <div
          className="absolute"
          style={{
            left: cq(w * 0.04),
            right: cq(w * 0.18),
            bottom: cq(w * 0.04),
            fontSize: cq(w * 0.034),
            lineHeight: 1.35,
          }}
        >
          <div
            className="flex items-center font-semibold"
            style={{ gap: cq(w * 0.025) }}
          >
            <Avatar w={w} initial={initial} color={color} size={0.065} />
            <span className="truncate">{handle}</span>
            <span
              className="rounded border border-white/70"
              style={{ padding: `0 ${cq(w * 0.015)}`, fontSize: cq(w * 0.028) }}
            >
              Follow
            </span>
          </div>
          <p className="mt-[3%] truncate text-white/90">{caption}</p>
          <p
            className="flex items-center truncate text-white/80"
            style={{ gap: cq(w * 0.015) }}
          >
            <FiMusic
              style={{ width: cq(w * 0.03), height: cq(w * 0.03) }}
              aria-hidden
            />
            Original audio
          </p>
        </div>
      </div>
      <div
        className="mt-auto flex items-center justify-around border-t border-white/10"
        style={{ padding: `${cq(w * 0.03)} 0 ${cq(w * 0.05)}` }}
      >
        {[FiHome, FiSearch, FiPlusSquare, FiFilm, FiUser].map((Icon, i) => (
          <Icon key={i} style={icon} aria-hidden />
        ))}
      </div>
    </div>
  );
}

ReelScreen.propTypes = {
  w: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  handle: PropTypes.string.isRequired,
  initial: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};

/** Roll-up banner stand: print hanging from a top rail into a weighted base. */
function RollUp({ w, src, alt }) {
  return (
    <div className="relative shrink-0" style={{ width: cq(w) }}>
      <div
        className="mx-auto rounded-full bg-zinc-300"
        style={{ width: "104%", marginLeft: "-2%", height: cq(w * 0.035) }}
      />
      <img
        src={src}
        alt={alt}
        className="block aspect-[9/16] w-full object-cover"
        style={{
          boxShadow: `${cq(w * 0.04)} ${cq(w * 0.04)} ${cq(w * 0.1)} rgba(0,0,0,0.3)`,
        }}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
      <div
        className="relative"
        style={{
          width: "112%",
          marginLeft: "-6%",
          height: cq(w * 0.09),
          borderRadius: cq(w * 0.03),
          background: "linear-gradient(180deg, #e4e4e7, #a1a1aa)",
          boxShadow: `0 ${cq(w * 0.03)} ${cq(w * 0.06)} rgba(0,0,0,0.35)`,
        }}
      />
    </div>
  );
}

RollUp.propTypes = {
  w: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

const HOME_APPS = [
  [FiPhone, "#22c55e"],
  [FiMessageSquare, "#16a34a"],
  [FiMail, "#3b82f6"],
  [FiCamera, "#52525b"],
  [FiImage, "#f59e0b"],
  [FiCalendar, "#ef4444"],
  [FiMap, "#10b981"],
  [FiMusic, "#ec4899"],
  [FiCloud, "#0ea5e9"],
  [FiClock, "#18181b"],
  [FiCompass, "#6366f1"],
  [FiSettings, "#71717a"],
];

/** Phone home screen with the brand app icon among generic apps. */
function HomeScreen({ w, icon, label, wallpaper }) {
  const size = w * 0.17;
  const tile = (key, content, bg, name, highlight = false) => (
    <span
      key={key}
      className="flex flex-col items-center"
      style={{ gap: cq(w * 0.012) }}
    >
      <span
        className="flex items-center justify-center overflow-hidden"
        style={{
          width: cq(size),
          height: cq(size),
          borderRadius: cq(size * 0.24),
          background: bg,
          boxShadow: highlight
            ? `0 0 0 ${cq(w * 0.008)} rgba(255,255,255,0.9), 0 ${cq(w * 0.02)} ${cq(w * 0.05)} rgba(0,0,0,0.3)`
            : `0 ${cq(w * 0.01)} ${cq(w * 0.03)} rgba(0,0,0,0.18)`,
        }}
      >
        {content}
      </span>
      <span
        className="max-w-full truncate text-white"
        style={{
          fontSize: cq(w * 0.03),
          textShadow: "0 1px 2px rgba(0,0,0,0.4)",
        }}
      >
        {name}
      </span>
    </span>
  );
  const glyph = (Icon) => (
    <Icon
      className="text-white"
      style={{ width: cq(size * 0.5), height: cq(size * 0.5) }}
      aria-hidden
    />
  );
  const names = [
    "Phone",
    "Messages",
    "Mail",
    "Camera",
    "Photos",
    "Calendar",
    "Maps",
    "Music",
    "Weather",
    "Clock",
    "Explore",
    "Settings",
  ];
  return (
    <div className="flex h-full flex-col" style={{ background: wallpaper }}>
      <StatusBar w={w} dark />
      <div
        className="grid grid-cols-4"
        style={{
          gap: `${cq(w * 0.05)} ${cq(w * 0.03)}`,
          padding: `${cq(w * 0.06)} ${cq(w * 0.06)} 0`,
        }}
      >
        {HOME_APPS.slice(0, 5).map(([Icon, bg], i) =>
          tile(i, glyph(Icon), bg, names[i]),
        )}
        {tile(
          "brand",
          <img
            src={icon}
            alt=""
            className="h-full w-full object-cover"
            draggable={false}
          />,
          "#fff",
          label,
          true,
        )}
        {HOME_APPS.slice(5).map(([Icon, bg], i) =>
          tile(i + 5, glyph(Icon), bg, names[i + 5]),
        )}
      </div>
      <div
        className="mx-auto mt-auto flex justify-around bg-white/25 backdrop-blur"
        style={{
          width: "88%",
          marginBottom: cq(w * 0.05),
          padding: cq(w * 0.03),
          borderRadius: cq(w * 0.07),
        }}
      >
        {HOME_APPS.slice(0, 4).map(([Icon, bg], i) => (
          <span
            key={i}
            className="flex items-center justify-center"
            style={{
              width: cq(size),
              height: cq(size),
              borderRadius: cq(size * 0.24),
              background: bg,
            }}
          >
            {glyph(Icon)}
          </span>
        ))}
      </div>
    </div>
  );
}

HomeScreen.propTypes = {
  w: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  wallpaper: PropTypes.string.isRequired,
};

/** App launch screen with the full logo centered on white. */
function SplashScreen({ w, logo, alt, tagline }) {
  return (
    <div className="flex h-full flex-col items-center bg-white">
      <StatusBar w={w} />
      <div
        className="flex flex-1 flex-col items-center justify-center"
        style={{ gap: cq(w * 0.06) }}
      >
        <img
          src={logo}
          alt={alt}
          className="block mix-blend-multiply"
          style={{ width: cq(w * 0.62) }}
          draggable={false}
        />
        <span
          className="block overflow-hidden rounded-full bg-zinc-200"
          style={{ width: cq(w * 0.3), height: cq(w * 0.012) }}
        >
          <span className="block h-full w-3/5 rounded-full bg-green-600" />
        </span>
      </div>
      <p
        className="text-zinc-500"
        style={{ fontSize: cq(w * 0.03), paddingBottom: cq(w * 0.08) }}
      >
        {tagline}
      </p>
    </div>
  );
}

SplashScreen.propTypes = {
  w: PropTypes.number.isRequired,
  logo: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
};

function Scene({ title, caption, background, wide = false, children }) {
  return (
    <figure className={`min-w-0 ${wide ? "sm:col-span-2" : ""}`}>
      <div
        className={`relative flex items-center justify-center overflow-hidden rounded-xl border border-foreground/10 ${wide ? "aspect-[4/3] [--k:1.3] sm:aspect-[16/9] sm:[--k:1]" : "aspect-[4/3]"}`}
        style={{ containerType: "inline-size", background }}
      >
        {children}
      </div>
      <figcaption className="mt-3 px-0.5">
        <p className="text-base font-semibold text-foreground sm:text-lg">
          {title}
        </p>
        <p className="mt-0.5 text-sm text-muted">{caption}</p>
      </figcaption>
    </figure>
  );
}

Scene.propTypes = {
  title: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  wide: PropTypes.bool,
  children: PropTypes.node,
};

const SHREEJI = {
  handle: "shreejielevators",
  initial: "S",
  color: "#D6372A",
  caption: "Excellence in every lift. Trusted since 1976.",
};
const GREENSENSE = {
  handle: "greensense",
  initial: "G",
  color: "#2f7d32",
  caption: "Small device. Big impact. 🌿",
};
const UNIVERSE = {
  handle: "theuniversebylaxmi",
  initial: "U",
  color: "#0b1f5c",
};
const TBO = {
  handle: "traveltekpro",
  initial: "T",
  color: "#1f3a8a",
  caption: "How OTA platforms use TBO ✈️ Swipe →",
};
const EDRA = {
  handle: "edra",
  initial: "E",
  color: "#6b1d2a",
  caption: "The icon returns. A nest, not a sofa.",
};
const SVITCH = {
  handle: "svitch.bike",
  initial: "S",
  color: "#a8862f",
  caption: "Unleash the beast. Raw power, zero emissions ⚡",
};
const ELITE = {
  handle: "elitedigitalmarketing",
  initial: "E",
  color: "#f26a1b",
  caption: "Unlock your digital potential 🚀",
};
const AMBLI = {
  handle: "realestate",
  initial: "R",
  color: "#2f6db5",
  caption: "Own your dream office at Ambli. From ₹53 lacs.",
};

export default function MockupScenes() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-6 sm:mt-8 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-8">
      <Scene
        wide
        title="Shreeji Elevator Services"
        caption="Social media kit — three launch posts on Instagram."
        background="radial-gradient(120% 90% at 50% 110%, rgba(214,55,42,0.28), transparent 60%), linear-gradient(160deg, #f4f1ee 0%, #e4dedb 100%)"
      >
        <Phone w={21} rotate={-9} lift={-2}>
          <FeedPost
            w={21}
            {...SHREEJI}
            src={asset("post-shreeji-future-of-elevators.webp")}
            alt="Shreeji 'The future of Elevators' post on a phone"
          />
        </Phone>
        <Phone w={23} z={10} overlap={3}>
          <FeedPost
            w={23}
            {...SHREEJI}
            src={asset("post-shreeji-red.webp")}
            alt="Shreeji 'Excellence in Every Lift' post on a phone"
          />
        </Phone>
        <Phone w={21} rotate={9} lift={-2} overlap={3}>
          <FeedPost
            w={21}
            {...SHREEJI}
            src={asset("post-shreeji-grey.webp")}
            alt="Shreeji grey edition post on a phone"
          />
        </Phone>
      </Scene>

      <Scene
        title="GreenSense"
        caption="Product launch posts in both logo versions."
        background="radial-gradient(90% 70% at 70% 20%, rgba(124,179,66,0.35), transparent 60%), linear-gradient(160deg, #f1f6ee 0%, #dfeadb 100%)"
      >
        <Phone w={31} rotate={-6} lift={-1}>
          <FeedPost
            w={31}
            {...GREENSENSE}
            src={asset("post-greensense-live-smart-g.webp")}
            alt="GreenSense post with G logo on a phone"
          />
        </Phone>
        <Phone w={31} rotate={6} lift={1} z={10} overlap={5}>
          <FeedPost
            w={31}
            {...GREENSENSE}
            src={asset("post-greensense-live-smart-bulb.webp")}
            alt="GreenSense post with light-bulb logo on a phone"
          />
        </Phone>
      </Scene>

      <Scene
        title="Ambli Office Spaces"
        caption="Print poster and its social post."
        background="linear-gradient(180deg, #eef1f5 0%, #e3e8ef 72%, #cfd6df 72%, #c4ccd6 100%)"
      >
        <FramedPoster
          w={38}
          lift={4}
          src={asset("mockup-ambli-poster.webp")}
          alt="Ambli office poster in a frame"
          ratio="1046 / 1478"
        />
        <Phone w={24} z={10} overlap={8} lift={-8} rotate={4}>
          <FeedPost
            w={24}
            {...AMBLI}
            src={asset("post-ambli-office.webp")}
            alt="Ambli office post on a phone"
          />
        </Phone>
      </Scene>

      <Scene
        wide
        title="The Universe by Laxmi"
        caption="Instagram story series — opening, family, and contact frames."
        background="radial-gradient(70% 60% at 50% 0%, rgba(212,175,55,0.28), transparent 65%), linear-gradient(170deg, #0d2160 0%, #081540 100%)"
      >
        {[
          { n: 1, i: 0, rotate: -6, lift: -1.5 },
          { n: 4, i: 3, rotate: 0, lift: 1.5, z: 10 },
          { n: 6, i: 5, rotate: 6, lift: -1.5 },
        ].map(({ n, i, rotate, lift, z }, k) => (
          <Phone
            key={n}
            w={19}
            rotate={rotate}
            lift={lift}
            z={z}
            overlap={k ? 1 : 0}
          >
            <StoryScreen
              w={19}
              {...UNIVERSE}
              src={asset(`carousel-universe-${n}.webp`)}
              alt={`The Universe story frame ${n} on a phone`}
              index={i}
              total={6}
            />
          </Phone>
        ))}
      </Scene>

      <Scene
        title="TravelTekPro × TBO"
        caption="Six-slide carousel post, ready to swipe."
        background="linear-gradient(160deg, #1b2a63 0%, #5a3f8a 55%, #e07a4a 100%)"
      >
        <Phone w={30} z={10} lift={-1}>
          <FeedPost
            w={30}
            {...TBO}
            slides={6}
            src={asset("carousel-tbo-1.webp")}
            alt="TravelTekPro carousel post on a phone"
          />
        </Phone>
        <SlideCard
          w={22}
          rotate={6}
          overlap={4}
          lift={4}
          z={5}
          src={asset("carousel-tbo-2.webp")}
          alt="TravelTekPro carousel slide 2"
        />
        <SlideCard
          w={20}
          rotate={12}
          overlap={10}
          lift={-6}
          src={asset("carousel-tbo-4.webp")}
          alt="TravelTekPro carousel slide 4"
        />
      </Scene>

      <Scene
        title="EDRA — Boa"
        caption="Launch poster on the wall, carousel cover in the feed."
        background="linear-gradient(180deg, #f3ede5 0%, #ebe3d8 70%, #d9cbb8 70%, #cdbda7 100%)"
      >
        <FramedPoster
          w={36}
          lift={4}
          src={asset("post-edra-boa.webp")}
          alt="EDRA Boa poster in a frame"
          ratio="4 / 5"
        />
        <Phone w={24} z={10} overlap={7} lift={-8} rotate={-4}>
          <FeedPost
            w={24}
            {...EDRA}
            slides={5}
            src={asset("carousel-edra-1.webp")}
            alt="EDRA Boa carousel cover on a phone"
          />
        </Phone>
      </Scene>

      <Scene
        wide
        title="Svitch CSR 762"
        caption="A4 launch poster and its social post."
        background="radial-gradient(60% 70% at 35% 60%, rgba(200,40,40,0.22), transparent 65%), linear-gradient(160deg, #16161b 0%, #0b0b0e 100%)"
      >
        <FramedPoster
          w={31}
          lift={1}
          frame="linear-gradient(135deg, #d9c08a, #8a6d33 55%, #c9ad74)"
          src={asset("mockup-svitch-poster.webp")}
          alt="Svitch CSR 762 poster in a frame"
          ratio="953 / 1350"
        />
        <Phone w={23} z={10} overlap={-6} rotate={5} lift={-1}>
          <FeedPost
            w={23}
            {...SVITCH}
            src={asset("post-svitch-csr-762.webp")}
            alt="Svitch CSR 762 post on a phone"
          />
        </Phone>
      </Scene>

      <Scene
        wide
        title="Shreeji Elevator Services"
        caption="Roadside billboard — 50 years, still rising."
        background="linear-gradient(180deg, #7fb3e6 0%, #b9d6f2 48%, #f1e6d6 78%, #9aa3ab 78%, #7c858e 100%)"
      >
        <div className="absolute inset-x-0 bottom-[22%] flex justify-center">
          <Billboard
            w={66}
            board="#D6372A"
            src={asset("mockup-shreeji-billboard.webp")}
            alt="Shreeji Elevator Services billboard on a roadside hoarding"
            ratio="2000 / 678"
          />
        </div>
      </Scene>

      <Scene
        title="Shreeji Elevator Services"
        caption="Business card — front and back."
        background="radial-gradient(90% 80% at 30% 20%, #4a4a52 0%, #2a2a30 55%, #1c1c21 100%)"
      >
        <Card
          w={50}
          x={8}
          y={11}
          rotate={-10}
          src={asset("mockup-shreeji-card-back.webp")}
          alt="Back of the Shreeji business card"
          ratio="1200 / 688"
        />
        <Card
          w={50}
          x={40}
          y={34}
          rotate={7}
          z={10}
          src={asset("mockup-shreeji-card-front.webp")}
          alt="Front of the Shreeji business card"
          ratio="1200 / 686"
        />
      </Scene>

      <Scene
        title="EDRA — Boa"
        caption="Carousel story printed as a magazine spread."
        background="radial-gradient(80% 70% at 50% 35%, #f6f1ea 0%, #e2d7c8 70%, #cdbfac 100%)"
      >
        <MagazineSpread
          w={76}
          left={asset("carousel-edra-2.webp")}
          right={asset("carousel-edra-3.webp")}
          leftAlt="EDRA Boa story page in a magazine"
          rightAlt="EDRA Boa craft page in a magazine"
        />
      </Scene>

      <Scene
        wide
        title="Elite Digital Marketing"
        caption="Short-form reels on Instagram."
        background="radial-gradient(70% 70% at 50% 100%, rgba(242,106,27,0.35), transparent 65%), linear-gradient(160deg, #1a1a1f 0%, #0c0c0f 100%)"
      >
        {[
          { n: 1, rotate: -6, lift: -1.5 },
          { n: 2, rotate: 0, lift: 1.5, z: 10 },
          { n: 3, rotate: 6, lift: -1.5 },
        ].map(({ n, rotate, lift, z }, k) => (
          <Phone
            key={n}
            w={19}
            rotate={rotate}
            lift={lift}
            z={z}
            overlap={k ? 1 : 0}
          >
            <ReelScreen
              w={19}
              {...ELITE}
              src={asset(`mockup-reel-${n}.webp`)}
              alt={`Elite Digital Marketing reel ${n} on a phone`}
            />
          </Phone>
        ))}
      </Scene>

      <Scene
        title="The Universe by Laxmi"
        caption="Story frames printed as roll-up banners."
        background="linear-gradient(180deg, #e9ebf0 0%, #dfe2e8 70%, #b9bec8 70%, #a9afba 100%)"
      >
        <div
          className="absolute inset-x-0 flex items-end justify-center"
          style={{ bottom: "13%", gap: cq(5) }}
        >
          <RollUp
            w={19}
            src={asset("carousel-universe-1.webp")}
            alt="The Universe roll-up banner — opening frame"
          />
          <RollUp
            w={21}
            src={asset("carousel-universe-4.webp")}
            alt="The Universe roll-up banner — family frame"
          />
          <RollUp
            w={19}
            src={asset("carousel-universe-6.webp")}
            alt="The Universe roll-up banner — contact frame"
          />
        </div>
      </Scene>

      <Scene
        title="GreenSense"
        caption="Logo as an app icon and launch screen."
        background="radial-gradient(90% 70% at 30% 10%, rgba(124,179,66,0.35), transparent 60%), linear-gradient(160deg, #eef5ea 0%, #d6e6d0 100%)"
      >
        <Phone w={30} rotate={-5} lift={-1}>
          <HomeScreen
            w={30}
            icon={asset("mockup-greensense-app-icon.webp")}
            label="GreenSense"
            wallpaper="linear-gradient(170deg, #1f5e2a 0%, #3f8f3a 45%, #9ccc65 100%)"
          />
        </Phone>
        <Phone w={30} rotate={5} lift={1} z={10} overlap={-4}>
          <SplashScreen
            w={30}
            logo={asset("logo-green-sense-g.webp")}
            alt="GreenSense launch screen with the G logo"
            tagline="Smart living. Sustainable future."
          />
        </Phone>
      </Scene>
    </div>
  );
}
