import { describe, it, expect } from 'vitest';
import { readDist } from './helpers';

describe('build', () => {
  it('builds an index page', () => {
    expect(readDist('index.html')).toContain('<html lang="en"');
  });
});
