import { Link } from "react-router-dom";
import { instagram } from "../data/site.js";

export default function CtaBand({
  title = "Put it on the bench.",
  copy = "Tell us the bike and what you want changed. We scope it, quote it, and only then start cutting.",
}) {
  return (
    <section className="cta-band">
      <div>
        <p className="eyebrow">Next build</p>
        <h2>{title}</h2>
      </div>
      <div className="cta-side">
        <p>{copy}</p>
        <div className="cta-actions">
          <Link className="btn btn-ink" to="/contact">
            Send a brief
          </Link>
          {instagram.profile && (
            <a className="btn btn-line" href={instagram.profile} target="_blank" rel="noreferrer">
              Follow the builds
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
