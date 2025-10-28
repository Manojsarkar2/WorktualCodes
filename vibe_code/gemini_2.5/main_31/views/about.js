export const renderAbout = () => {
    return `
        <section class="container section-padding">
            <h1 class="section-heading">About Whimsy World Toys</h1>
            <div class="grid-2-cols about-content">
                <div>
                    <h2>Our Story</h2>
                    <p>Whimsy World Toys was founded in 2010 with a simple mission: to bring joy and foster imagination in children through high-quality, engaging toys. What started as a small local shop has grown into an online destination for families seeking unique and inspiring playthings.</p>
                    <p>We believe that play is fundamental to a child's development. It's how they learn, explore, and understand the world around them. That's why we carefully curate our collection, ensuring every toy promotes creativity, problem-solving, and endless fun.</p>
                </div>
                <div>
                    <h2>Our Values</h2>
                    <ul>
                        <li><strong>Quality & Safety:</strong> We prioritize toys made from durable, non-toxic materials that meet the highest safety standards.</li>
                        <li><strong>Imagination & Creativity:</strong> We champion toys that encourage open-ended play and spark a child's natural curiosity.</li>
                        <li><strong>Learning Through Play:</strong> Our selection includes many educational toys designed to make learning an exciting adventure.</li>
                        <li><strong>Customer Happiness:</strong> Your satisfaction is our top priority. We're dedicated to providing excellent service and support.</li>
                        <li><strong>Community:</strong> We believe in giving back and supporting initiatives that benefit children and families.</li>
                    </ul>
                </div>
            </div>

            <div class="section-padding">
                <h2 class="section-heading">Meet Our Team</h2>
                <div class="grid-3-cols">
                    <div class="product-card text-center">
                        <h3>Alice Wonderland</h3>
                        <p>Founder & CEO</p>
                        <p class="description">Alice started Whimsy World with a passion for classic toys and a vision for a magical online store.</p>
                    </div>
                    <div class="product-card text-center">
                        <h3>Bob Builder</h3>
                        <p>Head of Product Curation</p>
                        <p class="description">Bob ensures every toy meets our strict standards for fun, safety, and educational value.</p>
                    </div>
                    <div class="product-card text-center">
                        <h3>Charlie Cheer</h3>
                        <p>Customer Experience Lead</p>
                        <p class="description">Charlie is dedicated to making sure every customer has a delightful shopping experience.</p>
                    </div>
                </div>
            </div>

            <div class="section-padding text-center">
                <h2 class="section-heading">Our Commitment to Sustainability</h2>
                <p>We are committed to reducing our environmental footprint. We actively seek out suppliers who use sustainable practices and materials, and we strive to use eco-friendly packaging whenever possible. Join us in building a better world for future generations of toy lovers.</p>
            </div>
        </section>
    `;
};
