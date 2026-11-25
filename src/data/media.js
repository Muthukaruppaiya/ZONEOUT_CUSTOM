import gallery from "./gallery.json";
import { standIns } from "./site.js";

const real = (gallery.items || []).map((item) => ({
  ...item,
  alt: item.alt || item.caption?.split("\n")[0]?.slice(0, 140) || `${item.label} — Zoneout Customs`,
}));

export const usingStandIns = real.length === 0;
export const media = usingStandIns ? standIns : real;
export const photos = media.filter((item) => item.type === "image");
export const videos = media.filter((item) => item.type === "video");

/** Featured items first, otherwise lead with the newest video. */
const ordered = media.some((item) => item.featured)
  ? [...media].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
  : [...videos.slice(0, 1), ...media.filter((item) => item !== videos[0])];

export const highlights = ordered.slice(0, 6);

export const tags = [...new Set(media.flatMap((item) => item.tags || []))].slice(0, 12);
