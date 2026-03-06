/* ===========================
   YOKAI DEV — LARAVEL GUIDE
   Script Interaksi & Animasi
   =========================== */

// ===== PARTICLES =====
function createParticles() {
  const container = document.getElementById('particles');
  const count = 25;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');

    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const delay = Math.random() * 8;
    const duration = Math.random() * 10 + 8;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      animation-delay: ${delay}s;
      animation-duration: ${duration}s;
      opacity: ${Math.random() * 0.5 + 0.1};
    `;

    container.appendChild(p);
  }
}

// ===== COPY CODE =====
function copyCode(btn) {
  const block = btn.closest('.code-block');
  const code = block.querySelector('code').innerText;

  navigator.clipboard.writeText(code).then(() => {
    const original = btn.innerText;
    btn.innerText = '✓ Tersalin!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.innerText = original;
      btn.classList.remove('copied');
    }, 2000);
  }).catch(() => {
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = code;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    const original = btn.innerText;
    btn.innerText = '✓ Tersalin!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.innerText = original;
      btn.classList.remove('copied');
    }, 2000);
  });
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const sections = document.querySelectorAll('.guide-section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -50px 0px'
  });

  sections.forEach(section => observer.observe(section));
}

// ===== STEP CARD CLICK =====
function initStepCards() {
  document.querySelectorAll('.step-card').forEach(card => {
    card.addEventListener('click', () => {
      const step = card.dataset.step;
      const targetMap = {
        '1': '#persiapan',
        '2': '#phpini',
        '3': '#instalasi',
        '4': '#masuk',
        '5': '#jalankan'
      };
      const target = document.querySelector(targetMap[step]);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ===== HERO ANIMATION =====
function animateHero() {
  const elements = [
    document.querySelector('.hero-tag'),
    document.querySelector('.hero-title'),
    document.querySelector('.hero-desc'),
    document.querySelector('.btn-start'),
  ];

  elements.forEach((el, i) => {
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(25px)';
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      el.style.transitionDelay = `${i * 0.15}s`;

      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 100 + i * 100);
    }
  });
}

// ===== PROGRESS INDICATOR =====
function initProgressBar() {
  const bar = document.createElement('div');
  bar.id = 'progress-bar';
  bar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    background: linear-gradient(90deg, #e8b86d, #c0392b);
    z-index: 9999;
    width: 0%;
    transition: width 0.1s ease;
    box-shadow: 0 0 8px rgba(232, 184, 109, 0.5);
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    bar.style.width = progress + '%';
  });
}

// ===== TOOLTIP FOR KANJI =====
function initKanjiTooltip() {
  const kanji = document.querySelector('.kanji');
  if (kanji) {
    kanji.title = '炎 = Api / Semangat';
    kanji.style.cursor = 'help';
  }

  const footerKanji = document.querySelector('.footer-kanji');
  if (footerKanji) {
    footerKanji.title = '開発 = Pengembangan / Development';
    footerKanji.style.cursor = 'help';
  }
}

// ===== SMOOTH SCROLL FOR NAV =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

// ===== INIT ALL =====
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  initScrollReveal();
  initStepCards();
  animateHero();
  initProgressBar();
  initKanjiTooltip();
  initSmoothScroll();

  // Make first section visible immediately
  const firstSection = document.querySelector('.guide-section');
  if (firstSection) {
    setTimeout(() => firstSection.classList.add('visible'), 300);
  }

  console.log('%c⛩ Yokai Dev — Laravel Guide', 'color: #e8b86d; font-size: 16px; font-weight: bold;');
  console.log('%cSelamat belajar Laravel! 🎋', 'color: #4ecdc4; font-size: 12px;');
});