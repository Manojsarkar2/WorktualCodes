import { getDoctors } from '../data/mockData.js';

let currentDoctors = [];

export const renderDoctorsPage = () => {
    currentDoctors = getDoctors(); // Initialize currentDoctors

    return `
        <section class="section">
            <h1>Meet Our Esteemed Doctors</h1>
            <p>Our team of highly skilled and compassionate doctors is committed to providing exceptional healthcare. Learn more about their specialties and experience.</p>

            <div class="search-filter-container">
                <input type="text" id="doctor-search" placeholder="Search by name or specialty..." aria-label="Search doctors">
                <select id="specialty-filter" aria-label="Filter by specialty">
                    <option value="all">All Specialties</option>
                    <option value="General Practice">General Practice</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Neurology">Neurology</option>
                </select>
            </div>

            <div class="grid-container" id="doctors-list">
                ${currentDoctors.map(doctor => `
                    <div class="doctor-card" aria-labelledby="doctor-name-${doctor.id}">
                        <h3 id="doctor-name-${doctor.id}">${doctor.name}</h3>
                        <p class="specialty">${doctor.specialty}</p>
                        <p>${doctor.experience} years of experience</p>
                        <p>${doctor.education}</p>
                        <p>${doctor.bio}</p>
                        <button class="btn-primary" onclick="window.location.href='/appointments?doctor=${encodeURIComponent(doctor.name)}'">Book with ${doctor.name.split(' ')[0]}</button>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
};

export const setupDoctorSearch = () => {
    const searchInput = document.getElementById('doctor-search');
    const specialtyFilter = document.getElementById('specialty-filter');
    const doctorsListDiv = document.getElementById('doctors-list');

    const filterDoctors = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedSpecialty = specialtyFilter.value;

        const filtered = getDoctors().filter(doctor => {
            const matchesSearch = doctor.name.toLowerCase().includes(searchTerm) ||
                                  doctor.specialty.toLowerCase().includes(searchTerm);
            const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
            return matchesSearch && matchesSpecialty;
        });

        doctorsListDiv.innerHTML = filtered.map(doctor => `
            <div class="doctor-card" aria-labelledby="doctor-name-${doctor.id}">
                <h3 id="doctor-name-${doctor.id}">${doctor.name}</h3>
                <p class="specialty">${doctor.specialty}</p>
                <p>${doctor.experience} years of experience</p>
                <p>${doctor.education}</p>
                <p>${doctor.bio}</p>
                <button class="btn-primary" onclick="window.location.href='/appointments?doctor=${encodeURIComponent(doctor.name)}'">Book with ${doctor.name.split(' ')[0]}</button>
            </div>
        `).join('');
    };

    searchInput.addEventListener('input', filterDoctors);
    specialtyFilter.addEventListener('change', filterDoctors);

    // Pre-fill doctor if coming from home page button
    const urlParams = new URLSearchParams(window.location.search);
    const preselectedDoctor = urlParams.get('doctor');
    if (preselectedDoctor) {
        searchInput.value = preselectedDoctor;
        filterDoctors();
    }
};
