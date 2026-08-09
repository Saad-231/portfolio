"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

/**
 * Consistent section header used across About / Skills / Projects /
 * Services / Contact — keeps typography rhythm identical site-wide.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="eyebrow mb-4"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className="font-display text-clamp-h2 leading-[0.95] tracking-tight text-bone"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          className={`mt-5 max-w-xl text-base leading-relaxed text-bone-muted ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
