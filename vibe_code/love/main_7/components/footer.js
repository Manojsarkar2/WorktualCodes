// components/footer.js

const createFooter = () => {
    const footer = document.getElementById('footer');
    if (footer) {
        footer.innerHTML = `<p>&copy; ${new Date().getFullYear()} Poundland. All rights reserved.</p>`;
    }
};

createFooter();