import PropTypes from "prop-types";
import { LoadingImage } from "./RBLoader";

const itemShape = PropTypes.shape({
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  wide: PropTypes.bool,
  frameClass: PropTypes.string,
  imgClass: PropTypes.string,
});

export function PostGrid({ items }) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:grid-cols-3 sm:gap-4">
      {items.map((asset, i) => (
        <div
          key={`${asset.src}-${i}`}
          className="overflow-hidden rounded-xl border border-foreground/10 bg-elevated shadow-sm dark:bg-zinc-950 dark:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.5)]"
        >
          <LoadingImage
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
  );
}

PostGrid.propTypes = { items: PropTypes.arrayOf(itemShape).isRequired };

export function LogoGrid({ items }) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:grid-cols-4 sm:gap-4">
      {items.map((logo, i) => (
        <div
          key={`${logo.src}-${i}`}
          className={`flex min-h-0 min-w-0 flex-col overflow-hidden rounded-2xl border border-foreground/10 shadow-sm dark:shadow-none ${logo.frameClass}`}
        >
          <LoadingImage
            src={logo.src}
            alt={logo.alt}
            className={logo.imgClass}
            loading="lazy"
            decoding="async"
          />
        </div>
      ))}
    </div>
  );
}

LogoGrid.propTypes = { items: PropTypes.arrayOf(itemShape).isRequired };

export function BrandGrid({ items }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4">
      {items.map((asset, i) => (
        <div
          key={`${asset.src}-${i}`}
          className={`min-w-0 overflow-hidden rounded-xl border border-foreground/10 bg-card shadow-[0_12px_40px_-20px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.45)] ${asset.wide ? "sm:col-span-2" : ""}`}
        >
          <LoadingImage
            src={asset.src}
            alt={asset.alt}
            className="block h-auto w-full"
            width={asset.width}
            height={asset.height}
            loading="lazy"
            decoding="async"
          />
        </div>
      ))}
    </div>
  );
}

BrandGrid.propTypes = { items: PropTypes.arrayOf(itemShape).isRequired };
