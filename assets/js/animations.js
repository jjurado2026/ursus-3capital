/* ============================================
   URSUS-3 CAPITAL — Animations
   Reveal, counters, line draws
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Reveal on scroll --- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach(el => revealObs.observe(el));
  }

  /* --- Stagger reveal --- */
  const staggers = document.querySelectorAll('.reveal-stagger');
  if (staggers.length) {
    const staggerObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-stagger--visible');
          staggerObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    staggers.forEach(el => staggerObs.observe(el));
  }

  /* --- Line draw on scroll --- */
  const lines = document.querySelectorAll('.line-draw');
  if (lines.length) {
    const lineObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('line-draw--visible');
          lineObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    lines.forEach(el => lineObs.observe(el));
  }

  /* --- Animated counters --- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const countObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          countObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => countObs.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.count);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();

    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      const current = Math.round(eased * target);
      el.textContent = prefix + current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  /* --- Hero title letter stagger --- */
  const heroTitle = document.querySelector('.hero__title');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.innerHTML = '';
    const words = text.split(' ');

    words.forEach((word, wIdx) => {
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.overflow = 'hidden';

      const inner = document.createElement('span');
      inner.textContent = word;
      inner.style.display = 'inline-block';
      inner.style.transform = 'translateY(110%)';
      inner.style.transition = `transform 0.8s ${0.1 + wIdx * 0.08}s cubic-bezier(0.16, 1, 0.3, 1)`;
      wordSpan.appendChild(inner);
      heroTitle.appendChild(wordSpan);

      if (wIdx < words.length - 1) {
        const space = document.createTextNode('\u00A0');
        heroTitle.appendChild(space);
      }
    });

    requestAnimationFrame(() => {
      heroTitle.querySelectorAll('span > span').forEach(inner => {
        inner.style.transform = 'translateY(0)';
      });
    });
  }

  /* --- Service card hover line --- */
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'background 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  });

});
