const Footer = {
    render: () => {
        const year = new Date().getFullYear();
        return `
            <footer class="footer">
                <div class="footer-content">
                    <p>&copy; ${year} Bloom & Petal. All Rights Reserved.</p>
                    <p>Handcrafted with love in our studio.</p>
                </div>
            </footer>
        `;
    },
    after_render: () => {}
};

export default Footer;
