document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    // Function to load content dynamically
    const loadContent = async (page) => {
        try {
            const response = await fetch(page);
            const html = await response.text();
            contentDiv.innerHTML = html;

            // Re-attach event listeners for forms after content is loaded
            if (page === 'login.html') {
                attachLoginFormListener();
            } else if (page === 'signup.html') {
                attachSignupFormListener();
            } else if (page === 'contact.html') {
                attachContactFormListener();
            } else if (page === 'products.html') {
                attachAddToCartListeners();
            } else if (page === 'cart.html') {
                updateCartDisplay();
                attachCartListeners();
            }

        } catch (error) {
            console.error('Error loading content:', error);
            contentDiv.innerHTML = '<p>Failed to load content.</p>';
        }
    };

    // Navigation link click handler
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const page = link.getAttribute('href');
            loadContent(page);
            // Close hamburger menu on navigation
            navMenu.classList.remove('active');
        });
    });

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Load default content (Home page)
    loadContent('home.html');

    // --- Authentication & Form Handling --- //

    // Mock localStorage for user sessions
    function setSession(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    function getSession() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    function clearSession() {
        localStorage.removeItem('user');
    }

    // Login Form
    function attachLoginFormListener() {
        const loginForm = document.querySelector('#login .auth-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const email = loginForm.querySelector('input[type="email"]').value;
                const password = loginForm.querySelector('input[type="password"]').value;

                // Mock authentication (replace with real API call)
                if (email === 'test@example.com' && password === 'password') {
                    setSession({ email: email });
                    alert('Login successful!');
                    loadContent('home.html'); // Redirect to home
                } else {
                    alert('Invalid credentials.');
                }
            });
        }
    }

    // Signup Form
    function attachSignupFormListener() {
        const signupForm = document.querySelector('#signup .auth-form');
        if (signupForm) {
            signupForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const email = signupForm.querySelector('input[type="email"]').value;
                const password = signupForm.querySelector('input[type="password"]').value;

                // Mock signup (replace with real API call)
                setSession({ email: email });
                alert('Signup successful! You are now logged in.');
                loadContent('home.html'); // Redirect to home
            });
        }
    }

    // Contact Form
    function attachContactFormListener() {
        const contactForm = document.querySelector('#contact .contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const name = contactForm.querySelector('input[name="name"]').value;
                const email = contactForm.querySelector('input[name="email"]').value;
                const message = contactForm.querySelector('textarea[name="message"]').value;

                // Mock submission (replace with real API call)
                console.log('Contact form submitted:', { name, email, message });
                alert('Message sent! We will get back to you soon.');
                contactForm.reset();
            });
        }
    }

    // --- Products & Cart --- //

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function attachAddToCartListeners() {
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            const addButton = card.querySelector('button');
            addButton.addEventListener('click', () => {
                const productId = card.dataset.id;
                const productName = card.querySelector('h3').textContent;
                const productPrice = parseFloat(card.querySelector('.price').textContent.slice(1));

                addToCart(productId, productName, productPrice);
            });
        });
    }

    function addToCart(productId, productName, productPrice) {
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }

        saveCart();
        updateCartDisplay();
        alert(`${productName} added to cart!`);
    }

    function updateCartDisplay() {
        const cartItemsList = document.querySelector('#cart .cart-items');
        const cartTotalElement = document.querySelector('#cart .cart-total');

        if (!cartItemsList || !cartTotalElement) return;

        cartItemsList.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${item.name} (${item.quantity})</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-from-cart" data-id="${item.id}">Remove</button>
            `;
            cartItemsList.appendChild(listItem);
            total += item.price * item.quantity;
        });

        cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    function attachCartListeners() {
        const cartItemsList = document.querySelector('#cart .cart-items');

        if (cartItemsList) {
            cartItemsList.addEventListener('click', (event) => {
                if (event.target.classList.contains('remove-from-cart')) {
                    const productId = event.target.dataset.id;
                    removeFromCart(productId);
                }
            });
        }

        const checkoutButton = document.querySelector('#cart .cart-checkout button');
        if (checkoutButton) {
            checkoutButton.addEventListener('click', () => {
                if (cart.length === 0) {
                    alert('Your cart is empty!');
                    return;
                }

                alert('Checkout successful! Thank you for your order.');
                cart = [];
                saveCart();
                updateCartDisplay();
                loadContent('home.html'); // Redirect to home
            });
        }
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartDisplay();
    }

});