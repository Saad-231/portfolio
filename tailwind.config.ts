import type { Config } from "tailwindcss";

// Design tokens for the "Tailored" identity — a portfolio that borrows its
// visual language from bespoke tailoring: precise measurements, structured
// grids, and a navy + gold palette lifted from the hero photography itself.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#05070d", // deepest background
          900: "#0a0e1a", // primary background
          800: "#0f1524", // panel background
          700: "#161d31", // elevated panel
          600: "#212a44", // borders / dividers
          500: "#374262", // muted borders
        },
        gold: {
          400: "#e8c976",
          DEFAULT: "#c9a24b", // primary accent
          600: "#a9853a", // pressed / dark accent
        },
        bone: {
          DEFAULT: "#f3f1ea", // primary text on dark
          muted: "#a8adbd", // secondary text
          dim: "#6b7184", // tertiary text / captions
        },
        wine: "#5c2430", // secondary accent, echoes the tie in the suit photo
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "clamp-hero": "clamp(3.5rem, 10vw, 9rem)",
        "clamp-h2": "clamp(2.25rem, 5vw, 4.5rem)",
        "clamp-h3": "clamp(1.5rem, 3vw, 2.25rem)",
      },
      letterSpacing: {
        tightest: "-0.04em",
        widest2: "0.35em",
      },
      backgroundImage: {
        "radial-fade": "radial-gradient(circle at center, var(--tw-gradient-stops))",
        "noise": "url('/images/noise.png')",
      },
      boxShadow: {
        gold: "0 0 40px -10px rgba(201, 162, 75, 0.35)",
        panel: "0 20px 60px -20px rgba(0, 0, 0, 0.6)",
      },
      transitionTimingFunction: {
        "premium": "cubic-bezier(0.16, 1, 0.3, 1)",
        "swift": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      animation: {
        "spin-slow": "spin 14s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "marquee": "marquee 32s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      screens: {
        xs: "420px",
      },
    },
  },
  plugins: [],
};

export default config;
