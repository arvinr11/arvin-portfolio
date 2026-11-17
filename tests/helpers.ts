import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

export const DIST = join(import.meta.dirname, '..', 'dist');

export function readDist(path: string): string {
  return readFileSync(join(DIST, path), 'utf8');
}

export function distExists(path: string): boolean {
  return existsSync(join(DIST, path));
}

/** All built CSS concatenated (Astro emits it under dist/_astro, or inline in HTML). */
export function builtCss(): string {
  const dir = join(DIST, '_astro');
  const files = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.css')) : [];
  const external = files.map((f) => readFileSync(join(dir, f), 'utf8')).join('\n');
  const inline = [...readDist('index.html').matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');
  return external + '\n' + inline;
}

export function listDist(dir: string): string[] {
  const full = join(DIST, dir);
  return existsSync(full) ? readdirSync(full) : [];
}
