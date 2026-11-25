const photo = (id, width = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=75`;

export const shop = {
  name: "Zoneout Customs",
  mark: "Zoneout",
  email: "hello@zoneoutcustom.com",
  visit: "Workshop visits by appointment",
  // Fill these in and they appear on the contact page, footer and search data.
  phone: "", // e.g. "+91 98765 43210"
  whatsapp: "", // digits only with country code, e.g. "919876543210"
  address: "", // street, area, city
  mapUrl: "", // Google Maps share link
  hours: [
    ["Monday – Saturday", "10:00 – 19:00"],
    ["Sunday", "Bench is dark"],
  ],
};

export const instagram = {
  profile: "https://www.instagram.com/zoneout_customs/",
};

export function instagramHandle(profile) {
  if (!profile) return "";
  try {
    const [name] = new URL(profile).pathname.split("/").filter(Boolean);
    return (name || "").replace(/^@/, "");
  } catch {
    return String(profile).replace(/^@/, "").replace(/\/$/, "");
  }
}

/**
 * Stand-in media. The site uses src/data/gallery.json (built from
 * public/media/gallery by `npm run gallery`) whenever it has items;
 * these only show while that folder is empty.
 */
export const standIns = [
  {
    id: "road-test",
    type: "video",
    src: "/media/ride.mp4",
    poster: photo("photo-1558981806-ec527fa84c39", 1400),
    alt: "Motorcycle riding a tree-lined road",
    label: "Road test",
    tags: ["ride"],
  },
  {
    id: "bay",
    type: "image",
    src: photo("photo-1558980664-1db506751c6c", 1400),
    alt: "Black custom bobber on a rooftop",
    label: "Bobber",
    tags: ["custom"],
  },
  {
    id: "cafe",
    type: "image",
    src: photo("photo-1449426468159-d96dbf08f19f", 1200),
    alt: "White and orange sport motorcycle",
    label: "Sport",
    tags: ["performance"],
  },
  {
    id: "night",
    type: "image",
    src: photo("photo-1558981403-c5f9899a28bc", 1200),
    alt: "Rider on a motorcycle at night",
    label: "Night run",
    tags: ["electrical"],
  },
  {
    id: "red",
    type: "image",
    src: photo("photo-1568772585407-9361f9bf3a87", 1200),
    alt: "Red sport motorcycle parked on asphalt",
    label: "Red work",
    tags: ["paint"],
  },
  {
    id: "black",
    type: "image",
    src: photo("photo-1508357941501-0924cf312bbd", 1200),
    alt: "Black motorcycle parked at dusk",
    label: "Blackout",
    tags: ["paint"],
  },
  {
    id: "lean",
    type: "image",
    src: photo("photo-1558981359-219d6364c9c8", 1200),
    alt: "Motorcyclist leaned into a corner",
    label: "Stance",
    tags: ["suspension"],
  },
];

export const marquee = [
  "Custom builds",
  "Performance",
  "Paint",
  "Fabrication",
  "Wiring",
  "Suspension",
  "Exhaust",
  "Stance",
];

export const services = [
  {
    slug: "full-customs",
    num: "01",
    title: "Full customs",
    tag: "Frame to finish",
    copy: "A complete build from the first sketch: lines, stance, and the parts that have to be made because they do not exist on a shelf.",
    includes: ["Concept sketch and parts plan", "Frame and subframe work", "Paint, wiring, and final assembly", "Shakedown ride before handover"],
    image: photo("photo-1558980664-1db506751c6c", 1400),
    alt: "Black custom bobber",
  },
  {
    slug: "performance",
    num: "02",
    title: "Performance",
    tag: "Breathing & fuelling",
    copy: "Intake, exhaust, fuelling, and the small changes that make a bike pull cleanly instead of just sounding louder.",
    includes: ["Intake and air filter upgrades", "Full and slip-on exhaust systems", "Fuel mapping and tuning", "Sprocket and gearing changes"],
    image: photo("photo-1568772585407-9361f9bf3a87", 1400),
    alt: "Red sport motorcycle",
  },
  {
    slug: "paint",
    num: "03",
    title: "Paint & metal",
    tag: "Colour, powder, panels",
    copy: "Panels, tanks, and coats finished in-house so the colour matches the metalwork instead of fighting it.",
    includes: ["Tank and panel respray", "Powder coating for frames and wheels", "Graphics, pinstripes, and lettering", "Dent and panel repair"],
    image: photo("photo-1508357941501-0924cf312bbd", 1400),
    alt: "Black motorcycle",
  },
  {
    slug: "fabrication",
    num: "04",
    title: "Fabrication",
    tag: "Mounts, loops, seats",
    copy: "Subframes, seats, brackets, and exhaust routing. Cut, mocked, and welded so it survives the ride home.",
    includes: ["Rear loops and subframes", "Custom seats and seat pans", "Brackets, mounts, and guards", "Exhaust routing and headers"],
    image: photo("photo-1558981806-ec527fa84c39", 1400),
    alt: "Motorcycle front end",
  },
  {
    slug: "electrical",
    num: "05",
    title: "Electrical",
    tag: "Loom & lighting",
    copy: "A tidy loom, switches you can find with gloves on, and lighting that works after the paint is closed up.",
    includes: ["Rewires and loom tidy-ups", "LED head, tail, and indicator lights", "Switchgear and digital clusters", "Charging and accessory circuits"],
    image: photo("photo-1558981403-c5f9899a28bc", 1400),
    alt: "Motorcycle at night",
  },
  {
    slug: "stance",
    num: "06",
    title: "Stance",
    tag: "Suspension & wheels",
    copy: "Ride height, forks, shocks, and wheels set up so the bike looks planted and still turns.",
    includes: ["Fork and shock upgrades", "Lowering and raising", "Wheel, tyre, and rim swaps", "Handlebar and control setup"],
    image: photo("photo-1558981359-219d6364c9c8", 1400),
    alt: "Motorcyclist leaned into a corner",
  },
];

export const steps = [
  {
    num: "01",
    title: "Talk",
    copy: "Bring the bike, or photos and a target. The work gets scoped before a spanner turns.",
  },
  {
    num: "02",
    title: "Strip",
    copy: "Down to the bones. We measure, mock, and agree the lines while the metal is still honest.",
  },
  {
    num: "03",
    title: "Make",
    copy: "Fabrication, mounts, exhaust, and the pieces that have to be built for this one machine.",
  },
  {
    num: "04",
    title: "Finish",
    copy: "Paint, powder, wiring, and assembly. Nothing leaves the bench half-connected.",
  },
  {
    num: "05",
    title: "Ride",
    copy: "A shakedown before handover. If it is not right on the road, it is not done.",
  },
];

export const faq = [
  {
    q: "How long does a build take?",
    a: "A single job like an exhaust or rewire is usually days. A full custom is weeks to months, depending on parts and how much has to be made. You get a timeline after the bike is scoped.",
  },
  {
    q: "Can you work on my bike if it is my daily ride?",
    a: "Yes. Tell us early, and the work can be staged so the bike is off the road for the shortest stretch.",
  },
  {
    q: "Do you give a quote before starting?",
    a: "Always. The bike is looked over, the job is written down, and nothing is cut until you agree the plan and the price.",
  },
  {
    q: "Can I bring my own parts?",
    a: "Usually, yes. We check them first. If a part will not fit or will not last, we say so before fitting it.",
  },
  {
    q: "Will the modifications stay road legal?",
    a: "We build bikes to be ridden. We tell you up front if a change affects registration or local rules, so you decide with the facts.",
  },
];

export const nav = [
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/videos", label: "Videos" },
  { to: "/about", label: "Shop" },
  { to: "/smart-fleet", label: "Fleet Tech" },
  { to: "/contact", label: "Contact" },
];
