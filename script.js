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
document.querySelectorAll('.section-header, .project-card, .proj-card, .about-text, .about-stats, .stat, .contact-inner, .tech-strip, .spotlight-card, .project-hero-content, .project-stat, .strategy-card, .feature-card, .ml-card, .tech-detail-card, .detail-section, .pc').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Stagger project card animations
document.querySelectorAll('.project-card, .proj-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
});

// Dropdowns (Mac Apps, Web Apps): one open at a time
const dropdowns = [...document.querySelectorAll('.nav-mac-wrapper')].map(w => ({
    btn: w.querySelector('.nav-mac-btn'),
    menu: w.querySelector('.nav-mac-menu'),
})).filter(d => d.btn && d.menu);

function setDropdown(d, open) {
    d.menu.classList.toggle('open', open);
    d.btn.classList.toggle('open', open);
    d.btn.setAttribute('aria-expanded', String(open));
}
const closeDropdowns = () => dropdowns.forEach(d => setDropdown(d, false));

dropdowns.forEach(d => {
    d.btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const willOpen = !d.menu.classList.contains('open');
        closeDropdowns();
        setDropdown(d, willOpen);
    });
});
document.addEventListener('click', closeDropdowns);

// Escape closes whichever menu is open and returns focus to its trigger
document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const openDropdown = dropdowns.find(d => d.menu.classList.contains('open'));
    if (openDropdown) {
        setDropdown(openDropdown, false);
        openDropdown.btn.focus();
    } else if (links.classList.contains('open')) {
        setMenu(false);
        toggle.focus();
    }
});

// Leaving the mobile layout while the menu is open would leave the page scroll-locked
window.matchMedia('(min-width: 1281px)').addEventListener('change', (e) => {
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

// Back pill: return to the braunf.com page the visitor came from (for example the orb),
// remembered for the whole visit; visitors from anywhere else get a link to braunf.com.
(function () {
    var pill = document.querySelector('[data-back]');
    if (!pill) return;
    var key = 'braunf-back', stored = null;
    try { stored = sessionStorage.getItem(key); } catch (e) {}
    var ref = document.referrer, host = '';
    try { host = new URL(ref).hostname; } catch (e) {}
    if (ref && host !== location.hostname && /(^|\.)braunf\.com$/.test(host)) {
        stored = ref;
        try { sessionStorage.setItem(key, ref); } catch (e) {}
    }
    if (stored) { pill.href = stored; pill.textContent = '\u2190 Back'; }
})();

// Project cards: the spotlight follows the cursor
document.querySelectorAll('.pc').forEach(card => {
    card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
    }, { passive: true });
}); // pc-spot
