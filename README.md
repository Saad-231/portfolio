# Saad Ali — Portfolio

A premium, interactive portfolio built with Next.js 15, TypeScript, Tailwind
CSS, GSAP and Lenis smooth scroll. The signature hero sequence crossfades
three real, face-aligned portrait frames (shirt → waistcoat → full
three-piece suit) in sync with scroll, driven by GSAP ScrollTrigger, with
subtle 3D depth on the transitions and on the heading typography itself.

## Tech Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** — navy + gold design system (see `tailwind.config.ts`)
- **GSAP** + **ScrollTrigger** — the scroll-driven dressing sequence and
  cursor/scroll-reactive hero typography
- **Lenis** — smooth scroll, synced to GSAP's ticker
- **Framer Motion** — page/section micro-interactions
- **EmailJS** — contact form delivery (no custom backend required)

> **No WebGL / Three.js / React Three Fiber anywhere in this project.**
> The hero's depth and motion are built entirely from CSS 3D transforms
> (`perspective`, `rotateX/Y`, `translateZ`), GSAP and Framer Motion. This
> is intentional — R3F's bundled `react-reconciler` is tied to specific
> React internals and previously caused a `ReactCurrentOwner` crash under
> some dependency resolutions. Rebuilding the same depth with CSS
> transforms removes that entire class of risk and keeps the bundle
> smaller, with no visual compromise.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the contact form (EmailJS)

The contact form sends email client-side via EmailJS — no server needed.

1. Create a free account at [emailjs.com](https://www.emailjs.com).
2. **Email Services** → add a service (e.g. connect your Gmail) → copy the
   **Service ID**.
3. **Email Templates** → create a template. It should include these
   variables, which match the form field names in
   `src/components/sections/Contact.tsx`:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{message}}`

   Copy the **Template ID**.
4. **Account → General** → copy your **Public Key**.
5. Copy the env example file and fill in your three values:

   ```bash
   cp .env.local.example .env.local
   ```

   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx
   ```

6. Restart the dev server after editing `.env.local`.

Until real credentials are added, submitting the form will show a clear
inline error instead of failing silently — see `src/lib/emailjs.ts`.

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Type-check, lint & build

```bash
npm run type-check
npm run lint
npm run build
npm run start   # serve the production build locally
```

> These four commands have **not** been executed in the environment this
> project was assembled in (it has no network access, so `npm install`
> itself cannot run there — see "How this was verified" below). Every
> file has been manually reviewed for bracket/paren balance, import
> resolution, unused imports, and TypeScript type-shape correctness, but
> please run this sequence yourself before deploying, and treat it as the
> real source of truth.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout — fonts, metadata, Navbar/Footer
│   ├── page.tsx             # Home page — composes every section
│   ├── globals.css          # Design tokens, base styles, utility classes
│   ├── sitemap.ts           # Dynamic sitemap.xml
│   ├── robots.ts            # robots.txt
│   ├── not-found.tsx        # Custom 404
│   └── favicon.ico
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx        # Responsive nav with mobile menu
│   │   ├── Footer.tsx        # Social links + sitemap
│   │   ├── SmoothScroll.tsx  # Lenis provider
│   │   └── LoadingScreen.tsx # Preloads hero images, shows real progress
│   ├── hero/
│   │   ├── Hero.tsx              # Heading (3D tilt + depth), CTAs, scroll driver
│   │   └── DressingSequence.tsx  # The signature crossfade sequence
│   ├── sections/
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Services.tsx
│   │   ├── Experience.tsx
│   │   └── Contact.tsx
│   └── ui/
│       ├── SectionHeading.tsx
│       ├── MagneticButton.tsx
│       └── RevealText.tsx
├── hooks/
│   ├── useLenis.ts          # Lenis + GSAP ScrollTrigger sync
│   └── useLenisContext.tsx  # Shares the Lenis instance (mobile menu scroll-lock, etc.)
├── lib/
│   ├── data.ts               # ALL editable content lives here
│   └── emailjs.ts            # EmailJS send wrapper
└── types/
    └── index.ts              # Shared TypeScript interfaces
```

## The Hero, in Detail

- **Dressing sequence** (`DressingSequence.tsx`): the three source photos
  in `public/images/` (`hero-shirt.jpg`, `hero-waistcoat.jpg`,
  `hero-suit.jpg`) are pre-aligned at the asset level — face position and
  size matched frame-to-frame — so the crossfade only has to handle
  opacity/scale/rotation, not a compensating position shift. Each
  transition also carries a subtle `rotateY` turn, clipped within the
  rounded frame, for cinematic 3D depth. If you replace these images with
  new photography, re-align them (matching face position/size across all
  three) before dropping them in, or the "head jump" issue this fixed
  will come back.
- **Hero typography** (`Hero.tsx`): the heading tilts toward the cursor
  (GSAP `quickTo` on `rotateX`/`rotateY`), has a soft blurred gold
  duplicate layered behind it for an extruded-depth look, and scales
  down slightly as you scroll through the dressing sequence — all via
  CSS 3D transforms, no canvas or WebGL involved.
- **Ambient background**: two large, softly blurred, slowly drifting
  gradient shapes (pure CSS, `animate-float` keyframe) stand in for what
  was previously a particle canvas — same sense of ambient depth, no JS
  animation loop.

## Editing Content

Almost everything you'd want to change — skills, projects, services,
experience, social links — lives in **`src/lib/data.ts`**. Update the
arrays there; no component code needs to change.

The three project thumbnails in `public/images/` (`project-novascribe.jpg`,
`project-hubspot-clone.jpg`, `project-saad-portfolio.jpg`) are original
UI mockups designed for this project — not real product screenshots.
Swap them for actual screenshots of the live projects whenever you have
them.

## Performance Notes

- Hero images are preloaded by the loading screen and served through
  `next/image` (AVIF/WebP, responsive `sizes`) everywhere else.
- Lenis is synced to GSAP's ticker so there is only one animation loop
  driving scroll — not two competing raf loops.
- The mobile nav menu calls `lenis.stop()` / `lenis.start()` (via
  `useLenisContext`), not just CSS `overflow: hidden` — Lenis drives
  scroll through JS, so overflow alone won't fully lock it.
- `prefers-reduced-motion` is respected globally (see `globals.css`) and
  individually in every pointer-driven tilt effect.
- The dressing-sequence portrait scales down on smaller breakpoints
  (`h-[46vh]` → `sm:h-[58vh]` → `lg:h-[78vh]`) so it never overflows its
  container on mobile.
- No particle canvas, no cursor-follow glow, no WebGL context — the
  entire hero is CSS transforms + two GSAP timelines, which is
  measurably cheaper than the canvas/WebGL approaches it replaced.

## How This Was Verified

This project was assembled in a sandboxed environment with **no network
access** — `npm install` cannot reach the npm registry there, so
`npm run build` / `npm run lint` / `npm run type-check` could not
actually be executed as part of producing this project. What *was* done
in place of that:

- Every `.ts`/`.tsx` file was checked for balanced brackets/parens
  programmatically.
- Every `@/` import alias and every `/images/...` reference was checked
  against the actual file tree.
- Every import statement was checked for unused named imports.
- Every file touched in this pass was manually re-read end-to-end for
  type correctness, hook dependency correctness, and JSX structure
  (including confirming the page still has exactly one `<h1>`, since a
  layered "ghost" text effect could easily have introduced a second one).
- `package.json` was confirmed to contain zero leftover
  development-only tooling (no OpenCV/Python/Playwright — those were
  sandbox-only tools used to prepare the face-aligned hero images and
  the project thumbnails, never part of the Node project itself).

Please still run `npm run type-check`, `npm run lint`, and
`npm run build` yourself before deploying — that's the real, authoritative
check, and if anything surfaces there, it reflects something this manual
review couldn't catch (most likely a version-specific API detail from a
package release after this project was assembled).

## Deployment

This is a standard Next.js 15 app — deploy to **Vercel** (recommended),
Netlify, or any Node host:

```bash
npm run build
npm run start
```

On Vercel: push to a Git repo, import the project, and add the three
`NEXT_PUBLIC_EMAILJS_*` environment variables in the project's
**Settings → Environment Variables** before deploying.

## License

Personal portfolio — content and photography © Saad Ali.
