import * as simpleIcons from 'simple-icons';

type SimpleIcon = { slug: string; title: string; hex: string; path: string };

const bySlug = new Map<string, SimpleIcon>(
  Object.values(simpleIcons as Record<string, unknown>)
    .filter((v): v is SimpleIcon => typeof v === 'object' && v !== null && 'slug' in v && 'path' in v)
    .map((icon) => [icon.slug, icon]),
);

/** Look up a Simple Icons logo by slug (e.g. "flutter"). Returns undefined for unknown slugs. */
export function getIcon(slug: string): SimpleIcon | undefined {
  return bySlug.get(slug);
}

/** Simple Icons slug for each tech label used on the site. */
const LABEL_SLUGS: Record<string, string> = {
  Flutter: 'flutter', Dart: 'dart', Kotlin: 'kotlin', Swift: 'swift', Firebase: 'firebase',
  Figma: 'figma', HTML: 'html5', CSS: 'css', JavaScript: 'javascript', 'Node.js': 'nodedotjs',
  Astro: 'astro', Docker: 'docker', Linux: 'linux', 'GitHub Actions': 'githubactions',
  'Cloudflare Tunnel': 'cloudflare', SQLite: 'sqlite', 'Maps API': 'googlemaps',
};

export function slugForLabel(label: string): string | undefined {
  return LABEL_SLUGS[label];
}
