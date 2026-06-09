(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach((el) => observer.observe(el));
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success ? Promise.resolve() : Promise.reject();
  }

  function initCopyButtons() {
    const toast = document.getElementById('toast');
    if (!toast) return;

    let toastTimer;

    document.querySelectorAll('.copy-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const text = btn.dataset.copy;
        const label = btn.dataset.label;

        copyToClipboard(text)
          .then(() => {
            btn.classList.add('copied');
            toast.textContent = '✓ ' + label;
            toast.classList.add('show');
            clearTimeout(toastTimer);
            toastTimer = setTimeout(() => {
              toast.classList.remove('show');
              btn.classList.remove('copied');
            }, 2000);
          })
          .catch(() => {
            toast.textContent = 'Copy failed — please try again';
            toast.classList.add('show');
            clearTimeout(toastTimer);
            toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
          });
      });
    });
  }

  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    const links = menu.querySelectorAll('a');

    function closeMenu() {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
      document.body.classList.remove('nav-open');
    }

    function openMenu() {
      toggle.setAttribute('aria-expanded', 'true');
      menu.classList.add('open');
      document.body.classList.add('nav-open');
    }

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) closeMenu();
      else openMenu();
    });

    links.forEach((link) => link.addEventListener('click', closeMenu));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  function initActiveNav() {
    const sections = document.querySelectorAll(
      'main section[id]:not(#hero)'
    );
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    if (!sections.length || !navLinks.length) return;

    const linkMap = new Map();
    navLinks.forEach((link) => {
      const id = link.getAttribute('href')?.replace('#', '');
      if (id) linkMap.set(id, link);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((link) => link.classList.remove('active'));
            const active = linkMap.get(id);
            if (active) active.classList.add('active');
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    if (Number.isNaN(target)) return;

    if (prefersReducedMotion) {
      el.textContent = prefix + target + suffix;
      return;
    }

    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent =
        prefix +
        (decimals ? value.toFixed(decimals) : Math.floor(value)) +
        suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + target + suffix;
    }

    requestAnimationFrame(tick);
  }

  function initStatCounters() {
    const counters = document.querySelectorAll('.stat-val[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((el) => observer.observe(el));
  }

  function initScrollProgress() {
    const bar = document.querySelector('.scroll-progress');
    if (!bar) return;

    function update() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = pct + '%';
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  function initStickyCta() {
    const bar = document.querySelector('.sticky-cta');
    const hero = document.getElementById('hero');
    if (!bar || !hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const show = !entry.isIntersecting;
        bar.classList.toggle('visible', show);
        document.body.classList.toggle('has-sticky-cta', show);
      },
      { threshold: 0, rootMargin: '0px' }
    );

    observer.observe(hero);
  }

  function initUiFilters() {
    const filters = document.querySelectorAll('.ui-filter');
    const shots = document.querySelectorAll('.ui-shot');
    const groups = document.querySelectorAll('.ui-platform-group');
    if (!filters.length) return;

    function applyFilter(platform) {
      filters.forEach((btn) => {
        const isActive = btn.dataset.filter === platform;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      shots.forEach((shot) => {
        const show =
          platform === 'all' || shot.dataset.platform === platform;
        shot.classList.toggle('is-hidden', !show);
      });

      groups.forEach((group) => {
        const groupPlatform = group.dataset.platformGroup;
        const showGroup =
          platform === 'all' || groupPlatform === platform;
        group.classList.toggle('is-hidden', !showGroup);
      });
    }

    filters.forEach((btn) => {
      btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initCopyButtons();
    initMobileNav();
    initActiveNav();
    initStatCounters();
    initScrollProgress();
    initStickyCta();
    initUiFilters();
  });
})();
