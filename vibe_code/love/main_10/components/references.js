// components/references.js
async function References() {
    const referencesData = await fetchJsonData('data/references.json');
    if (!referencesData) {
        return '<p>Failed to load references.</p>';
    }

    let referencesHTML = '<div class="container"><h2>References</h2><div class="references-list">';
    referencesData.forEach(reference => {
        referencesHTML += `
            <div class="reference-item">
                <h3>${reference.title}</h3>
                <p>${reference.description}</p>
                <a href="${reference.link}" target="_blank">View Reference</a>
            </div>
        `;
    });
    referencesHTML += '</div></div>';
    return referencesHTML;
}

export default References;