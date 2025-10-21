// components/courses.js
async function Courses() {
    const coursesData = await fetchJsonData('data/courses.json');
    if (!coursesData) {
        return '<p>Failed to load courses.</p>';
    }

    let coursesHTML = '<div class="container"><h2>Courses</h2><div class="courses-grid">';
    coursesData.forEach(course => {
        coursesHTML += `
            <div class="course-card">
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <a href="${course.link}" target="_blank">Learn More</a>
            </div>
        `;
    });
    coursesHTML += '</div></div>';
    return coursesHTML;
}

export default Courses;