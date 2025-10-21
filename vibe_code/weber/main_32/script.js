document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    // Function to load content dynamically
    const loadContent = async (page) => {
        try {
            const response = await fetch(`${page}.html`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            contentDiv.innerHTML = html;

            // Re-attach event listeners for forms after content load
            attachFormListeners();

            // Initialize product functionality if on products page
            if (page === 'products') {
                initializeProducts();
            }

            if (page === 'cart') {
                displayCart();
            }

        } catch (error) {
            console.error('Could not load page:', error);
            contentDiv.innerHTML = '<p>Failed to load content.</p>';
        }
    };

    // Navigation link click handler
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const page = link.getAttribute('data-page');
            loadContent(page);
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show'); // Close menu on selection
            }
        });
    });

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });

    // Load default content (Home page)
    loadContent('home');

    // Form Handling Functions
    function attachFormListeners() {
        const loginForm = document.querySelector('#loginForm');
        const signupForm = document.querySelector('#signupForm');
        const contactForm = document.querySelector('#contactForm');

        if (loginForm) {
            loginForm.addEventListener('submit', handleLoginForm);
        }
        if (signupForm) {
            signupForm.addEventListener('submit', handleSignupForm);
        }
        if (contactForm) {
            contactForm.addEventListener('submit', handleContactForm);
        }
    }

    function handleLoginForm(event) {
        event.preventDefault();
        const email = document.querySelector('#loginForm input[name="email"]').value;
        const password = document.querySelector('#loginForm input[name="password"]').value;

        // Mock authentication
        if (email === 'test@example.com' && password === 'password') {
            localStorage.setItem('user', JSON.stringify({ email: email }));
            alert('Login successful!');
            // Redirect or update UI as needed
        } else {
            alert('Invalid credentials.');
        }
    }

    function handleSignupForm(event) {
        event.preventDefault();
        const email = document.querySelector('#signupForm input[name="email"]').value;
        const password = document.querySelector('#signupForm input[name="password"]').value;

        localStorage.setItem('user', JSON.stringify({ email: email }));
        alert('Signup successful!');
        // Redirect or update UI as needed
    }

    function handleContactForm(event) {
        event.preventDefault();
        const name = document.querySelector('#contactForm input[name="name"]').value;
        const message = document.querySelector('#contactForm textarea[name="message"]').value;

        alert(`Thank you, ${name}! Your message has been received.`);
        // Optionally, clear the form
        event.target.reset();
    }

    // Product and Cart Functionality
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    function initializeProducts() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    function addToCart(event) {
        const productId = event.target.dataset.id;
        const productName = event.target.dataset.name;
        const productPrice = parseFloat(event.target.dataset.price);

        const item = { id: productId, name: productName, price: productPrice, quantity: 1 };
        const existingItemIndex = cart.findIndex(cartItem => cartItem.id === productId);

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push(item);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }

    function updateCartDisplay() {
        const cartLink = document.querySelector('a[data-page="cart"]');
        if (cartLink) {
            let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartLink.textContent = `Cart (${totalItems})`;
        }
    }

    function displayCart() {
        const cartContainer = document.getElementById('cart-items');
        const cartTotalElement = document.getElementById('cart-total');

        if (!cartContainer || !cartTotalElement) return;

        cartContainer.innerHTML = ''; // Clear existing cart items

        let total = 0;
        cart.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <span>${item.name} (${item.quantity})</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            `;
            cartContainer.appendChild(cartItemDiv);
            total += item.price * item.quantity;
        });

        cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    updateCartDisplay(); // Initial cart display update
});