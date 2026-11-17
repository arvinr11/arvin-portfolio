import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const read = (p: string) => readFileSync(join(root, p), 'utf8');

describe('deploy setup', () => {
  it('deploys only on v* tags, on the arvin-portfolio runner', () => {
    const wf = read('.github/workflows/deploy.yml');
    expect(wf).toMatch(/on:\s*\n\s*push:\s*\n\s*tags:\s*\n\s*- 'v\*'/);
    expect(wf).not.toMatch(/branches:/);
    expect(wf).toContain('runs-on: [self-hosted, arvin-portfolio]');
    expect(wf).toContain('docker compose -p arvin-portfolio up -d --no-build --remove-orphans');
  });
  it('maps host port 8082 to nginx', () => {
    const compose = read('docker-compose.yml');
    expect(compose).toContain('image: arvin-portfolio:${APP_VERSION:-latest}');
    expect(compose).toMatch(/- "8082:80"/);
  });
  it('builds with node 24 and serves with nginx', () => {
    const df = read('Dockerfile');
    expect(df).toMatch(/FROM node:24-alpine AS build/);
    expect(df).toMatch(/FROM nginx:1\.29-alpine/);
    expect(df).toContain('LABEL app=arvin-portfolio');
    expect(read('nginx.conf')).toContain('error_page 404 /404.html');
  });
});

describe('docker context', () => {
  it('keeps content markdown in the build context', () => {
    const ignore = readFileSync(join(import.meta.dirname, '..', '.dockerignore'), 'utf8').split('\n').map((l) => l.trim());
    expect(ignore).not.toContain('*.md');
    expect(ignore).not.toContain('src');
  });
});
