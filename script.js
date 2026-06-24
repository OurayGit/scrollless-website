// Auto-update copyright year in footers
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.current-year').forEach(function (el) {
        el.textContent = new Date().getFullYear();
    });
});

// Hamburger menu toggle
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    // Highlight centered feature card on mobile (vertical scroll)
    function highlightCenteredCard() {
        if (window.innerWidth <= 768) {
            const cards = document.querySelectorAll('.feature-card');
            if (!cards.length) return;

            const viewportCenter = window.innerHeight / 2;

            let closestCard = null;
            let closestDistance = Infinity;

            cards.forEach(card => {
                const cardRect = card.getBoundingClientRect();
                const cardCenter = cardRect.top + cardRect.height / 2;
                const distance = Math.abs(viewportCenter - cardCenter);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestCard = card;
                }

                card.classList.remove('centered');
            });

            if (closestCard && closestDistance < window.innerHeight / 2) {
                closestCard.classList.add('centered');
            }
        }
    }

    // Initial highlight
    highlightCenteredCard();

    // Highlight on scroll (page scroll, not container scroll)
    window.addEventListener('scroll', highlightCenteredCard);

    // Intersection Observer for reveal animations
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1
    });

    document.querySelectorAll('.reveal, .content-block, .feature-card, .screenshot').forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });


    // Auto-route download buttons to the right app store, then track clicks.
    // The static HTML points at the Play Store, so Android, desktop, and crawlers
    // get a valid link with no JS. On iPhone/iPad we rewrite to the App Store; on
    // desktop (no single mobile OS to assume) we show BOTH stores side by side.
    const APP_STORE_URL = 'https://apps.apple.com/app/id6761528098';
    const ua = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(ua) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); // iPadOS reports as Mac
    const isAndroid = /Android/.test(ua);

    function trackDownload(store) {
        if (typeof gtag === 'function') {
            gtag('event', 'download_clicked', {
                'event_category': 'conversion',
                'event_label': 'download_app_' + store,
                'transport_type': 'beacon'
            });
        } else {
            console.log('Download clicked (Analytics not loaded)');
        }
    }

    const storeLinks = document.querySelectorAll(
        'a[href*="play.google.com/store/apps/details?id=ch.scrollless"], a.nav-btn'
    );
    storeLinks.forEach(link => {
        if (isIOS) {
            link.href = APP_STORE_URL;
            if (/Play Store/i.test(link.textContent)) {
                link.textContent = link.textContent.replace(/Play Store/i, 'App Store');
            }
        }
        link.addEventListener('click', () => trackDownload(isIOS ? 'app_store' : 'play_store'));
    });

    // Desktop only: add an App Store button beside each primary Play Store button
    // so visitors can choose their platform.
    if (!isIOS && !isAndroid) {
        document.querySelectorAll('a.download-btn').forEach(playBtn => {
            const appBtn = playBtn.cloneNode(true);
            appBtn.href = APP_STORE_URL;
            appBtn.id = '';
            appBtn.textContent = 'Download on the App Store';
            appBtn.addEventListener('click', () => trackDownload('app_store'));
            playBtn.parentNode.insertBefore(appBtn, playBtn.nextSibling);
        });
    }

    // Toggle nav button style based on ANY page download button visibility
    const navBtn = document.querySelector('.nav-btn');
    const pageDownloadBtns = document.querySelectorAll('.download-btn');

    if (navBtn && pageDownloadBtns.length > 0) {
        const visibleBtns = new Set();

        const ctaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    visibleBtns.add(entry.target);
                    console.log('A page download button is visible - Nav button subtle');
                } else {
                    visibleBtns.delete(entry.target);
                    console.log('A page download button is hidden');
                }
            });

            // If any on-page download button is visible, make the nav button subtle
            // so we don't have two red buttons on screen at once
            if (visibleBtns.size > 0) {
                navBtn.classList.add('subtle');
            } else {
                navBtn.classList.remove('subtle');
            }
        }, {
            threshold: 0
        });

        pageDownloadBtns.forEach(btn => ctaObserver.observe(btn));
    }

    // FAQ accordion toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all other items
                faqItems.forEach(other => {
                    other.classList.remove('active');
                    const otherBtn = other.querySelector('.faq-question');
                    if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                });

                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                    question.setAttribute('aria-expanded', 'true');
                }
            });
        }
    });
});
