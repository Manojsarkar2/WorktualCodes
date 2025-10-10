// Basic JavaScript functionality (can be expanded)

document.addEventListener('DOMContentLoaded', function() {
    // Example: Add event listeners to "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.product-card button');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Product added to cart!'); // Replace with actual cart logic
        });
    });
});