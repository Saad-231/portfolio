"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  as?: "a" | "button";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  target?: string;
  rel?: string;
}

/**
 * Wraps interactive elements with a subtle magnetic pull toward the
 * cursor — a small, deliberate micro-interaction rather than scattered
 * hover effects everywhere. Renders an explicit <a> or <button> branch
 * (rather than a dynamic component) to keep prop types simple and safe.
 */
export default function MagneticButton({
  children,
  className,
  as = "button",
  href,
  onClick,
  type = "button",
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.25, y: y * 0.25 });
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.3 }}
      className="inline-block"
    >
      {as === "a" ? (
        <a href={href} target={target} rel={rel} className={className}>
          {children}
        </a>
      ) : (
        <button type={type} onClick={onClick} className={className}>
          {children}
        </button>
      )}
    </motion.div>
  );
}
