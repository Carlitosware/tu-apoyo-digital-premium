/* ============================================================
   main-v2.js — Tu Apoyo Digital v2
   ============================================================ */

/* ---- Navbar scrolled ---- */
const nav    = document.getElementById('nav');
const burger = document.getElementById('burger');
const links  = document.getElementById('navLinks');

window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 10));

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  links.classList.toggle('open');
});
links.addEventListener('click', e => {
  if (e.target.tagName === 'A') { burger.classList.remove('active'); links.classList.remove('open'); }
});

/* ---- Reveal al scroll ---- */
const revEls = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries => {
  entries.forEach((en, i) => {
    if (en.isIntersecting) {
      setTimeout(() => en.target.classList.add('visible'), i * 60);
      obs.unobserve(en.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
revEls.forEach(el => obs.observe(el));

/* ---- Formulario ---- */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;

    function v(gId, cond) {
      const g = document.getElementById(gId);
      if (!cond) { g.classList.add('has-err'); ok = false; }
      else g.classList.remove('has-err');
    }

    v('g-nombre',  document.getElementById('nombre').value.trim().length >= 2);
    v('g-correo',  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById('correo').value.trim()));
    v('g-servicio', document.getElementById('servicio').value !== '');
    v('g-mensaje', document.getElementById('mensaje').value.trim().length >= 5);

    if (ok) {
      form.style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
    }
  });
  form.querySelectorAll('input,select,textarea').forEach(f => {
    f.addEventListener('input', () => f.closest('.form-group')?.classList.remove('has-err'));
  });
}
