export const setupNavbar = (shopCategories = []) => {
    const navbar = document.getElementById('main-navbar');
    const hamburger = navbar.querySelector('.hamburger-menu');
    const navLinks = navbar.querySelector('.nav-links');
    const shopDropdown = navbar.querySelector('#shop-dropdown');

    // Populate shop dropdown
    if (shopDropdown && shopCategories.length > 0) {
        shopDropdown.innerHTML = shopCategories.map(cat => 
            `<a href="#/shop#${cat.id}" class="nav-link" data-route="shop" data-category="${cat.id}">${cat.name}</a>`
        ).join('');
    }

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        document.body.classList.toggle('no-scroll'); // Prevent scrolling when menu is open
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // Close dropdowns if clicking outside
    document.addEventListener('click', (event) => {
        if (!navbar.contains(event.target)) {
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
            // Close any open dropdowns (if more were added)
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
            });
        }
    });

    // Handle dropdown toggle for accessibility (keyboard)
    const dropdownToggles = navbar.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default navigation for dropdown toggle
            const dropdownMenu = toggle.nextElementSibling;
            if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
            }
        });
        toggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle.click();
            }
        });
    });
};
