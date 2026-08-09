"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/RevealText";

const FACTS = [
  { label: "Focus", value: "Full Stack & 3D Web" },
  { label: "Based In", value: "Pakistan" },
  { label: "Experience", value: "3+ Years" },
  { label: "Availability", value: "Open to Work" },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="section-shell">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <Reveal>
            <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-navy-600">
              <Image
                src="/images/hero-waistcoat.jpg"
                alt="Saad Ali, Software Engineer"
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover object-top grayscale transition-all duration-700 hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="About Me"
              title="Engineering and design, treated as one discipline."
            />

            <Reveal delay={0.15} className="mt-8 space-y-5 text-base leading-relaxed text-bone-muted">
              <p>
                I&apos;m Saad Ali, a full stack developer and designer who builds products from
                the interface down to the database. My work sits at the intersection of clean
                engineering and considered visual design — I care as much about how a button
                feels to press as I do about the API behind it.
              </p>
              <p>
                Over the past few years I&apos;ve shipped web applications, interactive 3D
                experiences and brand identities for clients and personal projects alike,
                working across React, Next.js, Node.js and Unity — always with the same
                standard: it should look intentional and run fast.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {FACTS.map((fact, i) => (
                  <motion.div
                    key={fact.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="border-l border-gold/40 pl-4"
                  >
                    <p className="font-mono text-[0.65rem] uppercase tracking-widest text-bone-dim">
                      {fact.label}
                    </p>
                    <p className="mt-1.5 text-sm text-bone">{fact.value}</p>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
