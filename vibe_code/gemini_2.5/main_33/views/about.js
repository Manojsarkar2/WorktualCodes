export function getAboutView() {
    return `
        <div class="container">
            <h1>About Our Store</h1>
            <p>Welcome to our Amazon-like online store, a demonstration of modern single-page application (SPA) development using only vanilla JavaScript, HTML, and CSS.</p>

            <section style="margin-top: 30px;">
                <h2>Our Mission</h2>
                <p>To provide a seamless, efficient, and enjoyable online shopping experience, showcasing the power and flexibility of client-side rendering without the need for complex frameworks.</p>
            </section>

            <section style="margin-top: 30px;">
                <h2>What We Offer</h2>
                <ul>
                    <li><strong>Dynamic Product Catalog:</strong> Browse and search through a variety of products with real-time filtering.</li>
                    <li><strong>Interactive Shopping Cart:</strong> Add, remove, and update product quantities with instant total calculations.</li>
                    <li><strong>Client-Side Routing:</strong> Navigate between pages (Home, Products, Cart, Contact, About) without full page reloads, providing a smooth user experience.</li>
                    <li><strong>Responsive Design:</strong> A user interface that adapts to various screen sizes, from desktops to mobile devices.</li>
                    <li><strong>Themed Experience:</strong> Toggle between light and dark modes for personalized browsing.</li>
                    <li><strong>Rich UI Components:</strong> Modals, dropdowns, tabs, accordions, and carousels built from scratch with vanilla JavaScript.</li>
                </ul>
            </section>

            <section style="margin-top: 30px;">
                <h2>Our Technology Stack</h2>
                <p>This project is a testament to the capabilities of core web technologies:</p>
                <ul>
                    <li><strong>HTML5:</strong> For semantic structure.</li>
                    <li><strong>CSS3:</strong> For styling, responsiveness, and theme management using custom properties.</li>
                    <li><strong>Vanilla JavaScript (ES6+):</strong> For all interactivity, routing, state management, and dynamic content rendering.</li>
                </ul>
            </section>

            <section style="margin-top: 30px;">
                <h2>Future Enhancements</h2>
                <p>While this is a demo, a real-world application would include features like user authentication, persistent storage (server-side), payment gateway integration, and more robust error handling.</p>
            </section>
        </div>
    `;
}
