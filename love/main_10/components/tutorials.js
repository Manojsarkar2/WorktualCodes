// components/tutorials.js
async function Tutorials() {
    const tutorialsData = await fetchJsonData('data/tutorials.json');
    if (!tutorialsData) {
        return '<p>Failed to load tutorials.</p>';
    }

    let tutorialsHTML = '<div class="container"><h2>Tutorials</h2><div class="tutorials-list">';
    tutorialsData.forEach(tutorial => {
        tutorialsHTML += `
            <div class="tutorial-item">
                <h3>${tutorial.title}</h3>
                <p>${tutorial.description}</p>
                <a href="${tutorial.link}" target="_blank">Start Learning</a>
            </div>
        `;
    });
    tutorialsHTML += '</div></div>';
    return tutorialsHTML;
}

export default Tutorials;