"use client";

import { useEffect, useRef, type RefObject } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const STAGES = [
  { id: "shirt", label: "Shirt", src: "/images/hero-shirt.jpg" },
  { id: "waistcoat", label: "Waistcoat", src: "/images/hero-waistcoat.jpg" },
  { id: "suit", label: "Full three-piece suit", src: "/images/hero-suit.jpg" },
] as const;

interface DressingSequenceProps {
  /** The tall outer wrapper that defines the scroll distance for this sequence. */
  containerRef: RefObject<HTMLDivElement>;
}

/**
 * The site's signature element: three real portrait frames of Saad —
 * shirt, waistcoat, full three-piece suit — crossfaded in sequence as the
 * visitor scrolls, driven by GSAP ScrollTrigger and scrubbed against the
 * tall wrapper supplied by <Hero />.
 *
 * ALIGNMENT-SAFE 3D DESIGN — read before changing the timeline:
 * The three source photos are pre-aligned at the asset level (face
 * position + size matched frame-to-frame). To guarantee that alignment
 * never breaks visually, the "turn" during each transition is applied
 * to a single shared wrapper (`turnRef`) around the whole frame stack,
 * NOT to the individual photos. That means whichever photo (or photos,
 * mid-crossfade) is on screen at any instant always shares the exact
 * same rotateY value — there is no moment where two differently-tilted
 * faces could appear to swim past each other. Only opacity / scale /
 * blur vary per-photo; rotation is a single rigid transform shared by
 * everything, which is what makes it safe.
 *
 * Depth is built from four stacked layers, back to front:
 *   1. `auraRef`    — soft blurred backdrop glow (background parallax)
 *   2. `groundGlowRef` / `shadowRef` — ambient floor light + contact shadow
 *   3. `turnRef`     — the framed photo stack itself
 *   4. `glassRef`    — a glossy diagonal highlight (foreground parallax)
 * Layers 1 and 4 move at different rates on pointer movement, which is
 * what sells the parallax illusion of physical depth between them.
 */
export default function DressingSequence({ containerRef }: DressingSequenceProps) {
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sweepRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const turnRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);

  // Scroll-scrubbed crossfade: opacity/scale/blur per photo, plus a single
  // shared 3D "turn" and a correlated shadow — see the alignment note above.
  useEffect(() => {
    if (!containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const frames = frameRefs.current;

      gsap.set(frames[0], { opacity: 1, scale: 1, filter: "blur(0px)" });
      gsap.set(frames[1], { opacity: 0, scale: 1.045, filter: "blur(3px)" });
      gsap.set(frames[2], { opacity: 0, scale: 1.045, filter: "blur(3px)" });
      gsap.set(turnRef.current, { rotateY: 0, transformOrigin: "50% 50%" });
      gsap.set(shadowRef.current, { scaleX: 1, opacity: 0.55 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      const addSegment = (outIdx: number, inIdx: number, at: number) => {
        const out = frames[outIdx];
        const incoming = frames[inIdx];

        // Outgoing photo: fades and softens — blur rises as it leaves.
        tl.to(out, { opacity: 0, scale: 0.97, filter: "blur(3px)", duration: 0.62, ease: "power3.in" }, at)
          // Incoming photo: settles into focus as it arrives.
          .to(incoming, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.7, ease: "power2.out" }, at + 0.18)
          // The shared rigid "turn" — dips away, then returns. Both photos
          // ride this same value, so alignment holds through the whole move.
          .to(turnRef.current, { rotateY: -7, duration: 0.5, ease: "power2.in" }, at)
          .to(turnRef.current, { rotateY: 0, duration: 0.5, ease: "expo.out" }, at + 0.5)
          // Contact shadow correlates with the turn — narrows and lightens
          // as the frame tilts away, like it's catching the light differently.
          .to(shadowRef.current, { scaleX: 0.8, opacity: 0.32, duration: 0.5, ease: "sine.in" }, at)
          .to(shadowRef.current, { scaleX: 1, opacity: 0.55, duration: 0.5, ease: "sine.out" }, at + 0.5)
          // Backdrop aura breathes gently — a subtle shift in ambient light,
          // timed to the same dip-then-settle shape as the turn/shadow above.
          .to(auraRef.current, { scale: 1.08, opacity: 0.22, duration: 0.5, ease: "sine.in" }, at)
          .to(auraRef.current, { scale: 1, opacity: 0.15, duration: 0.5, ease: "sine.out" }, at + 0.5);
      };

      addSegment(0, 1, 0.28);
      addSegment(1, 2, 1.28);

      // Single continuous light-sweep line, reused for every transition.
      // Range is -120% to 320% of the element's own width (it's w-1/3 of
      // the frame): -120 guarantees it starts fully off-frame on the left,
      // 320 guarantees it ends fully off-frame on the right (see the
      // geometry note above the JSX for the exact math). Each segment's
      // sweep is scheduled strictly after the previous one has already
      // finished (0.28→1.20, then 1.28→2.20), so the line always fully
      // exits before the next transition's line begins.
      tl.fromTo(
        sweepRef.current,
        { xPercent: -120, opacity: 0 },
        { xPercent: 320, opacity: 1, duration: 0.92, ease: "sine.inOut" },
        0.28
      ).fromTo(
        sweepRef.current,
        { xPercent: -120, opacity: 0 },
        { xPercent: 320, opacity: 1, duration: 0.92, ease: "sine.inOut" },
        1.28
      );
    });

    return () => ctx.revert();
  }, [containerRef]);

  // Pointer-driven layered parallax — independent of the scroll timeline.
  // Each layer moves at a different rate/direction to sell physical depth:
  // the backdrop drifts opposite and slower, the glass sheen moves with
  // and faster than the cursor, the frame itself just tilts as a whole.
  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || prefersReducedMotion || !visualRef.current) return;

    const el = visualRef.current;
    const quickTiltY = gsap.quickTo(el, "rotateY", { duration: 0.8, ease: "power3.out" });
    const quickTiltX = gsap.quickTo(el, "rotateX", { duration: 0.8, ease: "power3.out" });
    const quickAuraX = auraRef.current ? gsap.quickTo(auraRef.current, "x", { duration: 1.1, ease: "power3.out" }) : null;
    const quickAuraY = auraRef.current ? gsap.quickTo(auraRef.current, "y", { duration: 1.1, ease: "power3.out" }) : null;
    const quickGlassX = glassRef.current ? gsap.quickTo(glassRef.current, "x", { duration: 0.55, ease: "power3.out" }) : null;
    const quickGlassY = glassRef.current ? gsap.quickTo(glassRef.current, "y", { duration: 0.55, ease: "power3.out" }) : null;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      quickTiltY(relX * 6);
      quickTiltX(-relY * 6);
      quickAuraX?.(relX * -16);
      quickAuraY?.(relY * -12);
      quickGlassX?.(relX * 28);
      quickGlassY?.(relY * 20);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="relative flex h-full w-full items-center justify-center" style={{ perspective: 1400 }}>
      <div
        ref={visualRef}
        className="relative aspect-[5/7] h-[46vh] max-h-[560px] w-auto will-change-transform sm:h-[58vh] lg:h-[78vh] lg:max-h-[720px]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Layer 1 — background parallax: soft ambient backdrop glow.
            No z-index needed — it's the first sibling among stacked
            position:absolute layers, so plain DOM order already paints
            it behind everything that follows. */}
        <div
          ref={auraRef}
          aria-hidden="true"
          className="absolute -inset-10 rounded-[2.5rem] opacity-[0.15] blur-3xl will-change-transform"
          style={{
            background:
              "radial-gradient(closest-side, #c9a24b, rgba(92,36,48,0.6) 65%, transparent 100%)",
          }}
        />

        {/* Layer 2a — ambient floor light beneath the frame */}
        <div
          aria-hidden="true"
          className="absolute -bottom-8 left-1/2 h-16 w-[70%] -translate-x-1/2 rounded-full opacity-40 blur-2xl"
          style={{ background: "radial-gradient(closest-side, #c9a24b, transparent 75%)" }}
        />

        {/* Layer 2b — contact shadow, correlated with the scroll-driven turn */}
        <div
          ref={shadowRef}
          aria-hidden="true"
          className="absolute -bottom-5 left-1/2 h-6 w-[60%] -translate-x-1/2 rounded-full bg-black blur-xl will-change-transform"
        />

        {/* Layer 3 — the framed photo stack; this is the only element
            that carries the shared 3D "turn" during transitions.
            No box-shadow here by design — the drop shadow previously
            applied directly to this frame has been removed. The ambient
            contact shadow/floor glow/aura layers around it are separate
            elements and are unaffected. */}
        <div
          ref={turnRef}
          className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-gold/20 will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
        >
          {STAGES.map((stage, i) => (
            <div
              key={stage.id}
              ref={(el) => {
                frameRefs.current[i] = el;
              }}
              className="absolute inset-0"
            >
              <Image
                src={stage.src}
                alt={`Saad Ali — ${stage.label}`}
                fill
                priority={i === 0}
                sizes="(max-width: 768px) 90vw, 45vw"
                className="object-cover object-top"
              />
              {/* Cinematic vignette for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-navy-950/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-950/30 via-transparent to-transparent" />
            </div>
          ))}

          {/* Single light-sweep line, reused for every transition — see
              the geometry note in the effect above for why the travel
              range is -120%/320% rather than a symmetric -120%/120%. */}
          <div
            ref={sweepRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-1/3 mix-blend-screen opacity-0"
            style={{
              background:
                "linear-gradient(105deg, transparent 0%, rgba(232,201,118,0.35) 45%, transparent 100%)",
            }}
          />
        </div>

        {/* Layer 4 — foreground parallax: a glossy diagonal highlight,
            like light catching glass over the frame. Moves opposite the
            backdrop and further than the frame itself on pointer move. */}
        <div
          ref={glassRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[1.75rem] mix-blend-overlay will-change-transform"
          style={{
            background:
              "linear-gradient(115deg, rgba(255,255,255,0.22) 0%, transparent 22%, transparent 78%, rgba(255,255,255,0.1) 100%)",
          }}
        />
      </div>
    </div>
  );
}
