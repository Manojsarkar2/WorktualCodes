document.addEventListener('DOMContentLoaded', function() {
    // Sample product data (replace with actual data from an API or database)
    const products = [
        { id: 1, name: 'Product 1', price: 25.99, image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Product 2', price: 49.99, image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Product 3', price: 19.99, image: 'https://via.placeholder.com/150' }
    ];

    const productGrid = document.querySelector('.product-grid');

    // Function to display products
    function displayProducts(products) {
        productGrid.innerHTML = ''; // Clear existing products
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button class="btn add-to-cart" data-product-id="${product.id}">Add to Cart</button>
            `;
            productGrid.appendChild(productItem);
        });
    }

    // Initial display of products
    displayProducts(products);

    // Event listener for add to cart buttons
    productGrid.addEventListener('click', function(event) {
        if (event.target.classList.contains('add-to-cart')) {
            const productId = event.target.dataset.productId;
            // Implement add to cart functionality here (e.g., store in local storage)
            console.log('Product added to cart:', productId);
            alert('Product added to cart!');
        }
    });

    // Logout functionality (example)
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(event) {
            event.preventDefault();
            // Implement logout functionality here (e.g., clear session, redirect to login)
            alert('Logged out!');
            window.location.href = 'pages/login.html'; // Redirect to login page
        });
    }
});