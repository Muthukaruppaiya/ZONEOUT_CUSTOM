import gallery from "./fleet-gallery.json";

/**
 * Smart Fleet Tech: a Zoneout business.
 * Facts below come from the @smartfleettech Instagram bio.
 * Fill in the blank contact fields and they appear on the page.
 */
export const fleet = {
  name: "Smart Fleet Tech",
  location: "Coimbatore",
  instagram: "https://www.instagram.com/smartfleettech/",
  handle: "smartfleettech",
  phone: "", // e.g. "+91 98765 43210"
  whatsapp: "", // digits with country code, e.g. "919876543210"
  email: "",
  website: "", // the bio link smartfleettech.netlify.app currently returns 404
};

export const fleetServices = [
  {
    slug: "gps-installation",
    title: "GPS installation",
    tag: "Fitted & tested",
    copy: "Tracking units fitted to your vehicle, wired cleanly, and checked before handover.",
    icon: "pin",
  },
  {
    slug: "ais-140",
    title: "AIS-140",
    tag: "Tracking for transport vehicles",
    copy: "AIS-140 is the Indian standard for vehicle location tracking in public and commercial transport. We install the tracking units these vehicles need.",
    icon: "shield",
  },
  {
    slug: "fleet-tracking",
    title: "Fleet tracking",
    tag: "Every vehicle, one view",
    copy: "Tracking set up across your vehicles, so you can see where the fleet is.",
    icon: "route",
  },
  {
    slug: "support",
    title: "Troubleshooting & support",
    tag: "When a unit goes quiet",
    copy: "A tracker that stopped reporting, a loose connection, or a device that needs a check. We find the fault and fix it.",
    icon: "wrench",
  },
];

export const fleetSteps = [
  { num: "01", title: "Tell us the vehicles", copy: "How many, what type, and what you need tracked." },
  { num: "02", title: "Install", copy: "Units fitted and wired, then tested on the vehicle." },
  { num: "03", title: "Track", copy: "Your vehicles report their location, ready to follow." },
  { num: "04", title: "Support", copy: "If a unit stops reporting, we troubleshoot and fix it." },
];

export const fleetMedia = (gallery.items || []).map((item) => ({
  ...item,
  alt: item.alt || item.caption?.split("\n")[0]?.slice(0, 140) || `${item.label} — Smart Fleet Tech`,
}));
