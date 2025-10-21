// app.js

// Import components and views
import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { renderHomeView } from './views/home.js';
import { renderAboutView } from './views/about.js';
import { renderProductsView } from './views/products.js';
import { renderProductDetailsView } from './views/product_details.js';
import { renderProfileView } from './views/profile.js';
import { renderSettingsView } from './views/settings.js';
import { renderContactView } from './views/contact.js';

// App State (example)
const appState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    theme: localStorage.getItem('theme') || 'light'
};

// Function to update the view based on the route
function updateView() {
    const path = window.location.hash.substring(1); // Remove the '#'
    const contentDiv = document.getElementById('content');

    switch (path) {
        case 'about':
            contentDiv.innerHTML = renderAboutView();
            break;
        case 'products':
            contentDiv.innerHTML = renderProductsView();
            break;
        case 'product-details':
            contentDiv.innerHTML = renderProductDetailsView();
            break;
        case 'profile':
            contentDiv.innerHTML = renderProfileView();
            break;
        case 'settings':
            contentDiv.innerHTML = renderSettingsView();
            break;
        case 'contact':
            contentDiv.innerHTML = renderContactView();
            break;
        default:
            contentDiv.innerHTML = renderHomeView();
    }
}

// Initialize the app
function initApp() {
    // Render initial UI components
    const appDiv = document.getElementById('app');
    appDiv.innerHTML = renderNavbar();
    updateView(); // Render initial view (Home)
    appDiv.innerHTML += renderFooter();

    // Event listener for hash changes (navigation)
    window.addEventListener('hashchange', updateView);
}

// Call initApp when the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);