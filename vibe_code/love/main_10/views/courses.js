import coursesData from '../data/courses.json' assert { type: 'json' };

export async function renderCourses() {
    const coursesHTML = coursesData.map(course => `
        <div class="course-card">
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <p>Duration: ${course.duration}</p>
            <p>Instructor: ${course.instructor}</p>
        </div>
    `).join('');

    return `
        <section id="courses">
            <h2>Our Courses</h2>
            <div id="courses-list">
                ${coursesHTML}
            </div>
        </section>
    `;
}