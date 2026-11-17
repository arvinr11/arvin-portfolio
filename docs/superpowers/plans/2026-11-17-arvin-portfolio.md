# arvin-portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the approved single-page mockup into a static Astro site in a new repo `arvin-portfolio`, with content in the repo, SEO basics, and a tag-triggered Docker deploy to the homelab.

**Architecture:** Astro static output, one page (`/`) plus `404`. Sections are Astro components; reusable pieces (Button, Chip, Sticker, PhoneFrame, BrowserFrame, ProjectCard) are their own components. Project and certificate data live in Astro content collections (typed with zod). Styling is plain CSS: design tokens as CSS custom properties in one global file, everything else as component-scoped `<style>`. The only client JS is the reveal-on-scroll observer and the avatar cursor-follow.

**Tech Stack:** Astro 7 (latest stable), `@fontsource/archivo-black`, `@fontsource-variable/plus-jakarta-sans`, `simple-icons` (skill logos), `@astrojs/sitemap`, Vitest (build-output tests), Docker (`node:24-alpine` → `nginx:1.29-alpine`), GitHub Actions on a self-hosted runner.

**Spec:** `docs/superpowers/specs/2026-11-16-portfolio-redesign-design.md` (sections 3–9a, 13–14). **Visual source of truth:** `docs/mockup/index.html` and its assets. When the two disagree, the mockup wins (it holds the newer, Arvin-approved revisions).

**Deviation from spec, decided here:** Tailwind is dropped. The mockup is already written in plain CSS with tokens; porting it to utility classes adds a dependency and a rewrite for no visual gain.

## Global Constraints

- Repo, folder, Docker image, label, compose project: `arvin-portfolio`. Local path: `/Users/arvinroeslim/Documents/Pribadi/Portofolio/arvin-portfolio`. Remote: `https://github.com/arvinr11/arvin-portfolio.git`.
- Domain: `https://arvinroeslim.my.id` (Astro `site`). Host port 8082.
- Colours (exact): cobalt `#2350F5`, cobalt-700 `#1A3BC2`, sky `#A9D4FF`, tangerine `#FF7A2F`, sun `#FFD447`, mint `#BFEFD8`, paper `#FFF8EC`, ink `#121433`, ink-soft `#474A6B`, white `#FFFFFF`.
- Fonts: Archivo Black (display, uppercase) and Plus Jakarta Sans (text). Self-hosted via fontsource; no Google Fonts request.
- Copy: English, first person, exactly as in the mockup. Never use: passionate, seamless, crafting, pixel-perfect, elevate, unlock, leverage. No em dashes in body copy. No emoji as icons.
- Visual bans: no gradients, glass, blur, glow, soft shadows. Hard shadows only (`6px 6px 0` ink, button `0 4px 0` ink).
- Motion: only `transform`/`translate`/`scale`/`rotate`/`opacity`. Everything off under `prefers-reduced-motion: reduce`.
- Public copy is curated: GM experience is exactly the three mockup bullets; no client names, product lists or teammates' work.
- Commits: Conventional Commits, one per task, ending with the attribution line `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Nothing is pushed until Arvin confirms (Task 9).

## Review Focus

1. **JavaScript disabled or slow to load:** every section must still be visible. `.reveal` may only hide content when `<html>` carries a `js` class added by an inline head script. Test: Task 3.
2. **Phone width 375px:** no horizontal scroll anywhere. Test: Task 8 (browser check at 375, `scrollWidth === innerWidth`).
3. **Reduced motion:** intro, reveal, sticker wiggle and avatar follow all disabled. Test: Task 4 (CSS present inside the media query) and Task 8 browser check with emulated reduced motion.
4. **Download CV link:** must resolve to a real file, not 404, in the built site. Test: Task 6 (`dist/cv/ArvinRoeslim-CV.pdf` exists and every CV link points to it).
5. **Images without alt / oversized images:** every `<img>` in `dist/index.html` has non-empty `alt`, and project screenshots are emitted as optimised `webp`/`avif`. Test: Task 6.

---

### Task 1: Scaffold repo and project

**Files:**
- Create: `arvin-portfolio/` via `npm create astro@latest` (template `minimal`, TypeScript `strict`, no git init by the CLI)
- Create: `.gitignore` (Astro default plus `.DS_Store`), `README.md` (one paragraph + `npm run dev` / `npm run build`), `docs/` (copy spec, this plan, `linkedin-guide.md` excluded)
- Modify: `astro.config.mjs` → `site: 'https://arvinroeslim.my.id'`, `output: 'static'`
- Modify: `package.json` scripts: `dev`, `build`, `preview`, `check: astro check`, `test: vitest run`
- Test: `tests/build.test.ts`

**Interfaces:**
- Produces: `npm run build` → `dist/`; `tests/build.test.ts` exports a helper `readDist(path: string): string` used by later tasks' tests.

- [ ] **Step 1:** `git init -b main`, add remote `origin` = `https://github.com/arvinr11/arvin-portfolio.git`.
- [ ] **Step 2:** Scaffold Astro, install `vitest` (dev).
- [ ] **Step 3: Write test** `builds an index page`: after build, `readDist('index.html')` contains `<html lang="en">`.
- [ ] **Step 4:** Run `npm run build && npm test` → PASS.
- [ ] **Step 5:** Commit `chore: scaffold astro project`.

### Task 2: Tokens, fonts and base layout

**Files:**
- Create: `src/styles/global.css` (tokens from Global Constraints, type classes `.label .display-xl .display-l .h-m .h-s .body-l`, `.wrap`, focus ring, reduced-motion block), `src/layouts/Base.astro`
- Modify: `src/pages/index.astro` to use `Base`

**Interfaces:**
- Produces: `Base.astro` props `{ title: string; description: string; ogImage?: string }`, renders `<slot />` inside `<body>`. Imports fonts and `global.css`. Inline head script: `document.documentElement.classList.add('js')`.

- [ ] **Step 1: Write tests** `uses self-hosted fonts` (no `fonts.googleapis.com` in `dist/index.html`) and `defines brand tokens` (built CSS in `dist/_astro/*.css` contains `#2350f5` case-insensitively).
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement tokens/layout, copying values from the mockup `:root` and type rules.
- [ ] **Step 4:** Run build + tests → PASS.
- [ ] **Step 5:** Commit `feat(tokens): add colour, type and layout foundations`.

### Task 3: UI primitives

**Files:**
- Create: `src/components/ui/Button.astro`, `Chip.astro`, `Sticker.astro`, `PhoneFrame.astro`, `BrowserFrame.astro`, `Reveal.astro`; `src/scripts/reveal.ts`

**Interfaces:**
- `Button` props `{ href: string; variant?: 'primary' | 'secondary'; size?: 'md' | 'sm'; icon?: 'download' | 'arrow'; download?: boolean }`, slot = label.
- `Chip` props `{ label: string; icon?: string }` where `icon` is a simple-icons slug; falls back to the sky dot.
- `Sticker` props `{ lines: string[] }` (12-point star polygon computed at build time, not in client JS).
- `PhoneFrame` props `{ src?: ImageMetadata; alt?: string; model?: 'iphone' | 'android'; class?: string }`; `BrowserFrame` props `{ src?: ImageMetadata; alt?: string }`. Both use `astro:assets` `<Image>`.
- `Reveal` wraps children in an element with class `reveal`; `reveal.ts` adds `in` via IntersectionObserver with 70 ms stagger.
- CSS rule: `.js .reveal { opacity:0; translate:0 24px }` (hidden only when JS ran).

- [ ] **Step 1: Write test** `content is visible without js`: in built CSS, every selector that sets `.reveal` to `opacity:0` is prefixed with `.js`.
- [ ] **Step 2:** Run → FAIL. Implement primitives (port markup/CSS from mockup). Run → PASS.
- [ ] **Step 3:** Commit `feat(ui): add button, chip, sticker and device frames`.

### Task 4: Hero and Now strip

**Files:**
- Create: `src/components/sections/Hero.astro`, `Now.astro`; `src/scripts/avatar.ts`; `src/assets/arvin-3d.png` (from `docs/mockup/shots/arvin-3d.png`)

**Interfaces:**
- Consumes: `Button`, `Sticker`.
- Hero copy and structure exactly as mockup (nav: Work, Experience, Skills, Contact; label "Mobile developer · Jakarta"; name in two `.stamp` spans; sentence; Download CV + See my work; arch with avatar; sticker "Open / to work"; zigzag edge).
- `avatar.ts`: pointer-follow only when `(pointer:fine) and (prefers-reduced-motion:no-preference)`; sets `--px --py --pr` as in mockup.
- Now strip: badge + Work / Study / Looking for, exact mockup text.

- [ ] **Step 1: Write tests** `hero has a single h1 with the name`, `intro motion is gated by reduced motion` (built CSS: `@keyframes stamp` exists and `.stamp{animation` appears only inside a `prefers-reduced-motion:no-preference` block).
- [ ] **Step 2:** Run → FAIL. Implement. Run → PASS.
- [ ] **Step 3:** Commit `feat(hero): add hero with avatar, intro motion and now strip`.

### Task 5: Content collections and Work section

**Files:**
- Create: `src/content.config.ts`; `src/content/projects/{evo-plus,waste2cash,laundryhub,dojo-movie,video-tape-store,christian-wijaya}.md`; `src/assets/projects/*` (from `docs/mockup/shots/`); `src/components/ProjectCard.astro`, `ProjectCardSmall.astro`, `src/components/sections/Work.astro`; `src/lib/projects.ts`
- Test: `tests/projects.test.ts`

**Interfaces:**
- Project schema: `{ title: string; kind: string /* e.g. "Campus team project" */; year: number; summary: string; myPart: string; stack: string[]; platform: 'android' | 'ios' | 'both' | 'web'; screens: image()[] /* 1–2 */; github?: url; status?: 'coming-soon'; featured: boolean; order: number }`.
- `sortProjects(entries) -> entries`: featured first, then `order` ascending.
- `ProjectCard` (featured, evo+: two phones, Android + iPhone, status tag) and `ProjectCardSmall` (phone or browser frame by `platform`). Grid ends with the "More code on GitHub" tile.
- Exact text per project: copy summary / myPart / kind / year / stack from the mockup cards.

- [ ] **Step 1: Write tests** `sortProjects puts evo+ first and keeps order`, `all six projects render` (built HTML contains each title), `android projects use the android frame` (`phone--android` count in built HTML ≥ 5: four small cards + evo+).
- [ ] **Step 2:** Run → FAIL. Implement. Run → PASS.
- [ ] **Step 3:** Commit `feat(work): add project collection and work section`.

### Task 6: Experience, Skills, Certificates, Contact, Footer, CV

**Files:**
- Create: `src/components/sections/{Experience,Skills,Certificates,Contact}.astro`; `src/content/certificates/*.md` (+ schema in `content.config.ts`: `{ title; issuer; date: date; verifyUrl: url; image: image() }`); `src/assets/certs/*` (from `docs/mockup/certs/`); `public/cv/ArvinRoeslim-CV.pdf` (download `ArvinRoeslim_CV_Academy2026.pdf` from the public Sanity CDN via the GROQ `cv` query)
- Test: extend `tests/build.test.ts`

**Interfaces:**
- Consumes: `Chip` (with simple-icons slugs: flutter, dart, kotlin, swift, firebase, figma, html5, css, javascript, nodedotjs, astro, docker, linux, githubactions, cloudflare), `Button`.
- Experience: exactly two rows from the mockup (GM: "Internship · Now", three bullets; BINUS: "2023 — Now", thesis line).
- Skills: rows Mobile / Design / Web / Homelab plus the one-line homelab note.
- Certificates: three Dicoding entries, newest first, each with Verify link.
- Contact: heading, three links, Download CV, centred footer "Made with ♥ by Arvin · © 2026" (heart is inline SVG, `aria-label="love"`).

- [ ] **Step 1: Write tests** `cv link resolves` (every `href` containing `/cv/` points to a file that exists in `dist`), `every image has alt`, `project screenshots are optimised` (no `.png` under `dist/_astro` for project screens; webp/avif present), `no banned words` (built HTML text has none of the Global Constraints list).
- [ ] **Step 2:** Run → FAIL. Implement. Run → PASS.
- [ ] **Step 3:** Commit `feat(sections): add experience, skills, certificates and contact`.

### Task 7: SEO and 404

**Files:**
- Create: `src/pages/404.astro` (cobalt page, "This page doesn't exist", Button back home), `public/robots.txt`, `public/llms.txt`, `public/og.png` (1200×630, generated once from the hero via the browser pane screenshot), `public/favicon.svg` (letter "a." in Archivo Black on cobalt)
- Modify: `astro.config.mjs` (add `@astrojs/sitemap`), `Base.astro` (canonical, OG/Twitter tags, JSON-LD)

**Interfaces:**
- JSON-LD `Person`: name "Arvin Roeslim", jobTitle "Mobile Developer", url site, alumniOf "BINUS University", sameAs LinkedIn + GitHub, worksFor "PT Gading Murni".
- `robots.txt` allows all and points to `https://arvinroeslim.my.id/sitemap-index.xml`.

- [ ] **Step 1: Write tests** `has person json-ld`, `has canonical and og:image`, `sitemap and robots exist`, `404 page exists`.
- [ ] **Step 2:** Run → FAIL. Implement. Run → PASS.
- [ ] **Step 3:** Commit `feat(seo): add metadata, json-ld, sitemap, robots and 404`.

### Task 8: Docker, deploy workflow and visual verification

**Files:**
- Create: `Dockerfile` (multi-stage `node:24-alpine` `npm ci && npm run build` → `nginx:1.29-alpine`, `LABEL app=arvin-portfolio`), `nginx.conf` (copy of evo-website's: `/_astro/` immutable cache, security headers, `error_page 404 /404.html`), `.dockerignore` (`node_modules dist .git docs tests`), `docker-compose.yml` (service `web`, image `arvin-portfolio:${APP_VERSION:-latest}`, ports `8082:80`, `restart: unless-stopped`), `.github/workflows/deploy.yml`

**Interfaces:**
- Workflow: `on: push: tags: ['v*']`, `runs-on: [self-hosted, arvin-portfolio]`; steps: checkout → `docker build -t arvin-portfolio:${{ github.ref_name }} .` → write `.env` with `APP_VERSION` → `docker compose -p arvin-portfolio up -d --no-build --remove-orphans` → `docker image prune -af --filter "label=app=arvin-portfolio" --filter "until=24h"`.

- [ ] **Step 1:** Docker is not installed on this Mac, so validate statically: `tests/deploy.test.ts` asserts the workflow triggers only on `v*` tags, uses the `arvin-portfolio` runner label, and compose maps `8082:80`.
- [ ] **Step 2:** Run `npm run check && npm run build && npm test` → all PASS.
- [ ] **Step 3: Visual check** with `npm run preview` in the browser pane at 1440, 950 and 375: compare against `docs/mockup/index.html`; at 375 `document.documentElement.scrollWidth === innerWidth`; with emulated reduced motion, `document.getAnimations().length === 0` after load.
- [ ] **Step 4:** Commit `ci: add docker image and tag-triggered deploy`.

### Task 9: Publish

- [ ] **Step 1:** Show Arvin `git log --oneline` and ask before pushing.
- [ ] **Step 2:** After yes: `git push -u origin main`. No tag yet.
- [ ] **Step 3:** Hand Arvin the server-side checklist (register the runner with label `arvin-portfolio`, NPM proxy host `arvinroeslim.my.id → :8082`, Cloudflare DNS, then `git tag v1.0.0 && git push origin v1.0.0` for the first release; add an external uptime check such as UptimeRobot with alerts to his email or Telegram; archive the old `web-portfolio` and `web-portfolio-sanity` repos on GitHub).
