const Features = {
    render: () => {
        return `
            <div class="container" id="features">
                <h2>Features</h2>
                <div class="features-grid">
                    <div class="feature-item">
                        <h3>End-to-End Encryption</h3>
                        <p>Your personal messages and calls to friends and family are end-to-end encrypted. No one outside of your chats, not even WhatsApp, can read or listen to them.</p>
                    </div>
                    <div class="feature-item">
                        <h3>Voice and Video Calls</h3>
                        <p>Talk to your friends and family for free*. Even over different countries. With voice and video calls, you can have face-to-face conversations.</p>
                    </div>
                    <div class="feature-item">
                        <h3>Photos and Videos</h3>
                        <p>Send photos and videos on WhatsApp instantly. You can even capture the moments that matter to you with a built-in camera.</p>
                    </div>
                    <div class="feature-item">
                        <h3>WhatsApp Web and Desktop</h3>
                        <p>With WhatsApp on the web and desktop, you can seamlessly sync all of your chats to your computer so that you can chat on whatever device is most convenient for you.</p>
                    </div>
                </div>
            </div>
        `;
    },
    afterRender: () => {
        // Add any post-render logic here
    }
};
