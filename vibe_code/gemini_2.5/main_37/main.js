document.addEventListener('DOMContentLoaded', () => {
    // Create the first div element
    const div1 = document.createElement('div');
    // The DOM structure specifies 'text: null', so no text content is added.

    // Create the second div element
    const div2 = document.createElement('div');
    // The DOM structure specifies 'text: null', so no text content is added.

    // Append the two empty div elements directly to the body, replicating the DOM structure
    document.body.appendChild(div1);
    document.body.appendChild(div2);

    console.log('SPA loaded and DOM structure replicated.');
});