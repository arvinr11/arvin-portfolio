import { describe, it, expect } from 'vitest';
import { readDist } from './helpers';

describe('build', () => {
  it('builds an index page', () => {
    expect(readDist('index.html')).toContain('<html lang="en"');
  });
});

describe('foundations', () => {
  it('uses self-hosted fonts', async () => {
    const { builtCss } = await import('./helpers');
    expect(readDist('index.html')).not.toContain('fonts.googleapis.com');
    expect(builtCss()).toMatch(/Archivo Black/i);
    expect(builtCss()).toMatch(/Plus Jakarta Sans/i);
  });
  it('defines brand tokens', async () => {
    const { builtCss } = await import('./helpers');
    const css = builtCss().toLowerCase();
    for (const hex of ['#2350f5', '#1a3bc2', '#a9d4ff', '#ff7a2f', '#ffd447', '#bfefd8', '#fff8ec', '#121433', '#474a6b']) {
      expect(css).toContain(hex);
    }
  });
  it('marks js support on the root element', () => {
    expect(readDist('index.html')).toContain("classList.add('js')");
  });
});

describe('reveal on scroll', () => {
  it('content is visible without js', async () => {
    const { builtCss } = await import('./helpers');
    const css = builtCss().replace(/\s+/g, ' ');
    const hiding = [...css.matchAll(/([^{}]*\.reveal[^{}]*)\{[^}]*opacity: ?0(?![.\d])/g)].map((m) => m[1].trim());
    expect(hiding.length).toBeGreaterThan(0);
    for (const sel of hiding) expect(sel).toContain('.js');
  });
  it('ships the reveal script', () => {
    expect(readDist('index.html')).toMatch(/IntersectionObserver|<script type="module" src="\/_astro\//);
  });
});

describe('hero', () => {
  it('has a single h1 with the name', () => {
    const html = readDist('index.html');
    const h1s = html.match(/<h1[\s>][\s\S]*?<\/h1>/g) ?? [];
    expect(h1s).toHaveLength(1);
    expect(h1s[0]!.replace(/<[^>]+>/g, ' ')).toMatch(/Arvin\s+Roeslim/);
  });
  it('gates intro motion behind reduced motion', async () => {
    const { builtCss } = await import('./helpers');
    const css = builtCss().replace(/\s+/g, ' ');
    expect(css).toMatch(/@keyframes stamp/);
    const noPref = css.split(/@media \(prefers-reduced-motion: ?no-preference\)/).slice(1).join(' ');
    expect(noPref).toMatch(/\.stamp[^{]*\{[^}]*animation/);
    const outside = css.split(/@media \(prefers-reduced-motion: ?no-preference\)\{(?:[^{}]*\{[^}]*\})*[^{}]*\}/).join(' ');
    expect(outside).not.toMatch(/\.stamp[^{]*\{[^}]*animation:/);
  });
  it('links the download cv button', () => {
    expect(readDist('index.html')).toContain('href="/cv/ArvinRoeslim-CV.pdf"');
  });
  it('shows the now strip', () => {
    const html = readDist('index.html');
    for (const t of ['Intern at PT Gading Murni', 'Mobile Application &amp; Technology, BINUS', 'Full-time mobile developer roles']) expect(html).toContain(t);
  });
});

describe('remaining sections', () => {
  const html = () => readDist('index.html');
  const text = () => html().replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ');

  it('every cv link resolves to a file in dist', async () => {
    const { distExists } = await import('./helpers');
    const links = [...html().matchAll(/href="(\/cv\/[^"]+)"/g)].map((m) => m[1]!);
    expect(links.length).toBeGreaterThanOrEqual(3);
    for (const l of links) expect(distExists(l.slice(1))).toBe(true);
  });
  it('every image has alt text', () => {
    const imgs = html().match(/<img\b[^>]*>/g) ?? [];
    expect(imgs.length).toBeGreaterThan(5);
    for (const img of imgs) {
      // Astro prints an empty alt as a bare `alt`; only the decorative hero avatar may use it.
      const isDecorative = /\balt(="")?[\s>]/.test(img) && /class="[^"]*portrait/.test(img);
      if (!isDecorative) expect(img).toMatch(/alt="[^"]+"/);
    }
  });
  it('emits optimised project screenshots', () => {
    const srcs = [...html().matchAll(/<img\b[^>]*src="([^"]+)"/g)].map((m) => m[1]!);
    expect(srcs.some((s) => s.endsWith('.webp'))).toBe(true);
    expect(srcs.filter((s) => /screen|roadmap|splash/.test(s) && s.endsWith('.png'))).toEqual([]);
  });
  it('uses none of the banned words', () => {
    for (const w of ['passionate', 'seamless', 'crafting', 'pixel-perfect', 'elevate', 'unlock', 'leverage']) {
      expect(text().toLowerCase()).not.toContain(w);
    }
  });
  it('keeps the gading murni entry curated', () => {
    expect(text()).toContain('Built the company profile website and the e-commerce website.');
    expect(text()).toContain('IT support for the office: Wi-Fi, printers and shared printing.');
    expect(text()).toContain('Now in the Project division, handling procurement for institutional clients.');
    expect(text()).not.toMatch(/Samsung|Bank Indonesia|\bBI\b/);
  });
  it('lists three dicoding certificates with verify links', () => {
    expect((html().match(/dicoding\.com\/certificates\//g) ?? []).length).toBe(3);
  });
  it('has the footer credit', () => {
    expect(text()).toMatch(/Made with\s+by Arvin · © 2026/);
  });
});

describe('seo', () => {
  it('has person json-ld', () => {
    const m = readDist('index.html').match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    expect(m).not.toBeNull();
    const data = JSON.parse(m![1]!);
    expect(data['@type']).toBe('Person');
    expect(data.name).toBe('Arvin Roeslim');
    expect(data.jobTitle).toBe('Mobile Developer');
    expect(data.sameAs).toContain('https://github.com/arvinr11');
  });
  it('has canonical and og tags', () => {
    const html = readDist('index.html');
    expect(html).toContain('<link rel="canonical" href="https://arvinroeslim.my.id/"');
    expect(html).toMatch(/<meta property="og:image" content="https:\/\/arvinroeslim\.my\.id\/og\.png"/);
    expect(html).toContain('name="twitter:card" content="summary_large_image"');
  });
  it('ships sitemap, robots, llms.txt, favicon and og image', async () => {
    const { distExists } = await import('./helpers');
    for (const f of ['sitemap-index.xml', 'robots.txt', 'llms.txt', 'favicon.svg', 'og.png']) expect(distExists(f)).toBe(true);
    expect(readDist('robots.txt')).toContain('Sitemap: https://arvinroeslim.my.id/sitemap-index.xml');
  });
  it('has a 404 page', () => {
    expect(readDist('404.html')).toContain('href="/"');
  });
});
