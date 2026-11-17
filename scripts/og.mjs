// Renders public/og.png (2400x1260, a 2x 1200x630 layout), the link preview image.
// Run after changing the avatar or the headline: `node scripts/og.mjs`.
import { readFileSync, writeFileSync } from 'node:fs';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const root = new URL('..', import.meta.url);
const read = (p) => readFileSync(new URL(p, root));

const archivo = read('node_modules/@fontsource/archivo-black/files/archivo-black-latin-400-normal.woff');
const jakarta = read('node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-800-normal.woff');
const avatar = `data:image/png;base64,${read('src/assets/arvin-3d.png').toString('base64')}`;

const C = { cobalt: '#2350F5', sky: '#A9D4FF', sun: '#FFD447', paper: '#FFF8EC', ink: '#121433', tangerine: '#FF7A2F' };
const h = (type, style, children) => ({ type, props: { style, children } });

const tree = h('div', { width: 1200, height: 630, display: 'flex', background: C.cobalt, position: 'relative' }, [
  h('div', { display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 0 0 80px', width: 700, gap: 24 }, [
    h('div', { fontFamily: 'Jakarta', fontSize: 22, letterSpacing: 2, color: C.sun }, 'MOBILE DEVELOPER · JAKARTA'),
    h('div', { fontFamily: 'Archivo', fontSize: 118, lineHeight: 0.88, color: C.paper, display: 'flex', flexDirection: 'column' }, [
      h('span', {}, 'ARVIN'),
      h('span', {}, 'ROESLIM'),
    ]),
    h('div', { fontFamily: 'Jakarta', fontSize: 30, color: C.paper, lineHeight: 1.35 }, 'Flutter, Kotlin and Swift apps, designed in Figma first.'),
    h('div', { display: 'flex' }, [
      h('div', { fontFamily: 'Jakarta', fontSize: 24, color: C.ink, background: C.tangerine, border: `3px solid ${C.ink}`, borderRadius: 999, padding: '12px 28px' }, 'arvinroeslim.my.id'),
    ]),
  ]),
  h('div', { position: 'absolute', right: 80, bottom: 0, width: 380, height: 520, background: C.sky, borderRadius: '190px 190px 0 0', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }, [
    { type: 'img', props: { src: avatar, width: 500, height: 500, style: { marginBottom: -10 } } },
  ]),
]);

const svg = await satori(tree, {
  width: 1200,
  height: 630,
  fonts: [
    { name: 'Archivo', data: archivo, weight: 400 },
    { name: 'Jakarta', data: jakarta, weight: 800 },
  ],
});
// Rendered at 2x (2400x1260) so LinkedIn and WhatsApp previews stay sharp on retina screens.
writeFileSync(new URL('public/og.png', root), new Resvg(svg, { fitTo: { mode: 'width', value: 2400 } }).render().asPng());
console.log('wrote public/og.png');
