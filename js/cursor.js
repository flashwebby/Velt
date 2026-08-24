/* Small, deliberately graphic cursor treatment for fine-pointer desktop devices. */
(() => {
  if (!matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;
  const cursor = document.querySelector('.cursor');
  if (!cursor) return;
  let x = innerWidth / 2, y = innerHeight / 2, targetX = x, targetY = y;
  addEventListener('pointermove', event => { targetX = event.clientX; targetY = event.clientY; });
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-active'));
  });
  function render() { x += (targetX - x) * .24; y += (targetY - y) * .24; cursor.style.transform = `translate(${x - 14}px,${y - 14}px)`; requestAnimationFrame(render); }
  render();
})();
