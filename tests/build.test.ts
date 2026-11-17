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
