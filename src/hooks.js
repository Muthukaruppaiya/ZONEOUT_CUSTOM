import { useEffect } from "react";

const SITE = "Zoneout Customs";

/** Sets the tab title and meta description for a page. */
export function usePage(title, description) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE}` : `${SITE} — Bike customs & modifications`;
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    }
  }, [title, description]);
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
