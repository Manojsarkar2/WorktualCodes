document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    const themeToggle = document.getElementById('theme-toggle');
    const modal = document.getElementById('modal');
    const closeModalButton = document.querySelector('.close-button');
    const modalContentDiv = document.getElementById('modal-content');
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    updateCartCount();

    // Theme
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        themeToggle.textContent = 'Light Mode';
    }

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        theme = theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeToggle.textContent = theme === 'light' ? 'Dark Mode' : 'Light Mode';
    });

    // Navigation
    function loadPage(page) {
        let content = '';
        switch (page) {
            case 'home':
                content = `
                    <section id="home">
                        <h1>Welcome to Anime Haven</h1>
                        <p>Your ultimate destination for all things anime!</p>
                        <p>Explore our vast collection of figures, merchandise, and more.</p>
                    </section>`;
                break;
            case 'products':
                content = `
                    <section id="products">
                        <h2>Our Products</h2>
                        <div id="products-container">
                            ${generateProductCards()}
                        </div>
                    </section>`;
                break;
            case 'contact':
                content = `
                    <section id="contact">
                        <h2>Contact Us</h2>
                        <form id="contact-form">
                            <label for="name">Name:</label>
                            <input type="text" id="name" name="name" required>
                            <label for="email">Email:</label>
                            <input type="email" id="email" name="email" required>
                            <label for="message">Message:</label>
                            <textarea id="message" name="message" rows="4" required></textarea>
                            <button type="submit">Submit</button>
                        </form>
                    </section>`;
                break;
            case 'login':
                content = `
                    <section id="login">
                        <h2>Login</h2>
                        <form class="auth-form">
                            <label for="login-email">Email:</label>
                            <input type="email" id="login-email" name="login-email" required>
                            <label for="login-password">Password:</label>
                            <input type="password" id="login-password" name="login-password" required>
                            <button type="submit">Login</button>
                        </form>
                    </section>`;
                break;
            case 'signup':
                content = `
                    <section id="signup">
                        <h2>Signup</h2>
                        <form class="auth-form">
                            <label for="signup-email">Email:</label>
                            <input type="email" id="signup-email" name="signup-email" required>
                            <label for="signup-password">Password:</label>
                            <input type="password" id="signup-password" name="signup-password" required>
                            <button type="submit">Signup</button>
                        </form>
                    </section>`;
                break;
            case 'cart':
                content = `
                    <section id="cart">
                        <h2>Shopping Cart</h2>
                        <ul id="cart-items">
                            ${generateCartItems()}
                        </ul>
                        <div id="cart-total">Total: $${calculateCartTotal()}</div>
                        <button id="checkout-button">Checkout</button>
                    </section>`;
                break;
            default:
                content = '<section><h2>Page Not Found</h2><p>The requested page could not be found.</p></section>';
        }
        contentDiv.innerHTML = content;

        // Add event listener for checkout button after cart is loaded
        if (page === 'cart') {
            const checkoutButton = document.getElementById('checkout-button');
            checkoutButton.addEventListener('click', checkout);
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            loadPage(page);
            navMenu.classList.remove('show'); // Close the menu on mobile after clicking
        });
    });

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });

    // Products Data
    function generateProductCards() {
        const products = [
            { id: 1, title: 'Naruto Shippuden Figure', description: 'High-quality Naruto figure.', price: 39.99 },
            { id: 2, title: 'One Piece T-Shirt', description: 'Official One Piece T-shirt.', price: 24.99 },
            { id: 3, title: 'Attack on Titan Manga Box Set', description: 'Complete Attack on Titan manga collection.', price: 79.99 },
            { id: 4, title: 'My Hero Academia Keychain', description: 'Cute My Hero Academia keychain.', price: 9.99 },
            { id: 5, title: 'Sailor Moon Wand Replica', description: 'Authentic Sailor Moon wand replica.', price: 49.99 }
        ];

        return products.map(product => `
            <div class="product-card">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">$${product.price}</p>
                <button class="add-to-cart" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}">Add to Cart</button>
            </div>`).join('');
    }

    // Cart functionality
    contentDiv.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const id = e.target.dataset.id;
            const title = e.target.dataset.title;
            const price = parseFloat(e.target.dataset.price);
            addToCart(id, title, price);
        }
    });

    function addToCart(id, title, price) {
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id: id, title: title, price: price, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartCount() {
        const cartCountSpan = document.getElementById('cart-count');
        cartCountSpan.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }

    function generateCartItems() {
        if (cart.length === 0) {
            return '<li>Your cart is empty.</li>';
        }
        return cart.map(item => `<li>${item.title} x ${item.quantity} - $${item.price * item.quantity}</li>`).join('');
    }

    function calculateCartTotal() {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    }

    function checkout() {
        // Mock checkout process
        modalContentDiv.innerHTML = '<p>Thank you for your order!</p>';
        modal.style.display = 'block';
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        loadPage('cart'); // Refresh cart page
    }

    // Modal
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Load home page on initial load
    loadPage('home');
});