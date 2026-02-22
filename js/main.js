/* ========================================
   moku design — Main JavaScript
   Animations, Interactions, Scroll Effects
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ============================
  // Loading Screen
  // ============================
  const loadingScreen = document.getElementById('loading');

  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('is-loaded');
      // Trigger hero animations after loading
      setTimeout(initHeroAnimation, 400);
    }, 800);
  });

  // Fallback: hide loading after 3s max
  setTimeout(() => {
    loadingScreen.classList.add('is-loaded');
    setTimeout(initHeroAnimation, 400);
  }, 3000);

  // ============================
  // Custom Cursor
  // ============================
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');

  if (cursor && cursorDot && window.matchMedia('(pointer: fine)').matches) {
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;

      // Both cursor and dot follow immediately
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      cursorDot.style.left = cursorX + 'px';
      cursorDot.style.top = cursorY + 'px';
    });

    // Hover effects
    document.querySelectorAll('[data-cursor-hover]').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('is-active');
        cursorDot.classList.add('is-active');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('is-active');
        cursorDot.classList.remove('is-active');
      });
    });
  }

  // ============================
  // Header Scroll Effect
  // ============================
  const header = document.getElementById('header');
  let lastScrollY = 0;

  function handleHeaderScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 80) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }

    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });

  // ============================
  // Hamburger Menu
  // ============================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.contains('is-open');
      hamburger.classList.toggle('is-open');
      mobileMenu.classList.toggle('is-open');

      if (!isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('is-open');
        mobileMenu.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // ============================
  // Smooth Scroll (nav links)
  // ============================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height'));
        const top = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: top,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================
  // Hero Animation
  // ============================
  function initHeroAnimation() {
    const heroLines = document.querySelectorAll('.hero-title-line span');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCaption = document.querySelector('.hero-caption');

    heroLines.forEach((line, index) => {
      setTimeout(() => {
        line.classList.add('is-visible');
      }, index * 200);
    });

    if (heroSubtitle) {
      heroSubtitle.classList.add('is-visible');
    }
    if (heroCaption) {
      heroCaption.classList.add('is-visible');
    }
  }

  // ============================
  // Parallax Effect (Hero BG text)
  // ============================
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  function handleParallax() {
    const scrollY = window.scrollY;

    parallaxElements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax);
      const yPos = scrollY * speed;
      el.style.transform = `translateY(${yPos}px)`;
    });
  }

  if (parallaxElements.length > 0) {
    window.addEventListener('scroll', handleParallax, { passive: true });
  }

  // ============================
  // Scroll Reveal (Intersection Observer)
  // ============================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // ============================
  // Works Filter
  // ============================
  const filterBtns = document.querySelectorAll('.works-filter-btn');
  const workCards = document.querySelectorAll('.work-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filter = btn.dataset.filter;

      workCards.forEach(card => {
        const categories = card.dataset.category.split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.classList.remove('is-hidden');
          card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  // ============================
  // Lightbox
  // ============================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');

  if (lightbox) {
    document.querySelectorAll('.work-card').forEach(card => {
      card.addEventListener('click', () => {
        const img = card.querySelector('.work-card-image');
        const title = card.querySelector('.work-card-title');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightboxCaption.textContent = title ? title.textContent : '';
          lightbox.classList.add('is-active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('is-active');
      document.body.style.overflow = '';
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('is-active')) {
        closeLightbox();
      }
    });
  }

  // ============================
  // Magnetic Effect on hover elements (subtle)
  // ============================
  if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.skill-item').forEach(item => {
      item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        item.style.transform = `translateY(-4px) translate(${x * 0.1}px, ${y * 0.1}px)`;
      });

      item.addEventListener('mouseleave', () => {
        item.style.transform = '';
      });
    });
  }

  // ============================
  // Counter Animation (About stats)
  // ============================
  const statNumbers = document.querySelectorAll('.about-stat-number');
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        animateCounters();
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  if (statNumbers.length > 0) {
    statsObserver.observe(statNumbers[0].closest('.about-stats'));
  }

  function animateCounters() {
    statNumbers.forEach(stat => {
      const text = stat.textContent;
      const match = text.match(/(\d+)/);
      if (!match) return;

      const target = parseInt(match[1]);
      const suffix = text.replace(match[1], '');
      const duration = 1500;
      const start = performance.now();

      function updateCounter(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out quart
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(target * eased);

        stat.textContent = current + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  // ============================
  // Section active state for nav
  // ============================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-list .nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('is-active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('is-active');
          }
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-20% 0px -50% 0px'
  });

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

});

// Add fadeInUp keyframe dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
