// Small touches: screens rise into place once, the numbers count up when they show, and the gallery arrows scroll one screen.
document.documentElement.classList.add('js');
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

const seen = new IntersectionObserver(entries => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); seen.unobserve(e.target); if (e.target.matches('.numbers')) countUp(e.target); }
}, { threshold: 0.18 });
for (const el of document.querySelectorAll('.reveal, .compare, .numbers')) seen.observe(el);

function countUp(box) {
  if (still) return;
  for (const dd of box.querySelectorAll('[data-count]')) {
    const end = Number(dd.dataset.count), start = performance.now(), length = 1100;
    const step = now => { const t = Math.min(1, (now - start) / length), eased = 1 - Math.pow(1 - t, 3); dd.textContent = Math.round(end * eased).toLocaleString('pt-BR'); if (t < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }
}

const gallery = document.getElementById('gallery');
for (const button of document.querySelectorAll('.gallery-nav button')) {
  button.addEventListener('click', () => {
    const slide = gallery.querySelector('.slide');
    gallery.scrollBy({ left: Number(button.dataset.dir) * (slide.offsetWidth + 22), behavior: still ? 'auto' : 'smooth' });
  });
}
gallery.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); document.querySelector(`.gallery-nav [data-dir="${event.key === 'ArrowRight' ? 1 : -1}"]`).click(); }
});
