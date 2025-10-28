import store from '../store.js';

class TeamSection {
    constructor() {
        this.currentIndex = 0;
    }

    after_render() {
        const prevButton = document.querySelector('.team__nav-btn--prev');
        const nextButton = document.querySelector('.team__nav-btn--next');
        const slider = document.querySelector('.team__slider');
        const slides = document.querySelectorAll('.team-card');
        if (!prevButton || !nextButton || !slider || slides.length === 0) return;

        const totalSlides = slides.length;
        const slidesVisible = 3;
        const maxIndex = totalSlides > slidesVisible ? totalSlides - slidesVisible : 0;

        const updateSlider = () => {
            const cardWidth = slides[0].offsetWidth;
            const gap = 40; // As defined in CSS
            const offset = -this.currentIndex * (cardWidth + gap);
            slider.style.transform = `translateX(${offset}px)`;
        };

        prevButton.addEventListener('click', () => {
            if (this.currentIndex > 0) {
                this.currentIndex--;
                updateSlider();
            }
        });

        nextButton.addEventListener('click', () => {
            if (this.currentIndex < maxIndex) {
                this.currentIndex++;
                updateSlider();
            }
        });
        
        window.addEventListener('resize', updateSlider);
    }

    async render() {
        const linkedinIcon = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 0H5C2.239 0 0 2.239 0 5V19C0 21.761 2.239 24 5 24H19C21.762 24 24 21.761 24 19V5C24 2.239 21.762 0 19 0ZM8 19H5V8H8V19ZM6.5 6.732C5.534 6.732 4.75 5.942 4.75 4.968C4.75 3.994 5.534 3.204 6.5 3.204C7.466 3.204 8.25 3.994 8.25 4.968C8.25 5.942 7.467 6.732 6.5 6.732ZM20 19H17V13.396C17 10.028 13 10.283 13 13.396V19H10V8H13V9.765C14.396 7.179 20 6.988 20 12.241V19Z" fill="#FFFFFF"/>
            </svg>
        `;

        const teamCards = store.teamMembers.map(member => `
            <div class="team-card">
                <img src="${member.image}" alt="${member.name}" class="team-card__img">
                <div class="team-card__info">
                    <h4 class="team-card__name">${member.name}</h4>
                    <p class="team-card__role">${member.role}</p>
                </div>
                <a href="#" class="team-card__social" aria-label="${member.name}'s LinkedIn">${linkedinIcon}</a>
            </div>
        `).join('');

        return `
            <section class="team section" id="team">
                <div class="container">
                    <div class="section-header">
                        <div class="section-header__left">
                            <h2 class="section-title">Team</h2>
                            <p class="section-subtitle">Meet the skilled and experienced team behind our successful digital marketing strategies</p>
                        </div>
                        <div class="team__nav">
                            <button class="team__nav-btn team__nav-btn--prev" aria-label="Previous team member">&lt;</button>
                            <button class="team__nav-btn team__nav-btn--next" aria-label="Next team member">&gt;</button>
                        </div>
                    </div>
                    <div class="team__slider-wrapper">
                        <div class="team__slider">
                            ${teamCards}
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}

export default new TeamSection();
