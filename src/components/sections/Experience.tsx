"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { EXPERIENCE } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 sm:py-36">
      <div className="section-shell">
        <SectionHeading eyebrow="Journey" title="Where the work has taken me." />

        <div className="mt-16 flex flex-col">
          {EXPERIENCE.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group grid grid-cols-1 gap-3 border-t border-navy-600/60 py-8 last:border-b sm:grid-cols-[140px_1fr_auto] sm:items-center sm:gap-8"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-gold">
                {item.period}
              </span>
              <div>
                <h3 className="font-display text-2xl tracking-wide text-bone">{item.role}</h3>
                <p className="mt-1 text-sm text-bone-muted">{item.organization}</p>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-bone-muted/80">
                  {item.description}
                </p>
              </div>
              <span className="hidden h-2 w-2 rounded-full bg-navy-500 transition-colors duration-500 group-hover:bg-gold sm:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
