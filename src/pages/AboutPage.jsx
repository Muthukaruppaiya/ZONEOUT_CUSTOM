import PageHeader from "../components/PageHeader.jsx";
import Process from "../components/Process.jsx";
import MediaGrid from "../components/MediaGrid.jsx";
import CtaBand from "../components/CtaBand.jsx";
import { photos } from "../data/media.js";
import { usePage } from "../hooks.js";

const values = [
  ["One roof", "Metal, paint, and wiring happen in the same bay, so every trade sees the whole bike."],
  ["Rideable", "Every bike gets a shakedown ride. It leaves ready for the road, not only the photograph."],
  ["One-off", "No two work orders follow the same pattern. The build follows the bike and the rider."],
  ["Straight talk", "You get the plan and the price before anything is cut. If something will not work, we say so."],
];

export default function AboutPage() {
  usePage("The shop", "Inside Zoneout Customs: a motorcycle workshop for fabrication, paint, performance, and wiring under one roof.");
  const image =
    photos[0]?.src ||
    "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&w=2000&q=75";

  return (
    <>
      <PageHeader
        eyebrow="The shop"
        title="Not a catalogue. A bench."
        lede="Zoneout Customs is for riders who want the bike changed properly: cut, painted, wired, and handed back ready to ride."
        image={image}
      />
      <section className="section story">
        <p className="pull">Stock is a starting point.</p>
        <div className="story-copy">
          <p>
            Every bike that rolls in gets a plan. What stays, what gets cut, and what has to survive a long ride home.
            Paint, metal, and electronics happen under one roof, so the finish matches the mechanical work instead of
            covering for it.
          </p>
          <p>
            Some riders bring a full vision. Others bring a photo and a feeling. Either way, the bike is stripped,
            measured, and talked through before a single part is ordered.
          </p>
        </div>
      </section>
      <section className="section section-tight">
        <ul className="values">
          {values.map(([title, copy], index) => (
            <li key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{title}</strong>
              <p>{copy}</p>
            </li>
          ))}
        </ul>
      </section>
      <Process />
      {photos.length > 2 && (
        <section className="section section-tight">
          <div className="section-head">
            <div>
              <p className="eyebrow">Around the bay</p>
              <h2>Work in progress.</h2>
            </div>
          </div>
          <MediaGrid items={photos.slice(1, 7)} variant="masonry" />
        </section>
      )}
      <CtaBand />
    </>
  );
}
