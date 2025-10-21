// components/footer.js

function createFooter() {
    const footer = document.createElement('footer');
    footer.id = 'footer';
    footer.innerHTML = `<p>&copy; ${new Date().getFullYear()} LearnSphere. All rights reserved.</p>`;
    return footer;
}

// Export the function to make it accessible
// In a pure-JS environment, you can attach it to the window object
window.createFooter = createFooter;