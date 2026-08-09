import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Display face — bold condensed caps, used sparingly for the hero name
// and section numerals. Mirrors the poster-style lettering from the
// original reference photography.
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

// Body face — a clean grotesk for long-form readability.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Utility face — used for eyebrows, labels and data-like captions.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://saadali.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Saad Ali — Full Stack Developer & UI/UX Designer",
    template: "%s — Saad Ali",
  },
  description:
    "Portfolio of Saad Ali, a full stack developer, UI/UX designer and graphic designer crafting digital experiences that inspire — from React & Next.js products to Three.js-driven interactive websites.",
  keywords: [
    "Saad Ali",
    "Full Stack Developer",
    "UI/UX Designer",
    "Graphic Designer",
    "React Developer",
    "Next.js Portfolio",
    "Three.js Developer",
    "Software Engineer Pakistan",
  ],
  authors: [{ name: "Saad Ali", url: SITE_URL }],
  creator: "Saad Ali",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Saad Ali — Full Stack Developer & UI/UX Designer",
    description:
      "Crafting digital experiences that inspire — full stack development, UI/UX and graphic design.",
    siteName: "Saad Ali Portfolio",
    images: [{ url: "/images/hero-suit.jpg", width: 1200, height: 630, alt: "Saad Ali" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saad Ali — Full Stack Developer & UI/UX Designer",
    description: "Crafting digital experiences that inspire.",
    images: ["/images/hero-suit.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0e1a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        {/* Lenis smooth-scroll wraps the whole page so every anchor,
            ScrollTrigger and native scroll event stays perfectly in sync. */}
        <SmoothScroll>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
