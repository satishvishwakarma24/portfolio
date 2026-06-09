(function () {
  'use strict';

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
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
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
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
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

  document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initCopyButtons();
    initMobileNav();
    initActiveNav();
  });
})();
