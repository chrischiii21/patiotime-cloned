export function initCarousel() {
    const track = document.getElementById('carousel-track');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const dots = document.querySelectorAll('.carousel-dot');

    if (!track || !nextBtn || !prevBtn) return;

    const slides = Array.from(track.children);
    const totalOriginalSlides = slides.length;
    const intervalTime = 4000;

    // Constant for logic (clones allow for the "infinite" feel)
    const cloneCount = 4;
    let currentIndex = cloneCount;
    let autoPlayInterval;

    // 1. Setup Clones
    for (let i = 0; i < cloneCount; i++) {
        const startClone = slides[i].cloneNode(true);
        const endClone = slides[totalOriginalSlides - 1 - i].cloneNode(true);
        track.appendChild(startClone);
        track.insertBefore(endClone, track.firstChild);
    }

    const getVisibleSlides = () => (window.innerWidth >= 768 ? 4 : 1);

    // 2. The "Master" Update Function
    const updateCarousel = (isAnimated = true) => {
        const visibleSlides = getVisibleSlides();
        const slideWidth = 100 / visibleSlides;

        track.style.transition = isAnimated ? "transform 0.5s ease-in-out" : "none";
        track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;

        // Calculate which dot should be active
        let activeIndex = (currentIndex - cloneCount) % totalOriginalSlides;
        if (activeIndex < 0) activeIndex += totalOriginalSlides;

        // Sync Dots: Solid white, scale active
        dots.forEach((dot, i) => {
            if (i === activeIndex) {
                dot.classList.add('scale-150', 'bg-white');
                dot.classList.remove('scale-100', 'opacity-30'); // Cleaning up old classes
            } else {
                dot.classList.add('scale-100', 'bg-white');
                dot.classList.remove('scale-150');
            }
        });
    };

    // 3. The "Infinite" Reset
    track.addEventListener('transitionend', () => {
        if (currentIndex >= totalOriginalSlides + cloneCount) {
            currentIndex = cloneCount;
            updateCarousel(false);
        }
        if (currentIndex < cloneCount) {
            currentIndex = totalOriginalSlides + cloneCount - 1;
            updateCarousel(false);
        }
    });

    const nextSlide = () => { currentIndex++; updateCarousel(); };
    const prevSlide = () => { currentIndex--; updateCarousel(); };

    const resetAutoplay = () => {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextSlide, intervalTime);
    };

    // 4. Event Listeners (Manual & Automatic synced)
    nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
    prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index + cloneCount;
            updateCarousel();
            resetAutoplay();
        });
    });

    window.addEventListener('resize', () => updateCarousel(false));

    // Initialize
    updateCarousel(false);
    autoPlayInterval = setInterval(nextSlide, intervalTime);
}

export function initEventCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.getElementById('eventPrevBtn');
    const nextBtn = document.getElementById('eventNextBtn');

    let currentIndex = 0;
    let autoPlayInterval;
    const intervalTime = 5000; // 5 seconds per flash

    // Function to change the visual state
    function showSlide(index) {
        // Reset index if out of bounds (Infinite loop)
        if (index >= slides.length) currentIndex = 0;
        else if (index < 0) currentIndex = slides.length - 1;
        else currentIndex = index;

        // Update Images
        slides.forEach((slide, i) => {
            if (i === currentIndex) {
                slide.classList.replace('opacity-0', 'opacity-100');
            } else {
                slide.classList.replace('opacity-100', 'opacity-0');
            }
        });

        // Update Dots styling
        dots.forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add('bg-white', 'w-2.5', 'h-2.5');
                dot.classList.remove('bg-neutral-600', 'w-2', 'h-2');
            } else {
                dot.classList.remove('bg-white', 'w-2.5', 'h-2.5');
                dot.classList.add('bg-neutral-600', 'w-2', 'h-2');
            }
        });
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            showSlide(currentIndex + 1);
        }, intervalTime);
    }

    function resetTimer() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    // Event Listeners
    nextBtn.addEventListener('click', () => {
        showSlide(currentIndex + 1);
        resetTimer();
    });

    prevBtn.addEventListener('click', () => {
        showSlide(currentIndex - 1);
        resetTimer();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetTimer();
        });
    });

    // Initialize
    startAutoPlay();
}