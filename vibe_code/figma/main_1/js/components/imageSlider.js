import carouselImages from '../../data/carouselImages.json' assert { type: 'json' };

export const ImageSlider = () => {
    return `
        <div class="image-slider">
            ${carouselImages.images.map(image => `<img src="${image}" alt="Carousel Image">`).join('')}
        </div>
    `;
};