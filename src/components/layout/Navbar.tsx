"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/data";
import { useLenisContext } from "@/hooks/useLenisContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lenisRef = useLenisContext();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open — stopping Lenis
  // itself, not just toggling CSS overflow, since Lenis drives scroll
  // via JS and would otherwise keep responding to wheel/touch input.
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    if (menuOpen) {
      lenisRef?.current?.stop();
    } else {
      lenisRef?.current?.start();
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen, lenisRef]);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium ${
        scrolled ? "bg-navy-950/80 backdrop-blur-md shadow-panel" : "bg-transparent"
      }`}
    >
      <nav className="section-shell flex h-20 items-center justify-between">
        <a
          href="#hero"
          className="font-display text-2xl tracking-widest text-bone transition-colors hover:text-gold"
          aria-label="Saad Ali — back to top"
        >
          SAAD<span className="text-gold">.</span>
        </a>

        <ul className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative font-mono text-xs uppercase tracking-widest text-bone/70 transition-colors hover:text-bone"
              >
                <span className="mr-1.5 text-gold/60">0{i + 1}</span>
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 ease-premium group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="btn-gold hidden md:inline-flex">
          Let&apos;s Talk
        </a>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="relative z-[70] flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span
            className={`h-px w-6 bg-bone transition-all duration-300 ${
              menuOpen ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-bone transition-all duration-300 ${
              menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 bg-navy-950/98 backdrop-blur-lg md:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 + 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-4xl tracking-wide text-bone transition-colors hover:text-gold"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={handleLinkClick}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.06 + 0.1, duration: 0.4 }}
              className="btn-gold mt-4"
            >
              Let&apos;s Talk
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
