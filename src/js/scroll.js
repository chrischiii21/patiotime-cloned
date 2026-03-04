// scroll-reveal.js
export function initScrollReveal() {
    const observerOptions = {
        threshold: 0.15, // Trigger when 15% of card is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the viewport
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Stop observing once animated to save performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Target every element with the 'reveal-card' class
    const cards = document.querySelectorAll('.reveal-card');
    cards.forEach((card) => observer.observe(card));
}