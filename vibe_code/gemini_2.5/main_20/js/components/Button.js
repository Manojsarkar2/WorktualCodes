import { $ } from '../utils/dom.js';

export const Button = ({ text, onClick, variant = 'primary', size = 'medium', fullWidth = false, type = 'button' }) => {
    const button = $.create('button', {
        class: `button button-${variant} button-${size} ${fullWidth ? 'button-full-width' : ''}`,
        type: type
    });
    button.textContent = text;
    if (onClick) {
        button.addEventListener('click', onClick);
    }
    return button;
};