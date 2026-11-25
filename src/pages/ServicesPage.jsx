import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader.jsx";
import Marquee from "../components/Marquee.jsx";
import Faq from "../components/Faq.jsx";
import CtaBand from "../components/CtaBand.jsx";
import { services } from "../data/site.js";
import { usePage } from "../hooks.js";

export default function ServicesPage() {
  usePage("Services", "Full custom builds, performance upgrades, paint and powder, fabrication, wiring, and suspension for motorcycles.");

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="What we change."
        lede="From a single loom to a ground-up custom. Every job is scoped and quoted before the bike is touched."
      >
        <nav className="jump" aria-label="Services on this page">
          {services.map((service) => (
            <a key={service.slug} href={`#${service.slug}`}>
              {service.num} {service.title}
            </a>
          ))}
        </nav>
      </PageHeader>
      <Marquee />
      <section className="section service-detail-list">
        {services.map((service, index) => (
          <motion.article
            key={service.slug}
            id={service.slug}
            className={`service-detail${index % 2 ? " is-flipped" : ""}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="service-detail-media">
              <img src={service.image} alt={service.alt} loading="lazy" />
              <span>{service.num}</span>
            </div>
            <div className="service-detail-copy">
              <p className="eyebrow">{service.tag}</p>
              <h2>{service.title}</h2>
              <p className="lede">{service.copy}</p>
              <ul className="ticks">
                {service.includes.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <Link className="text-link" to="/contact">
                Ask about {service.title.toLowerCase()} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </motion.article>
        ))}
      </section>
      <Faq />
      <CtaBand />
    </>
  );
}
