const contentDiv = document.getElementById('content');
const navLinks = document.querySelectorAll('.nav-links a');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');
const cartCountSpan = document.getElementById('cart-count');

let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();

function updateCartCount() {
    cartCountSpan.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function loadPage(page) {
    fetch(`${page}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            contentDiv.innerHTML = data;
            attachEventListeners(page);
        })
        .catch(error => {
            contentDiv.innerHTML = `<p>Error loading page: ${error}</p>`;
        });
}

function attachEventListeners(page) {
    if (page === 'products') {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', addToCart);
        });
    } else if (page === 'contact') {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', handleContactSubmit);
        }
    } else if (page === 'login') {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', handleLoginSubmit);
        }
    } else if (page === 'signup') {
        const signupForm = document.getElementById('signup-form');
        if (signupForm) {
            signupForm.addEventListener('submit', handleSignupSubmit);
        }
    } else if (page === 'cart') {
        displayCart();
    }
}

function addToCart(event) {
    const productId = event.target.dataset.id;
    const productName = event.target.dataset.name;
    const productPrice = parseFloat(event.target.dataset.price);

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${productName} added to cart!`);
}

function displayCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    let cartHTML = '';

    if (cart.length === 0) {
        cartHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            cartHTML += `<li>${item.name} - Quantity: ${item.quantity} - Price: $${(item.price * item.quantity).toFixed(2)}</li>`;
        });
        cartHTML += `<p>Total: $${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</p>`;
        cartHTML += '<button onclick="checkout()">Checkout</button>';
    }

    cartItemsDiv.innerHTML = cartHTML;
}

function checkout() {
    alert('Checkout completed! Thank you for your purchase.');
    cart = [];
    localStorage.removeItem('cart');
    updateCartCount();
    displayCart();
}

function handleContactSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;

    localStorage.setItem('contactFormData', JSON.stringify({ name, email, message }));
    alert('Contact form submitted!');
}

function handleLoginSubmit(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    localStorage.setItem('loggedInUser', username);
    alert('Logged in as ' + username + '!');
}

function handleSignupSubmit(event) {
    event.preventDefault();
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    localStorage.setItem('newUser', username);
    alert('Signed up as ' + username + '!');
}

navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const page = this.dataset.page;
        loadPage(page);
    });
});

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Load home page on initial load
loadPage('home');