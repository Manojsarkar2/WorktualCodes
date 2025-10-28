document.addEventListener('DOMContentLoaded', () => {
    console.log('SPA loaded successfully!');

    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const dynamicInfoDiv = document.getElementById('dynamic-info');
    let contentLoaded = false;

    loadMoreBtn.addEventListener('click', () => {
        if (!contentLoaded) {
            // Simulate fetching data for an SPA
            setTimeout(() => {
                dynamicInfoDiv.innerHTML = `
                    <h3>More Information on Agentic AI</h3>
                    <p>Our Agentic AI Platform is designed to automate and optimize customer interactions, providing personalized support and efficient problem resolution. It leverages advanced natural language processing and machine learning to understand customer intent and deliver accurate responses.</p>
                    <p>Key features include: proactive engagement, sentiment analysis, and seamless integration with existing CRM systems.</p>
                `;
                loadMoreBtn.textContent = 'Hide Info';
                contentLoaded = true;
            }, 500); // Simulate network delay
        } else {
            dynamicInfoDiv.innerHTML = '';
            loadMoreBtn.textContent = 'Load More Info';
            contentLoaded = false;
        }
    });
});
