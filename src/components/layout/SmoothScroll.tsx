"use client";

import { useLenis } from "@/hooks/useLenis";
import { LenisContext } from "@/hooks/useLenisContext";

/**
 * Thin client-side wrapper that boots Lenis smooth scrolling for the
 * whole app and shares the instance via context so descendants (e.g. the
 * mobile menu) can pause/resume it. Kept as its own component so
 * `layout.tsx` can stay a server component wherever possible.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useLenis();
  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>;
}
