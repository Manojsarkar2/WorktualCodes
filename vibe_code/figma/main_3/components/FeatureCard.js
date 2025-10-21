import { Icon } from './Icon.js';

export const FeatureCard = ({ iconName, title, description }) => {
    return `
        <div class="feature-card">
            <div class="icon-wrapper">
                ${Icon({ name: iconName })}
            </div>
            <h3>${title}</h3>
            <p>${description}</p>
        </div>
    `;
};
