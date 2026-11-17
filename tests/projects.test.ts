import { describe, it, expect } from 'vitest';
import { sortProjects } from '../src/lib/projects';
import { readDist } from './helpers';

const entry = (id: string, featured: boolean, order: number) => ({ id, data: { featured, order } });

describe('sortProjects', () => {
  it('puts featured projects first, then by order', () => {
    const sorted = sortProjects([entry('b', false, 2), entry('evo', true, 9), entry('a', false, 1)]);
    expect(sorted.map((p) => p.id)).toEqual(['evo', 'a', 'b']);
  });
  it('does not mutate its input', () => {
    const input = [entry('b', false, 2), entry('a', false, 1)];
    sortProjects(input);
    expect(input.map((p) => p.id)).toEqual(['b', 'a']);
  });
});

describe('work section', () => {
  it('renders all six projects', () => {
    const html = readDist('index.html');
    for (const t of ['evo+ (Money Manager)', 'Waste2Cash', 'LaundryHub', 'DoJo Movie', 'Video Tape Store', 'Christian Wijaya']) {
      expect(html).toContain(t);
    }
  });
  it('uses the android frame for android apps', () => {
    const count = (readDist('index.html').match(/phone--android/g) ?? []).length;
    expect(count).toBeGreaterThanOrEqual(5);
  });
  it('marks evo+ as coming soon and ends with the github tile', () => {
    const html = readDist('index.html');
    expect(html).toContain('Coming soon');
    expect(html).toContain('href="https://github.com/arvinr11"');
  });
});
