document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const navLinks = document.querySelectorAll('nav a');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modal-text');
    const closeModalButton = document.querySelector('.close-button');
    const loginLink = document.querySelector('a[data-route="login"]');
    const signupLink = document.querySelector('a[data-route="signup"]');
    const profileLink = document.querySelector('.profile-link');
    const logoutLink = document.querySelector('.logout-link');
    const logoutBtn = document.getElementById('logoutBtn');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function loadContent(route) {
        fetch(`${route}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                contentDiv.innerHTML = html;
                attachFormListeners(route);
                if (route === 'cart') {
                    displayCart();
                }
            })
            .catch(error => {
                console.error('Error loading content:', error);
                contentDiv.innerHTML = '<p>Failed to load content.</p>';
            });
    }

    function attachFormListeners(route) {
        if (route === 'login' || route === 'signup') {
            const form = contentDiv.querySelector('form');
            if (form) {
                form.addEventListener('submit', (event) => {
                    event.preventDefault();
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData.entries());
                    if (route === 'signup') {
                        localStorage.setItem('user', JSON.stringify(data));
                        showMessage('Signup successful! Please login.');
                    } else {
                        const user = JSON.parse(localStorage.getItem('user'));
                        if (user && user.email === data.email && user.password === data.password) {
                            localStorage.setItem('session', 'true');
                            updateAuthUI();
                            loadContent('profile');
                        } else {
                            showMessage('Invalid credentials.');
                        }
                    }
                });
            }
        } else if (route === 'contact') {
            const form = contentDiv.querySelector('form');
            if (form) {
                form.addEventListener('submit', (event) => {
                    event.preventDefault();
                    showMessage('Message sent successfully!');
                    form.reset();
                });
            }
        }
    }

    function updateAuthUI() {
        const isLoggedIn = localStorage.getItem('session') === 'true';
        if (isLoggedIn) {
            loginLink.style.display = 'none';
            signupLink.style.display = 'none';
            profileLink.style.display = 'inline';
            logoutLink.style.display = 'inline';
        } else {
            loginLink.style.display = 'inline';
            signupLink.style.display = 'inline';
            profileLink.style.display = 'none';
            logoutLink.style.display = 'none';
        }
    }

    function showMessage(message) {
        modalText.textContent = message;
        modal.style.display = 'block';
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const route = link.getAttribute('data-route');
            loadContent(route);
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('session');
        updateAuthUI();
        loadContent('home');
    });

    function addToCart(gameName, price) {
        const item = { name: gameName, price: price };
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        showMessage(`${gameName} added to cart!`);
    }

    function displayCart() {
        const cartItemsDiv = document.getElementById('cart-items');
        const cartTotalSpan = document.getElementById('cart-total');
        cartItemsDiv.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `<span class="item-name">${item.name}</span><span class="item-price">$${item.price}</span>`;
            cartItemsDiv.appendChild(itemDiv);
            total += item.price;
        });
        cartTotalSpan.textContent = total.toFixed(2);
    }

    // Initial load
    updateAuthUI();
    loadContent('home');

    // Make addToCart globally accessible for use in other HTML files
    window.addToCart = addToCart;
});