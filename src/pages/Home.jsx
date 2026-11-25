import { Link } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import Marquee from "../components/Marquee.jsx";
import About from "../components/About.jsx";
import Services from "../components/Services.jsx";
import Process from "../components/Process.jsx";
import MediaGrid from "../components/MediaGrid.jsx";
import CtaBand from "../components/CtaBand.jsx";
import FleetTeaser from "../components/FleetTeaser.jsx";
import { highlights } from "../data/media.js";
import { instagram, instagramHandle } from "../data/site.js";
import { usePage } from "../hooks.js";

export default function Home() {
  usePage(null, "Zoneout Customs builds and modifies motorcycles. Fabrication, paint, performance, and wiring, finished so the bike still rides.");
  const handle = instagramHandle(instagram.profile);

  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Services />
      <section className="section" id="floor">
        <div className="section-head">
          <div>
            <p className="eyebrow">03 — The floor</p>
            <h2>Fresh off the bench.</h2>
          </div>
          <div className="floor-side">
            <p className="lede">Recent builds, paint, and road tests from the workshop.</p>
            <div className="cta-actions">
              <Link className="btn" to="/gallery">
                Full gallery
              </Link>
              {handle && (
                <a className="btn btn-ghost" href={instagram.profile} target="_blank" rel="noreferrer">
                  @{handle}
                </a>
              )}
            </div>
          </div>
        </div>
        <MediaGrid items={highlights} variant="floor" />
      </section>
      <Process />
      <FleetTeaser />
      <CtaBand />
    </>
  );
}
