class Team {
    async render() {
        const linkedinIcon = `<img src="./assets/images/linkedin.svg" alt="LinkedIn">`;
        const teamMembers = [
            { name: 'John Smith', position: 'CEO and Founder', img: 'team-1.png' },
            { name: 'Jane Doe', position: 'Director of Operations', img: 'team-2.png' },
            { name: 'Mike Brown', position: 'Senior SEO Specialist', img: 'team-3.png' },
            { name: 'Emily Johnson', position: 'PPC Manager', img: 'team-4.png' },
            { name: 'Chris Lee', position: 'Social Media Manager', img: 'team-5.png' },
            { name: 'Sarah Wilson', position: 'Content Strategist', img: 'team-6.png' },
        ];

        return `
            <section class="team-section" id="team">
                <div class="container">
                    <div class="section-header">
                        <h2>Team</h2>
                        <p>Meet the skilled and experienced team behind our successful digital marketing strategies.</p>
                    </div>
                    <div class="team-grid">
                        ${teamMembers.map(member => `
                            <div class="team-card">
                                <div class="team-card-image">
                                    <img src="./assets/images/${member.img}" alt="${member.name}">
                                </div>
                                <h4>${member.name}</h4>
                                <p class="position">${member.position}</p>
                                <div class="team-card-social">
                                    <a href="#" target="_blank" rel="noopener noreferrer">${linkedinIcon}</a>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }
}
export default Team;
