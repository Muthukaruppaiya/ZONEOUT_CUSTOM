import { Link } from "react-router-dom";
import { fleet, fleetServices } from "../data/fleet.js";

/** Home-page pointer to the sister business. */
export default function FleetTeaser() {
  return (
    <section className="section section-tight">
      <Link to="/smart-fleet" className="fleet-teaser">
        <div>
          <p className="eyebrow">Also from Zoneout</p>
          <h2>
            Smart <span>Fleet</span> Tech
          </h2>
          <p className="lede">GPS installation, AIS-140 tracking, and fleet support in {fleet.location}.</p>
        </div>
        <ul>
          {fleetServices.map((service) => (
            <li key={service.slug}>{service.title}</li>
          ))}
        </ul>
        <span className="fleet-teaser-go" aria-hidden="true">
          →
        </span>
      </Link>
    </section>
  );
}
