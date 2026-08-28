/* ═══════════════════════════════════════════════════════════════
   RAPIMOVE REMOVALS LTD  PREMIUM SHARED JS v4.0
   ═══════════════════════════════════════════════════════════════ */

// Update the single Google tag Consent Mode state without sending form data or other PII.
window.updateGoogleConsent = window.updateGoogleConsent || function (choice) {
  const status = choice === 'accepted' ? 'granted' : 'denied';
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      ad_storage: status,
      ad_user_data: status,
      ad_personalization: status,
      analytics_storage: status
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  
  // ── NAVBAR SCROLL ──
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const handleScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }
  
  // ── MOBILE NAV ──
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
  
  // ── SCROLL REVEAL ANIMATIONS ──
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Don't unobserve stagger parents immediately
        if (!entry.target.classList.contains('stagger')) {
          revealObserver.unobserve(entry.target);
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });
  
  document.querySelectorAll('.reveal, .stagger').forEach(el => {
    revealObserver.observe(el);
  });
  
  // ── SMOOTH ANCHOR SCROLLING ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  
  // ── COUNTER ANIMATION ──
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  
  document.querySelectorAll('[data-count]').forEach(el => {
    counterObserver.observe(el);
  });
  
  function animateCounter(el) {
    const target = el.getAttribute('data-count');
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const num = parseInt(target);
    const duration = 2000;
    const start = performance.now();
    
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // easeOutQuart
      const current = Math.floor(eased * num);
      el.textContent = prefix + current + suffix;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = prefix + target + suffix;
    }
    requestAnimationFrame(update);
  }
  
  // ── MAGNETIC BUTTONS ──
  document.querySelectorAll('.btn-primary, .btn-ghost').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
  
  // ── TILT CARDS ──
  document.querySelectorAll('.card[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const tiltX = (y - 0.5) * 8;
      const tiltY = (x - 0.5) * -8;
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
  
  // ── PARALLAX ON SCROLL ──
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length > 0) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      parallaxEls.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-parallax')) || 0.3;
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + scrollY - window.innerHeight / 2) * speed;
        el.style.transform = `translateY(${-offset * 0.1}px)`;
      });
    }, { passive: true });
  }

  // ── HERO SLIDER (if exists) ──
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 1) {
    let current = 0;
    const dots = document.querySelectorAll('.slider-dot');
    
    function goToSlide(n) {
      slides[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');
      current = (n + slides.length) % slides.length;
      slides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
    }
    
    // Auto advance
    let autoTimer = setInterval(() => goToSlide(current + 1), 6000);
    
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(autoTimer);
        goToSlide(i);
        autoTimer = setInterval(() => goToSlide(current + 1), 6000);
      });
    });
    
    // Arrows
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    if (prevBtn) prevBtn.addEventListener('click', () => {
      clearInterval(autoTimer);
      goToSlide(current - 1);
      autoTimer = setInterval(() => goToSlide(current + 1), 6000);
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
      clearInterval(autoTimer);
      goToSlide(current + 1);
      autoTimer = setInterval(() => goToSlide(current + 1), 6000);
    });
    
    // Make goToSlide available globally
    window.goToSlide = goToSlide;
  }
  
  // ── FAQ TOGGLE ──
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const wasOpen = item.classList.contains('open');
      
      // Close all
      document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
      
      // Toggle clicked
      if (!wasOpen) item.classList.add('open');
    });
  });
  
  // ── CURSOR GLOW (desktop only) ──
  if (window.innerWidth > 1024) {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    glow.style.cssText = `
      position: fixed; width: 400px; height: 400px; border-radius: 50%;
      background: radial-gradient(circle, rgba(0,212,170,0.04) 0%, transparent 70%);
      pointer-events: none; z-index: 0; transform: translate(-50%, -50%);
      transition: opacity 0.3s;
    `;
    document.body.appendChild(glow);
    
    let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    function animateGlow() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }
  
  console.log('%c🚚 Rapimove Redesign v4.0', 'color: #00D4AA; font-size: 16px; font-weight: bold;');

  // ── STICKY MOBILE CTA BAR (injected on every page) ──
  // Only inject if not already present (e.g. quote page uses call-only variant)
  if (!document.querySelector('.mobile-cta-bar')) {
    const bar = document.createElement('div');
    bar.className = 'mobile-cta-bar';
    bar.setAttribute('aria-label', 'Quick contact actions');
    bar.innerHTML = `
      <a href="tel:+447497763670" class="mcta-call" aria-label="Call us">
        <i class="fas fa-phone" aria-hidden="true"></i> Call
      </a>
      <a href="/quote" class="mcta-quote" aria-label="Get free quote">
        <i class="fas fa-file-invoice" aria-hidden="true"></i> Free Quote
      </a>
      <a href="https://wa.me/447497763670" target="_blank" rel="noopener" class="mcta-wa" aria-label="WhatsApp">
        <i class="fab fa-whatsapp" aria-hidden="true"></i>
      </a>`;
    document.body.appendChild(bar);
  }

  // ── COOKIE CONSENT — single source of truth ──
  (function () {
    const CONSENT_KEY = 'cookieConsent';
    if (localStorage.getItem(CONSENT_KEY)) return;

    // Show the banner using the CSS class (no inline style fighting)
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.classList.add('visible');
  })();

  // Expose globally so onclick handlers work on all pages
  window.acceptCookies = function () {
    localStorage.setItem('cookieConsent', 'accepted');
    const b = document.getElementById('cookie-banner');
    if (b) b.classList.remove('visible');
    window.updateGoogleConsent('accepted');
  };
  window.declineCookies = function () {
    localStorage.setItem('cookieConsent', 'declined');
    const b = document.getElementById('cookie-banner');
    window.updateGoogleConsent('declined');
    if (b) b.classList.remove('visible');
  };
});