"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import DressingSequence from "./DressingSequence";
import MagneticButton from "@/components/ui/MagneticButton";

const ROLES = ["Full Stack Developer", "UI/UX Designer", "Graphic Designer"];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headingTiltRef = useRef<HTMLDivElement>(null);
  const headingDepthRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // Rotate the subtitle roles at a slow, deliberate pace.
  useEffect(() => {
    const id = window.setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  // Premium 3D typography, part 1: the heading tilts gently toward the
  // cursor — a subtle perspective response, not a gimmick.
  useEffect(() => {
    const stage = stageRef.current;
    const tiltEl = headingTiltRef.current;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!stage || !tiltEl || !isFinePointer || prefersReducedMotion) return;

    const quickX = gsap.quickTo(tiltEl, "rotateY", { duration: 0.9, ease: "power3.out" });
    const quickY = gsap.quickTo(tiltEl, "rotateX", { duration: 0.9, ease: "power3.out" });

    const handleMove = (e: MouseEvent) => {
      const rect = stage.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      quickX(relX * 8);
      quickY(-relY * 6);
    };

    stage.addEventListener("mousemove", handleMove);
    return () => stage.removeEventListener("mousemove", handleMove);
  }, []);

  // Premium 3D typography, part 2: as the dressing sequence plays, the
  // heading recedes slightly — scroll-driven depth rather than a static title.
  useEffect(() => {
    if (!containerRef.current || !headingDepthRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(headingDepthRef.current, {
        scale: 0.93,
        y: -22,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" aria-label="Introduction" className="relative">
      {/* Tall scroll driver — its height determines how much scroll
          distance the dressing sequence gets before releasing the pin. */}
      <div ref={containerRef} className="relative h-[400vh]">
        <div ref={stageRef} className="sticky top-0 h-screen w-full overflow-hidden bg-navy-900">
          {/* Ambient depth layers — soft drifting light in place of particles. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className="animate-float absolute -left-32 top-[-10%] h-[520px] w-[520px] rounded-full opacity-[0.16] blur-[110px]"
              style={{ background: "#c9a24b", animationDuration: "11s" }}
            />
            <div
              className="animate-float absolute -right-40 bottom-[-15%] h-[460px] w-[460px] rounded-full opacity-[0.14] blur-[110px]"
              style={{ background: "#5c2430", animationDuration: "14s", animationDelay: "-4s" }}
            />
          </div>

          {/* Radial vignette for cinematic depth */}
          <div className="pointer-events-none absolute inset-0 bg-radial-fade from-transparent via-transparent to-navy-950/80" />

          <div className="section-shell relative z-10 grid h-full grid-cols-1 items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
            {/* Text column */}
            <div className="order-2 pb-10 pt-28 lg:order-1 lg:pb-0 lg:pt-0">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="eyebrow mb-6"
              >
                Portfolio — 2026
              </motion.p>

              {/* Scroll-driven depth wrapper */}
              <div ref={headingDepthRef} style={{ transformOrigin: "left center" }}>
                {/* Cursor-tilt wrapper */}
                <div
                  ref={headingTiltRef}
                  className="relative will-change-transform"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Layered ghost text — a soft gold duplicate offset in
                      depth behind the real heading, for a tasteful extruded feel.
                      A <div>, not a second <h1>, so page heading structure/SEO is untouched.
                      Its permanent 6px/8px depth offset is folded into the entrance
                      animation's resting x value (not a separate static transform),
                      since Framer Motion owns this element's transform once animated. */}
                  <motion.div
                    aria-hidden="true"
                    initial={{ opacity: 0, x: -84 }}
                    animate={{ opacity: 0.14, x: 6 }}
                    transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="pointer-events-none absolute inset-0 top-2 select-none font-display text-clamp-hero leading-[0.88] tracking-tightest text-gold blur-[2px]"
                  >
                    SAAD
                    <br />
                    ALI
                  </motion.div>

                  {/* Heading enters as a single, deliberate cinematic move —
                      sliding in from the left with a soft depth-of-field
                      settle (blur + scale), not a flashy per-letter reveal. */}
                  <h1 className="relative font-display text-clamp-hero leading-[0.88] tracking-tightest text-bone">
                    <motion.span
                      initial={{ opacity: 0, x: -90, scale: 0.95, filter: "blur(10px)" }}
                      animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
                      transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-block"
                    >
                      SAAD
                    </motion.span>
                    <br />
                    <motion.span
                      initial={{ opacity: 0, x: -90, scale: 0.95, filter: "blur(10px)" }}
                      animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
                      transition={{ duration: 1.1, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-block text-transparent text-stroke-gold"
                    >
                      ALI
                    </motion.span>
                  </h1>
                </div>
              </div>

              {/* Subtitle — enters from the opposite side of the heading.
                  This outer wrapper handles only the one-time page-load
                  entrance; the AnimatePresence block inside it keeps its
                  existing vertical flip whenever the role text rotates. */}
              <motion.div
                initial={{ opacity: 0, x: 70, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
                className="mt-7 h-8 overflow-hidden"
              >
                <motion.div
                  key={roleIndex}
                  initial={{ y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -28, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="font-mono text-sm uppercase tracking-widest text-gold sm:text-base"
                >
                  {ROLES[roleIndex]}
                </motion.div>
              </motion.div>

              {/* Supporting text — same "opposite side" entrance as the
                  subtitle above, staggered slightly after it. */}
              <motion.p
                initial={{ opacity: 0, x: 70, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 max-w-md text-sm leading-relaxed text-bone-muted sm:text-base"
              >
                Crafting digital experiences that inspire — scroll to watch the fit come
                together, one layer at a time.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
                className="mt-9 flex flex-wrap items-center gap-4"
              >
                <MagneticButton as="a" href="#projects" className="btn-gold">
                  View Work
                </MagneticButton>
                <MagneticButton as="a" href="#contact" className="btn-ghost">
                  Contact Me
                </MagneticButton>
              </motion.div>
            </div>

            {/* Visual column — the dressing sequence */}
            <div className="order-1 flex h-[56vh] items-center justify-center lg:order-2 lg:h-full">
              <DressingSequence containerRef={containerRef} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
