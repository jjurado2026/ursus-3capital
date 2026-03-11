/* ============================================
   URSUS-3 CAPITAL — Animations
   Reveal, counters, parallax, clip-path, magnetic
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

  /* --- Hero title line-by-line reveal --- */
  const heroLines = document.querySelectorAll('.hero__title-line');
  if (heroLines.length) {
    heroLines.forEach((line, idx) => {
      const text = line.textContent;
      line.textContent = '';
      const inner = document.createElement('span');
      inner.textContent = text;
      inner.style.display = 'block';
      inner.style.transform = 'translateY(110%)';
      inner.style.transition = `transform 0.9s ${0.15 + idx * 0.12}s cubic-bezier(0.16, 1, 0.3, 1)`;
      line.appendChild(inner);
    });

    requestAnimationFrame(() => {
      heroLines.forEach(line => {
        line.querySelector('span').style.transform = 'translateY(0)';
      });
    });
  }

  /* --- Parallax on scroll (images & banners) --- */
  const parallaxEls = document.querySelectorAll('.hero__image img, .image-banner__inner img, .about__image img');
  if (parallaxEls.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          parallaxEls.forEach(img => {
            const rect = img.closest('section, .hero__image, .about__image, .image-banner')?.getBoundingClientRect();
            if (!rect) return;
            const viewH = window.innerHeight;
            if (rect.top < viewH && rect.bottom > 0) {
              const progress = (viewH - rect.top) / (viewH + rect.height);
              const shift = (progress - 0.5) * 40;
              img.style.transform = `translateY(${shift}px) scale(1.08)`;
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* --- Magnetic hover on buttons --- */
  const magneticBtns = document.querySelectorAll('.btn--primary, .nav__cta');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => { btn.style.transition = ''; }, 400);
    });
  });

  /* --- Service card tilt on hover --- */
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), background 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => { card.style.transition = 'background var(--dur) var(--ease-out)'; }, 500);
    });
  });

  /* --- Stats number slot-machine effect --- */
  const statNumbers = document.querySelectorAll('.stats__number');
  if (statNumbers.length) {
    const statsObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.closest('.stats__item')?.classList.add('stats__item--visible');
          statsObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statNumbers.forEach(el => statsObs.observe(el));
  }

  /* --- Clip-path reveal for about image --- */
  const aboutImage = document.querySelector('.about__image');
  if (aboutImage) {
    aboutImage.style.clipPath = 'inset(100% 0 0 0)';
    aboutImage.style.transition = 'clip-path 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
    const aboutObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.clipPath = 'inset(0 0 0 0)';
          aboutObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    aboutObs.observe(aboutImage);
  }

  /* --- Image banner parallax text --- */
  const bannerContent = document.querySelector('.image-banner__content');
  if (bannerContent && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      const rect = bannerContent.closest('.image-banner')?.getBoundingClientRect();
      if (!rect) return;
      const viewH = window.innerHeight;
      if (rect.top < viewH && rect.bottom > 0) {
        const progress = (viewH - rect.top) / (viewH + rect.height);
        bannerContent.style.transform = `translateY(${(0.5 - progress) * 30}px)`;
        bannerContent.style.opacity = Math.min(1, progress * 2);
      }
    }, { passive: true });
  }

  /* --- Blog cards staggered entrance --- */
  const blogCards = document.querySelectorAll('.blog-card');
  if (blogCards.length) {
    const blogObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = Array.from(blogCards).indexOf(entry.target);
          entry.target.style.transitionDelay = `${idx * 0.12}s`;
          entry.target.classList.add('blog-card--visible');
          blogObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    blogCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(40px)';
      card.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      blogObs.observe(card);
    });
  }

  /* --- Product cards staggered reveal --- */
  const productCards = document.querySelectorAll('.product-card');
  if (productCards.length) {
    const prodObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          productCards.forEach((card, i) => {
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, i * 80);
          });
          prodObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    productCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(24px)';
      card.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    if (productCards[0]) prodObs.observe(productCards[0]);
  }

  /* --- Smooth scroll progress indicator --- */
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.style.cssText = 'position:fixed;top:0;left:0;height:2px;background:var(--gold);z-index:9999;transform-origin:left;transform:scaleX(0);transition:none;pointer-events:none;';
  document.body.appendChild(progressBar);
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    progressBar.style.transform = `scaleX(${scrolled})`;
  }, { passive: true });

});
