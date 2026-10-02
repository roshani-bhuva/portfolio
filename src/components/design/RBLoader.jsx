import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

/** Branded placeholder shown over media until it finishes loading. */
export function RBLoader({ visible = true, className = "" }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-elevated transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"} ${className}`}
    >
      <div className="rb-loader-surface absolute inset-0" />
      <div className="relative flex h-12 w-12 items-center justify-center sm:h-14 sm:w-14">
        <span className="rb-loader-ring absolute inset-0 rounded-full" />
        <span className="rb-loader-mark font-['Pacifico'] text-lg leading-none sm:text-xl">
          RB
        </span>
      </div>
    </div>
  );
}

RBLoader.propTypes = {
  visible: PropTypes.bool,
  className: PropTypes.string,
};

/** `<img>` that fades in over an RB loader; cached images skip the loader. */
export function LoadingImage({ wrapperClassName = "", className = "", ...img }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Lazy images that haven't started can report `complete`; require pixels.
    const el = ref.current;
    if (el?.complete && el.naturalWidth > 0) setLoaded(true);
  }, [img.src]);

  return (
    <div className={`relative ${wrapperClassName}`}>
      <img
        ref={ref}
        {...img}
        className={`block ${className} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
      <RBLoader visible={!loaded} />
    </div>
  );
}

LoadingImage.propTypes = {
  src: PropTypes.string.isRequired,
  wrapperClassName: PropTypes.string,
  className: PropTypes.string,
};
