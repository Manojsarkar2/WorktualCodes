const Privacy = {
    render: () => {
        return `
            <div class="container" id="privacy">
                <h2>Privacy</h2>
                <p>WhatsApp is committed to respecting your privacy. Read our privacy policy:</p>
                <a href="#">Privacy Policy</a>
            </div>
        `;
    },
    afterRender: () => {
        // Add any post-render logic here
    }
};
