const Downloads = {
    render: () => {
        return `
            <div class="container" id="downloads">
                <h2>Downloads</h2>
                <p>Download WhatsApp for your device:</p>
                <ul>
                    <li><a href="#">Android</a></li>
                    <li><a href="#">iOS</a></li>
                    <li><a href="#">Windows</a></li>
                    <li><a href="#">Mac</a></li>
                </ul>
            </div>
        `;
    },
    afterRender: () => {
        // Add any post-render logic here
    }
};
