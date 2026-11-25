import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { nav } from "../data/site.js";

export default function Nav() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={`nav${stuck || pathname !== "/" ? " is-stuck" : ""}${open ? " is-open" : ""}`}>
      <Link className="logo" to="/" aria-label="Zoneout Customs — home">
        <img src="/logo.png" alt="" width="48" height="48" />
        <span className="logo-text">
          <b>
            Zone<i>out</i>
          </b>
          <span>Customs</span>
        </span>
      </Link>
      <nav className="nav-links" aria-label="Primary">
        {nav.map((item) => (
          <NavLink key={item.to} to={item.to}>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <Link className="btn btn-small" to="/contact">
        Book a build
      </Link>
      <button
        type="button"
        className="burger"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            className="menu"
            aria-label="Mobile"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          >
            {[{ to: "/", label: "Home" }, ...nav].map((item, index) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + index * 0.05 }}
              >
                <NavLink to={item.to} end={item.to === "/"} onClick={() => setOpen(false)}>
                  {item.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
