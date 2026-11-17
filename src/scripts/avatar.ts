// Nudges the hero avatar toward the cursor. Mouse/trackpad only, and only when
// the visitor has not asked for reduced motion.
const hero = document.querySelector<HTMLElement>('.hero');
const pic = document.querySelector<HTMLElement>('.portrait');
const wanted = matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');

if (hero && pic && wanted.matches) {
  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    pic.style.setProperty('--px', `${(x * 16).toFixed(1)}px`);
    pic.style.setProperty('--py', `${(y * 8).toFixed(1)}px`);
    pic.style.setProperty('--pr', `${(x * 3).toFixed(2)}deg`);
  });
  hero.addEventListener('pointerleave', () => {
    for (const k of ['--px', '--py', '--pr']) pic.style.removeProperty(k);
  });
}
