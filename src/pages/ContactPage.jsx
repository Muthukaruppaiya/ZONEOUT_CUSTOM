import PageHeader from "../components/PageHeader.jsx";
import ContactForm from "../components/ContactForm.jsx";
import Faq from "../components/Faq.jsx";
import { instagram, instagramHandle, shop } from "../data/site.js";
import { usePage } from "../hooks.js";

export default function ContactPage() {
  usePage("Contact", "Book a motorcycle build or modification with Zoneout Customs. Send a brief, call, or message us on Instagram.");
  const handle = instagramHandle(instagram.profile);

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Put it on the bench."
        lede="Tell us the bike and what you want changed. We reply with questions, a plan, and a price."
      />
      <section className="section section-tight">
        <div className="contact-grid">
          <div className="contact-info">
            <dl className="hours">
              {shop.hours.map(([day, time]) => (
                <div key={day}>
                  <dt>{day}</dt>
                  <dd>{time}</dd>
                </div>
              ))}
            </dl>
            <p className="visit">{shop.visit}</p>
            {shop.address && (
              <p className="visit">
                {shop.address}
                {shop.mapUrl && (
                  <>
                    {" · "}
                    <a className="mail" href={shop.mapUrl} target="_blank" rel="noreferrer">
                      Directions
                    </a>
                  </>
                )}
              </p>
            )}
            <ul className="channels">
              {shop.phone && (
                <li>
                  <span>Call</span>
                  <a href={`tel:${shop.phone.replace(/\s/g, "")}`}>{shop.phone}</a>
                </li>
              )}
              {shop.whatsapp && (
                <li>
                  <span>WhatsApp</span>
                  <a href={`https://wa.me/${shop.whatsapp}`} target="_blank" rel="noreferrer">
                    Message us
                  </a>
                </li>
              )}
              <li>
                <span>Email</span>
                <a href={`mailto:${shop.email}`}>{shop.email}</a>
              </li>
              {handle && (
                <li>
                  <span>Instagram</span>
                  <a href={`https://ig.me/m/${handle}`} target="_blank" rel="noreferrer">
                    DM @{handle}
                  </a>
                </li>
              )}
            </ul>
          </div>
          <ContactForm />
        </div>
      </section>
      <Faq />
    </>
  );
}
