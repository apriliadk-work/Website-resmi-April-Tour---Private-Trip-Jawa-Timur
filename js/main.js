// PAGE LOADER
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.loader')?.classList.add('hidden');
  }, 1800);
});

// CUSTOM CURSOR
const cursor = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');
if (cursor && cursorRing) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    setTimeout(() => {
      cursorRing.style.left = e.clientX + 'px';
      cursorRing.style.top = e.clientY + 'px';
    }, 80);
  });
  document.querySelectorAll('a, button, .dest-card, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorRing.style.transform = 'translate(-50%,-50%) scale(1.8)';
      cursorRing.style.opacity = '0.3';
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.style.transform = 'translate(-50%,-50%) scale(1)';
      cursorRing.style.opacity = '0.6';
    });
  });
}

// HEADER SCROLL
const header = document.querySelector('header');
if (header) {
  const isHeroPage = document.querySelector('.hero');
  if (isHeroPage) header.classList.add('hero-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
      header.classList.remove('hero-header');
    } else {
      header.classList.remove('scrolled');
      if (isHeroPage) header.classList.add('hero-header');
    }
  });
}

// MOBILE NAV
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const mobileClose = document.querySelector('.mobile-nav-close');
hamburger?.addEventListener('click', () => mobileNav?.classList.add('open'));
mobileClose?.addEventListener('click', () => mobileNav?.classList.remove('open'));
document.querySelectorAll('.mobile-nav a').forEach(a => {
  a.addEventListener('click', () => mobileNav?.classList.remove('open'));
});

// SCROLL REVEAL
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => observer.observe(el));

// COUNTER ANIMATION
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current) + suffix;
  }, 16);
}
const counterEls = document.querySelectorAll('[data-target]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = true;
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });
counterEls.forEach(el => counterObserver.observe(el));

// TESTIMONIAL SLIDER
const testimonials = [
  {
    quote: "Trip Bromo sama April Tour luar biasa! Semua terorganisir dengan rapi, guide-nya sangat profesional dan ramah. Definitely worth it!",
    name: "Rizky Pratama",
    role: "Traveler dari Jakarta",
    stars: "★★★★★"
  },
  {
    quote: "Sudah 3 kali trip bareng April Tour, selalu puas! Pelayanannya konsisten bagus, tempatnya pilihan banget. Rekomen banget buat yang mau explore Jawa Timur.",
    name: "Sari Dewi",
    role: "Traveler dari Surabaya",
    stars: "★★★★★"
  },
  {
    quote: "Ijen sunrise trip-nya memorable banget. April Tour benar-benar tahu spot terbaik dan waktu terbaik. Foto-foto kita semua bagus karena timing-nya pas.",
    name: "Budi Santoso",
    role: "Fotografer & Traveler",
    stars: "★★★★★"
  },
  {
    quote: "Harga sangat reasonable untuk kualitas yang didapat. Akomodasi nyaman, makanan enak, itinerary padat tapi nggak capek. Sangat memuaskan!",
    name: "Indah Permata",
    role: "Traveler dari Bandung",
    stars: "★★★★★"
  }
];
let currentTesti = 0;
const testiQuote = document.querySelector('.testi-quote');
const testiName = document.querySelector('.testi-name');
const testiRole = document.querySelector('.testi-role');
const testiStars = document.querySelector('.testi-stars');
const testiDots = document.querySelectorAll('.testi-dot');
function showTestimonial(index) {
  if (!testiQuote) return;
  testiQuote.style.opacity = '0';
  setTimeout(() => {
    const t = testimonials[index];
    testiQuote.textContent = t.quote;
    testiName.textContent = t.name;
    testiRole.textContent = t.role;
    testiStars.textContent = t.stars;
    testiDots.forEach((d, i) => d.classList.toggle('active', i === index));
    testiQuote.style.opacity = '1';
  }, 300);
}
testiDots.forEach((dot, i) => {
  dot.addEventListener('click', () => { currentTesti = i; showTestimonial(i); });
});
if (testiQuote) {
  setInterval(() => {
    currentTesti = (currentTesti + 1) % testimonials.length;
    showTestimonial(currentTesti);
  }, 5000);
}

// ACTIVE NAV LINK
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href')?.split('/').pop();
  if (href === currentPath || (currentPath === '' && href === 'index.html')) {
    link.style.color = 'var(--c-accent)';
  }
});
