(function () {
  'use strict';

  /* ---------- Theme toggle ---------- */
  var root = document.documentElement;
  var toggle = document.querySelector('[data-theme-toggle]');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var theme = prefersDark ? 'dark' : 'light';
  root.setAttribute('data-theme', theme);
  updateToggleIcon();

  function updateToggleIcon() {
    if (!toggle) return;
    toggle.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
    toggle.innerHTML = theme === 'dark'
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      updateToggleIcon();
    });
  }

  /* ---------- Mobile nav ---------- */
  var navToggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobileNav');

  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Header hide on scroll down ---------- */
  var header = document.getElementById('header');
  var lastScroll = 0;

  window.addEventListener('scroll', function () {
    var current = window.scrollY;
    if (header) {
      if (current > lastScroll && current > 160) {
        header.classList.add('hide');
      } else {
        header.classList.remove('hide');
      }
    }
    lastScroll = current;
  }, { passive: true });

  /* ---------- Active nav link on scroll ---------- */
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('[data-nav]');

  var navObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(function (s) { navObserver.observe(s); });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function () {
          entry.target.classList.add('in-view');
        }, i * 40);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(function (el) { revealObserver.observe(el); });

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll('.stat-num, .case-num');
  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function (el) { counterObserver.observe(el); });

  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var duration = 1200;
    var start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Download resume PDF ---------- */
  var downloadBtn = document.getElementById('downloadBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function () {
      if (window.generateResumePDF) {
        window.generateResumePDF();
      }
    });
  }



  /* ---------- Custom cursor ---------- */
  var cursor = document.getElementById('customCursor');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  if (cursor && !reduceMotion && !isTouch) {
    window.addEventListener('mousemove', function (e) {
      cursor.classList.add('active');
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    document.addEventListener('mouseleave', function () { cursor.classList.remove('active'); });

    var hoverTargets = document.querySelectorAll('a, button, .skill-chip, .case-card');
    hoverTargets.forEach(function (el) {
      el.addEventListener('mouseenter', function () { cursor.classList.add('hover'); });
      el.addEventListener('mouseleave', function () { cursor.classList.remove('hover'); });
    });
  }

  /* ---------- Magnetic buttons ---------- */
  if (!reduceMotion && !isTouch) {
    document.querySelectorAll('.magnetic').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var relX = e.clientX - rect.left - rect.width / 2;
        var relY = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = 'translate(' + (relX * 0.25) + 'px, ' + (relY * 0.35) + 'px)';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }

  /* ---------- Hero text scramble effect ---------- */
  var scrambleLines = document.querySelectorAll('.scramble-line');
  var scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz{}[]/\\<>*&%$#@';

  function scrambleText(el, finalHTML) {
    var finalText = el.textContent;
    var length = finalText.length;
    var frame = 0;
    var totalFrames = 18;
    var interval = setInterval(function () {
      var output = '';
      for (var i = 0; i < length; i++) {
        if (i < (frame / totalFrames) * length) {
          output += finalText[i];
        } else if (finalText[i] === ' ') {
          output += ' ';
        } else {
          output += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        }
      }
      el.textContent = output;
      frame++;
      if (frame > totalFrames) {
        clearInterval(interval);
        el.innerHTML = finalHTML;
      }
    }, 35);
  }

  if (scrambleLines.length && !reduceMotion) {
    window.addEventListener('load', function () {
      scrambleLines.forEach(function (line, idx) {
        var originalHTML = line.innerHTML;
        setTimeout(function () {
          scrambleText(line, originalHTML);
        }, idx * 500);
      });
    });
  }

  /* ---------- Skill chip connection highlighting ---------- */
  var skillsGrid = document.querySelector('.skills-grid');
  if (skillsGrid) {
    var chips = skillsGrid.querySelectorAll('.skill-chip');
    chips.forEach(function (chip) {
      chip.addEventListener('mouseenter', function () {
        var group = chip.getAttribute('data-group');
        skillsGrid.classList.add('connecting');
        chip.classList.add('chip-active');
        chips.forEach(function (other) {
          if (other !== chip && other.getAttribute('data-group') === group) {
            other.classList.add('chip-related');
          }
        });
      });
      chip.addEventListener('mouseleave', function () {
        skillsGrid.classList.remove('connecting');
        chips.forEach(function (other) {
          other.classList.remove('chip-active', 'chip-related');
        });
      });
    });
  }




  /* ---------- Scroll-linked timeline packet ---------- */
  var timelineEl = document.querySelector('.timeline');
  var packetEl = document.getElementById('timelinePacket');

  if (timelineEl && packetEl && !reduceMotion) {
    var updatePacket = function () {
      var rect = timelineEl.getBoundingClientRect();
      var viewportH = window.innerHeight;

      // Progress of the timeline through the viewport (0 = just entered, 1 = fully scrolled past)
      var start = viewportH * 0.85;
      var end = -rect.height + viewportH * 0.25;
      var total = start - end;
      var current = start - rect.top;
      var progress = Math.min(Math.max(current / total, 0), 1);

      var height = rect.height * progress;
      packetEl.style.height = height + 'px';
      packetEl.classList.toggle('visible', rect.top < viewportH && rect.bottom > 0);
    };

    window.addEventListener('scroll', updatePacket, { passive: true });
    window.addEventListener('resize', updatePacket);
    updatePacket();
  }


})();
