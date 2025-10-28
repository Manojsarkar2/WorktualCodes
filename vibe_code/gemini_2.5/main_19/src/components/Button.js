import { createElement } from '../utils.js';

export const Button = ({ text, onClick, type = 'primary', href = null, target = '_self', className = '' }) => {
    const buttonClasses = `btn btn-${type} ${className}`;

    if (href) {
        return createElement('a', {
            href: href,
            target: target,
            className: buttonClasses,
            onclick: onClick
        }, text);
    } else {
        return createElement('button', {
            className: buttonClasses,
            onclick: onClick
        }, text);
    }
};
