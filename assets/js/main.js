(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const WHATSAPP_NUMBER = "919097766286";
  const waLink = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

  const path = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();

  const setActiveNav = () => {
    $$(".desktop-nav a, .mobile-nav a").forEach((link) => {
      const href = (link.getAttribute("href") || "").toLowerCase();
      if (href === path) link.classList.add("is-active");
    });
  };

  const initHeader = () => {
    const header = $(".site-header");
    const toggle = $("#menuToggle");
    const mobileNav = $("#mobileMenu");

    const syncHeaderState = () => {
      if (header) {
        header.classList.toggle("is-scrolled", window.scrollY > 24);
      }
    };

    syncHeaderState();
    window.addEventListener("scroll", syncHeaderState, { passive: true });

    if (!toggle || !mobileNav) return;

    toggle.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    $$("a", mobileNav).forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  };

  const initWhatsAppLinks = () => {
    $$(".js-wa").forEach((link) => {
      const message = link.dataset.msg || "Hi The Timeless Pictures, I'd like to enquire about your services.";
      link.setAttribute("href", waLink(message));
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener");
    });
  };

  const initContactForm = () => {
    const form = $("#contactForm");
    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const text = [
        "Hi The Timeless Pictures,",
        "I want to enquire.",
        "",
        `Name: ${(data.get("name") || "").toString().trim()}`,
        `Phone: ${(data.get("phone") || "").toString().trim()}`,
        `Email: ${(data.get("email") || "").toString().trim()}`,
        `Service: ${(data.get("service") || "").toString().trim()}`,
        `Event Date: ${(data.get("date") || "").toString().trim()}`,
        `Message: ${(data.get("message") || "").toString().trim()}`
      ].join("\n");

      window.open(waLink(text), "_blank", "noopener");
    });
  };

  const initReveal = () => {
    const items = $$(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
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
      threshold: 0.14,
      rootMargin: "0px 0px -60px 0px"
    });

    items.forEach((item) => observer.observe(item));
  };

  const initCounters = () => {
    const counters = $$("[data-count]");
    if (!counters.length || !("IntersectionObserver" in window)) return;

    counters.forEach((counter) => {
      const target = Number(counter.dataset.count || 0);
      const suffix = counter.dataset.suffix || "";
      let started = false;

      const observer = new IntersectionObserver(([entry]) => {
        if (!entry?.isIntersecting || started) return;
        started = true;
        observer.disconnect();
        const startedAt = performance.now();
        const duration = 1600;

        const tick = (now) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          counter.textContent = `${Math.round(target * eased)}${suffix}`;
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      }, { threshold: 0.5 });

      observer.observe(counter);
    });
  };

  const initLightbox = () => {
    const lightbox = $("#lightbox");
    const lightboxTitle = $("#lightboxTitle");
    const lightboxImage = $("#lightboxImage");
    const closeButton = $("#lightboxClose");
    if (!lightbox || !lightboxTitle || !lightboxImage) return;

    const close = () => {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("has-lightbox");
      lightboxImage.removeAttribute("src");
      lightboxImage.removeAttribute("alt");
    };

    const open = (title, image) => {
      if (!image) return;
      lightboxTitle.textContent = title || "Preview";
      lightboxImage.src = image;
      lightboxImage.alt = title || "Preview image";
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("has-lightbox");
    };

    $$(".js-modal-trigger").forEach((trigger) => {
      trigger.addEventListener("click", () => {
        open(trigger.dataset.modalTitle, trigger.dataset.modalImage);
      });
    });

    closeButton?.addEventListener("click", close);
    $$("[data-close-lightbox]").forEach((node) => node.addEventListener("click", close));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") close();
    });
  };

  const initPortfolioFilter = () => {
    const pills = $$(".filter-pill");
    const cards = $$(".portfolio-card[data-category]");
    if (!pills.length || !cards.length) return;

    const applyFilter = (value) => {
      pills.forEach((pill) => pill.classList.toggle("is-active", pill.dataset.filter === value));
      cards.forEach((card) => {
        const visible = value === "all" || card.dataset.category === value;
        card.classList.toggle("is-hidden", !visible);
      });
    };

    pills.forEach((pill) => {
      pill.addEventListener("click", () => applyFilter(pill.dataset.filter || "all"));
    });

    applyFilter("all");
  };

  const initMarquee = () => {
    const track = $(".marquee__track");
    if (!track) return;
    const items = Array.from(track.children);
    items.forEach((item) => track.appendChild(item.cloneNode(true)));
  };

  setActiveNav();
  initHeader();
  initWhatsAppLinks();
  initContactForm();
  initReveal();
  initCounters();
  initLightbox();
  initPortfolioFilter();
  initMarquee();
})();
