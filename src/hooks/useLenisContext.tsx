"use client";

import { createContext, useContext, type RefObject } from "react";
import type Lenis from "@studio-freight/lenis";

/**
 * Exposes the app's single Lenis instance to any component that needs to
 * pause/resume smooth scrolling — e.g. the mobile nav menu, which must
 * stop Lenis (not just toggle CSS overflow) to fully lock scrolling,
 * since Lenis drives scroll via JS rather than native overflow.
 */
export const LenisContext = createContext<RefObject<Lenis | null> | null>(null);

export function useLenisContext() {
  return useContext(LenisContext);
}
