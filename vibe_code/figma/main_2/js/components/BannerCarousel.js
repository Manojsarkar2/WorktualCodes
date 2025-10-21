const BannerCarousel = () => {
    // Mock data for the carousel
    const banners = [
        { id: 1, image: 'assets/product_image.jpg', alt: 'Banner 1' },
        { id: 2, image: 'assets/product_image.jpg', alt: 'Banner 2' },
        { id: 3, image: 'assets/product_image.jpg', alt: 'Banner 3' }
    ];

    const bannerItems = banners.map(banner => {
        return `<img src="${banner.image}" alt="${banner.alt}" style="width:100%;">`;
    }).join('');

    return `
        <div class="banner-section">
            ${bannerItems}
        </div>
    `;
};

export default BannerCarousel;