let renderView;

// Define renderView only if it's not already defined
if (typeof renderView === 'undefined') {
    renderView = async (route) => {
        const routes = {
            '/': () => import('./views/home.js').then(module => module.homeView()),
            '/about': () => import('./views/about.js').then(module => module.aboutView()),
            '/products': () => import('./views/products.js').then(module => module.productsView()),
            '/product-details': () => import('./views/product_details.js').then(module => module.productDetailsView()),
            '/profile': () => import('./views/profile.js').then(module => module.profileView()),
            '/settings': () => import('./views/settings.js').then(module => module.settingsView()),
            '/contact': () => import('./views/contact.js').then(module => module.contactView()),
            '/login': () => import('./views/login.js').then(module => module.loginView()),
            '/register': () => import('./views/register.js').then(module => module.registerView())
        };

        const contentDiv = document.getElementById('content');
        try {
            const viewPromise = routes[route] ? routes[route]() : routes['/']();
            const viewContent = await viewPromise;
            contentDiv.innerHTML = viewContent;
        } catch (error) {
            console.error('Error loading view:', error);
            contentDiv.innerHTML = '<p>Error loading page.</p>';
        }
    };
}

export { renderView };