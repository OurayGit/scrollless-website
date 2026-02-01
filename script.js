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


    // Track download button clicks
    const downloadBtn = document.getElementById('download-app-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function () {
            // Check if gtag is defined (it should be from index.html)
            if (typeof gtag === 'function') {
                gtag('event', 'click', {
                    'event_category': 'conversion',
                    'event_label': 'download_app_play_store',
                    'transport_type': 'beacon'
                });
            } else {
                console.log('Download clicked (Analytics not loaded)');
            }
        });
    }
});
