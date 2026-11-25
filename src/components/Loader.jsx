import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { prefersReducedMotion } from "../hooks.js";

const KEY = "zoneout-intro-seen";

function shouldShow() {
  if (typeof window === "undefined" || prefersReducedMotion()) return false;
  try {
    return !sessionStorage.getItem(KEY);
  } catch {
    return true;
  }
}

/** Intro curtain. Shown once per browser session. */
export default function Loader() {
  const [on, setOn] = useState(shouldShow);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!on) return undefined;
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* private mode */
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const start = performance.now();
    let frame = 0;
    let doneTimer = 0;

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / 1000);
      setN(Math.round(progress * 100));
      if (progress < 1) frame = requestAnimationFrame(tick);
      else doneTimer = window.setTimeout(() => setOn(false), 220);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      document.body.style.overflow = previous;
      cancelAnimationFrame(frame);
      window.clearTimeout(doneTimer);
    };
  }, [on]);

  return (
    <AnimatePresence>
      {on && (
        <motion.div
          className="loader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="loader-top">
            <span>Zoneout Customs</span>
            <button type="button" onClick={() => setOn(false)}>
              Skip intro
            </button>
          </div>
          <div className="loader-center" aria-hidden="true">
            <img className="loader-badge" src="/logo.png" alt="" />
            <p className="loader-word">
              Zone<span>out</span>
            </p>
          </div>
          <div className="loader-foot" aria-hidden="true">
            <span className="loader-track">
              <span style={{ width: `${n}%` }} />
            </span>
            <span className="loader-count">{String(n).padStart(3, "0")}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
