/** Current height of the fixed app toolbar, used to offset section scrolling. */
export function getToolbarHeight(fallback = 0): number {
  if (typeof document === "undefined") return fallback
  return document.querySelector(".v-toolbar")?.clientHeight || fallback
}
