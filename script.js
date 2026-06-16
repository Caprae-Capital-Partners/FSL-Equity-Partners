/* ============================================================= */
/* FSL Equity Partners — script.js                              */
/* Vanilla JS: header scroll state, active nav link, mobile menu */
/* ============================================================= */

(function () {
  'use strict';

  var header = document.getElementById('site-header');
  var nav = document.getElementById('primary-nav');
  var navToggle = document.getElementById('nav-toggle');
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));

  /* ---- Sticky header background on scroll -------------------- */
  function onScroll() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // set initial state

  /* ---- Active nav link via IntersectionObserver -------------- */
  // Map section id -> nav link for quick lookup.
  var linkById = {};
  navLinks.forEach(function (link) {
    var id = link.getAttribute('href').replace('#', '');
    linkById[id] = link;
  });

  // Observe the sections that have a corresponding nav link.
  var observedSections = Object.keys(linkById)
    .map(function (id) {
      return document.getElementById(id);
    })
    .filter(Boolean);

  function setActive(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link === linkById[id]);
    });
  }

  if ('IntersectionObserver' in window && observedSections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        // Pick the most visible intersecting section.
        var best = null;
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            if (!best || entry.intersectionRatio > best.intersectionRatio) {
              best = entry;
            }
          }
        });
        if (best) {
          setActive(best.target.id);
        }
      },
      {
        // Bias the "active" zone to the upper-middle of the viewport,
        // accounting for the sticky header.
        rootMargin: '-40% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    observedSections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ---- Mobile hamburger menu --------------------------------- */
  function closeMenu() {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  }

  function toggleMenu() {
    var isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  }

  if (navToggle) {
    navToggle.addEventListener('click', toggleMenu);
  }

  // Close the mobile menu after tapping a link.
  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* ---- Contact modal ----------------------------------------- */
  var modal = document.getElementById('contact-modal');
  var modalClose = document.getElementById('modal-close');
  var contactForm = document.getElementById('contact-form');
  // The gold CTAs ("Connect Confidentially", "Schedule a Call") open the modal.
  var ctaButtons = Array.prototype.slice.call(document.querySelectorAll('.btn-primary'));
  var lastFocused = null;

  function openModal(e) {
    if (e) e.preventDefault();
    lastFocused = document.activeElement;
    closeMenu(); // in case the mobile menu is open
    modal.hidden = false;
    // Force reflow so the transition runs from the hidden state.
    void modal.offsetWidth;
    modal.classList.add('open');
    var first = document.getElementById('field-first');
    if (first) first.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.addEventListener(
      'transitionend',
      function handler() {
        modal.hidden = true;
        modal.removeEventListener('transitionend', handler);
      },
      { once: true }
    );
    if (lastFocused) lastFocused.focus();
  }

  if (modal && contactForm) {
    ctaButtons.forEach(function (btn) {
      btn.addEventListener('click', openModal);
    });

    modalClose.addEventListener('click', closeModal);

    // Click outside the dialog (on the overlay) closes it.
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });

    // Escape closes it.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) closeModal();
    });

    // Submissions POST to Web3Forms (no backend) and land in the inbox tied
    // to the access_key. Shows sending / success / error feedback in place.
    var submitBtn = document.getElementById('contact-submit');

    function showFeedback(message) {
      contactForm.innerHTML = '<p class="modal-feedback">' + message + '</p>';
    }

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!contactForm.reportValidity()) return;

      var data = new FormData(contactForm);
      var firstName = (data.get('firstName') || '').trim();

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (json) {
          if (json.success) {
            showFeedback(
              'Thank you, ' + (firstName || 'and thanks') + '. Your message has ' +
                'been sent — we\'ll be in touch shortly.'
            );
          } else {
            throw new Error(json.message || 'Submission failed');
          }
        })
        .catch(function () {
          showFeedback(
            'Something went wrong sending your message. Please email us directly at ' +
              '<a href="mailto:fred@fslequitypartners.com">fred@fslequitypartners.com</a>.'
          );
        });
    });
  }
})();
