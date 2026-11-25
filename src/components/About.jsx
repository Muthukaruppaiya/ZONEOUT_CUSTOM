import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

const image =
  "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&w=1600&q=75";

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section className="section" id="shop" ref={ref}>
      <div className="section-head">
        <div>
          <p className="eyebrow">01 — The shop</p>
          <h2>Not a catalogue. A bench.</h2>
        </div>
        <p className="lede">
          Zoneout Customs is for riders who want the bike changed properly: cut, painted, wired, and handed back ready to ride.
        </p>
      </div>
      <div className="about-grid">
        <div className="about-photo">
          <div className="about-clip">
            <motion.img
              src={image}
              alt="White and orange sport motorcycle parked outdoors"
              style={{ y, scale: 1.14 }}
            />
          </div>
          <span className="about-frame" aria-hidden="true" />
        </div>
        <div className="about-copy">
          <p>
            Every bike on the bench gets a plan. What stays, what gets cut, and what has to survive a long ride home. Paint, metal, and electronics happen under one roof, so the finish matches the mechanical work.
          </p>
          <p className="pull">Stock is a starting point.</p>
          <ul className="about-points">
            <li>
              <strong>One roof</strong>
              <span>Metal, paint, and wiring in the same bay.</span>
            </li>
            <li>
              <strong>Rideable</strong>
              <span>It leaves ready for the road, not only the photograph.</span>
            </li>
            <li>
              <strong>One-off</strong>
              <span>No two work orders follow the same pattern.</span>
            </li>
          </ul>
          <Link className="text-link" to="/about">
            Inside the shop <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
