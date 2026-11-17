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
