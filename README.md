# Muhammad Adnan — Portfolio

A creative, AI-native portfolio for a **Full-Stack & AI Automation Engineer**.
Dark-first, motion-driven, asymmetric — built to feel like a product, not a template.

**Direction:** _Terminal Aurora × Retro Computing_ — warm near-black canvas,
Claude-inspired clay→amber duotone with a phosphor-green "online" signal. On
load a **retro boot sequence** (loading bar) plays, then the view **pans out
from a CSS/SVG Commodore-PET-style CRT** whose screen displays the owner's info.
A scroll **progress bar** + live **chapter HUD** turn the page into a guided
journey, with CRT scanlines, a pixel-art hardware marquee, ASCII section
dividers, a neural constellation, and Clash Display + VT323/pixel type.
Pure CSS/SVG + Framer Motion — no WebGL.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS** (theme tokens via CSS variables → dark/light toggle)
- **Framer Motion** (scroll reveals, magnetic buttons, modal, timeline draw)
- **AI chatbot** — `@anthropic-ai/sdk` streaming from a Next route handler
- Zero image assets — every project "screenshot" is animated, code-drawn SVG/CSS
- Fonts: Clash Display + Satoshi (Fontshare), JetBrains Mono / VT323 / Press Start 2P

## AI Assistant (chatbot)

A floating assistant answers questions about Muhammad in his voice, grounded in
the site's own content (no hallucinated facts). It streams responses from Claude
via `app/api/chat/route.ts`, with the knowledge base built in `lib/knowledge.ts`
from `lib/data.ts` — so the bot and the page never drift.

**To enable it**, set an API key (get one at
[console.anthropic.com](https://console.anthropic.com/settings/keys)):

```bash
cp .env.local.example .env.local
# then edit .env.local:
ANTHROPIC_API_KEY=sk-ant-...
# optional, cheaper/faster public model:
# CHAT_MODEL=claude-haiku-4-5   (defaults to claude-opus-4-8)
```

On **Vercel**, add `ANTHROPIC_API_KEY` (and optionally `CHAT_MODEL`) under
**Settings → Environment Variables**. Without a key the widget still renders and
politely points visitors to the contact section.

> 💡 The default model is `claude-opus-4-8` (most capable). For a public widget
> with real traffic, `claude-haiku-4-5` is ~5× cheaper and faster — set
> `CHAT_MODEL=claude-haiku-4-5`.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Build & run production locally:

```bash
npm run build
npm start
```

## Project structure

```
app/
  layout.tsx          # metadata, no-flash theme script, providers, navbar
  page.tsx            # section composition
  globals.css         # theme tokens, texture, keyframes, utilities
  icon.svg            # favicon (MA monogram)
components/
  Navbar.tsx          ThemeToggle.tsx     ThemeProvider.tsx
  AuroraBackground.tsx  NeuralCanvas.tsx
  Hero.tsx            WhatIDo.tsx
  Projects.tsx        ProjectPreview.tsx  ProjectModal.tsx
  Certifications.tsx  Timeline.tsx
  Contact.tsx         Footer.tsx
  icons/ServiceGlyph.tsx
  ui/
    Reveal.tsx        Magnetic.tsx        Marquee.tsx
    SectionHeading.tsx
lib/
  data.ts             # ALL content lives here — edit this file
```

## Editing content

Everything — name, role, projects, certs, experience, contact — is in
[`lib/data.ts`](lib/data.ts). No need to touch components for copy changes.
Contact details (email, LinkedIn, phone, GitHub) and CV content are already
wired in. The hero CRT boot log is editable via `bootLines` in the same file.

## Deploy on Vercel

1. Push this folder to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset auto-detects **Next.js** — no config needed. Click **Deploy**.

Or via CLI:

```bash
npm i -g vercel
vercel          # preview deploy
vercel --prod   # production
```

No environment variables required.

## Accessibility & performance notes

- Honors `prefers-reduced-motion` (canvas renders a single static frame; CSS
  animations collapse).
- Theme persists to `localStorage`; applied before paint (no flash).
- Neural canvas caps node count + DPR for cheap rendering.

