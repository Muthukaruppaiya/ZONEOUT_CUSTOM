import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import MediaGrid from "../components/MediaGrid.jsx";
import CtaBand from "../components/CtaBand.jsx";
import { media, tags } from "../data/media.js";
import { instagram, instagramHandle } from "../data/site.js";
import { usePage } from "../hooks.js";

const PAGE = 18;

export default function GalleryPage() {
  usePage("Gallery", "Photos and videos of custom motorcycles, paint, and fabrication from the Zoneout Customs workshop.");
  const [type, setType] = useState("all");
  const [tag, setTag] = useState("");
  const [shown, setShown] = useState(PAGE);
  const handle = instagramHandle(instagram.profile);

  const filtered = useMemo(
    () =>
      media.filter(
        (item) => (type === "all" || item.type === type) && (!tag || (item.tags || []).includes(tag)),
      ),
    [type, tag],
  );

  const counts = {
    all: media.length,
    image: media.filter((item) => item.type === "image").length,
    video: media.filter((item) => item.type === "video").length,
  };

  const pick = (next) => {
    setType(next);
    setShown(PAGE);
  };

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="On the floor."
        lede="Builds, paint, fabrication, and road tests straight from the workshop."
      >
        {handle && (
          <a className="btn btn-ghost" href={instagram.profile} target="_blank" rel="noreferrer">
            More on @{handle}
          </a>
        )}
      </PageHeader>
      <section className="section section-tight">
        <div className="filters" role="group" aria-label="Filter the gallery">
          {[
            ["all", "All"],
            ["image", "Photos"],
            ["video", "Videos"],
          ].map(([value, label]) => (
            <button key={value} type="button" aria-pressed={type === value} onClick={() => pick(value)}>
              {label} <sup>{counts[value]}</sup>
            </button>
          ))}
          {tags.length > 1 && (
            <label className="tag-select">
              <span className="visually-hidden">Filter by tag</span>
              <select
                value={tag}
                onChange={(event) => {
                  setTag(event.target.value);
                  setShown(PAGE);
                }}
              >
                <option value="">All work</option>
                {tags.map((value) => (
                  <option key={value} value={value}>
                    #{value}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
        {filtered.length ? (
          <MediaGrid key={`${type}-${tag}`} items={filtered.slice(0, shown)} variant="masonry" />
        ) : (
          <p className="empty">Nothing here yet. Check back after the next build leaves the bench.</p>
        )}
        {shown < filtered.length && (
          <div className="more">
            <button type="button" className="btn btn-ghost" onClick={() => setShown((value) => value + PAGE)}>
              Show more ({filtered.length - shown} left)
            </button>
          </div>
        )}
      </section>
      <CtaBand title="Want yours in here?" />
    </>
  );
}
