export const renderNavbar = (container, currentUser, cartItemCount, categories, navigateTo) => {
    const categoryLinks = categories.map(cat => 
        `<li><a href="/category/${cat.toLowerCase().replace(/ /g, '-')}" data-nav-link="category-${cat.toLowerCase().replace(/ /g, '-')}">${cat}</a></li>`
    ).join('');

    container.innerHTML = `
        <div class="container navbar">
            <a href="/" class="navbar-brand" data-nav-link="home">
                Flipkart<span>Explore Plus</span>
            </a>
            <div class="search-bar">
                <input type="text" placeholder="Search for products, brands and more" aria-label="Search products">
                <button aria-label="Search"><i class="fas fa-search"></i></button>
            </div>
            <ul class="nav-links">
                ${currentUser ? 
                    `<li>
                        <button data-action="user-menu" aria-expanded="false" aria-controls="user-dropdown">
                            Hi, ${currentUser.name.split(' ')[0]} <i class="fas fa-chevron-down"></i>
                        </button>
                        <ul class="dropdown-menu" id="user-dropdown">
                            <li><a href="#" data-nav-link="my-profile">My Profile</a></li>
                            <li><a href="#" data-nav-link="orders">Orders</a></li>
                            <li><a href="#" data-nav-link="wishlist">Wishlist</a></li>
                            <li><a href="#" data-action="logout">Logout</a></li>
                        </ul>
                    </li>` : 
                    `<li>
                        <button data-action="login" aria-expanded="false" aria-controls="login-dropdown">
                            Login <i class="fas fa-chevron-down"></i>
                        </button>
                        <ul class="dropdown-menu" id="login-dropdown">
                            <li><a href="#" data-action="login">My Profile</a></li>
                            <li><a href="#" data-action="login">Flipkart Plus Zone</a></li>
                            <li class="dropdown-divider"></li>
                            <li><a href="#" data-action="orders">Orders</a></li>
                            <li><a href="#" data-action="wishlist">Wishlist</a></li>
                            <li><a href="#" data-action="rewards">Rewards</a></li>
                            <li><a href="#" data-action="giftcards">Gift Cards</a></li>
                        </ul>
                    </li>`
                }
                <li><a href="#" data-nav-link="seller">Become a Seller</a></li>
                <li>
                    <button data-action="more-menu" aria-expanded="false" aria-controls="more-dropdown">
                        More <i class="fas fa-chevron-down"></i>
                    </button>
                    <ul class="dropdown-menu" id="more-dropdown">
                        <li><a href="#" data-nav-link="notifications">Notification Preferences</a></li>
                        <li><a href="/contact" data-nav-link="contact">Contact Us</a></li>
                        <li><a href="#" data-nav-link="advertise">Advertise</a></li>
                        <li><a href="#" data-nav-link="download-app">Download App</a></li>
                    </ul>
                </li>
                <li>
                    <a href="/cart" data-nav-link="cart" aria-label="Cart with ${cartItemCount} items">
                        <i class="fas fa-shopping-cart"></i> Cart
                        ${cartItemCount > 0 ? `<span class="cart-count">${cartItemCount}</span>` : ''}
                    </a>
                </li>
            </ul>
            <div class="hamburger-menu" role="button" aria-label="Toggle navigation menu" aria-expanded="false">
                &#9776;
            </div>
        </div>
        <div class="container category-navbar">
            <ul class="category-links">
                ${categoryLinks}
            </ul>
        </div>
    `;

    // Add Font Awesome CDN for icons (simulated, as no external libraries are allowed)
    if (!document.getElementById('font-awesome-cdn')) {
        const link = document.createElement('link');
        link.id = 'font-awesome-cdn';
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
        document.head.appendChild(link);
    }

    const navLinks = container.querySelector('.nav-links');
    const hamburger = container.querySelector('.hamburger-menu');

    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');
    });

    // Handle dropdowns
    container.querySelectorAll('.nav-links > li > button').forEach(button => {
        button.addEventListener('click', (e) => {
            const dropdownMenu = button.nextElementSibling;
            if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                const isExpanded = button.getAttribute('aria-expanded') === 'true';
                button.setAttribute('aria-expanded', !isExpanded);
                dropdownMenu.style.display = isExpanded ? 'none' : 'block';

                // Close other dropdowns
                container.querySelectorAll('.nav-links > li > button').forEach(otherButton => {
                    if (otherButton !== button) {
                        otherButton.setAttribute('aria-expanded', 'false');
                        const otherDropdown = otherButton.nextElementSibling;
                        if (otherDropdown && otherDropdown.classList.contains('dropdown-menu')) {
                            otherDropdown.style.display = 'none';
                        }
                    }
                });
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!container.contains(e.target)) {
            container.querySelectorAll('.nav-links > li > button').forEach(button => {
                button.setAttribute('aria-expanded', 'false');
                const dropdownMenu = button.nextElementSibling;
                if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                    dropdownMenu.style.display = 'none';
                }
            });
        }
    });

    // Search functionality (basic client-side filtering)
    const searchInput = container.querySelector('.search-bar input');
    const searchButton = container.querySelector('.search-bar button');

    const performSearch = () => {
        const query = searchInput.value.trim().toLowerCase();
        if (query) {
            // In a real app, this would go to a search results page
            // For this SPA, we'll just navigate to home and log the query
            alert(`Searching for: "${query}" (This would navigate to a search results page)`);
            navigateTo('/'); // Or a dedicated search results page
        }
    };

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
};
