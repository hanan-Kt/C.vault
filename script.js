document.addEventListener('DOMContentLoaded', () => {
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');

    let currentIndex = 0;
    const totalItems = carouselItems.length;
    let carouselInterval;

    function updateCarousel() {
        if (totalItems === 0) return;

        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;

        indicators.forEach(ind => ind.classList.remove('active'));
        if (indicators[currentIndex]) indicators[currentIndex].classList.add('active');
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    }

    function resetAutoAdvance() {
        clearInterval(carouselInterval);
        if (totalItems > 1) {
            carouselInterval = setInterval(nextSlide, 5000);
        }
    }

    if (nextButton) nextButton.addEventListener('click', () => { nextSlide(); resetAutoAdvance(); });
    if (prevButton) prevButton.addEventListener('click', () => { prevSlide(); resetAutoAdvance(); });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
            resetAutoAdvance();
        });
    });

    if (totalItems > 0) {
        updateCarousel();
        resetAutoAdvance();
    }

    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            scrollToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const heroCarousel = document.querySelector('.hero-carousel');
    if (heroCarousel) {
        heroCarousel.addEventListener('mouseenter', () => clearInterval(carouselInterval));
        heroCarousel.addEventListener('mouseleave', () => resetAutoAdvance());
    }
});
