class Hero {
    async render() {
        const logos = Array(6).fill(`<img src="./assets/images/company-logo.svg" alt="Company logo" class="company-logo">`).join('');
        return `
            <section class="hero-section">
                <div class="container hero-container">
                    <div class="hero-content">
                        <h1>Navigating the digital landscape for success</h1>
                        <p>Our digital marketing agency helps businesses grow and succeed online through a range of services including SEO, PPC, social media marketing, and content creation.</p>
                        <a href="/contact" data-link class="btn btn-primary">Book a consultation</a>
                    </div>
                    <div class="hero-image">
                        <img src="./assets/images/hero-image.png" alt="Illustration of people working on marketing analytics">
                    </div>
                </div>
                <div class="company-logos container">
                    ${logos}
                </div>
            </section>
        `;
    }
}
export default Hero;
