/* ==========================================================================
   OSAS FIND — Promotional Website Interactions
   ========================================================================== */

(function () {
  'use strict';

  var APP_URL = 'https://portal.cdmconnect.online/';

  /* ---------- Sticky header shadow ---------- */

  var header = document.getElementById('site-header');

  function onScroll() {
    if (!header) return;
    if (window.scrollY > 8) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile navigation ---------- */

  var menu = document.getElementById('siteNavMenu');
  var navToggle = document.querySelector('.nav-toggle');

  function closeMobileMenu() {
    if (!menu || !menu.classList.contains('show')) return;
    menu.classList.remove('show');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  }

  if (menu) {
    // Close the mobile menu after a navigation link is activated.
    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        closeMobileMenu();
      }
    });

    // Close the mobile menu when tapping outside of it.
    document.addEventListener('click', function (event) {
      if (!menu.classList.contains('show')) return;
      if (event.target.closest('#siteNavMenu') || event.target.closest('.nav-toggle')) return;
      closeMobileMenu();
    });
  }

  /* ---------- Active section highlighting ---------- */

  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.nav-link');

  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          var isActive = link.getAttribute('href') === '#' + id;
          link.classList.toggle('is-active', isActive);
          if (isActive) {
            link.setAttribute('aria-current', 'true');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ---------- FAQ accordion (single-open, accessible) ---------- */

  var faqItems = document.querySelectorAll('.faq-item');

  function setFaqState(item, open) {
    var button = item.querySelector('.faq-q');
    var panel = document.getElementById(button.getAttribute('aria-controls'));
    item.classList.toggle('open', open);
    button.setAttribute('aria-expanded', String(open));
    if (panel) panel.setAttribute('aria-hidden', String(!open));
  }

  faqItems.forEach(function (item) {
    var button = item.querySelector('.faq-q');
    if (!button) return;

    button.addEventListener('click', function () {
      var shouldOpen = !item.classList.contains('open');
      faqItems.forEach(function (other) {
        if (other !== item && other.classList.contains('open')) {
          setFaqState(other, false);
        }
      });
      setFaqState(item, shouldOpen);
    });
  });

  /* ---------- Footer year ---------- */

  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
