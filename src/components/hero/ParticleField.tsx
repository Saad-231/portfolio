"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number; // depth, 0.2–1 — drives size + opacity for a fake-3D parallax feel
  vx: number;
  vy: number;
  radius: number;
}

const PARTICLE_COUNT = 140;
const GOLD = "201, 162, 75"; // matches the --gold Tailwind token, as an rgb triplet for canvas

/**
 * Ambient decorative particle field behind the hero.
 *
 * This was originally a React Three Fiber / WebGL implementation, but
 * R3F's bundled `react-reconciler` build is tied to specific React
 * internals and breaks with a `ReactCurrentOwner` crash under some
 * React/Next.js dependency resolutions. Since this field is purely
 * decorative (no real 3D geometry, camera or lighting needed — just
 * drifting points), it's implemented here with the plain HTML5 Canvas
 * API instead: zero React-reconciler risk, smaller bundle, and visually
 * indistinguishable from the WebGL version for a starfield of dots.
 */
export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let particles: Particle[] = [];
    let raf = 0;
    let pointerX = 0;
    let pointerY = 0;

    const createParticles = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => {
        const z = 0.2 + Math.random() * 0.8;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          vx: (Math.random() - 0.5) * 0.06 * z,
          vy: (Math.random() - 0.5) * 0.06 * z,
          radius: (0.6 + Math.random() * 1.6) * z,
        };
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = (e.clientX - rect.left) / rect.width - 0.5;
      pointerY = (e.clientY - rect.top) / rect.height - 0.5;
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around the edges so the field feels endless.
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Subtle parallax offset — closer (higher z) particles shift more.
        const offsetX = pointerX * 14 * p.z;
        const offsetY = pointerY * 10 * p.z;

        ctx.beginPath();
        ctx.arc(p.x + offsetX, p.y + offsetY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GOLD}, ${0.15 + p.z * 0.4})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(drawFrame);
    };

    resize();
    window.addEventListener("resize", resize);

    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (isFinePointer) {
      window.addEventListener("mousemove", handlePointerMove);
    }

    if (prefersReducedMotion) {
      // Draw a single static frame instead of a running animation loop.
      drawFrame();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(drawFrame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handlePointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
