import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { videos } from "../data/media.js";

const poster =
  "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=2000&q=75";

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

// Newest shop clip when the gallery has one, otherwise the bundled ride.
const clip = videos[0] || { src: "/media/ride.mp4", poster };

export default function Hero() {
  const [failed, setFailed] = useState(false);
  const still =
    typeof window !== "undefined" &&
    (window.matchMedia("(prefers-reduced-motion: reduce)").matches || navigator.connection?.saveData);

  return (
    <section className="hero">
      <div className="hero-media" aria-hidden="true">
        {failed || still ? (
          <img src={clip.poster || poster} alt="" />
        ) : (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={clip.poster || poster}
            onError={() => setFailed(true)}
          >
            <source src={clip.src} type="video/mp4" onError={() => setFailed(true)} />
          </video>
        )}
        <div className="hero-shade" />
      </div>
      <div className="hero-top">
        <motion.p className="eyebrow" variants={rise} initial="hidden" animate="show" custom={0.15}>
          Motorcycle customs
        </motion.p>
        <motion.p className="hero-deck" variants={rise} initial="hidden" animate="show" custom={0.28}>
          Fabrication, paint, performance, and wiring for bikes that are done being stock.
        </motion.p>
      </div>
      <motion.h1 variants={rise} initial="hidden" animate="show" custom={0.2} aria-label="Zoneout Customs motorcycles">
        <span aria-hidden="true">Zone</span>
        <span className="outline" aria-hidden="true">out</span>
        <span className="hero-subline" aria-hidden="true">Custom motorcycles</span>
      </motion.h1>
      <motion.div className="hero-bar" variants={rise} initial="hidden" animate="show" custom={0.4}>
        <Link className="btn" to="/gallery">
          See the builds
        </Link>
        <Link className="btn btn-ghost" to="/contact">
          Start a build
        </Link>
        <p>One bench. Metal, colour, and a loom that stays tidy.</p>
      </motion.div>
    </section>
  );
}
