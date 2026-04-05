(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const assignLoadOrder = () => {
    const loadItems = $$("[data-load]");
    loadItems.forEach((item, index) => {
      item.style.setProperty("--motion-order", String(index));
    });
  };

  const revealOnScroll = () => {
    const items = $$("[data-reveal]");
    if (!items.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px"
    });

    items.forEach((item) => observer.observe(item));
  };

  const initNavbar = () => {
    const nav = $(".motion-nav");
    if (!nav || prefersReducedMotion) return;

    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const currentY = window.scrollY;
      nav.classList.toggle("is-elevated", currentY > 16);

      if (currentY <= 24) {
        nav.classList.remove("is-hidden");
      } else if (currentY > lastY && currentY - lastY > 8) {
        nav.classList.add("is-hidden");
      } else if (lastY - currentY > 8) {
        nav.classList.remove("is-hidden");
      }

      lastY = currentY;
      ticking = false;
    };

    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }, { passive: true });
  };

  const initParallax = () => {
    const items = $$("[data-parallax]");
    if (!items.length || prefersReducedMotion) return;

    let ticking = false;

    const update = () => {
      const viewportHeight = window.innerHeight;
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const offset = (center - viewportHeight / 2) / viewportHeight;
        const speed = Number(item.dataset.parallax || 18);
        item.style.transform = `translate3d(0, ${offset * speed}px, 0)`;
      });
      ticking = false;
    };

    update();
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }, { passive: true });
  };

  const initSmoothHashLinks = () => {
    if (prefersReducedMotion) return;

    $$('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const id = link.getAttribute("href");
        if (!id || id === "#") return;
        const target = $(id);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", id);
      });
    });
  };

  const initPressFeedback = () => {
    const interactive = $$("a[href], button");
    interactive.forEach((item) => {
      const press = () => item.classList.add("is-pressing");
      const release = () => item.classList.remove("is-pressing");
      item.addEventListener("pointerdown", press);
      item.addEventListener("pointerup", release);
      item.addEventListener("pointerleave", release);
      item.addEventListener("pointercancel", release);
    });
  };

  assignLoadOrder();
  requestAnimationFrame(() => {
    document.body.classList.add("is-loaded");
  });
  revealOnScroll();
  initNavbar();
  initParallax();
  initSmoothHashLinks();
  initPressFeedback();
})();
