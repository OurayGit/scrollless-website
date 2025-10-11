// Hamburger menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
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
    
    // Re-highlight on window resize
    window.addEventListener('resize', highlightCenteredCard);
});
