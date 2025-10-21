export const Navbar = (currentUser, onLogout, openLogin, openSignup, openCart, cartItemCount) => {
    const nav = document.createElement('nav');
    nav.className = 'navbar';
    nav.setAttribute('aria-label', 'Main navigation');

    const container = document.createElement('div');
    container.className = 'container navbar-content';

    const brandLink = document.createElement('a');
    brandLink.href = '#/';
    brandLink.className = 'navbar-brand';
    brandLink.innerHTML = `Flipkart<span>Explore Plus</span>`;
    brandLink.setAttribute('aria-label', 'Flipkart Home');

    const searchBar = document.createElement('div');
    searchBar.className = 'search-bar';
    searchBar.innerHTML = `
        <input type="text" placeholder="Search for products, brands and more" aria-label="Search products">
        <button aria-label="Search"><span class="icon">🔍</span></button>
    `;

    const navLinks = document.createElement('ul');
    navLinks.className = 'nav-links';
    navLinks.setAttribute('role', 'menubar');

    const createNavLink = (text, href, icon, isDropdown = false, dropdownItems = []) => {
        const li = document.createElement('li');
        li.setAttribute('role', 'none');
        const link = document.createElement('a');
        link.href = href;
        link.className = 'nav-link';
        link.setAttribute('role', 'menuitem');
        link.innerHTML = `<span class="icon">${icon}</span>${text}`;

        if (isDropdown) {
            link.classList.add('dropdown-toggle');
            link.setAttribute('aria-haspopup', 'true');
            link.setAttribute('aria-expanded', 'false');
            link.innerHTML += ' <span class="icon">▼</span>'; // Dropdown arrow

            const dropdownMenu = document.createElement('ul');
            dropdownMenu.className = 'dropdown-menu';
            dropdownMenu.setAttribute('role', 'menu');
            dropdownMenu.setAttribute('aria-hidden', 'true');

            dropdownItems.forEach(item => {
                const dropdownLi = document.createElement('li');
                dropdownLi.setAttribute('role', 'none');
                const dropdownLink = document.createElement('a');
                dropdownLink.href = item.href;
                dropdownLink.setAttribute('role', 'menuitem');
                dropdownLink.textContent = item.text;
                dropdownLi.appendChild(dropdownLink);
                dropdownMenu.appendChild(dropdownLi);
            });

            li.appendChild(link);
            li.appendChild(dropdownMenu);

            link.addEventListener('click', (e) => {
                e.preventDefault();
                const isActive = dropdownMenu.classList.toggle('active');
                link.setAttribute('aria-expanded', isActive);
            });

            // Close dropdown if clicked outside
            document.addEventListener('click', (e) => {
                if (!li.contains(e.target) && dropdownMenu.classList.contains('active')) {
                    dropdownMenu.classList.remove('active');
                    link.setAttribute('aria-expanded', 'false');
                }
            });
        } else {
            li.appendChild(link);
        }
        return li;
    };

    navLinks.appendChild(createNavLink('Products', '#products', '📦'));
    navLinks.appendChild(createNavLink('Categories', '#categories', '🏷️', true, [
        { text: 'Electronics', href: '#products?category=electronics' },
        { text: 'Fashion', href: '#products?category=fashion' },
        { text: 'Home & Furniture', href: '#products?category=home-furniture' },
        { text: 'Appliances', href: '#products?category=appliances' },
        { text: 'Beauty, Toys & More', href: '#products?category=beauty-toys' }
    ]));
    navLinks.appendChild(createNavLink('Offers', '#offers', '💰'));
    navLinks.appendChild(createNavLink('Contact', '#contact', '📞'));

    if (currentUser) {
        const userDropdownItems = [
            { text: 'My Profile', href: '#profile' },
            { text: 'Orders', href: '#orders' },
            { text: 'Wishlist', href: '#wishlist' },
            { text: 'Coupons', href: '#coupons' },
            { text: 'Logout', href: '#logout' }
        ];
        const userLi = createNavLink(`Hi, ${currentUser.name || currentUser.email.split('@')[0]}`, '#', '👤', true, userDropdownItems);
        userLi.querySelector('a[href="#logout"]').addEventListener('click', (e) => {
            e.preventDefault();
            onLogout();
        });
        navLinks.appendChild(userLi);
    } else {
        const loginSignupLi = createNavLink('Login & Signup', '#', '🔑', true, [
            { text: 'Login', href: '#login' },
            { text: 'Sign Up', href: '#signup' }
        ]);
        loginSignupLi.querySelector('a[href="#login"]').addEventListener('click', (e) => {
            e.preventDefault();
            openLogin();
        });
        loginSignupLi.querySelector('a[href="#signup"]').addEventListener('click', (e) => {
            e.preventDefault();
            openSignup();
        });
        navLinks.appendChild(loginSignupLi);
    }

    const cartLi = document.createElement('li');
    cartLi.setAttribute('role', 'none');
    const cartLink = document.createElement('a');
    cartLink.href = '#cart';
    cartLink.className = 'nav-link cart-link';
    cartLink.setAttribute('role', 'menuitem');
    cartLink.setAttribute('aria-label', `Shopping Cart with ${cartItemCount} items`);
    cartLink.innerHTML = `<span class="icon">🛒</span>Cart <span id="cart-count" class="cart-count">${cartItemCount > 0 ? cartItemCount : ''}</span>`;
    if (cartItemCount === 0) {
        cartLink.querySelector('#cart-count').style.display = 'none';
    }
    cartLink.addEventListener('click', (e) => {
        e.preventDefault();
        openCart();
    });
    cartLi.appendChild(cartLink);
    navLinks.appendChild(cartLi);

    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger-menu';
    hamburger.innerHTML = '☰';
    hamburger.setAttribute('role', 'button');
    hamburger.setAttribute('aria-label', 'Toggle navigation');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const expanded = navLinks.classList.contains('active');
        hamburger.setAttribute('aria-expanded', expanded);
    });

    container.appendChild(brandLink);
    container.appendChild(searchBar);
    container.appendChild(navLinks);
    container.appendChild(hamburger);
    nav.appendChild(container);

    return nav;
};
