import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { services } from "../data/site.js";

export default function Services() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section className="section section-tight" id="services">
      <div className="section-head">
        <div>
          <p className="eyebrow">02 — Services</p>
          <h2>What we change.</h2>
        </div>
        <p className="lede">
          From a single loom to a ground-up custom. Hover a line, or tap it, and the bay shows that kind of work.
        </p>
      </div>
      <div className="services-layout">
        <div className="service-list">
          {services.map((service, index) => {
            const on = index === active;
            return (
              <div key={service.num} className={on ? "service is-on" : "service"}>
                <button
                  type="button"
                  className="service-row"
                  aria-pressed={on}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                >
                  <em>{service.num}</em>
                  <strong>{service.title}</strong>
                  <span>{service.tag}</span>
                </button>
                {on && (
                  <motion.p
                    className="service-copy"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {service.copy}
                  </motion.p>
                )}
              </div>
            );
          })}
          <Link className="text-link" to="/services">
            Every service in detail <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="services-visual">
          <AnimatePresence mode="wait">
            <motion.img
              key={current.title}
              src={current.image}
              alt={current.alt}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>
          <p>{current.title}</p>
          {/* preload the other bay images so hovering does not flicker */}
          <div hidden>
            {services.map((service) => (
              <link key={service.slug} rel="preload" as="image" href={service.image} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
