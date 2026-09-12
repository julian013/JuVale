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

// Formulario de contacto -> envía por Web3Forms al mail de JuVale
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm){
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    formStatus.textContent = 'Enviando...';

    try{
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(contactForm)))
      });
      const data = await res.json();

      if (data.success){
        formStatus.textContent = '¡Listo! Te vamos a responder a la brevedad.';
        contactForm.reset();
      } else {
        formStatus.textContent = 'Hubo un problema al enviar. Probá de nuevo o escribinos por WhatsApp.';
      }
    } catch (err){
      formStatus.textContent = 'Hubo un problema al enviar. Probá de nuevo o escribinos por WhatsApp.';
    } finally {
      submitBtn.disabled = false;
    }
  });
}