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