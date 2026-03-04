export function initScrollReveal() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    //target elements - exclude carousel slides
    const cards = document.querySelectorAll('.reveal-card:not(#carousel-track .reveal-card)');
    cards.forEach((card) => observer.observe(card));

    // Make carousel slides visible immediately
    const carouselSlides = document.querySelectorAll('#carousel-track .reveal-card');
    carouselSlides.forEach((slide) => slide.classList.add('active'));
}