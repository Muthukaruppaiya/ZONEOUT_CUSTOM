import { Link } from "react-router-dom";
import { usePage } from "../hooks.js";

export default function NotFound() {
  usePage("Page not found");
  return (
    <section className="section not-found">
      <p className="eyebrow">404</p>
      <h1>Wrong turn.</h1>
      <p className="lede">This page is not on the bench. Head back and pick another road.</p>
      <div className="cta-actions">
        <Link className="btn" to="/">
          Home
        </Link>
        <Link className="btn btn-ghost" to="/gallery">
          Gallery
        </Link>
      </div>
    </section>
  );
}
