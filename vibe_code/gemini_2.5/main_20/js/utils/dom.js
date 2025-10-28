export const $ = {
    // Helper for querySelector
    get: (selector, parent = document) => parent.querySelector(selector),
    // Helper for querySelectorAll
    getAll: (selector, parent = document) => Array.from(parent.querySelectorAll(selector)),

    // Helper for createElement
    create: (tagName, attributes = {}, children = []) => {
        const element = document.createElement(tagName);
        for (const key in attributes) {
            if (key === 'class') {
                element.className = attributes[key];
            } else if (key === 'id') {
                element.id = attributes[key];
            } else if (key.startsWith('data-')) {
                element.setAttribute(key, attributes[key]);
            } else {
                element[key] = attributes[key];
            }
        }
        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else {
                element.appendChild(child);
            }
        });
        return element;
    },

    // Append a child element to a parent
    append: (parent, child) => {
        parent.appendChild(child);
    },

    // Add a class to an element
    addClass: (element, className) => {
        element.classList.add(className);
    },

    // Remove a class from an element
    removeClass: (element, className) => {
        element.classList.remove(className);
    },

    // Toggle a class on an element
    toggleClass: (element, className) => {
        element.classList.toggle(className);
    }
};

// Export as named exports for convenience too
export const get = $.get;
export const getAll = $.getAll;
export const create = $.create;
export const append = $.append;
export const addClass = $.addClass;
export const removeClass = $.removeClass;
export const toggleClass = $.toggleClass;