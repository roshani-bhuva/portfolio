/**
 * When `true`, blocks common ways to open DevTools / inspect UI from the page:
 * context menu (right-click / long-press), double-click defaults, iOS callout styling,
 * and widely used keyboard shortcuts (F12, Ctrl+Shift+I/J/C/K, Cmd+Option+I/J/C, etc.).
 * Form fields still get context menu for paste; DevTools combos are not typed there.
 *
 * When `false`, normal browser behavior is restored.
 *
 * Note: This cannot be absolute—users can still use the browser’s top menu, extensions,
 * or disable JavaScript. It only discourages casual access from the page.
 */
export const DISABLE_SITE_CONTEXT_MENU = true;
