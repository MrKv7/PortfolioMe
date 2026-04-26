/* ═══════════════════════════════════════════════
   TABLE OF CONTENTS
   ───────────────────────────────────────────────
   1.  Custom Cursor
   2.  Particle System
   3.  Navbar Scroll Behaviour
   4.  Active Nav Link on Scroll
   5.  Mobile Menu
   6.  Typewriter Effect
   7.  Scroll Reveal (IntersectionObserver)
   8.  Counter Animation
   9.  Progress Bar Animation
   10. Skills Tab Filter
   11. Projects Filter
   12. Scroll To Top Button
   13. Contact Form Submit Feedback
   14. Init on DOM Ready
═══════════════════════════════════════════════ */


/* ─────────────────────────────────────────────
   1. CUSTOM CURSOR
───────────────────────────────────────────── */
function initCursor() {
    const cursor   = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    /* Track mouse */
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX - 6 + 'px';
        cursor.style.top  = mouseY - 6 + 'px';
    });

    /* Smooth follower */
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX - 20 + 'px';
        follower.style.top  = followerY - 20 + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    /* Hover effect on interactive elements */
    const interactives = document.querySelectorAll('a, button, .skill-card, .project-card');
    interactives.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform        = 'scale(2)';
            follower.style.transform      = 'scale(1.5)';
            follower.style.borderColor    = 'rgba(108, 99, 255, 0.8)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform        = 'scale(1)';
            follower.style.transform      = 'scale(1)';
            follower.style.borderColor    = 'rgba(108, 99, 255, 0.5)';
        });
    });
}


/* ─────────────────────────────────────────────
   2. PARTICLE SYSTEM
───────────────────────────────────────────── */
function initParticles() {
    const container = document.getElementById('particles');
    const colors    = ['#6C63FF', '#FF6584', '#43E97B', '#F59E0B'];
    const count     = 30;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 3 + 1;
        particle.style.cssText = `
            left:               ${Math.random() * 100}%;
            width:              ${size}px;
            height:             ${size}px;
            background:         ${colors[Math.floor(Math.random() * colors.length)]};
            animation-duration: ${Math.random() * 10 + 8}s;
            animation-delay:    ${Math.random() * 10}s;
        `;
        container.appendChild(particle);
    }
}


/* ─────────────────────────────────────────────
   3. NAVBAR SCROLL BEHAVIOUR
───────────────────────────────────────────── */
function initNavbar() {
    const navbar    = document.getElementById('navbar');
    const scrollBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            scrollBtn.classList.add('visible');
        } else {
            navbar.classList.remove('scrolled');
            scrollBtn.classList.remove('visible');
        }
    });
}


/* ─────────────────────────────────────────────
   4. ACTIVE NAV LINK ON SCROLL
───────────────────────────────────────────── */
function initActiveNav() {
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach((section) => {
            if (window.scrollY >= section.offsetTop - 120) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + current) {
                link.style.color = 'var(--primary)';
            }
        });
    });
}


/* ─────────────────────────────────────────────
   5. MOBILE MENU
───────────────────────────────────────────── */
function initMobileMenu() {
    const hamburger  = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileClose');

    hamburger.addEventListener('click',   () => mobileMenu.classList.add('open'));
    mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
}

/* Called inline via onclick in HTML */
function closeMobileMenu() {
    document.getElementById('mobileMenu').classList.remove('open');
}


/* ─────────────────────────────────────────────
   6. TYPEWRITER EFFECT
───────────────────────────────────────────── */
function initTypewriter() {
    const words     = ['Developer', 'Designer', 'Problem Solver', 'Creator'];
    const typeEl    = document.getElementById('typewriter');
    let wordIndex   = 0;
    let charIndex   = 0;
    let isDeleting  = false;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typeEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typeEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        /* Word complete → pause then delete */
        if (!isDeleting && charIndex === currentWord.length) {
            setTimeout(() => { isDeleting = true; }, 1500);
        }

        /* Word deleted → move to next */
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex  = (wordIndex + 1) % words.length;
        }

        setTimeout(type, isDeleting ? 80 : 120);
    }

    type();
}


/* ─────────────────────────────────────────────
   7. SCROLL REVEAL
───────────────────────────────────────────── */
function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach((el) => observer.observe(el));
}


/* ─────────────────────────────────────────────
   8. COUNTER ANIMATION
───────────────────────────────────────────── */
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const target    = parseInt(entry.target.getAttribute('data-count'));
            const increment = target / 50;
            let   current   = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                entry.target.textContent = Math.floor(current) + '+';
            }, 40);

            observer.unobserve(entry.target);
        });
    }, { threshold: 0.5 });

    counters.forEach((el) => observer.observe(el));
}


/* ─────────────────────────────────────────────
   9. PROGRESS BAR ANIMATION
   — now targets .prof-fill inside .proficiency-section
───────────────────────────────────────────── */
function initProgressBars() {
    const profSection = document.querySelector('.proficiency-section');
    if (!profSection) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                /* Animate every bar inside the section */
                entry.target
                    .querySelectorAll('.prof-fill')
                    .forEach((bar) => {
                        bar.style.width = bar.getAttribute('data-width') + '%';
                    });

                /* Only trigger once */
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.25 }
    );

    observer.observe(profSection);
}


/* ─────────────────────────────────────────────
   10. SKILLS TAB FILTER
   — updated to match new .skill-card structure
───────────────────────────────────────────── */
function showSkills(category, btn) {
    /* Update active tab */
    document.querySelectorAll('.tab-btn').forEach((b) =>
        b.classList.remove('active')
    );
    btn.classList.add('active');

    /* Show / hide + animate cards */
    document.querySelectorAll('.skill-card').forEach((card) => {
        const match =
            category === 'all' ||
            card.getAttribute('data-category') === category;

        if (match) {
            card.style.display   = '';
            card.style.opacity   = '0';
            card.style.transform = 'translateY(12px)';

            /* Force reflow so transition fires */
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
                    card.style.opacity    = '1';
                    card.style.transform  = 'translateY(0)';
                });
            });
        } else {
            card.style.display = 'none';
        }
    });
}


/* ─────────────────────────────────────────────
   11. PROJECTS FILTER
───────────────────────────────────────────── */
function filterProjects(category, btn) {
    /* Update active button */
    document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    /* Animate cards */
    document.querySelectorAll('.project-card').forEach((card) => {
        const match = category === 'all' || card.getAttribute('data-category') === category;

        if (match) {
            card.style.display    = 'block';
            card.style.opacity    = '0';
            card.style.transform  = 'translateY(20px)';
            card.style.transition = 'all 0.4s ease';

            /* Trigger reflow for animation */
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    card.style.opacity   = '1';
                    card.style.transform = 'translateY(0)';
                });
            });
        } else {
            card.style.display = 'none';
        }
    });
}


/* ─────────────────────────────────────────────
   12. SCROLL TO TOP BUTTON
───────────────────────────────────────────── */
function initScrollTop() {
    document.getElementById('scrollTop').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


/* ─────────────────────────────────────────────
   13. CONTACT FORM SUBMIT FEEDBACK
───────────────────────────────────────────── */
function initContactForm() {
    const btn = document.getElementById('formSubmit');

    btn.addEventListener('click', () => {
        /* Success state */
        btn.innerHTML    = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #43E97B, #38F9D7)';

        /* Reset after 3 seconds */
        setTimeout(() => {
            btn.innerHTML    = '<i class="fas fa-paper-plane"></i> Send Message';
            btn.style.background = '';
        }, 3000);
    });
}


/* ─────────────────────────────────────────────
   14. INIT — Run everything on DOM Ready
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initParticles();
    initNavbar();
    initActiveNav();
    initMobileMenu();
    initTypewriter();
    initScrollReveal();
    initCounters();
    initProgressBars();
    initScrollTop();
    initContactForm();
});