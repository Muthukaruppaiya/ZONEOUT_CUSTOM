import { useEffect } from "react";
import { BrowserRouter, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { MotionConfig, motion, useScroll, useSpring } from "framer-motion";
import Loader from "./components/Loader.jsx";
import Cursor from "./components/Cursor.jsx";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import VideosPage from "./pages/VideosPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import FleetPage from "./pages/FleetPage.jsx";
import { instagram, shop } from "./data/site.js";

// Search engines read this to show the shop as a local business.
const business = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: shop.name,
  description: "Custom motorcycle builds and modifications: fabrication, paint, performance, and wiring.",
  email: shop.email,
  ...(shop.phone && { telephone: shop.phone }),
  ...(shop.address && { address: shop.address }),
  ...(instagram.profile && { sameAs: [instagram.profile] }),
  openingHours: "Mo-Sa 10:00-19:00",
};

function Progress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });
  return <motion.div className="progress" style={{ scaleX }} />;
}

/** New page → top of page; same-page #hash → that section. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
}

function Layout() {
  const { pathname } = useLocation();
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Loader />
      <Cursor />
      <Progress />
      <ScrollManager />
      <Nav />
      <motion.main
        id="main"
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
        <Outlet />
      </motion.main>
      <Footer />
      <script type="application/ld+json">{JSON.stringify(business)}</script>
    </>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="videos" element={<VideosPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="smart-fleet" element={<FleetPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  );
}
