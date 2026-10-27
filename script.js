const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Nav scroll effect
const nav = document.getElementById('nav');
const updateNav = () => nav.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// Mobile menu toggle
const toggle = document.getElementById('nav-toggle');
const links = document.getElementById('nav-links');

function setMenu(open) {
    toggle.classList.toggle('active', open);
    links.classList.toggle('open', open);
    nav.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
}

toggle.setAttribute('aria-controls', 'nav-links');
toggle.setAttribute('aria-expanded', 'false');
toggle.addEventListener('click', () => setMenu(!links.classList.contains('open')));

// Close menu when clicking a link (the Mac Apps button is a <button>, so it stays open)
links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
});

// Fade-in on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in class to elements
document.querySelectorAll('.section-header, .project-card, .proj-card, .about-text, .about-stats, .stat, .contact-inner, .tech-strip, .spotlight-card, .project-hero-content, .project-stat, .strategy-card, .feature-card, .ml-card, .tech-detail-card, .detail-section').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Stagger project card animations
document.querySelectorAll('.project-card, .proj-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
});

// Mac Apps dropdown
const macBtn = document.getElementById('mac-apps-btn');
const macMenu = document.getElementById('mac-apps-menu');

function setMacMenu(open) {
    macMenu.classList.toggle('open', open);
    macBtn.classList.toggle('open', open);
    macBtn.setAttribute('aria-expanded', String(open));
}

if (macBtn && macMenu) {
    macBtn.setAttribute('aria-controls', 'mac-apps-menu');
    macBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        setMacMenu(!macMenu.classList.contains('open'));
    });
    document.addEventListener('click', () => setMacMenu(false));
}

// Escape closes whichever menu is open and returns focus to its trigger
document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (macMenu && macMenu.classList.contains('open')) {
        setMacMenu(false);
        macBtn.focus();
    } else if (links.classList.contains('open')) {
        setMenu(false);
        toggle.focus();
    }
});

// Leaving the mobile layout while the menu is open would leave the page scroll-locked
window.matchMedia('(min-width: 1181px)').addEventListener('change', (e) => {
    if (e.matches) setMenu(false);
});

// Smooth scroll for in-page anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const hash = anchor.getAttribute('href');
        // A bare "#" (logo link) is not a valid selector; treat it as "scroll to top"
        const target = hash.length > 1 ? document.querySelector(hash) : document.body;
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = hash.length > 1 ? target.getBoundingClientRect().top + window.scrollY - offset : 0;
            window.scrollTo({ top, behavior: prefersReducedMotion.matches ? 'auto' : 'smooth' });
        }
    });
});
