// Tech logos from techicons.dev (sourced from devicons/devicon, MIT), saved as
// SVG files in src/assets/tech so the site never hotlinks them.
const files = import.meta.glob<{ src: string }>('../assets/tech/*.svg', { eager: true, import: 'default' });

const byName = new Map(
  Object.entries(files).map(([path, mod]) => [path.split('/').pop()!.replace('.svg', ''), mod.src]),
);

/** File name (without .svg) in src/assets/tech for each tech label used on the site. */
const LABEL_FILES: Record<string, string> = {
  Flutter: 'flutter', Dart: 'dart', Kotlin: 'kotlin', Swift: 'swift', Firebase: 'firebase',
  Figma: 'figma', HTML: 'html5', CSS: 'css3', JavaScript: 'javascript', 'Node.js': 'nodejs',
  Astro: 'astro', Docker: 'docker', Linux: 'linux', 'GitHub Actions': 'github-actions',
  'Cloudflare Tunnel': 'cloudflare', SQLite: 'sqlite', 'Maps API': 'google',
};

/** URL of the logo for a tech label, or undefined when there is none. */
export function logoForLabel(label: string): string | undefined {
  const file = LABEL_FILES[label];
  return file ? byName.get(file) : undefined;
}
