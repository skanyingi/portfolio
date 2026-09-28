// Year, nav highlight, reveal, mobile nav auto-close
document.getElementById('year').textContent = new Date().getFullYear();

// Active nav link on scroll
const sections = ['home', 'about', 'skills', 'projects', 'journey', 'contact'];
const navLinks = document.querySelectorAll('.navbar-dark .nav-link');
function setActive() {
  let current = 'home';
  for (const id of sections) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (window.scrollY >= el.offsetTop - 120) current = id;
  }
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
}
window.addEventListener('scroll', setActive, { passive: true });
setActive();

// Navbar shadow
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 10 ? '0 8px 30px rgba(0,0,0,.35)' : 'none';
}, { passive: true });

// Auto-close mobile menu on click
document.querySelectorAll('#navMenu a').forEach(a => {
  a.addEventListener('click', () => {
    const menu = document.getElementById('navMenu');
    if (menu.classList.contains('show')) {
      const toggler = document.querySelector('.navbar-toggler');
      if (toggler) toggler.click();
    }
  });
});

// See more projects — swap label + icon as the section opens and closes
const moreProjects = document.getElementById('moreProjects');
const moreBtn = document.getElementById('moreProjectsBtn');
if (moreProjects && moreBtn) {
  const moreLabel = document.getElementById('moreProjectsLabel');
  const moreIcon = moreBtn.querySelector('i');
  moreProjects.addEventListener('show.bs.collapse', () => {
    moreLabel.textContent = 'Hide projects';
    moreIcon.className = 'bi bi-dash-lg me-1';
  });
  moreProjects.addEventListener('hidden.bs.collapse', () => {
    moreLabel.textContent = 'See more projects';
    moreIcon.className = 'bi bi-plus-lg me-1';
  });
}

// Scroll reveal with fail-safe (never leave sections hidden)
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
  // Fail-safe: reveal everything after 1.5s (e.g. large screens, JS timing issues)
  setTimeout(() => revealEls.forEach(el => el.classList.add('visible')), 1500);
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}

