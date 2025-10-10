export const renderFooter = () => {
    const footer = document.getElementById('footer');
    footer.innerHTML = `<p>&copy; ${new Date().getFullYear()} Bookstore. All rights reserved.</p>`;
};