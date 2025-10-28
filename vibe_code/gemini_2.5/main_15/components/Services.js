class Services {
    async render() {
        const arrowIcon = `<img src="./assets/images/arrow-right-black.svg" alt="Learn more">`;
        const serviceIcon1 = `<img src="./assets/images/service-icon-1.svg" alt="SEO icon">`;
        const serviceIcon2 = `<img src="./assets/images/service-icon-2.svg" alt="PPC icon">`;
        const serviceIcon3 = `<img src="./assets/images/service-icon-3.svg" alt="Social Media icon">`;

        return `
            <section class="services-section" id="services">
                <div class="container">
                    <div class="section-header">
                        <h2>Services</h2>
                        <p>At our digital marketing agency, we offer a range of services to help businesses grow and succeed online.</p>
                    </div>
                    <div class="services-grid">
                        <div class="service-card">
                            <div class="service-card-header">
                                <h3>Search engine optimization</h3>
                                <a href="/services" data-link class="learn-more-link">
                                    <div class="icon-circle">${arrowIcon}</div>
                                </a>
                            </div>
                            <div class="service-card-content">
                                <div class="service-card-icon">${serviceIcon1}</div>
                                <div class="service-card-description">
                                    <p>Drive organic traffic and improve rankings with our SEO expertise.</p>
                                </div>
                            </div>
                        </div>
                        <div class="service-card">
                            <div class="service-card-header">
                                <h3>Pay-per-click advertising</h3>
                                <a href="/services" data-link class="learn-more-link">
                                    <div class="icon-circle">${arrowIcon}</div>
                                </a>
                            </div>
                            <div class="service-card-content">
                                <div class="service-card-icon">${serviceIcon2}</div>
                                <div class="service-card-description">
                                    <p>Maximize your ROI with targeted PPC campaigns on Google and social media.</p>
                                </div>
                            </div>
                        </div>
                        <div class="service-card">
                            <div class="service-card-header">
                                <h3>Social Media Marketing</h3>
                                <a href="/services" data-link class="learn-more-link">
                                    <div class="icon-circle">${arrowIcon}</div>
                                </a>
                            </div>
                            <div class="service-card-content">
                                <div class="service-card-icon">${serviceIcon3}</div>
                                <div class="service-card-description">
                                    <p>Engage your audience and build brand loyalty with our social media strategies.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}
export default Services;
