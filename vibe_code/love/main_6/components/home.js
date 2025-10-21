const Home = {
    render: () => {
        return `
            <div class="container" id="home">
                <h2>Simple. Secure. Reliable messaging.</h2>
                <p>With WhatsApp, you'll get fast, simple, secure messaging and calling for free*, available on phones all over the world.</p>
                <button class="cta-button">Download WhatsApp</button>
            </div>
        `;
    },
    afterRender: () => {
        // Add any post-render logic here, e.g., event listeners
    }
};
