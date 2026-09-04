/* ═══════════════════════════════════════════════════════════
   VAULK — interactions
   Preloader · sticky header · mobile nav · scroll reveal ·
   counters · accordion · use-case tabs · form toggle
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ── Preloader ─────────────────────────────────────────── */
  (function preloader() {
    var el = $('#preloader'), out = $('#counter'), bar = $('#preloaderBar');
    if (!el) return;

    function finish() {
      el.classList.add('is-done');
      document.body.classList.remove('is-locked');
    }

    if (reduced) { finish(); return; }

    document.body.classList.add('is-locked');
    var n = 0;
    var tick = setInterval(function () {
      // ease out toward 100 so the tail slows down like the reference
      n += Math.max(1, Math.round((100 - n) * 0.11));
      if (n >= 100) { n = 100; clearInterval(tick); setTimeout(finish, 380); }
      out.textContent = n;
      bar.style.width = n + '%';
    }, 34);

    // Hard safety net: never trap the page behind the loader.
    setTimeout(function () { clearInterval(tick); finish(); }, 4500);
  })();

  /* ── Sticky header ─────────────────────────────────────── */
  (function stickyHeader() {
    var hdr = $('#header');
    if (!hdr) return;
    var onScroll = function () { hdr.classList.toggle('is-stuck', window.scrollY > 24); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  })();

  /* ── Mobile nav ────────────────────────────────────────── */
  (function mobileNav() {
    var burger = $('#burger'), nav = $('#nav');
    if (!burger || !nav) return;

    function close() {
      burger.classList.remove('is-open');
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Open menu');
      document.body.classList.remove('is-locked');
    }

    burger.addEventListener('click', function () {
      var open = !nav.classList.contains('is-open');
      burger.classList.toggle('is-open', open);
      nav.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('is-locked', open);
    });

    $$('.nav__link', nav).forEach(function (a) { a.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    window.addEventListener('resize', function () { if (window.innerWidth > 860) close(); });
  })();

  /* ── Scroll reveal ─────────────────────────────────────── */
  (function reveal() {
    var items = $$('.reveal');
    if (!items.length) return;

    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }

    function show(el) {
      // stagger siblings inside the same group for a cascading entrance
      var group = el.parentElement ? $$('.reveal', el.parentElement) : [el];
      var i = Math.max(0, group.indexOf(el));
      el.style.transitionDelay = Math.min(i * 90, 450) + 'ms';
      el.classList.add('is-in');
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        show(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    // Anything already on the first screen must not wait for a scroll that may
    // never come — the observer's bottom margin would otherwise hold it back.
    items.forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) show(el);
      else io.observe(el);
    });
  })();

  /* ── Counters ──────────────────────────────────────────── */
  (function counters() {
    var nums = $$('[data-count]');
    if (!nums.length) return;

    if (reduced || !('IntersectionObserver' in window)) return; // static values already in the DOM

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        io.unobserve(el);

        var target = parseInt(el.getAttribute('data-count'), 10);
        if (isNaN(target)) return;
        var dur = 1100, t0 = performance.now();

        (function step(now) {
          var p = Math.min(1, (now - t0) / dur);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased);
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target;
        })(t0);
      });
    }, { threshold: 0.6 });

    nums.forEach(function (el) { io.observe(el); });
  })();

  /* ── Protection-matrix accordion ───────────────────────── */
  (function accordion() {
    var root = $('#acc');
    if (!root) return;

    $$('.acc__item', root).forEach(function (item) {
      var btn = $('.acc__btn', item);
      btn.addEventListener('click', function () {
        var willOpen = !item.classList.contains('is-open');
        // single-open behaviour, matching the reference
        $$('.acc__item', root).forEach(function (other) {
          other.classList.remove('is-open');
          $('.acc__btn', other).setAttribute('aria-expanded', 'false');
        });
        if (willOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  })();

  /* ── Use-case tabs ─────────────────────────────────────── */
  (function cases() {
    var list = $('#caseList'), panels = $('#casePanels');
    if (!list || !panels) return;

    var tabs = $$('.case', list);
    var cards = $$('.cpanel', panels);

    function select(i) {
      tabs.forEach(function (t, k) {
        t.classList.toggle('is-active', k === i);
        t.setAttribute('aria-selected', String(k === i));
      });
      cards.forEach(function (c, k) {
        if (k === i) {
          c.hidden = false;
          requestAnimationFrame(function () { c.classList.add('is-active'); });
        } else {
          c.classList.remove('is-active');
          c.hidden = true;
        }
      });
    }

    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i); });
      t.addEventListener('keydown', function (e) {
        var next = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? i + 1
                 : e.key === 'ArrowUp'   || e.key === 'ArrowLeft'  ? i - 1 : null;
        if (next === null) return;
        e.preventDefault();
        var j = (next + tabs.length) % tabs.length;
        select(j);
        tabs[j].focus();
      });
    });
  })();

  /* ── Professional / Private toggle ─────────────────────── */
  (function formToggle() {
    var group = $('.toggle');
    if (!group) return;

    var btns = $$('.toggle__btn', group);
    var pill = $('.toggle__pill', group);

    function move(btn) {
      pill.style.width = btn.offsetWidth + 'px';
      pill.style.transform = 'translateX(' + (btn.offsetLeft - 4) + 'px)';
    }

    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        btns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        move(btn);
      });
    });

    function sync() {
      var active = btns.filter(function (b) { return b.classList.contains('is-active'); })[0] || btns[0];
      if (active) move(active);
    }
    sync();
    window.addEventListener('resize', sync);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(sync);
  })();

  /* ── Contact form (front-end only) ─────────────────────── */
  (function contactForm() {
    var form = $('#form'), status = $('#formStatus');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        status.textContent = 'Please complete the required fields.';
        return;
      }
      // No backend is wired up: this is a design build.
      status.textContent = 'Demo build — no request was sent.';
    });
  })();

  /* ── Anchor offset for the fixed header ────────────────── */
  (function anchorOffset() {
    document.documentElement.style.scrollPaddingTop =
      getComputedStyle(document.documentElement).getPropertyValue('--hdr').trim() || '76px';
  })();
})();
