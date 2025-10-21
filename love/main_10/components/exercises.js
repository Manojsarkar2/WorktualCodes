// components/exercises.js
async function Exercises() {
    const exercisesData = await fetchJsonData('data/exercises.json');
    if (!exercisesData) {
        return '<p>Failed to load exercises.</p>';
    }

    let exercisesHTML = '<div class="container"><h2>Exercises</h2><div class="exercises-list">';
    exercisesData.forEach(exercise => {
        exercisesHTML += `
            <div class="exercise-item">
                <h3>${exercise.title}</h3>
                <p>${exercise.description}</p>
                <a href="${exercise.link}" target="_blank">Start Exercise</a>
            </div>
        `;
    });
    exercisesHTML += '</div></div>';
    return exercisesHTML;
}

export default Exercises;