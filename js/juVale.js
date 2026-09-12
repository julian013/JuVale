// Menú móvil
const toggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

toggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', isOpen);
  toggle.textContent = isOpen ? '✕' : '☰';
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '☰';
  });
});

// Reveal: solo para los encabezados de sección (un único patrón de aparición,
// no un fade repetido en cada tarjeta)
const revealEls = document.querySelectorAll('.section-head');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

revealEls.forEach(el => io.observe(el));

// Formulario de contacto (ejemplo)
const contactForm = document.querySelector('#contacto form');
if (contactForm){
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Formulario de ejemplo — conectá esto a tu email o servicio de formularios.');
  });
}