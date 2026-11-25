import { useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import MediaGrid from "../components/MediaGrid.jsx";
import CtaBand from "../components/CtaBand.jsx";
import { videos } from "../data/media.js";
import { instagram, instagramHandle } from "../data/site.js";
import { usePage } from "../hooks.js";

export default function VideosPage() {
  usePage("Videos", "Road tests, exhaust notes, and build clips from Zoneout Customs.");
  const [featured, ...rest] = videos;
  const [sound, setSound] = useState(false);
  const handle = instagramHandle(instagram.profile);

  return (
    <>
      <PageHeader
        eyebrow="Videos"
        title="Hear it run."
        lede="Road tests, exhaust notes, and clips from the bench. Tap any reel to play it with sound."
      >
        {handle && (
          <a className="btn btn-ghost" href={`${instagram.profile.replace(/\/$/, "")}/reels/`} target="_blank" rel="noreferrer">
            All reels on @{handle}
          </a>
        )}
      </PageHeader>
      {featured ? (
        <section className="section section-tight">
          <div className="feature-video">
            <video
              src={featured.src}
              poster={featured.poster}
              autoPlay
              muted={!sound}
              loop
              playsInline
              controls={sound}
              aria-label={featured.alt}
            />
            <div className="feature-video-bar">
              <div>
                <p className="eyebrow">Latest</p>
                <h2>{featured.label}</h2>
              </div>
              <button type="button" className="btn" onClick={() => setSound((value) => !value)} aria-pressed={sound}>
                {sound ? "Mute" : "Play with sound"}
              </button>
            </div>
          </div>
          {rest.length > 0 && (
            <>
              <h2 className="sub-head">More reels</h2>
              <MediaGrid items={rest} variant="reels" />
            </>
          )}
        </section>
      ) : (
        <section className="section">
          <p className="empty">Videos are on their way.</p>
        </section>
      )}
      <CtaBand title="Want it to sound like that?" />
    </>
  );
}
