class HeroSection {
    async render() {
        return `
            <section class="hero">
                <div class="container">
                    <div class="hero__content">
                        <h1 class="hero__title">Navigating the digital landscape for success</h1>
                        <p class="hero__description">Our digital marketing agency helps businesses grow and succeed online through a range of services including SEO, PPC, social media marketing, and content creation.</p>
                        <a href="#contact" class="btn btn-green">Book a consultation</a>
                    </div>
                    <div class="hero__image">
                        <img src="https://placehold.co/500x450/191A23/B9FF66?text=Illustration" alt="Digital Marketing Illustration">
                    </div>
                </div>
            </section>
        `;
    }
}

export default new HeroSection();
