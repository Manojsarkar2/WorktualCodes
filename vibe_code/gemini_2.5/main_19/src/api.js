export const api = {
    // Mock data for doctors, services, testimonials
    mockData: {
        doctors: [
            {
                id: 1,
                name: 'Dr. William Smith',
                specialty: 'Cardiologist',
                image: 'src/assets/img/doctor1.jpg',
                description: 'Dr. Smith is a renowned cardiologist with over 15 years of experience in heart health.',
                social: {
                    facebook: '#',
                    twitter: '#',
                    instagram: '#'
                }
            },
            {
                id: 2,
                name: 'Dr. Jane Doe',
                specialty: 'Pediatrician',
                image: 'src/assets/img/doctor2.jpg',
                description: 'Dr. Doe specializes in comprehensive care for children from infancy through adolescence.',
                social: {
                    facebook: '#',
                    twitter: '#',
                    instagram: '#'
                }
            },
            {
                id: 3,
                name: 'Dr. Robert Johnson',
                specialty: 'Neurologist',
                image: 'src/assets/img/doctor3.jpg',
                description: 'Dr. Johnson focuses on disorders of the nervous system, including the brain and spinal cord.',
                social: {
                    facebook: '#',
                    twitter: '#',
                    instagram: '#'
                }
            }
        ],
        services: [
            {
                id: 1,
                icon: 'fa-user-nurse',
                title: 'Quality Care',
                description: 'Experience top-tier medical care designed with your well-being in mind. Our dedicated team is committed to providing personalized treatments and compassionate support, ensuring your health journey is comfortable and effective.'
            },
            {
                id: 2,
                icon: 'fa-heartbeat',
                title: 'Heart Care',
                description: 'Our advanced cardiology department offers comprehensive heart care, from preventive screenings to complex surgical procedures. With cutting-edge technology and expert cardiologists, we prioritize your cardiovascular health.'
            },
            {
                id: 3,
                icon: 'fa-briefcase-medical',
                title: 'Lab Test',
                description: 'Benefit from our state-of-the-art laboratory services, providing accurate and timely diagnostic testing. Our extensive range of tests supports precise diagnoses and effective treatment plans, all under strict quality control.'
            },
            {
                id: 4,
                icon: 'fa-ambulance',
                title: 'Emergency Care',
                description: 'Our emergency department is equipped to handle all medical emergencies 24/7. With rapid response times and highly skilled medical professionals, we provide critical care when every second counts.'
            },
            {
                id: 5,
                icon: 'fa-tooth',
                title: 'Dental Care',
                description: 'Maintain your oral health with our comprehensive dental services. From routine check-ups and cleanings to advanced restorative procedures, our experienced dentists ensure your smile is healthy and bright.'
            },
            {
                id: 6,
                icon: 'fa-notes-medical',
                title: 'Operation',
                description: 'Our surgical team provides expert care across various specialties, utilizing advanced techniques for optimal patient outcomes. We ensure a safe and supportive environment throughout your surgical journey, from consultation to recovery.'
            }
        ],
        whyChooseUs: [
            {
                id: 1,
                icon: 'fa-solid fa-hospital',
                title: 'Modern Hospital',
                description: 'Our hospital boasts modern facilities with the latest technology, ensuring advanced and efficient medical treatments in a comfortable environment.'
            },
            {
                id: 2,
                icon: 'fa-solid fa-user-md',
                title: 'Expert Doctors',
                description: 'Our team consists of highly qualified and experienced medical professionals dedicated to providing exceptional patient care with expertise and compassion.'
            },
            {
                id: 3,
                icon: 'fa-solid fa-flask-vial',
                title: 'Research & Labs',
                description: 'We are committed to medical innovation through extensive research and fully equipped laboratories, offering precise diagnostics and contributing to medical advancements.'
            }
        ],
        testimonials: [
            {
                id: 1,
                name: 'John Doe',
                designation: 'Patient',
                image: 'src/assets/img/patient1.jpg',
                quote: '"The care I received at MedCare was exceptional. The doctors and staff were incredibly professional and compassionate. I highly recommend their services!"'
            },
            {
                id: 2,
                name: 'Jane Smith',
                designation: 'Patient',
                image: 'src/assets/img/patient2.jpg',
                quote: '"From the moment I walked in, I felt at ease. The facilities are top-notch, and the medical team truly goes above and beyond to ensure patient comfort and recovery."'
            },
            {
                id: 3,
                name: 'Robert Brown',
                designation: 'Patient',
                image: 'src/assets/img/doctor1.jpg',
                quote: '"Outstanding service and a very thorough consultation. I appreciate the clear explanations and the personalized treatment plan. A truly professional healthcare provider."'
            }
        ]
    },

    async getDoctors() {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.mockData.doctors), 500);
        });
    },

    async getServices() {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.mockData.services), 500);
        });
    },

    async getWhyChooseUs() {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.mockData.whyChooseUs), 500);
        });
    },

    async getTestimonials() {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.mockData.testimonials), 500);
        });
    },

    async submitAppointment(formData) {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log('Appointment Submitted:', formData);
                resolve({ success: true, message: 'Appointment booked successfully!' });
            }, 1000);
        });
    }
};
