(function () {
  'use strict';

  const header = document.querySelector('.header');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav a');

  // Header scroll effect
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      menuToggle.setAttribute('aria-label',
        nav.classList.contains('open') ? 'Fechar menu' : 'Abrir menu');
    });

    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
      });
    });
  }

  // Scroll reveal animation
  const revealEls = document.querySelectorAll('.section-header, .servico-card, .cert-item, .cta-box');
  const observerOptions = { root: null, rootMargin: '0px 0px -60px 0px', threshold: 0.1 };

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  revealEls.forEach(function (el) {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // Smooth scroll para âncoras (fallback se o CSS não aplicar)
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Banner de cookies (LGPD)
  (function cookieBanner() {
    var storageKey = 'gvlog_cookie_consent';
    var banner = document.getElementById('cookie-banner');
    if (!banner) return;

    function hideBanner() {
      banner.setAttribute('hidden', '');
      banner.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('show-cookie-banner');
    }

    if (localStorage.getItem(storageKey)) {
      hideBanner();
      return;
    }

    banner.removeAttribute('hidden');
    banner.setAttribute('aria-hidden', 'false');
    document.body.classList.add('show-cookie-banner');

    var btnAccept = document.getElementById('cookie-accept');
    var btnReject = document.getElementById('cookie-reject');

    function saveChoice(value) {
      try {
        localStorage.setItem(storageKey, value);
      } catch (e) {
        /* ignore */
      }
      hideBanner();
      document.dispatchEvent(new CustomEvent('gvlog:cookie-consent', { detail: { value: value } }));
    }

    if (btnAccept) {
      btnAccept.addEventListener('click', function () {
        saveChoice('accepted');
      });
    }
    if (btnReject) {
      btnReject.addEventListener('click', function () {
        saveChoice('rejected');
      });
    }
  })();
})();
