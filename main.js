/**
 * Picnique Luxury Experiences - Core Logic
 * - Dark/Light Theme Toggle
 * - RTL/LTR Toggle
 * - Header Scroll Effects
 * - Mobile Menu Controls
 * - Scroll to Top
 * - Form Validations
 */

document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------------
    // Theme Toggle Logic
    // ---------------------------------------------------------
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.documentElement;

    // Check Local Storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      body.classList.add('dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark');
            const currentTheme = body.classList.contains('dark') ? 'dark' : 'light';
            localStorage.setItem('theme', currentTheme);
            updateThemeIcon();
        });
    }

    function updateThemeIcon() {
        if (themeToggle) {
            const isDark = body.classList.contains('dark');
            themeToggle.innerHTML = isDark 
                ? '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z"></path></svg>'
                : '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>';
        }
    }
    updateThemeIcon();

    // ---------------------------------------------------------
    // RTL Toggle Logic
    // ---------------------------------------------------------
    const rtlToggle = document.getElementById('rtl-toggle');
    
    // Check Local Storage
    const savedRTL = localStorage.getItem('rtl');
    if (savedRTL === 'true') {
      body.setAttribute('dir', 'rtl');
    }

    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const isRTL = body.getAttribute('dir') === 'rtl';
            body.setAttribute('dir', isRTL ? 'ltr' : 'rtl');
            localStorage.setItem('rtl', !isRTL);
            updateRTLIcon();
        });
    }

    function updateRTLIcon() {
        if (rtlToggle) {
            const isRTL = body.getAttribute('dir') === 'rtl';
            rtlToggle.innerText = isRTL ? 'LTR' : 'RTL';
        }
    }
    updateRTLIcon();

    // ---------------------------------------------------------
    // Sticky Header Logic
    // ---------------------------------------------------------
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky-nav');
        } else {
            header.classList.remove('sticky-nav');
        }

        // Scroll Top Button
        const scrollBtn = document.getElementById('scroll-top');
        if (scrollBtn) {
            if (window.scrollY > 400) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        }
    });

    // ---------------------------------------------------------
    // Mobile Menu Logic
    // ---------------------------------------------------------
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuClose = document.getElementById('menu-close');
    const menuLinks = document.querySelectorAll('.mobile-link');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
          mobileMenu.classList.remove('translate-x-full');
          mobileMenu.classList.add('translate-x-0');
        });

        const closeMenu = () => {
          mobileMenu.classList.add('translate-x-full');
          mobileMenu.classList.remove('translate-x-0');
        };

        if (menuClose) menuClose.addEventListener('click', closeMenu);
        menuLinks.forEach(link => link.addEventListener('click', closeMenu));
    }

    // ---------------------------------------------------------
    // Scroll To Top Execution
    // ---------------------------------------------------------
    const scrollBtnExec = document.getElementById('scroll-top');
    if (scrollBtnExec) {
        scrollBtnExec.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---------------------------------------------------------
    // Validation Placeholder (Shared)
    // ---------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = contactForm.querySelector('input[type="email"]').value;
        if (!email.includes('@')) {
          alert('Please enter a valid email address');
          return;
        }
        alert('Thank you! Your inquiry has been received.');
        contactForm.reset();
      });
    }
});
