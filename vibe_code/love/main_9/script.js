const app = document.getElementById('app');
let currentRoute = '';
let animeData = [];
let cart = [];

// Function to fetch anime data
async function fetchAnimeData() {
    try {
        const response = await fetch('data/anime.json');
        animeData = await response.json();
    } catch (error) {
        console.error('Error fetching anime data:', error);
        animeData = []; // Ensure animeData is always an array
    }
}

// Function to render the current route
function renderRoute() {
    const routes = {
        '/': renderHome,
        '/home': renderHome,
        '/contact': renderContact,
        '/login': renderLogin,
        '/signup': renderSignup,
        '/search': renderSearch,
        '/cart': renderCart,
        '/anime-details': renderAnimeDetails
    };

    const renderFunction = routes[currentRoute] || renderHome; // Default to home
    const content = renderFunction();
    document.getElementById('content').innerHTML = content;

    // Re-attach event listeners if needed
    if (currentRoute === '/login' || currentRoute === '/signup') {
        attachAuthFormListeners();
    }

    if (currentRoute === '/cart') {
        attachCartListeners();
    }
}

// Function to navigate to a new route
function navigateTo(route) {
    currentRoute = route;
    history.pushState({ route: route }, null, route);
    renderRoute();
}

// Event listener for back/forward navigation
window.addEventListener('popstate', (event) => {
    currentRoute = event.state ? event.state.route : '/';
    renderRoute();
});

// Initial render
document.addEventListener('DOMContentLoaded', async () => {
    await fetchAnimeData();
    renderNavbar();
    renderFooter();
    currentRoute = window.location.pathname === '/' ? '/home' : window.location.pathname;
    renderRoute();
});

// Make navigateTo function globally accessible
window.navigateTo = navigateTo;

// Utility function to create elements
function createElement(tag, attributes, children) {
    const element = document.createElement(tag);
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    if (children) {
        if (Array.isArray(children)) {
            children.forEach(child => element.appendChild(typeof child === 'string' ? document.createTextNode(child) : child));
        } else {
            element.appendChild(typeof children === 'string' ? document.createTextNode(children) : children);
        }
    }
    return element;
}

// Example of rendering anime data
function renderAnimeList() {
    if (!animeData || animeData.length === 0) {
        return '<p>No anime available.</p>';
    }

    const animeGrid = createElement('div', { class: 'anime-grid' },
        animeData.map(anime => {
            const animeItem = createElement('div', { class: 'anime-item' }, [
                createElement('h3', {}, anime.title),
                createElement('p', {}, `Genre: ${anime.genre}`),
                createElement('button', { onclick: `navigateTo('/anime-details?id=${anime.id}')` }, 'View Details')
            ]);
            return animeItem;
        })
    );

    return animeGrid.outerHTML;
}

// Cart functionality
function addToCart(animeId) {
    const animeToAdd = animeData.find(anime => anime.id === animeId);
    if (animeToAdd) {
        cart.push(animeToAdd);
        updateCartDisplay();
    }
}

function removeFromCart(animeId) {
    cart = cart.filter(item => item.id !== animeId);
    updateCartDisplay();
}

function updateCartDisplay() {
    if (currentRoute === '/cart') {
        renderRoute(); // Re-render the cart
    }
}

function attachCartListeners() {
    const removeButtons = document.querySelectorAll('.remove-from-cart');
    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const animeId = parseInt(event.target.dataset.animeId);
            removeFromCart(animeId);
        });
    });
}
