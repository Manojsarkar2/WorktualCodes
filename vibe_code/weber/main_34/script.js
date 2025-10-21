document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.querySelector('.hamburger');
    const navUL = document.querySelector('.nav-links');

    function loadContent(route) {
        fetch(route + '.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                contentDiv.innerHTML = data;
            })
            .catch(error => {
                console.error('Error fetching content:', error);
                contentDiv.innerHTML = '<p>Error loading content.</p>';
            });
    }

    function handleNavigation(event) {
        event.preventDefault();
        const route = event.target.dataset.route;
        loadContent(route);
        // Close hamburger menu on navigation
        if (navUL.classList.contains('show')) {
            navUL.classList.remove('show');
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // Initial load (Home page)
    loadContent('home');

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        navUL.classList.toggle('show');
    });
});