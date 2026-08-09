"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import { PROJECTS } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 sm:py-36">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Selected Work"
          title="A few projects worth a closer look."
          description="Case studies spanning interactive 3D, full stack products and brand systems."
        />

        <div className="mt-16 flex flex-col gap-24">
          {PROJECTS.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-navy-600">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover object-top transition-transform duration-700 ease-premium group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent" />
                <div className="absolute bottom-5 left-5 font-mono text-xs uppercase tracking-widest text-bone/70">
                  {project.year}
                </div>
              </div>

              <div>
                <p className="eyebrow mb-3">
                  {String(i + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
                </p>
                <h3 className="font-display text-3xl tracking-wide text-bone sm:text-4xl">
                  {project.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-bone-muted">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-navy-500 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-bone-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex items-center gap-4">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-gold">
                      Live Demo <FiArrowUpRight size={14} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost"
                    >
                      <FiGithub size={14} /> GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
