import { faq } from "../data/site.js";

export default function Faq() {
  return (
    <section className="section" id="faq">
      <div className="section-head">
        <div>
          <p className="eyebrow">Questions</p>
          <h2>Before you book.</h2>
        </div>
        <p className="lede">The things riders ask before they hand over the keys.</p>
      </div>
      <div className="faq">
        {faq.map((item) => (
          <details key={item.q}>
            <summary>
              <span>{item.q}</span>
              <i aria-hidden="true">+</i>
            </summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
