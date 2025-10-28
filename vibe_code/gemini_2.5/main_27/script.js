document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close nav menu when a link is clicked (for single-page navigation)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Newsletter subscription (placeholder)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput.value) {
                alert(`Thank you for subscribing, ${emailInput.value}!`);
                console.log('Newsletter subscribed:', emailInput.value);
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // Placeholder for product 'Add to cart' and actions
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.closest('.product-card').querySelector('.product-name').textContent;
            console.log(`Added "${productName}" to cart!`);
            alert(`"${productName}" has been added to your cart.`);
        });
    });

    document.querySelectorAll('.product-actions .action-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const action = e.currentTarget.textContent.trim();
            const productName = e.currentTarget.closest('.product-card').querySelector('.product-name').textContent;
            console.log(`${action} "${productName}"`);
            // alert(`${action} "${productName}"`); // Optional: show alerts for these actions
        });
    });

    // Inspiration Section Carousel (basic functionality)
    const prevBtn = document.querySelector('.carousel-indicator span:first-child');
    const nextBtn = document.querySelector('.carousel-indicator span:last-child');
    const mainImage = document.querySelector('.inspiration-content .main-image');
    
    const inspirationImages = [
        'images/inspiration-banner.jpg',
        'https://via.placeholder.com/600x400/D8D8D8/333333?text=Another+View',
        'https://via.placeholder.com/600x400/C8C8C8/333333?text=Modern+Decor'
    ];
    let currentImageIndex = 0;

    if (prevBtn && nextBtn && mainImage) {
        nextBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % inspirationImages.length;
            mainImage.src = inspirationImages[currentImageIndex];
        });

        prevBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + inspirationImages.length) % inspirationImages.length;
            mainImage.src = inspirationImages[currentImageIndex];
        });
    }

});