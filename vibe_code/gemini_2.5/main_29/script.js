document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksWrapper = document.querySelector('.nav-links-wrapper');

    if (menuToggle && navLinksWrapper) {
        menuToggle.addEventListener('click', () => {
            navLinksWrapper.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinksWrapper.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close the menu when a link is clicked (for single page navigation)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinksWrapper.classList.contains('active')) {
                    navLinksWrapper.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
});
