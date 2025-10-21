export const renderView = (routes, pathname) => {
    const appDiv = document.getElementById('app');
    const view = routes[pathname] || routes['/']; // Default to home
    appDiv.innerHTML = view ? view() : '<h1>404 Not Found</h1>';
};