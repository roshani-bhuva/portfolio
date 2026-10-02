import { publicAsset } from "../utils/publicAsset";

/* Design portfolio content shown in the home page Design section. */

export const VISUAL_REEL_SOURCES = [
  publicAsset("/assets/1.mp4"),
  publicAsset("/assets/2.mp4"),
  publicAsset("/assets/3.mp4"),
];

export const CREATIVE_POST_ASSETS = [
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

export const BRAND_DESIGN_ASSETS = [
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

export const LOGO_DESIGN_ASSETS = [
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

export const CAROUSEL_SETS = [
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
