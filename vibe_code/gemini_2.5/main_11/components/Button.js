import { createElement } from '../utils/helpers.js';

export const Button = ({ label, className = '', onClick = () => {} }) => {
    const buttonElement = createElement('button', { className: `btn ${className}` }, label);
    buttonElement.addEventListener('click', onClick);
    return buttonElement;
};
