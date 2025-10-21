const Footer = {
    render: () => {
        const footerHTML = `
            <div class="container">
                <p>&copy; ${new Date().getFullYear()} WhatsApp. All rights reserved.</p>
            </div>
        `;
        document.getElementById('footer').innerHTML = footerHTML;
    }
};
