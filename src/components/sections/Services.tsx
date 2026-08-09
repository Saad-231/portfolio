"use client";

import { motion } from "framer-motion";
import type { ElementType } from "react";
import { FiCode, FiLayout, FiBox, FiFeather, FiPlayCircle } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import { SERVICES } from "@/lib/data";

const ICONS: Record<string, ElementType> = {
  code: FiCode,
  layout: FiLayout,
  cube: FiBox,
  palette: FiFeather,
  gamepad: FiPlayCircle,
};

export default function Services() {
  return (
    <section id="services" className="relative py-28 sm:py-36">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Services"
          title="How I can help."
          description="From first sketch to production deployment."
        />

        <div className="mt-16 grid grid-cols-1 divide-y divide-navy-600/60 border-y border-navy-600/60 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon] ?? FiCode;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col gap-5 p-8 transition-colors duration-500 hover:bg-navy-800/40"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-gold/70">{service.index}</span>
                  <Icon
                    size={22}
                    className="text-bone-dim transition-colors duration-500 group-hover:text-gold"
                  />
                </div>
                <h3 className="font-display text-2xl tracking-wide text-bone">{service.title}</h3>
                <p className="text-sm leading-relaxed text-bone-muted">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
