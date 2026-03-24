// ========================================
// NAVIGATION SCROLL BEHAVIOUR
// ========================================
const nav = document.querySelector('.nav');
if (nav) {
  const handleScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// ========================================
// MOBILE MENU TOGGLE
// ========================================
const burger = document.querySelector('.nav-burger');
const navLinks = document.querySelector('.nav-links');

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    burger.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      burger.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close on backdrop click (outside menu)
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !burger.contains(e.target)) {
      navLinks.classList.remove('open');
      burger.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// ========================================
// ACTIVE NAV LINK
// ========================================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a:not(.btn)').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ========================================
// SCROLL ANIMATIONS (IntersectionObserver)
// ========================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ========================================
// FAQ ACCORDION
// ========================================
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const item = question.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('open');

    // Close all open items
    document.querySelectorAll('.faq-item.open').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.faq-answer').style.maxHeight = '0';
    });

    // Toggle clicked item
    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// ========================================
// SMOOTH HERO ENTRANCE
// ========================================
window.addEventListener('load', () => {
  document.querySelectorAll('.hero-content > *').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.7s ease ${i * 0.12}s, transform 0.7s ease ${i * 0.12}s`;
    requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  });
});
