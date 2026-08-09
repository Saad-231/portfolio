"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const HERO_IMAGES = ["/images/hero-shirt.jpg", "/images/hero-waistcoat.jpg", "/images/hero-suit.jpg"];

/**
 * Full-screen loading sequence shown while the three hero portrait
 * frames preload. Counts real load progress rather than faking a timer,
 * so slow connections still get an accurate percentage.
 */
export default function LoadingScreen({ onDone }: { onDone?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let loaded = 0;
    const total = HERO_IMAGES.length;

    const finish = () => {
      setProgress(100);
      window.setTimeout(() => {
        setVisible(false);
        onDone?.();
      }, 500);
    };

    if (total === 0) {
      finish();
      return;
    }

    HERO_IMAGES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      const handleSettled = () => {
        loaded += 1;
        setProgress(Math.round((loaded / total) * 100));
        if (loaded === total) finish();
      };
      img.onload = handleSettled;
      img.onerror = handleSettled;
    });

    // Safety net — never block the site for more than 4s.
    const fallback = window.setTimeout(finish, 4000);
    return () => window.clearTimeout(fallback);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy-950"
        >
          <div className="flex flex-col items-center gap-8">
            <motion.span
              initial={{ letterSpacing: "0.1em", opacity: 0 }}
              animate={{ letterSpacing: "0.35em", opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-3xl text-bone"
            >
              SAAD ALI
            </motion.span>

            <div className="relative h-px w-56 overflow-hidden bg-navy-600">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gold"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            <span className="font-mono text-xs tracking-widest text-bone-dim">
              {String(progress).padStart(3, "0")}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
