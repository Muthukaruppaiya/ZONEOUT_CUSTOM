import { motion } from "framer-motion";
import ContactForm from "../components/ContactForm.jsx";
import MediaGrid from "../components/MediaGrid.jsx";
import { fleet, fleetMedia, fleetServices, fleetSteps } from "../data/fleet.js";
import { usePage } from "../hooks.js";

const icons = {
  pin: "M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z",
  shield: "M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3zm-1.2 14.2-3.5-3.5 1.4-1.4 2.1 2.1 4.8-4.8 1.4 1.4-6.2 6.2z",
  route: "M6 3a3 3 0 0 0-1 5.83V15a5 5 0 0 0 5 5h4.17A3 3 0 1 0 18 16.17 3 3 0 0 0 14.17 18H10a3 3 0 0 1-3-3V8.83A3 3 0 0 0 6 3zm12-2a4 4 0 0 0-4 4c0 3 4 7 4 7s4-4 4-7a4 4 0 0 0-4-4zm0 5.5A1.5 1.5 0 1 1 18 3.5a1.5 1.5 0 0 1 0 3z",
  wrench: "M22.7 19.3 13.6 10.2a6 6 0 0 0-7.9-7.7l3.9 3.9-2.8 2.8-3.9-3.9a6 6 0 0 0 7.7 7.9l9.1 9.1a1 1 0 0 0 1.4 0l1.6-1.6a1 1 0 0 0 0-1.4z",
};

function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
      <path d={icons[name]} fill="currentColor" />
    </svg>
  );
}

/** Stylised map: grid, a route, and pulsing vehicle pins. */
function TrackerMap() {
  const route = "M40 300 C 120 300, 140 210, 220 200 S 330 120, 400 140 S 520 60, 580 70";
  return (
    <svg className="tracker-map" viewBox="0 0 620 360" aria-hidden="true">
      <defs>
        <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M30 0H0V30" fill="none" stroke="currentColor" strokeOpacity="0.09" />
        </pattern>
      </defs>
      <rect width="620" height="360" fill="url(#grid)" />
      <path d="M0 250 L620 190 M180 0 L260 360 M430 0 L380 360" stroke="currentColor" strokeOpacity="0.12" strokeWidth="10" />
      <path d={route} fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" />
      <motion.path
        d={route}
        fill="none"
        stroke="var(--ember)"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.6, ease: "easeInOut", repeat: Infinity, repeatType: "loop", repeatDelay: 0.8 }}
      />
      {[
        [40, 300],
        [220, 200],
        [400, 140],
        [580, 70],
      ].map(([x, y], index) => (
        <g key={x} transform={`translate(${x} ${y})`}>
          <circle className="ping" r="18" style={{ animationDelay: `${index * 0.6}s` }} />
          <circle r="7" fill={index === 3 ? "var(--ember)" : "currentColor"} />
        </g>
      ))}
    </svg>
  );
}

export default function FleetPage() {
  usePage(
    "Smart Fleet Tech",
    "Smart Fleet Tech, a Zoneout business in Coimbatore: GPS installation, AIS-140 tracking, fleet tracking solutions, and GPS troubleshooting and support.",
  );

  return (
    <div className="fleet">
      <header className="fleet-hero">
        <div className="fleet-hero-copy">
          <p className="eyebrow">A Zoneout business</p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Smart <span>Fleet</span> Tech
          </motion.h1>
          <p className="lede">
            GPS installation, AIS-140 tracking, and fleet tracking solutions, with troubleshooting and support when a
            unit needs attention.
          </p>
          <ul className="fleet-facts">
            <li>
              <Icon name="pin" /> {fleet.location}
            </li>
            <li>GPS installation</li>
            <li>AIS-140</li>
          </ul>
          <div className="cta-actions">
            <a className="btn" href="#fleet-contact">
              Get a quote
            </a>
            <a className="btn btn-ghost" href={fleet.instagram} target="_blank" rel="noreferrer">
              @{fleet.handle}
            </a>
          </div>
        </div>
        <TrackerMap />
      </header>

      <section className="section" id="fleet-services">
        <div className="section-head">
          <div>
            <p className="eyebrow">What we do</p>
            <h2>Track every vehicle.</h2>
          </div>
          <p className="lede">From a single vehicle to a whole fleet: fitted, tracked, and supported.</p>
        </div>
        <div className="fleet-cards">
          {fleetServices.map((service, index) => (
            <motion.article
              key={service.slug}
              className="fleet-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.07 }}
            >
              <span className="fleet-icon">
                <Icon name={service.icon} />
              </span>
              <p className="fleet-tag">{service.tag}</p>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="section section-tight">
        <div className="section-head">
          <div>
            <p className="eyebrow">How it works</p>
            <h2>Fit. Track. Support.</h2>
          </div>
        </div>
        <ol className="fleet-steps">
          {fleetSteps.map((step) => (
            <li key={step.num}>
              <span>{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section section-tight">
        <div className="section-head">
          <div>
            <p className="eyebrow">On the job</p>
            <h2>Installs &amp; updates.</h2>
          </div>
          <p className="lede">
            {fleetMedia.length ? "Recent work from Smart Fleet Tech." : "Follow along for installs and updates."}
          </p>
        </div>
        {fleetMedia.length ? (
          <MediaGrid items={fleetMedia} variant="masonry" />
        ) : (
          <a className="fleet-insta" href={fleet.instagram} target="_blank" rel="noreferrer">
            <span>See installs and updates on Instagram</span>
            <strong>@{fleet.handle} →</strong>
          </a>
        )}
      </section>

      <section className="section section-tight" id="fleet-contact">
        <div className="contact-grid">
          <div>
            <p className="eyebrow">Get a quote</p>
            <h2>Put your fleet on the map.</h2>
            <p className="lede lede-block">
              Tell us how many vehicles, what type, and what you need. We come back with a plan and a price.
            </p>
            <ul className="channels">
              <li>
                <span>Based in</span>
                <span>{fleet.location}</span>
              </li>
              {fleet.phone && (
                <li>
                  <span>Call</span>
                  <a href={`tel:${fleet.phone.replace(/\s/g, "")}`}>{fleet.phone}</a>
                </li>
              )}
              {fleet.email && (
                <li>
                  <span>Email</span>
                  <a href={`mailto:${fleet.email}`}>{fleet.email}</a>
                </li>
              )}
              <li>
                <span>Instagram</span>
                <a href={`https://ig.me/m/${fleet.handle}`} target="_blank" rel="noreferrer">
                  DM @{fleet.handle}
                </a>
              </li>
            </ul>
          </div>
          <ContactForm
            kicker="Tracking enquiry"
            subject="GPS enquiry"
            to={{ email: fleet.email, whatsapp: fleet.whatsapp, handle: fleet.handle }}
            subjectField={{
              label: "Vehicles",
              placeholder: "How many, and what type (car, truck, bus...)",
              error: "Tell us about the vehicles.",
            }}
            optionsLabel="Service needed"
            options={fleetServices.map((service) => service.title)}
            jobLabel="Details"
            jobPlaceholder="What do you need tracked, installed, or fixed?"
          />
        </div>
      </section>
    </div>
  );
}
