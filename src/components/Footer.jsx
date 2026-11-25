import { Link } from "react-router-dom";
import { instagram, instagramHandle, nav, shop } from "../data/site.js";

export default function Footer() {
  const handle = instagramHandle(instagram.profile);
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-cols">
        <div>
          <p className="eyebrow">Visit</p>
          <p>{shop.address || shop.visit}</p>
          {shop.mapUrl && (
            <a href={shop.mapUrl} target="_blank" rel="noreferrer">
              Open in Maps
            </a>
          )}
        </div>
        <div>
          <p className="eyebrow">Talk</p>
          {shop.phone && <a href={`tel:${shop.phone.replace(/\s/g, "")}`}>{shop.phone}</a>}
          <a href={`mailto:${shop.email}`}>{shop.email}</a>
          {instagram.profile && (
            <a href={instagram.profile} target="_blank" rel="noreferrer">
              @{handle}
            </a>
          )}
        </div>
        <div>
          <p className="eyebrow">Hours</p>
          {shop.hours.map(([day, time]) => (
            <p key={day}>
              {day}: {time}
            </p>
          ))}
        </div>
        <nav aria-label="Footer">
          <p className="eyebrow">Pages</p>
          <Link to="/">Home</Link>
          {nav.map((item) => (
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="footer-brand" aria-hidden="true">
        <img className="badge" src="/logo.png" alt="" />
        <p className="footer-word">
          Zone<b>out</b>
        </p>
      </div>
      <div className="footer-meta">
        <p>{shop.name}. Motorcycle modification.</p>
        <p>© {year}</p>
      </div>
    </footer>
  );
}
