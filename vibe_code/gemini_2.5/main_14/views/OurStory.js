const OurStory = {
    render: async () => {
        return `
            <div class="container">
                <div style="text-align: center; max-width: 800px; margin: 2rem auto;">
                    <h1>Our Story</h1>
                    <p style="font-size: 1.2rem; margin-bottom: 2rem;">From a humble beginning to a passion for petals.</p>
                    
                    <p>Bloom & Petal was founded on a simple idea: that flowers are more than just decorations; they are a form of communication, a way to express emotions that words often cannot. Our journey began in a small neighborhood garage, where our founder, Jane Doe, started creating bouquets for friends and family. Her passion for unique color palettes and natural, garden-style arrangements quickly grew, and so did the demand for her creations.</p>
                    <br>
                    <p>Today, Bloom & Petal is a full-service floral studio dedicated to quality, creativity, and sustainability. We partner with local growers to source the freshest, most beautiful seasonal flowers. Every stem is carefully selected, and every bouquet is handcrafted with love by our talented team of floral designers. We believe in the power of flowers to brighten days, celebrate milestones, and offer comfort. Thank you for being a part of our story.</p>
                </div>
            </div>
        `;
    },
    after_render: () => {}
};

export default OurStory;
