/** Resolves `public/` URLs for non-root deployments (e.g. GitHub Pages `base`). */
export function publicAsset(path) {
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${normalized}`;
}
