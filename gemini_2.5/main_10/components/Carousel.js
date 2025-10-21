export class Carousel {
    constructor(selector, options = {}) {
        this.carouselElement = document.querySelector(selector);
        if (!this.carouselElement) {
            console.warn(`Carousel element not found for selector: ${selector}`);
            return;
        }
        this.carouselInner = this.carouselElement.querySelector('.carousel-inner');
        this.items = Array.from(this.carouselInner.children);
        this.prevButton = this.carouselElement.querySelector('.carousel-button.prev');
        this.nextButton = this.carouselElement.querySelector('.carousel-button.next');
        this.currentIndex = 0;
        this.interval = options.interval || 5000; // Default 5 seconds
        this.autoPlay = options.autoPlay !== undefined ? options.autoPlay : true;
        this.timer = null;

        if (this.items.length === 0) return; // No items to carousel

        this.initControls();
        this.updateCarousel();
        if (this.autoPlay) {
            this.startAutoPlay();
        }
    }

    initControls() {
        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => this.prev());
        }
        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => this.next());
        }

        // Pause autoplay on hover
        this.carouselElement.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.carouselElement.addEventListener('mouseleave', () => {
            if (this.autoPlay) this.startAutoPlay();
        });
    }

    updateCarousel() {
        const offset = -this.currentIndex * 100;
        this.carouselInner.style.transform = `translateX(${offset}%)`;

        // Update ARIA attributes for accessibility
        this.items.forEach((item, index) => {
            if (index === this.currentIndex) {
                item.setAttribute('aria-hidden', 'false');
                item.setAttribute('tabindex', '0');
            } else {
                item.setAttribute('aria-hidden', 'true');
                item.setAttribute('tabindex', '-1');
            }
        });
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.updateCarousel();
        this.resetAutoPlay();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.updateCarousel();
        this.resetAutoPlay();
    }

    startAutoPlay() {
        this.stopAutoPlay(); // Clear any existing timer
        this.timer = setInterval(() => {
            this.next();
        }, this.interval);
    }

    stopAutoPlay() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    resetAutoPlay() {
        if (this.autoPlay) {
            this.stopAutoPlay();
            this.startAutoPlay();
        }
    }

    static init(selector, options) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            // Check if carousel already initialized on this element
            if (!el.dataset.carouselInitialized) {
                new Carousel(el, options);
                el.dataset.carouselInitialized = 'true';
            }
        });
    }
}
