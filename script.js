/**
 * C.vault E-commerce Script
 *
 * This script handles the hero image carousel and the scroll-to-top button.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Hero Carousel Functionality ---

    const carouselItems = document.querySelectorAll('.hero-carousel .carousel-item');
    const prevButton = document.querySelector('.hero-carousel .prev');
    const nextButton = document.querySelector('.hero-carousel .next');
    const indicators = document.querySelectorAll('.hero-carousel .indicator');
    let currentIndex = 0;
    // Set the interval between 4000ms (4 seconds) and 7000ms (7 seconds).
    // I'll choose 6000ms (6 seconds) as a good middle ground.
    const autoScrollInterval = 6000;
    let slideInterval;

    /**
     * Updates the carousel display to show the specified index.
     * @param {number} index - The index of the item to show.
     */
    function showSlide(index) {
        // Remove 'active' class from all items and indicators
        carouselItems.forEach(item => item.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Handle wrapping around the array
        if (index >= carouselItems.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = carouselItems.length - 1;
        } else {
            currentIndex = index;
        }

        // Add 'active' class to the current item and indicator
        carouselItems[currentIndex].classList.add('active');
        indicators[currentIndex].classList.add('active');
    }

    /**
     * Moves the carousel to the next slide.
     */
    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    /**
     * Starts the automatic sliding interval.
     */
    function startAutoSlide() {
        // Clear any existing interval before setting a new one
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, autoScrollInterval);
    }

    // Initialize carousel on load
    showSlide(currentIndex);
    startAutoSlide(); // Start the auto-scroll

    // Event Listeners for Manual Control
    nextButton.addEventListener('click', () => {
        nextSlide();
        // Reset the auto-scroll timer after a manual click
        startAutoSlide();
    });

    prevButton.addEventListener('click', () => {
        showSlide(currentIndex - 1);
        // Reset the auto-scroll timer after a manual click
        startAutoSlide();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            // Reset the auto-scroll timer after a manual click
            startAutoSlide();
        });
    });


    // --- 2. Scroll-to-Top Button Functionality ---

    const scrollToTopButton = document.querySelector('.scroll-to-top');

    // Show button when scrolling down
    window.addEventListener('scroll', () => {
        // If the vertical scroll position is more than 300 pixels, show the button
        if (window.scrollY > 300) {
            scrollToTopButton.style.display = 'block';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });

    // Scroll to top on click
    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scrolling animation
        });
    });

});