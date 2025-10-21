document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.querySelector('.hamburger');
    const navLinksList = document.querySelector('.nav-links');
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const closeModalButton = document.querySelector('.close-button');
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');

    // Function to load content dynamically
    const loadContent = async (page) => {
        try {
            const response = await fetch(`${page}.html`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const html = await response.text();
            contentDiv.innerHTML = html;

            // Re-attach event listeners for forms in loaded content
            attachFormListeners();

            // Initialize any dynamic content (e.g., carousels) after loading
            initializeDynamicContent(page);

        } catch (error) {
            console.error('Could not load page:', error);
            contentDiv.innerHTML = '<p>Failed to load content.</p>';
        }
    };

    // Function to attach event listeners to forms
    const attachFormListeners = () => {
        const forms = contentDiv.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                handleFormSubmit(form);
            });
        });
    };

    // Function to handle form submissions
    const handleFormSubmit = (form) => {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        // Mock submission handling (store in localStorage)
        localStorage.setItem('form_data', JSON.stringify(data));
        alert('Form submitted! Check localStorage.');
    };

    // Function to initialize dynamic content based on the page
    const initializeDynamicContent = (page) => {
        if (page === 'home') {
            // Example: Initialize a carousel
            // You would need to add the carousel HTML to home.html
            // and implement the carousel logic here
            console.log('Initializing carousel on home page');
        }
    };

    // Navigation handling
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const page = link.getAttribute('data-page');
            loadContent(page);
            // Close hamburger menu on navigation
            navLinksList.classList.remove('show');
        });
    });

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        navLinksList.classList.toggle('show');
    });

    // Modal handling
    const openModal = (content) => {
        modalBody.innerHTML = content;
        modal.style.display = 'block';
    };

    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Search functionality
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value;
        // Implement search logic here (e.g., filter anime list)
        alert(`Searching for: ${searchTerm}`);
    });

    // Load default content (Home page)
    loadContent('home');
});