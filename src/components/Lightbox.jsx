import { useEffect, useRef } from "react";

/**
 * Full-screen viewer. `index` / `setIndex` are controlled by the parent;
 * `onClose` should return focus handling to the parent (see useLightbox).
 */
export default function Lightbox({ items, index, onClose, setIndex }) {
  const dialog = useRef(null);
  const touch = useRef(null);
  const item = items[index];
  const count = items.length;

  const step = (delta) => setIndex((current) => (current + delta + count) % count);

  // Lock scroll and focus the dialog once, on open.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.querySelector(".lightbox-close")?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const root = dialog.current;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") setIndex((current) => (current + 1) % count);
      if (event.key === "ArrowLeft") setIndex((current) => (current - 1 + count) % count);
      if (event.key !== "Tab" || !root) return;
      const focusable = [...root.querySelectorAll("button, video[controls], a[href]")];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, onClose, setIndex]);

  if (!item) return null;

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.label} — ${index + 1} of ${count}`}
      ref={dialog}
      onClick={onClose}
      onTouchStart={(event) => {
        touch.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touch.current === null) return;
        const dx = event.changedTouches[0].clientX - touch.current;
        touch.current = null;
        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
      }}
    >
      <div className="lightbox-top" onClick={(event) => event.stopPropagation()}>
        <span className="lightbox-count">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
        <button type="button" className="lightbox-close" onClick={onClose}>
          Close
        </button>
      </div>
      {count > 1 && (
        <button
          type="button"
          className="lightbox-nav lightbox-prev"
          aria-label="Previous"
          onClick={(event) => {
            event.stopPropagation();
            step(-1);
          }}
        >
          Prev
        </button>
      )}
      <figure onClick={(event) => event.stopPropagation()}>
        <Media key={item.id} item={item} detailed />
        <figcaption>
          <strong>{item.label}</strong>
          {item.caption && item.caption !== item.label && <span>{item.caption}</span>}
        </figcaption>
      </figure>
      {count > 1 && (
        <button
          type="button"
          className="lightbox-nav lightbox-next"
          aria-label="Next"
          onClick={(event) => {
            event.stopPropagation();
            step(1);
          }}
        >
          Next
        </button>
      )}
    </div>
  );
}

export function Media({ item, detailed = false }) {
  const video = useRef(null);

  // Grid videos: play while on screen (desktop, motion allowed), pause otherwise.
  useEffect(() => {
    const el = video.current;
    if (!el || detailed) return undefined;
    const allowed =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      !navigator.connection?.saveData;
    if (!allowed) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [detailed]);

  if (item.type === "video") {
    return (
      <video
        ref={video}
        src={item.poster || detailed ? item.src : `${item.src}#t=0.1`}
        poster={item.poster}
        muted={!detailed}
        loop
        playsInline
        autoPlay={detailed}
        controls={detailed}
        preload={detailed ? "auto" : "metadata"}
        aria-label={item.alt}
      />
    );
  }

  return <img src={item.src} alt={item.alt} loading={detailed ? "eager" : "lazy"} decoding="async" />;
}
