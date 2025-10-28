// Utility functions
const getElement = (selector) => document.querySelector(selector);
const getAllElements = (selector) => document.querySelectorAll(selector);
const createElement = (tag, className, textContent) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
};

// --- Routing --- //
const appContent = getElement('#app-content');

const routes = {
    '/': 'home.html',
    '/home': 'home.html',
    '/clans': 'clans.html',
    '/troops': 'troops.html',
    '/buildings': 'buildings.html',
    '/shop': 'shop.html',
    '/contact': 'contact.html',
    // Login/Signup are handled by modals, not separate pages
};

const loadPageContent = async (path) => {
    const page = routes[path] || routes['/']; // Default to home
    try {
        const response = await fetch(page);
        if (!response.ok) {
            throw new Error(`Failed to load ${page}: ${response.statusText}`);
        }
        const content = await response.text();
        appContent.innerHTML = content;
        // After content is loaded, initialize any specific scripts for that page
        initializePageScripts(path);
    } catch (error) {
        console.error('Error loading page content:', error);
        appContent.innerHTML = `<div class="container"><h2 style="color: var(--color-red-accent);">Error loading page.</h2><p>Please try again later.</p></div>`;
    }
};

const navigate = (path) => {
    if (window.location.pathname !== path) {
        window.history.pushState({}, path, path);
    }
    loadPageContent(path);
};

const handleRoute = () => {
    const path = window.location.pathname;
    navigate(path);
};

// Intercept all clicks on 'a' tags with data-route or hrefs matching routes
document.addEventListener('click', (e) => {
    const target = e.target.closest('a');
    if (target && target.hasAttribute('data-route')) {
        e.preventDefault();
        const path = target.getAttribute('data-route') === 'home' ? '/' : `/${target.getAttribute('data-route')}`;
        navigate(path);
        // Close mobile menu if open
        const navLinks = getElement('.nav-links');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    } else if (target && target.href && target.origin === window.location.origin) {
        const path = target.pathname;
        if (routes[path]) {
            e.preventDefault();
            navigate(path);
            // Close mobile menu if open
            const navLinks = getElement('.nav-links');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    }
});

window.addEventListener('popstate', handleRoute);

// --- Navbar & Mobile Menu --- //
const hamburgerMenu = getElement('.hamburger-menu');
const navLinks = getElement('.nav-links');

hamburgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// --- Modals (Login/Signup) --- //
const loginModal = getElement('#login-modal');
const signupModal = getElement('#signup-modal');
const loginBtn = getElement('#login-btn');
const signupBtn = getElement('#signup-btn');
const closeButtons = getAllElements('.modal .close-button');
const switchToSignupLink = getElement('#switch-to-signup');
const switchToLoginLink = getElement('#switch-to-login');

const openModal = (modal) => {
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open'); // Prevent body scroll
};

const closeModal = (modal) => {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
};

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(loginModal);
});
signupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(signupModal);
});

closeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        closeModal(e.target.closest('.modal'));
    });
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        closeModal(loginModal);
    }
    if (e.target === signupModal) {
        closeModal(signupModal);
    }
});

// Switch between login/signup forms
switchToSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(loginModal);
    openModal(signupModal);
});

switchToLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(signupModal);
    openModal(loginModal);
});

// --- Form Validation & LocalStorage --- //
const loginForm = getElement('#login-form');
const signupForm = getElement('#signup-form');

const validateField = (input, errorElement, validationFn, errorMessage) => {
    if (!validationFn(input.value.trim())) {
        errorElement.textContent = errorMessage;
        input.classList.add('invalid');
        return false;
    } else {
        errorElement.textContent = '';
        input.classList.remove('invalid');
        return true;
    }
};

const isValidUsername = (username) => username.length >= 3;
const isValidEmail = (email) => /^[\w.-]+@[\w.-]+\.\w+$/.test(email);
const isValidPassword = (password) => password.length >= 6;

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const usernameInput = getElement('#login-username');
        const passwordInput = getElement('#login-password');
        const usernameError = getElement('#login-username-error');
        const passwordError = getElement('#login-password-error');

        let isValid = true;
        isValid = validateField(usernameInput, usernameError, isValidUsername, 'Username must be at least 3 characters.') && isValid;
        isValid = validateField(passwordInput, passwordError, isValidPassword, 'Password must be at least 6 characters.') && isValid;

        if (isValid) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.username === usernameInput.value && u.password === passwordInput.value);

            if (user) {
                localStorage.setItem('currentUser', JSON.stringify({ username: user.username }));
                alert('Login successful!');
                closeModal(loginModal);
                updateAuthLinks();
            } else {
                alert('Invalid username or password.');
            }
        }
    });
}

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const usernameInput = getElement('#signup-username');
        const emailInput = getElement('#signup-email');
        const passwordInput = getElement('#signup-password');
        const confirmPasswordInput = getElement('#signup-confirm-password');

        const usernameError = getElement('#signup-username-error');
        const emailError = getElement('#signup-email-error');
        const passwordError = getElement('#signup-password-error');
        const confirmPasswordError = getElement('#signup-confirm-password-error');

        let isValid = true;
        isValid = validateField(usernameInput, usernameError, isValidUsername, 'Username must be at least 3 characters.') && isValid;
        isValid = validateField(emailInput, emailError, isValidEmail, 'Please enter a valid email address.') && isValid;
        isValid = validateField(passwordInput, passwordError, isValidPassword, 'Password must be at least 6 characters.') && isValid;

        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordError.textContent = 'Passwords do not match.';
            confirmPasswordInput.classList.add('invalid');
            isValid = false;
        } else {
            confirmPasswordError.textContent = '';
            confirmPasswordInput.classList.remove('invalid');
        }

        if (isValid) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.some(u => u.username === usernameInput.value)) {
                usernameError.textContent = 'Username already taken.';
                usernameInput.classList.add('invalid');
                return;
            }
            if (users.some(u => u.email === emailInput.value)) {
                emailError.textContent = 'Email already registered.';
                emailInput.classList.add('invalid');
                return;
            }

            const newUser = { username: usernameInput.value, email: emailInput.value, password: passwordInput.value };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify({ username: newUser.username }));
            alert('Registration successful! You are now logged in.');
            closeModal(signupModal);
            updateAuthLinks();
        }
    });
}

const updateAuthLinks = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authLinksContainer = getElement('.auth-links');
    if (authLinksContainer) {
        if (currentUser) {
            authLinksContainer.innerHTML = `<li><span>Welcome, ${currentUser.username}!</span></li><li><a href="#" id="logout-btn">Logout</a></li>`;
            getElement('#logout-btn').addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('currentUser');
                updateAuthLinks();
                alert('Logged out successfully!');
                navigate('/'); // Redirect to home after logout
            });
        } else {
            authLinksContainer.innerHTML = `<li><a href="#" id="login-btn" aria-controls="login-modal">Login</a></li><li><a href="#" id="signup-btn" aria-controls="signup-modal">Sign Up</a></li>`;
            // Re-attach event listeners for login/signup buttons
            getElement('#login-btn').addEventListener('click', (e) => {
                e.preventDefault();
                openModal(loginModal);
            });
            getElement('#signup-btn').addEventListener('click', (e) => {
                e.preventDefault();
                openModal(signupModal);
            });
        }
    }
};

// --- Cart Functionality --- //
const cartBtn = getElement('#cart-btn');
const cartDropdown = getElement('#cart-dropdown');
const cartCountSpan = getElement('#cart-count');
const cartItemsList = getElement('#cart-items-list');
const cartTotalAmountSpan = getElement('#cart-total-amount');
const checkoutBtn = getElement('#checkout-btn');
const closeCartBtn = getElement('#close-cart-btn');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const updateCartDisplay = () => {
    cartCountSpan.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    cartItemsList.innerHTML = '';
    let totalAmount = 0;

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p>Your cart is empty.</p>';
        checkoutBtn.disabled = true;
    } else {
        checkoutBtn.disabled = false;
        cart.forEach(item => {
            const cartItemDiv = createElement('div', 'cart-item');
            cartItemDiv.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.quantity} x ${item.price} Gems</p>
                </div>
                <button class="remove-from-cart" data-id="${item.id}" aria-label="Remove ${item.name} from cart">&times;</button>
            `;
            cartItemsList.appendChild(cartItemDiv);
            totalAmount += item.quantity * item.price;
        });
    }
    cartTotalAmountSpan.textContent = totalAmount;
    localStorage.setItem('cart', JSON.stringify(cart));
};

const addToCart = (item) => {
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateCartDisplay();
    alert(`${item.name} added to cart!`);
};

const removeFromCart = (itemId) => {
    cart = cart.filter(item => item.id !== itemId);
    updateCartDisplay();
};

cartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cartDropdown.classList.toggle('show');
    cartBtn.setAttribute('aria-expanded', cartDropdown.classList.contains('show'));
});

closeCartBtn.addEventListener('click', () => {
    cartDropdown.classList.remove('show');
    cartBtn.setAttribute('aria-expanded', 'false');
});

// Close cart dropdown if clicked outside
window.addEventListener('click', (e) => {
    if (!cartBtn.contains(e.target) && !cartDropdown.contains(e.target) && cartDropdown.classList.contains('show')) {
        cartDropdown.classList.remove('show');
        cartBtn.setAttribute('aria-expanded', 'false');
    }
});

cartItemsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-from-cart')) {
        const itemId = parseInt(e.target.dataset.id);
        removeFromCart(itemId);
    }
});

checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        alert(`Checkout successful! Total: ${cartTotalAmountSpan.textContent} Gems. (This is a mock transaction)`);
        cart = []; // Clear cart
        updateCartDisplay();
        cartDropdown.classList.remove('show');
    } else {
        alert('Your cart is empty!');
    }
});

// --- Page-specific Initializers --- //
const initializePageScripts = (path) => {
    switch (path) {
        case '/':
        case '/home':
            initHomePage();
            break;
        case '/clans':
            initClansPage();
            break;
        case '/troops':
            initTroopsPage();
            break;
        case '/buildings':
            initBuildingsPage();
            break;
        case '/shop':
            initShopPage();
            break;
        case '/contact':
            initContactPage();
            break;
    }
};

// Home Page Carousel
const initHomePage = () => {
    const carouselSlide = getElement('.carousel-slide');
    if (!carouselSlide) return;

    const carouselItems = getAllElements('.carousel-item');
    const prevBtn = getElement('.carousel-nav-btn.prev');
    const nextBtn = getElement('.carousel-nav-btn.next');
    let currentIndex = 0;

    const updateCarousel = () => {
        if (carouselSlide) {
            carouselSlide.style.transform = `translateX(${-currentIndex * 100}%)`;
        }
    };

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
            updateCarousel();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        });
    }
    updateCarousel(); // Initial display
};

// Clans Page Accordion
const initClansPage = () => {
    const accordionHeaders = getAllElements('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.icon');

            // Close other open accordions
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header && otherHeader.classList.contains('active')) {
                    otherHeader.classList.remove('active');
                    otherHeader.nextElementSibling.classList.remove('active');
                    otherHeader.querySelector('.icon').style.transform = 'rotate(0deg)';
                }
            });

            header.classList.toggle('active');
            content.classList.toggle('active');
            icon.style.transform = header.classList.contains('active') ? 'rotate(90deg)' : 'rotate(0deg)';
        });
    });
};

// Troops Page Tabs & Search/Filter
const initTroopsPage = () => {
    const tabButtons = getAllElements('.tab-button');
    const tabContents = getAllElements('.tab-content');
    const troopSearchInput = getElement('#troop-search');
    const troopCategoryFilter = getElement('#troop-category-filter');
    const troopGrid = getElement('#troop-grid');

    const allTroops = [
        { id: 1, name: 'Barbarian', category: 'Elixir', type: 'Melee', dps: 20, hp: 45, cost: 80, housing: 1 },
        { id: 2, name: 'Archer', category: 'Elixir', type: 'Ranged', dps: 18, hp: 32, cost: 100, housing: 1 },
        { id: 3, name: 'Giant', category: 'Elixir', type: 'Tank', dps: 30, hp: 670, cost: 1500, housing: 5 },
        { id: 4, name: 'Goblin', category: 'Elixir', type: 'Resource', dps: 14, hp: 23, cost: 100, housing: 1 },
        { id: 5, name: 'Wall Breaker', category: 'Elixir', type: 'Support', dps: 60, hp: 42, cost: 2000, housing: 2 },
        { id: 6, name: 'Wizard', category: 'Elixir', type: 'Splash', dps: 170, hp: 160, cost: 3000, housing: 4 },
        { id: 7, name: 'Dragon', category: 'Elixir', type: 'Air', dps: 220, hp: 2700, cost: 25000, housing: 20 },
        { id: 8, name: 'P.E.K.K.A', category: 'Elixir', type: 'Tank', dps: 380, hp: 4500, cost: 42000, housing: 25 },
        { id: 9, name: 'Minion', category: 'Dark Elixir', type: 'Air', dps: 44, hp: 80, cost: 6, housing: 2 },
        { id: 10, name: 'Hog Rider', category: 'Dark Elixir', type: 'Melee', dps: 105, hp: 630, cost: 75, housing: 5 },
        { id: 11, name: 'Golem', category: 'Dark Elixir', type: 'Tank', dps: 55, hp: 8100, cost: 600, housing: 30 },
        { id: 12, name: 'Electro Dragon', category: 'Elixir', type: 'Air', dps: 280, hp: 4500, cost: 40000, housing: 30 },
        { id: 13, name: 'Battle Blimp', category: 'Siege Machine', type: 'Siege', dps: 0, hp: 3000, cost: 0, housing: 0 },
        { id: 14, name: 'Stone Slammer', category: 'Siege Machine', type: 'Siege', dps: 150, hp: 6000, cost: 0, housing: 0 }
    ];

    const renderTroops = (troopsToRender) => {
        if (!troopGrid) return;
        troopGrid.innerHTML = '';
        if (troopsToRender.length === 0) {
            troopGrid.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">No troops found matching your criteria.</p>';
            return;
        }
        troopsToRender.forEach(troop => {
            const card = createElement('div', 'product-card');
            card.innerHTML = `
                <h3>${troop.name}</h3>
                <p>Category: ${troop.category}</p>
                <p>Type: ${troop.type}</p>
                <p>DPS: ${troop.dps} | HP: ${troop.hp}</p>
                <p>Housing Space: ${troop.housing}</p>
                <p class="price">Cost: ${troop.cost} ${troop.category === 'Dark Elixir' ? 'Dark Elixir' : 'Elixir'}</p>
            `;
            troopGrid.appendChild(card);
        });
    };

    const filterTroops = () => {
        const searchTerm = troopSearchInput.value.toLowerCase();
        const category = troopCategoryFilter.value;

        let filtered = allTroops.filter(troop => {
            const matchesSearch = troop.name.toLowerCase().includes(searchTerm);
            const matchesCategory = category === 'all' || troop.category.toLowerCase() === category;
            return matchesSearch && matchesCategory;
        });
        renderTroops(filtered);
    };

    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                button.classList.add('active');
                const targetId = button.dataset.tab;
                getElement(`#${targetId}`).classList.add('active');
            });
        });
        // Activate the first tab by default
        if (tabButtons[0]) tabButtons[0].click();
    }

    if (troopSearchInput) troopSearchInput.addEventListener('input', filterTroops);
    if (troopCategoryFilter) troopCategoryFilter.addEventListener('change', filterTroops);

    renderTroops(allTroops); // Initial render
};

// Buildings Page Tabs & Search/Filter
const initBuildingsPage = () => {
    const tabButtons = getAllElements('.tab-button');
    const tabContents = getAllElements('.tab-content');
    const buildingSearchInput = getElement('#building-search');
    const buildingCategoryFilter = getElement('#building-category-filter');
    const buildingGrid = getElement('#building-grid');

    const allBuildings = [
        { id: 1, name: 'Town Hall', category: 'Resource', type: 'Core', hp: 4200, function: 'Main building, unlocks new features' },
        { id: 2, name: 'Gold Mine', category: 'Resource', type: 'Production', hp: 400, function: 'Produces Gold' },
        { id: 3, name: 'Elixir Collector', category: 'Resource', type: 'Production', hp: 400, function: 'Produces Elixir' },
        { id: 4, name: 'Gold Storage', category: 'Resource', type: 'Storage', hp: 1000, function: 'Stores Gold' },
        { id: 5, name: 'Elixir Storage', category: 'Resource', type: 'Storage', hp: 1000, function: 'Stores Elixir' },
        { id: 6, name: 'Cannon', category: 'Defense', type: 'Single Target', hp: 700, function: 'Ground defense' },
        { id: 7, name: 'Archer Tower', category: 'Defense', type: 'Single Target', hp: 600, function: 'Ground & Air defense' },
        { id: 8, name: 'Mortar', category: 'Defense', type: 'Splash', hp: 800, function: 'Ground splash defense' },
        { id: 9, name: 'Air Defense', category: 'Defense', type: 'Air Target', hp: 900, function: 'Air defense' },
        { id: 10, name: 'Wizard Tower', category: 'Defense', type: 'Splash', hp: 1000, function: 'Ground & Air splash defense' },
        { id: 11, name: 'Barracks', category: 'Army', type: 'Training', hp: 500, function: 'Trains Elixir troops' },
        { id: 12, name: 'Dark Barracks', category: 'Army', type: 'Training', hp: 600, function: 'Trains Dark Elixir troops' },
        { id: 13, name: 'Army Camp', category: 'Army', type: 'Storage', hp: 400, function: 'Houses trained troops' },
        { id: 14, name: 'Laboratory', category: 'Army', type: 'Upgrade', hp: 700, function: 'Upgrades troops & spells' },
        { id: 15, name: 'Spring Trap', category: 'Trap', type: 'Ground', hp: 0, function: 'Launches troops away' },
        { id: 16, name: 'Giant Bomb', category: 'Trap', type: 'Ground', hp: 0, function: 'Large area damage' }
    ];

    const renderBuildings = (buildingsToRender) => {
        if (!buildingGrid) return;
        buildingGrid.innerHTML = '';
        if (buildingsToRender.length === 0) {
            buildingGrid.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">No buildings found matching your criteria.</p>';
            return;
        }
        buildingsToRender.forEach(building => {
            const card = createElement('div', 'product-card');
            card.innerHTML = `
                <h3>${building.name}</h3>
                <p>Category: ${building.category}</p>
                <p>Type: ${building.type}</p>
                <p>HP: ${building.hp}</p>
                <p>Function: ${building.function}</p>
            `;
            buildingGrid.appendChild(card);
        });
    };

    const filterBuildings = () => {
        const searchTerm = buildingSearchInput.value.toLowerCase();
        const category = buildingCategoryFilter.value;

        let filtered = allBuildings.filter(building => {
            const matchesSearch = building.name.toLowerCase().includes(searchTerm);
            const matchesCategory = category === 'all' || building.category.toLowerCase() === category;
            return matchesSearch && matchesCategory;
        });
        renderBuildings(filtered);
    };

    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                button.classList.add('active');
                const targetId = button.dataset.tab;
                getElement(`#${targetId}`).classList.add('active');
            });
        });
        // Activate the first tab by default
        if (tabButtons[0]) tabButtons[0].click();
    }

    if (buildingSearchInput) buildingSearchInput.addEventListener('input', filterBuildings);
    if (buildingCategoryFilter) buildingCategoryFilter.addEventListener('change', filterBuildings);

    renderBuildings(allBuildings); // Initial render
};

// Shop Page Product Display
const initShopPage = () => {
    const shopGrid = getElement('#shop-grid');
    const shopItems = [
        { id: 101, name: 'Small Gem Pack', price: 80, description: 'A handful of gems to get you started.' },
        { id: 102, name: 'Medium Gem Pack', price: 500, description: 'Enough gems for some serious upgrades.' },
        { id: 103, name: 'Large Gem Pack', price: 1200, description: 'A treasure chest full of gems!' },
        { id: 104, name: 'Builder Potion', price: 285, description: 'Boosts all builders for 1 hour.' },
        { id: 105, name: 'Research Potion', price: 180, description: 'Speeds up laboratory research by 24 hours.' },
        { id: 106, name: 'Training Potion', price: 25, description: 'Boosts barracks, spell factories, and heroes for 1 hour.' },
        { id: 107, name: 'Resource Potion', price: 100, description: 'Boosts all resource collectors for 24 hours.' },
        { id: 108, name: 'Shield (1 Day)', price: 100, description: 'Protects your village for 1 day.' },
        { id: 109, name: 'Shield (2 Days)', price: 200, description: 'Protects your village for 2 days.' }
    ];

    if (shopGrid) {
        shopGrid.innerHTML = '';
        shopItems.forEach(item => {
            const card = createElement('div', 'product-card');
            card.innerHTML = `
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p class="price">${item.price} Gems</p>
                <button class="btn btn-primary add-to-cart-btn" data-id="${item.id}">Add to Cart</button>
            `;
            shopGrid.appendChild(card);
        });

        shopGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart-btn')) {
                const itemId = parseInt(e.target.dataset.id);
                const itemToAdd = shopItems.find(item => item.id === itemId);
                if (itemToAdd) {
                    addToCart(itemToAdd);
                }
            }
        });
    }
};

// Contact Page Form
const initContactPage = () => {
    const contactForm = getElement('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = getElement('#contact-name');
            const emailInput = getElement('#contact-email');
            const messageInput = getElement('#contact-message');

            const nameError = getElement('#contact-name-error');
            const emailError = getElement('#contact-email-error');
            const messageError = getElement('#contact-message-error');

            let isValid = true;
            isValid = validateField(nameInput, nameError, (val) => val.length > 0, 'Name cannot be empty.') && isValid;
            isValid = validateField(emailInput, emailError, isValidEmail, 'Please enter a valid email address.') && isValid;
            isValid = validateField(messageInput, messageError, (val) => val.length >= 10, 'Message must be at least 10 characters.') && isValid;

            if (isValid) {
                // Simulate form submission
                console.log('Contact Form Data:', {
                    name: nameInput.value,
                    email: emailInput.value,
                    message: messageInput.value
                });
                alert('Thank you for your message! We will get back to you soon. (Mock submission)');
                contactForm.reset();
            }
        });
    }
};

// --- Initial App Load --- //
document.addEventListener('DOMContentLoaded', () => {
    handleRoute();
    updateAuthLinks();
    updateCartDisplay();
});
