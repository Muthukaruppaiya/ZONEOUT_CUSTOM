import { marquee } from "../data/site.js";

export default function Marquee() {
  const loop = [...marquee, ...marquee];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {loop.map((item, index) => (
          <span key={`${item}-${index}`}>
            {item}
            <i>+</i>
          </span>
        ))}
      </div>
    </div>
  );
}
