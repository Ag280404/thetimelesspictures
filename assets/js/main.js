// Timeless Pictures — minimal JS (nav, active links, portfolio filter, modal, contact -> WhatsApp)
(() => {
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  const $ = (sel, root=document) => root.querySelector(sel);

  // Mobile nav
  const burger = $('#burger');
  const mobile = $('#mobile');
  if (burger && mobile) {
    burger.addEventListener('click', () => {
      mobile.classList.toggle('open');
      burger.setAttribute('aria-expanded', mobile.classList.contains('open') ? 'true' : 'false');
    });
  }

  // Active nav link
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  $$('.nav-links a, .mobile a').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href === path) a.classList.add('active');
  });

  // Portfolio tabs + gallery
  const tabs = $$('.tab');
  const tiles = $$('.tile[data-cat]');
  const setCat = (cat) => {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.cat === cat));
    tiles.forEach(tile => {
      const ok = cat === 'all' || tile.dataset.cat === cat;
      tile.style.display = ok ? '' : 'none';
    });
  };
  tabs.forEach(t => t.addEventListener('click', () => setCat(t.dataset.cat)));
  if (tabs.length) setCat(tabs.find(t=>t.classList.contains('active'))?.dataset.cat || 'all');

  // Modal (simple lightbox placeholder)
  const modal = $('#modal');
  const modalTitle = $('#modalTitle');
  const closeBtn = $('#modalClose');
  const openModal = (title) => {
    if (!modal) return;
    modalTitle && (modalTitle.textContent = title);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  };
  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  };
  tiles.forEach(tile => {
    tile.addEventListener('click', () => {
      openModal(tile.dataset.title || tile.querySelector('.cap b')?.textContent || 'Preview');
    });
  });
  closeBtn && closeBtn.addEventListener('click', closeModal);
  modal && modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // WhatsApp helpers
  const WHATSAPP_NUMBER = "919097766286";
  const wa = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

  // Attach WA links
  $$('.js-wa').forEach(el => {
    const msg = el.dataset.msg || 'Hi The Timeless Pictures, I’d like to enquire about your services.';
    el.setAttribute('href', wa(msg));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  // Contact form -> WhatsApp (static site friendly)
  const form = $('#contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = (fd.get('name')||'').toString().trim();
      const phone = (fd.get('phone')||'').toString().trim();
      const email = (fd.get('email')||'').toString().trim();
      const service = (fd.get('service')||'').toString().trim();
      const date = (fd.get('date')||'').toString().trim();
      const msg = (fd.get('message')||'').toString().trim();

      const text =
`Hi The Timeless Pictures,
I want to enquire.

Name: ${name}
Phone: ${phone}
Email: ${email}
Service: ${service}
Event Date: ${date}
Message: ${msg}`;

      window.open(wa(text), '_blank', 'noopener');
    });
  }

})();
