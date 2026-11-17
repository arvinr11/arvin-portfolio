// Fades sections in as they scroll into view. Content is only hidden when the
// root has the `js` class (set inline in <head>), so it stays visible without JS.
const items = document.querySelectorAll<HTMLElement>('.reveal');

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  );
  items.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 70}ms`;
    io.observe(el);
  });
} else {
  items.forEach((el) => el.classList.add('in'));
}
