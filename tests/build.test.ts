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
