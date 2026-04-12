import { useEffect } from "react";

function isFormControl(target) {
  if (!target || typeof target.closest !== "function") return false;
  return Boolean(
    target.closest(
      "input, textarea, select, option, [contenteditable='true']",
    ),
  );
}

/** Best-effort: block shortcuts that open DevTools / inspector in major browsers. */
function isDevtoolsKeyboardShortcut(e) {
  if (e.key === "F12" || e.code === "F12") return true;

  const k = typeof e.key === "string" ? e.key.toLowerCase() : "";
  const ctrl = e.ctrlKey;
  const meta = e.metaKey;
  const shift = e.shiftKey;
  const alt = e.altKey;

  // Chromium / Firefox / Edge (Windows & Linux): Ctrl+Shift+I|J|C|K|M
  if (ctrl && shift && ["i", "j", "c", "k", "m"].includes(k)) return true;

  // macOS Chrome / Safari / Firefox: Cmd+Option+I|J|C
  if (meta && alt && ["i", "j", "c"].includes(k)) return true;

  // View page source (often used to inspect markup)
  if (ctrl && !shift && !alt && k === "u") return true;
  if (meta && alt && k === "u") return true;

  return false;
}

/** @param {boolean} enabled */
export function useSiteInteractionGuards(enabled) {
  useEffect(() => {
    if (!enabled) return;

    const onContextMenu = (e) => {
      if (isFormControl(e.target)) return;
      e.preventDefault();
    };

    const onDblClick = (e) => {
      if (isFormControl(e.target)) return;
      e.preventDefault();
    };

    const onKeyDown = (e) => {
      if (!isDevtoolsKeyboardShortcut(e)) return;
      e.preventDefault();
      e.stopPropagation();
    };

    const opts = { capture: true };
    window.addEventListener("keydown", onKeyDown, opts);
    document.addEventListener("contextmenu", onContextMenu, opts);
    document.addEventListener("dblclick", onDblClick, opts);
    document.documentElement.classList.add("site-guard-no-callout");

    return () => {
      window.removeEventListener("keydown", onKeyDown, opts);
      document.removeEventListener("contextmenu", onContextMenu, opts);
      document.removeEventListener("dblclick", onDblClick, opts);
      document.documentElement.classList.remove("site-guard-no-callout");
    };
  }, [enabled]);
}
