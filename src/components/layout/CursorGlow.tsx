"use client";

import { useEffect, useRef } from "react";

/**
 * A soft gold glow that trails the cursor on fine-pointer (desktop)
 * devices. Purely decorative — skipped entirely on touch devices and
 * for users who prefer reduced motion.
 */
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || prefersReducedMotion) return;

    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let raf = 0;

    const handleMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.06] mix-blend-screen will-change-transform md:block"
      style={{
        background: "radial-gradient(circle, #c9a24b 0%, transparent 70%)",
      }}
    />
  );
}
