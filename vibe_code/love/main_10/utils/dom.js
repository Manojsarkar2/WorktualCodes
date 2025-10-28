/**
 * Safely gets a DOM element by selector.
 * @param {string} selector - The CSS selector for the element.
 * @param {HTMLElement|Document} [context=document] - The context to search within.
 * @returns {HTMLElement|null} The found element or null.
 */
export function getElement(selector, context = document) {
    const element = context.querySelector(selector);
    if (!element) {
        console.warn(`Element with selector '${selector}' not found.`);
    }
    return element;
}

/**
 * Safely gets all DOM elements by selector.
 * @param {string} selector - The CSS selector for the elements.
 * @param {HTMLElement|Document} [context=document] - The context to search within.
 * @returns {NodeListOf<HTMLElement>} A NodeList of found elements (can be empty).
 */
export function getAllElements(selector, context = document) {
    const elements = context.querySelectorAll(selector);
    if (elements.length === 0) {
        console.warn(`No elements found with selector '${selector}'.`);
    }
    return elements;
}

/**
 * Creates a new DOM element with optional attributes and children.
 * @param {string} tagName - The tag name of the element to create.
 * @param {object} [attributes={}] - An object of attributes to set (e.g., { class: 'my-class', id: 'my-id' }).
 * @param {Array<HTMLElement|string>} [children=[]] - An array of child elements or text strings.
 * @returns {HTMLElement} The newly created element.
 */
export function createElement(tagName, attributes = {}, children = []) {
    const element = document.createElement(tagName);

    for (const key in attributes) {
        if (Object.prototype.hasOwnProperty.call(attributes, key)) {
            element.setAttribute(key, attributes[key]);
        }
    }

    children.forEach(child => {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else if (child instanceof HTMLElement) {
            element.appendChild(child);
        }
    });

    return element;
}
