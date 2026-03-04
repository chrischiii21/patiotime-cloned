export function initScrollEffect() {
    const topBar = document.getElementById('topBar');
    const heroSection = document.getElementById('hero'); // Make sure your first section has id="hero"

    if (!topBar || !heroSection) return;

    // Apply smooth transition properties via JS
    topBar.style.transition = "transform 0.4s ease, opacity 0.4s ease, max-height 0.4s ease";
    topBar.style.transformOrigin = "top";

    const observerOptions = {
        threshold: 0, // Trigger as soon as the last pixel of Hero leaves the top
        rootMargin: "-10px 0px 0px 0px" // Slight offset to trigger exactly at the seam
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // We are looking at the Hero Section -> SHOW TopBar
                topBar.style.transform = "translateY(0)";
                topBar.style.opacity = "1";
                topBar.style.maxHeight = "100px"; // Adjust based on your bar's height
                topBar.style.pointerEvents = "auto";
                topBar.style.visibility = "visible";
            } else {
                // Hero is gone (we are at Section 2, 3, or Footer) -> HIDE TopBar
                topBar.style.transform = "translateY(-100%)";
                topBar.style.opacity = "0";
                topBar.style.maxHeight = "0";
                topBar.style.pointerEvents = "none";
                topBar.style.visibility = "hidden";
            }
        });
    }, observerOptions);

    observer.observe(heroSection);
}

export function initNavScrollHide() {
    const header = document.querySelector('header');
    if (!header) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateNavPosition = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down & past 100px
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up or at top
            header.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
        ticking = false;
    };

    const onScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(updateNavPosition);
            ticking = true;
        }
    };

    // Add transition to header
    header.style.transition = 'transform 0.3s ease-in-out';

    window.addEventListener('scroll', onScroll, { passive: true });
}