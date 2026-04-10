import PropTypes from "prop-types";
import { publicAsset } from "../utils/publicAsset";

/**
 * Shared hero/about portrait — same asset and max dimensions everywhere.
 */
export const portraitImageClassName =
  "h-auto w-full max-h-[min(51svh,397px)] object-contain object-center contrast-[1.02] sm:max-h-[min(60svh,506px)] lg:max-h-[min(67svh,635px)] xl:max-h-[min(69svh,688px)]";

/** About section: fixed-height frame + cover crop trims top/bottom so the card stays shorter. */
const aboutCropFrame =
  "relative w-full min-w-0 overflow-hidden rounded-xl " +
  "h-[min(30svh,188px)] sm:h-[min(36svh,240px)] lg:h-[min(40svh,260px)] xl:h-[min(42svh,276px)]";

const aboutCropImage =
  "h-full w-full object-cover object-[center_28%] contrast-[1.02]";

export default function PortraitImage({ className = "", compact = false }) {
  if (compact) {
    return (
      <div className={[aboutCropFrame, className].filter(Boolean).join(" ")}>
        <img
          className={aboutCropImage}
          src={publicAsset("/assets/hero-portrait.png")}
          alt="Designer portrait"
        />
      </div>
    );
  }

  return (
    <img
      className={[portraitImageClassName, className].filter(Boolean).join(" ")}
      src={publicAsset("/assets/hero-portrait.png")}
      alt="Designer portrait"
    />
  );
}

PortraitImage.propTypes = {
  className: PropTypes.string,
  compact: PropTypes.bool,
};
