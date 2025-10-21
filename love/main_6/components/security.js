const Security = {
    render: () => {
        return `
            <div class="container" id="security">
                <h2>Security</h2>
                <p>WhatsApp is committed to your security. Learn more about our security features:</p>
                <ul>
                    <li><a href="#">End-to-end encryption</a></li>
                    <li><a href="#">Two-step verification</a></li>
                    <li><a href="#">Privacy controls</a></li>
                </ul>
            </div>
        `;
    },
    afterRender: () => {
        // Add any post-render logic here
    }
};
