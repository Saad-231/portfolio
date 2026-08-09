"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { SKILLS } from "@/lib/data";
import type { SkillItem } from "@/types";

const CATEGORIES: Array<SkillItem["category"] | "All"> = [
  "All",
  "Frontend",
  "Backend",
  "UI/UX",
  "Graphic Design",
  "Game Development",
];

export default function Skills() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("All");

  const filtered = useMemo(
    () => (active === "All" ? SKILLS : SKILLS.filter((s) => s.category === active)),
    [active]
  );

  return (
    <section id="skills" className="relative py-28 sm:py-36">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Capabilities"
          title="A stack built for shipping."
          description="Tools and disciplines I reach for daily — filter to see how they group."
        />

        <div className="mt-10 flex flex-wrap gap-2.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all duration-300 ease-premium ${
                active === cat
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-navy-500 text-bone-muted hover:border-bone/40 hover:text-bone"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="card-panel group relative overflow-hidden p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-mono text-[0.6rem] uppercase tracking-widest text-bone-dim">
                      {skill.category}
                    </p>
                    <p className="mt-2 font-display text-2xl tracking-wide text-bone">
                      {skill.name}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-gold">{skill.level}%</span>
                </div>

                <div className="mt-5 h-px w-full overflow-hidden bg-navy-600">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                    className="h-full bg-gold"
                  />
                </div>

                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold/0 blur-2xl transition-all duration-500 group-hover:bg-gold/10" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
