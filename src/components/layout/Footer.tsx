"use client";

import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from "react-icons/fi";
import { NAV_LINKS, SOCIALS } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-navy-600/60 bg-navy-950">
      <div className="section-shell py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#hero" className="font-display text-3xl tracking-widest text-bone">
              SAAD<span className="text-gold">.</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-bone-muted">
              Full stack developer &amp; UI/UX designer crafting digital experiences that
              inspire — from interactive 3D websites to production-grade web apps.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href={SOCIALS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-500 text-bone/70 transition-all duration-300 hover:border-gold hover:text-gold"
              >
                <FiGithub size={18} />
              </a>
              <a
                href={SOCIALS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-500 text-bone/70 transition-all duration-300 hover:border-gold hover:text-gold"
              >
                <FiLinkedin size={18} />
              </a>
              <a
                href={`mailto:${SOCIALS.email}`}
                aria-label="Email"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-500 text-bone/70 transition-all duration-300 hover:border-gold hover:text-gold"
              >
                <FiMail size={18} />
              </a>
            </div>
          </div>

          <div>
            <p className="eyebrow mb-5">Navigate</p>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-bone-muted transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5">Get in Touch</p>
            <a
              href={`mailto:${SOCIALS.email}`}
              className="block break-all text-sm text-bone-muted transition-colors hover:text-gold"
            >
              {SOCIALS.email}
            </a>
            <p className="mt-3 text-sm text-bone-muted">Based in Pakistan — available worldwide</p>
          </div>
        </div>

        <div className="hairline my-10" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-mono text-xs text-bone-dim">
            &copy; {year} Saad Ali. All rights reserved.
          </p>
          <a
            href="#hero"
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-bone-muted transition-colors hover:text-gold"
          >
            Back to top
            <FiArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
