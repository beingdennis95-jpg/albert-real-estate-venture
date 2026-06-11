(function () {
  'use strict';

  // --- Mobile nav toggle ---
  var toggle = document.querySelector('.nav__toggle');
  var navLinks = document.querySelector('.nav__links');
  var nav = document.querySelector('.nav');

  function closeNav() {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.classList.remove('active');
    navLinks.classList.remove('open');
  }

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true' ? false : true;
      toggle.setAttribute('aria-expanded', expanded);
      toggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    document.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
    document.addEventListener('click', function (e) {
      if (navLinks.classList.contains('open') && nav && !nav.contains(e.target)) {
        closeNav();
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        closeNav();
      }
    });
  }

  // --- Scroll reveal ---
  var revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealElements.forEach(function (el) { observer.observe(el); });
  }

  // --- Nav background on scroll ---
  var nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        nav.style.background = 'rgba(0,0,0,.95)';
        nav.style.borderBottomColor = 'rgba(255,255,255,.08)';
      } else {
        nav.style.background = 'rgba(0,0,0,.85)';
        nav.style.borderBottomColor = 'rgba(255,255,255,.06)';
      }
    });
  }

  // --- Buyer lead capture multi-step form ---
  var captureSearchBtn = document.getElementById('captureSearchBtn');
  var captureBackBtn = document.getElementById('captureBackBtn');
  var captureStep1 = document.getElementById('captureStep1');
  var captureStep2 = document.getElementById('captureStep2');

  if (captureSearchBtn && captureStep1 && captureStep2) {
    captureSearchBtn.addEventListener('click', function () {
      captureStep1.style.display = 'none';
      captureStep2.style.display = 'block';
      captureStep2.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
  if (captureBackBtn && captureStep1 && captureStep2) {
    captureBackBtn.addEventListener('click', function () {
      captureStep2.style.display = 'none';
      captureStep1.style.display = 'block';
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var navH = 80;
        var top = target.getBoundingClientRect().top + window.pageYOffset - navH;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
})();
