"use client";

import { useState } from "react";
import LoadingScreen from "@/components/layout/LoadingScreen";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <LoadingScreen onDone={() => setLoaded(true)} />
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Experience />
        <Contact />
      </div>
    </>
  );
}
