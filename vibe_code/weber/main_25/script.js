document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    const content = document.getElementById('content');
    const themeToggle = document.getElementById('theme-toggle');
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const productList = document.getElementById('product-list');
    const contactForm = document.getElementById('contact-form');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const modal = document.getElementById('modal');
    const closeModalButton = document.querySelector('.close-button');

    // Sample Product Data
    const products = [
        { id: 1, name: 'Attack on Titan Figure', category: 'figures' },
        { id: 2, name: 'Naruto Manga Vol. 1', category: 'manga' },
        { id: 3, name: 'One Piece T-Shirt', category: 'apparel' },
        { id: 4, name: 'Death Note Keychain', category: 'accessories' },
        { id: 5, name: 'Fullmetal Alchemist Figure', category: 'figures' },
        { id: 6, name: 'Bleach Manga Vol. 5', category: 'manga' },
        { id: 7, name: 'Sailor Moon Hoodie', category: 'apparel' },
        { id: 8, name: 'Dragon Ball Z Lanyard', category: 'accessories' }
    ];

    // Routing
    function navigateTo(pageId) {
        document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');
        window.location.hash = pageId; // Update the hash
    }

    // Event listener for navigation links
    navLinks.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            const pageId = event.target.getAttribute('data-page');
            navigateTo(pageId);
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active'); // Close the menu on mobile
            }
        }
    });

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Theme Toggle
    function enableDarkMode() {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }

    function enableLightMode() {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }

    themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            enableLightMode();
        } else {
            enableDarkMode();
        }
    });

    // Check for saved theme
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        enableDarkMode();
    }

    // Product Filtering
    function displayProducts(filteredProducts) {
        productList.innerHTML = '';
        filteredProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `<h3>${product.name}</h3><button>Add to Cart</button>`;
            productList.appendChild(productDiv);
        });
    }

    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;

        let filteredProducts = products;

        if (searchTerm) {
            filteredProducts = filteredProducts.filter(product => product.name.toLowerCase().includes(searchTerm));
        }

        if (category !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.category === category);
        }

        displayProducts(filteredProducts);
    }

    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);

    // Form Validation & Submission (Mock)
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                alert('Please fill in all required fields.');
                isValid = false;
                return;
            }
        });
        return isValid;
    }

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validateForm(contactForm)) {
            alert('Message sent! (Mock)');
            contactForm.reset();
        }
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validateForm(loginForm)) {
            // Mock login
            localStorage.setItem('user', 'loggedIn');
            alert('Logged in! (Mock)');
            navigateTo('home');
        }
    });

    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validateForm(signupForm)) {
            // Mock signup
            localStorage.setItem('user', 'loggedIn');
            alert('Signed up! (Mock)');
            navigateTo('home');
        }
    });

    // Modal
    function openModal() {
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    // Example: Open modal on product click
    productList.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            openModal();
        }
    });

    closeModalButton.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Initial Product Display
    displayProducts(products);

    // Handle initial hash navigation
    if (window.location.hash) {
        navigateTo(window.location.hash.substring(1));
    } else {
        navigateTo('home'); // Default to home
    }
});