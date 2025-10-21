const FAQ = {
    render: () => {
        return `
            <div class="container" id="faq">
                <h2>Frequently Asked Questions</h2>
                <div class="faq-item">
                    <h3>Is WhatsApp free?</h3>
                    <p>Yes, WhatsApp is free to download and use. However, data charges may apply.</p>
                </div>
                <div class="faq-item">
                    <h3>How do I create a WhatsApp account?</h3>
                    <p>You need a valid phone number to create a WhatsApp account.</p>
                </div>
            </div>
        `;
    },
    afterRender: () => {
        // Add any post-render logic here
    }
};
