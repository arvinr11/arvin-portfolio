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
