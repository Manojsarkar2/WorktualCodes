const Blog = {
    render: () => {
        return `
            <div class="container" id="blog">
                <h2>Blog</h2>
                <div class="blog-post">
                    <h3>Latest News and Updates</h3>
                    <p>Stay up-to-date with the latest WhatsApp news and features.</p>
                    <a href="#">Read More</a>
                </div>
            </div>
        `;
    },
    afterRender: () => {
        // Add any post-render logic here
    }
};
