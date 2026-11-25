import { motion } from "framer-motion";

export default function PageHeader({ eyebrow, title, lede, image, children }) {
  return (
    <header className={`page-head${image ? " has-image" : ""}`}>
      {image && (
        <div className="page-head-media" aria-hidden="true">
          <img src={image} alt="" />
        </div>
      )}
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {eyebrow}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </motion.h1>
      <div className="page-head-foot">
        {lede && (
          <motion.p
            className="lede"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            {lede}
          </motion.p>
        )}
        {children}
      </div>
    </header>
  );
}
