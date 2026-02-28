// ============================================================
// NAVBAR — Scroll effect
// ============================================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ============================================================
// MOBILE MENU
// ============================================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = mobileMenu.querySelectorAll('a');

hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    });
});

// ============================================================
// SCROLL REVEAL ANIMATION — IntersectionObserver
// ============================================================
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// Also immediately reveal hero elements
document.querySelectorAll('#hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 100 + i * 150);
});

// ============================================================
// FORM VALIDATION & SUBMISSION
// ============================================================
const form = document.getElementById('contact-form');
const formWrapper = document.getElementById('contact-form-wrapper');
const formSuccess = document.getElementById('form-success');
const submitBtn = document.getElementById('submit-btn');

// Utility: show/hide field error
function setError(fieldId, errorId, show) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(errorId);
    if (show) {
        field.classList.add('error');
        errorEl.style.display = 'block';
        field.setAttribute('aria-invalid', 'true');
    } else {
        field.classList.remove('error');
        errorEl.style.display = 'none';
        field.setAttribute('aria-invalid', 'false');
    }
}

// Validate email format
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Validate phone (Italian / international)
function isValidPhone(phone) {
    return /^[\d\s\+\-\(\)]{7,15}$/.test(phone.trim());
}

// Real-time validation on blur
document.getElementById('nome').addEventListener('blur', function () {
    setError('nome', 'nome-error', this.value.trim().length < 2);
});

document.getElementById('email').addEventListener('blur', function () {
    setError('email', 'email-error', !isValidEmail(this.value.trim()));
});

document.getElementById('telefono').addEventListener('blur', function () {
    setError('telefono', 'telefono-error', !isValidPhone(this.value.trim()));
});

document.getElementById('problema-field').addEventListener('blur', function () {
    setError('problema-field', 'problema-error', this.value.trim().length < 10);
});

// Form submit
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const problema = document.getElementById('problema-field').value.trim();
    const privacy = document.getElementById('privacy').checked;

    let valid = true;

    if (nome.length < 2) { setError('nome', 'nome-error', true); valid = false; }
    else { setError('nome', 'nome-error', false); }

    if (!isValidEmail(email)) { setError('email', 'email-error', true); valid = false; }
    else { setError('email', 'email-error', false); }

    if (!isValidPhone(telefono)) { setError('telefono', 'telefono-error', true); valid = false; }
    else { setError('telefono', 'telefono-error', false); }

    if (problema.length < 10) { setError('problema-field', 'problema-error', true); valid = false; }
    else { setError('problema-field', 'problema-error', false); }

    const privacyError = document.getElementById('privacy-error');
    if (!privacy) {
        privacyError.style.display = 'block';
        valid = false;
    } else {
        privacyError.style.display = 'none';
    }

    if (!valid) {
        // Focus first error field
        const firstError = form.querySelector('.error');
        if (firstError) firstError.focus();
        return;
    }

    // Simulate submission (loading state)
    submitBtn.disabled = true;
    submitBtn.textContent = '⏳ Invio in corso...';

    setTimeout(() => {
        // Show success message
        formWrapper.style.display = 'none';
        formSuccess.style.display = 'block';
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1200);
});