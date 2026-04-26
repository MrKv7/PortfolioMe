/* ═══════════════════════════════════════════════
   TABLE OF CONTENTS
   ───────────────────────────────────────────────
   1.  CONFIG  ← ★ PUT YOUR KEYS HERE ★
   2.  Particle System
   3.  Navbar Scroll Behaviour
   4.  Active Nav Link on Scroll
   5.  Mobile Menu
   6.  Typewriter Effect
   7.  Scroll Reveal
   8.  Counter Animation
   9.  Progress Bar Animation
   10. Skills Tab Filter
   11. Projects Filter
   12. Scroll To Top
   13. Contact Form — Fetch User Info + Send to WhatsApp & Discord
   14. Init
═══════════════════════════════════════════════ */


/* ─────────────────────────────────────────────
   1. CONFIG  ★ EDIT THIS BLOCK ★
───────────────────────────────────────────── */
const CONFIG = {

    /* ── Discord ──────────────────────────────
       1. Go to your Discord server
       2. Edit Channel → Integrations → Webhooks → New Webhook
       3. Copy Webhook URL and paste below               */
    DISCORD_WEBHOOK: 'https://discord.com/api/webhooks/1497144265669607546/mSj0LUVJtqWgCjfFetifE3yGXUSabox78xBZR3xw1A36Vd5zysbkOq7_AsnCT7SHBDIh',

    /* ── WhatsApp ─────────────────────────────
       Uses CallMeBot (free service)
       1. Add +34 644 99 35 45 to your WhatsApp contacts
       2. Send this message to that number:
          "I allow callmebot to send me messages"
       3. You'll receive your API key via WhatsApp
       4. Fill in your number (with country code, no +)
          and the API key below                          */
    WHATSAPP_PHONE:  '0715407850',   // e.g. '1234567890'
    WHATSAPP_APIKEY: 'YOUR_CALLMEBOT_API_KEY',   // e.g. '123456'

    /* ── Portfolio owner name (shown in notifications) */
    OWNER_NAME: 'Kavindu Nilanga Lyr',
};


/* ─────────────────────────────────────────────
   2. PARTICLE SYSTEM
───────────────────────────────────────────── */
function initParticles() {
    const container = document.getElementById('particles');
    const colors    = ['#6C63FF', '#FF6584', '#43E97B', '#F59E0B'];

    for (let i = 0; i < 30; i++) {
        const p    = document.createElement('div');
        const size = Math.random() * 3 + 1;
        p.classList.add('particle');
        p.style.cssText = `
            left:               ${Math.random() * 100}%;
            width:              ${size}px;
            height:             ${size}px;
            background:         ${colors[Math.floor(Math.random() * colors.length)]};
            animation-duration: ${Math.random() * 10 + 8}s;
            animation-delay:    ${Math.random() * 10}s;
        `;
        container.appendChild(p);
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
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach((s) => {
            if (window.scrollY >= s.offsetTop - 120) current = s.id;
        });
        navLinks.forEach((a) => {
            a.style.color = a.getAttribute('href') === '#' + current
                ? 'var(--primary)' : '';
        });
    });
}


/* ─────────────────────────────────────────────
   5. MOBILE MENU
───────────────────────────────────────────── */
function initMobileMenu() {
    document.getElementById('hamburger').addEventListener('click',
        () => document.getElementById('mobileMenu').classList.add('open'));
    document.getElementById('mobileClose').addEventListener('click',
        () => document.getElementById('mobileMenu').classList.remove('open'));
}

function closeMobileMenu() {
    document.getElementById('mobileMenu').classList.remove('open');
}


/* ─────────────────────────────────────────────
   6. TYPEWRITER EFFECT
───────────────────────────────────────────── */
function initTypewriter() {
    const words    = ['Kavindu Nilanga','Developer','Designer','Creator'];
    const el       = document.getElementById('typewriter');
    let wordIdx    = 0, charIdx = 0, deleting = false;

    function type() {
        const word = words[wordIdx];
        el.textContent = deleting
            ? word.substring(0, charIdx - 1)
            : word.substring(0, charIdx + 1);
        deleting ? charIdx-- : charIdx++;

        if (!deleting && charIdx === word.length)
            setTimeout(() => { deleting = true; }, 1500);
        if (deleting && charIdx === 0) {
            deleting = false;
            wordIdx  = (wordIdx + 1) % words.length;
        }
        setTimeout(type, deleting ? 80 : 120);
    }
    type();
}


/* ─────────────────────────────────────────────
   7. SCROLL REVEAL
───────────────────────────────────────────── */
function initScrollReveal() {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting)
                setTimeout(() => e.target.classList.add('active'), i * 100);
        });
    }, { threshold: 0.1 });
    els.forEach((el) => obs.observe(el));
}


/* ─────────────────────────────────────────────
   8. COUNTER ANIMATION
───────────────────────────────────────────── */
function initCounters() {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const target = parseInt(e.target.getAttribute('data-count'));
            const step   = target / 50;
            let   cur    = 0;
            const t = setInterval(() => {
                cur += step;
                if (cur >= target) { cur = target; clearInterval(t); }
                e.target.textContent = Math.floor(cur) + '+';
            }, 40);
            obs.unobserve(e.target);
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-count]').forEach((el) => obs.observe(el));
}


/* ─────────────────────────────────────────────
   9. PROGRESS BAR ANIMATION
───────────────────────────────────────────── */
function initProgressBars() {
    const section = document.querySelector('.proficiency-section');
    if (!section) return;
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (!e.isIntersecting) return;
            e.target.querySelectorAll('.prof-fill').forEach((bar) => {
                bar.style.width = bar.getAttribute('data-width') + '%';
            });
            obs.unobserve(e.target);
        });
    }, { threshold: 0.25 });
    obs.observe(section);
}


/* ─────────────────────────────────────────────
   10. SKILLS TAB FILTER
───────────────────────────────────────────── */
function showSkills(category, btn) {
    document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('.skill-card').forEach((card) => {
        const match = category === 'all' || card.dataset.category === category;
        if (match) {
            card.style.display   = '';
            card.style.opacity   = '0';
            card.style.transform = 'translateY(12px)';
            requestAnimationFrame(() => requestAnimationFrame(() => {
                card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
                card.style.opacity    = '1';
                card.style.transform  = 'translateY(0)';
            }));
        } else {
            card.style.display = 'none';
        }
    });
}


/* ─────────────────────────────────────────────
   11. PROJECTS FILTER
───────────────────────────────────────────── */
function filterProjects(category, btn) {
    document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('.project-card').forEach((card) => {
        const match = category === 'all' || card.dataset.category === category;
        if (match) {
            card.style.display   = 'block';
            card.style.opacity   = '0';
            card.style.transform = 'translateY(20px)';
            requestAnimationFrame(() => requestAnimationFrame(() => {
                card.style.transition = 'all 0.4s ease';
                card.style.opacity    = '1';
                card.style.transform  = 'translateY(0)';
            }));
        } else {
            card.style.display = 'none';
        }
    });
}


/* ─────────────────────────────────────────────
   12. SCROLL TO TOP
───────────────────────────────────────────── */
function initScrollTop() {
    document.getElementById('scrollTop').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


/* ─────────────────────────────────────────────
   13. CONTACT FORM
       — Collects user info + IP data
       — Sends to Discord webhook
       — Sends to WhatsApp via CallMeBot
───────────────────────────────────────────── */

/* ── Toast helper ── */
function showToast(type, message) {
    const toast = document.getElementById('formToast');
    const icons = { success: 'fa-check-circle', error: 'fa-times-circle', sending: 'fa-spinner fa-spin' };
    toast.className  = `form-toast show ${type}`;
    toast.innerHTML  = `<i class="fas ${icons[type]}"></i> ${message}`;
    if (type !== 'sending') {
        setTimeout(() => { toast.className = 'form-toast'; }, 5000);
    }
}

/* ── Validate fields ── */
function validateForm(data) {
    let valid = true;
    const required = ['firstName', 'lastName', 'emailInput', 'serviceInput', 'messageInput'];

    required.forEach((id) => {
        const el = document.getElementById(id);
        if (!el.value.trim()) {
            el.classList.add('error');
            valid = false;
        } else {
            el.classList.remove('error');
        }
    });

    const email = document.getElementById('emailInput');
    if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.classList.add('error');
        valid = false;
    }
    return valid;
}

/* ── Gather user browser/device info ── */
function getBrowserInfo() {
    const ua      = navigator.userAgent;
    const lang    = navigator.language || 'Unknown';
    const tz      = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown';
    const screen  = `${window.screen.width}x${window.screen.height}`;
    const now     = new Date().toLocaleString('en-US', { timeZone: tz });

    let browser = 'Unknown', os = 'Unknown';

    /* Detect browser */
    if      (/Edg/.test(ua))     browser = 'Microsoft Edge';
    else if (/OPR|Opera/.test(ua)) browser = 'Opera';
    else if (/Chrome/.test(ua))  browser = 'Google Chrome';
    else if (/Firefox/.test(ua)) browser = 'Mozilla Firefox';
    else if (/Safari/.test(ua))  browser = 'Safari';

    /* Detect OS */
    if      (/Windows NT 10/.test(ua)) os = 'Windows 10/11';
    else if (/Windows NT 6.3/.test(ua)) os = 'Windows 8.1';
    else if (/Windows/.test(ua)) os = 'Windows';
    else if (/Mac OS X/.test(ua)) os = 'macOS';
    else if (/Android/.test(ua)) os = 'Android';
    else if (/iPhone|iPad/.test(ua)) os = 'iOS';
    else if (/Linux/.test(ua))   os = 'Linux';

    return { browser, os, lang, tz, screen, now };
}

/* ── Fetch IP & location from free API ── */
async function getUserIPInfo() {
    try {
        const res  = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        return {
            ip:       data.ip       || 'Unknown',
            city:     data.city     || 'Unknown',
            region:   data.region   || 'Unknown',
            country:  data.country_name || 'Unknown',
            isp:      data.org      || 'Unknown',
            lat:      data.latitude || '',
            lon:      data.longitude|| '',
        };
    } catch {
        return { ip: 'Unknown', city: 'Unknown', region: 'Unknown', country: 'Unknown', isp: 'Unknown', lat: '', lon: '' };
    }
}

/* ── Send to Discord ── */
async function sendToDiscord(formData, ipInfo, browserInfo) {
    const mapsLink = ipInfo.lat
        ? `https://www.google.com/maps?q=${ipInfo.lat},${ipInfo.lon}`
        : 'N/A';

    const payload = {
        username:   '📬 Portfolio Contact',
        avatar_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg',
        embeds: [{
            title:       '🔔 New Contact Form Submission',
            description: `Someone just filled out the contact form on **${CONFIG.OWNER_NAME}'s** portfolio!`,
            color:       0x6C63FF,
            thumbnail:   { url: 'https://i.imgur.com/wSTFkRM.png' },
            fields: [
                /* ── Form Data ── */
                {
                    name:   '👤 Full Name',
                    value:  `\`${formData.firstName} ${formData.lastName}\``,
                    inline: true,
                },
                {
                    name:   '📧 Email',
                    value:  `\`${formData.email}\``,
                    inline: true,
                },
                {
                    name:   '📱 Phone',
                    value:  `\`${formData.phone || 'Not provided'}\``,
                    inline: true,
                },
                {
                    name:   '🛠️ Service Needed',
                    value:  `\`${formData.service}\``,
                    inline: true,
                },
                {
                    name:   '💰 Budget',
                    value:  `\`${formData.budget || 'Not specified'}\``,
                    inline: true,
                },
                { name: '\u200b', value: '\u200b', inline: false },

                /* ── Message ── */
                {
                    name:  '💬 Message',
                    value: `\`\`\`${formData.message}\`\`\``,
                    inline: false,
                },

                /* ── IP & Location ── */
                {
                    name:   '🌐 IP Address',
                    value:  `\`${ipInfo.ip}\``,
                    inline: true,
                },
                {
                    name:   '📍 Location',
                    value:  `\`${ipInfo.city}, ${ipInfo.region}, ${ipInfo.country}\``,
                    inline: true,
                },
                {
                    name:   '🏢 ISP / Org',
                    value:  `\`${ipInfo.isp}\``,
                    inline: true,
                },
                {
                    name:   '🗺️ Maps Link',
                    value:  mapsLink !== 'N/A' ? `[Open in Google Maps](${mapsLink})` : 'N/A',
                    inline: true,
                },

                /* ── Browser & Device ── */
                {
                    name:   '🖥️ Browser',
                    value:  `\`${browserInfo.browser}\``,
                    inline: true,
                },
                {
                    name:   '💻 OS',
                    value:  `\`${browserInfo.os}\``,
                    inline: true,
                },
                {
                    name:   '🌍 Language',
                    value:  `\`${browserInfo.lang}\``,
                    inline: true,
                },
                {
                    name:   '🕐 Timezone',
                    value:  `\`${browserInfo.tz}\``,
                    inline: true,
                },
                {
                    name:   '📐 Screen Size',
                    value:  `\`${browserInfo.screen}\``,
                    inline: true,
                },
                {
                    name:   '🕒 Submitted At',
                    value:  `\`${browserInfo.now}\``,
                    inline: true,
                },
            ],
            footer: {
                text: `${CONFIG.OWNER_NAME}'s Portfolio • Contact Form`,
            },
            timestamp: new Date().toISOString(),
        }],
    };

    const res = await fetch(CONFIG.DISCORD_WEBHOOK, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(`Discord error: ${res.status}`);
}

/* ── Send to WhatsApp via CallMeBot ── */
async function sendToWhatsApp(formData, ipInfo, browserInfo) {
    const message = [
        `🔔 *New Portfolio Contact!*`,
        ``,
        `👤 *Name:* ${formData.firstName} ${formData.lastName}`,
        `📧 *Email:* ${formData.email}`,
        `📱 *Phone:* ${formData.phone || 'Not provided'}`,
        `🛠️ *Service:* ${formData.service}`,
        `💰 *Budget:* ${formData.budget || 'Not specified'}`,
        ``,
        `💬 *Message:*`,
        `${formData.message}`,
        ``,
        `━━━━━━━━━━━━━━━━`,
        `🌐 *IP:* ${ipInfo.ip}`,
        `📍 *Location:* ${ipInfo.city}, ${ipInfo.country}`,
        `🖥️ *Browser:* ${browserInfo.browser}`,
        `💻 *OS:* ${browserInfo.os}`,
        `🕒 *Time:* ${browserInfo.now}`,
    ].join('\n');

    const encoded = encodeURIComponent(message);
    const url = `https://api.callmebot.com/whatsapp.php?phone=${CONFIG.WHATSAPP_PHONE}&text=${encoded}&apikey=${CONFIG.WHATSAPP_APIKEY}`;

    /* CallMeBot doesn't support CORS so we use no-cors mode */
    await fetch(url, { method: 'GET', mode: 'no-cors' });
}

/* ── Main form submit handler ── */
function initContactForm() {
    /* Clear error state on input */
    document.querySelectorAll('.form-group input, .form-group textarea, .form-group select')
        .forEach((el) => el.addEventListener('input', () => el.classList.remove('error')));

    document.getElementById('formSubmit').addEventListener('click', async () => {
        /* Collect values */
        const formData = {
            firstName : document.getElementById('firstName').value.trim(),
            lastName  : document.getElementById('lastName').value.trim(),
            email     : document.getElementById('emailInput').value.trim(),
            phone     : document.getElementById('phoneInput').value.trim(),
            service   : document.getElementById('serviceInput').value,
            budget    : document.getElementById('budgetInput').value,
            message   : document.getElementById('messageInput').value.trim(),
        };

        /* Validate */
        if (!validateForm(formData)) {
            showToast('error', 'Please fill in all required fields correctly.');
            return;
        }

        /* UI — loading state */
        const btn      = document.getElementById('formSubmit');
        const textEl   = document.getElementById('submitText');
        const loaderEl = document.getElementById('submitLoader');
        btn.disabled      = true;
        textEl.style.display   = 'none';
        loaderEl.style.display = 'flex';
        showToast('sending', 'Sending your message...');

        try {
            /* Gather extra info in parallel */
            const [ipInfo, browserInfo] = await Promise.all([
                getUserIPInfo(),
                Promise.resolve(getBrowserInfo()),
            ]);

            /* Send to both platforms in parallel */
            await Promise.allSettled([
                sendToDiscord(formData, ipInfo, browserInfo),
                sendToWhatsApp(formData, ipInfo, browserInfo),
            ]);

            /* Success */
            showToast('success', '✅ Message sent! I\'ll get back to you soon.');

            /* Clear form */
            ['firstName','lastName','emailInput','phoneInput',
             'serviceInput','budgetInput','messageInput'].forEach((id) => {
                const el = document.getElementById(id);
                el.value = '';
                el.classList.remove('error');
            });

        } catch (err) {
            console.error('Send error:', err);
            showToast('error', '❌ Something went wrong. Please try again or contact me directly.');
        } finally {
            /* Reset button */
            btn.disabled           = false;
            textEl.style.display   = 'flex';
            loaderEl.style.display = 'none';
        }
    });
}


/* ─────────────────────────────────────────────
   14. INIT
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
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