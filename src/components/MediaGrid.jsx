import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import Lightbox, { Media } from "./Lightbox.jsx";

const PlayIcon = () => (
  <span className="play" aria-hidden="true">
    <svg viewBox="0 0 12 12" width="12" height="12">
      <path d="M3 1.5v9l8-4.5-8-4.5z" fill="currentColor" />
    </svg>
  </span>
);

/**
 * Grid of photo / video tiles that open in a shared lightbox.
 * variant: "floor" (home mosaic) | "masonry" (gallery) | "reels" (9:16 videos)
 */
export default function MediaGrid({ items, variant = "masonry", animate = true }) {
  const [active, setActive] = useState(null);
  const tiles = useRef([]);
  const last = useRef(0);

  const open = (index) => {
    last.current = index;
    setActive(index);
  };

  const close = useCallback(() => {
    setActive(null);
    requestAnimationFrame(() => tiles.current[last.current]?.focus());
  }, []);

  const setIndex = useCallback((updater) => {
    setActive((current) => {
      if (current === null) return current;
      const next = typeof updater === "function" ? updater(current) : updater;
      last.current = next;
      return next;
    });
  }, []);

  return (
    <>
      <div className={`media-grid media-${variant}`}>
        {items.map((item, index) => (
          <motion.button
            key={item.id}
            ref={(node) => {
              tiles.current[index] = node;
            }}
            type="button"
            className="tile"
            aria-label={`Open ${item.type === "video" ? "video" : "photo"}: ${item.label}`}
            onClick={() => open(index)}
            initial={animate ? { opacity: 0, y: 24 } : false}
            whileInView={animate ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: (index % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <Media item={item} />
            <span className="tile-meta">
              {item.type === "video" && <PlayIcon />}
              <span>{item.label}</span>
            </span>
          </motion.button>
        ))}
      </div>
      {active !== null && (
        <Lightbox items={items} index={active} onClose={close} setIndex={setIndex} />
      )}
    </>
  );
}
