export const qs = (selector, parent = document) => {
    return parent.querySelector(selector);
};

export const qsa = (selector, parent = document) => {
    return Array.from(parent.querySelectorAll(selector));
};

export const addClass = (el, className) => {
    if (el && className) {
        el.classList.add(className);
    }
};

export const removeClass = (el, className) => {
    if (el && className) {
        el.classList.remove(className);
    }
};

export const toggleClass = (el, className) => {
    if (el && className) {
        el.classList.toggle(className);
    }
};
