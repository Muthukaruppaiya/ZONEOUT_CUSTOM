import { motion } from "framer-motion";
import { steps } from "../data/site.js";

export default function Process() {
  return (
    <section className="section" id="process">
      <div className="section-head">
        <div>
          <p className="eyebrow">04 — Process</p>
          <h2>From brief to ride.</h2>
        </div>
        <p className="lede">
          Five passes through the shop. The bike does not skip a step because the calendar got loud.
        </p>
      </div>
      <ol className="process-list">
        <motion.span
          className="process-line"
          aria-hidden="true"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
        {steps.map((step, index) => (
          <motion.li
            key={step.num}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
          >
            <span>{step.num}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
