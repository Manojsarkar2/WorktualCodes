export const getServices = async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
        {
            id: 's1',
            icon: 'assets/images/service-icon-1.svg',
            title: 'General Dentistry',
            description: 'Comprehensive dental care for all ages, including check-ups, cleanings, and fillings.'
        },
        {
            id: 's2',
            icon: 'assets/images/service-icon-2.svg',
            title: 'Cardiology',
            description: 'Expert care for heart conditions, diagnostics, and personalized treatment plans.'
        },
        {
            id: 's3',
            icon: 'assets/images/service-icon-3.svg',
            title: 'Pediatrics',
            description: 'Specialized medical care for infants, children, and adolescents, focusing on growth and development.'
        },
        {
            id: 's4',
            icon: 'assets/images/service-icon-4.svg',
            title: 'Orthopedics',
            description: 'Diagnosis and treatment of musculoskeletal injuries and diseases, including surgery and rehabilitation.'
        }
    ];
};

export const getDoctors = async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
        {
            id: 'd1',
            image: 'assets/images/doctor-1.webp',
            name: 'Dr. Emily White',
            specialization: 'Cardiologist',
            socialLinks: {
                facebook: '#',
                twitter: '#',
                linkedin: '#'
            }
        },
        {
            id: 'd2',
            image: 'assets/images/doctor-2.webp',
            name: 'Dr. John Davis',
            specialization: 'Pediatrician',
            socialLinks: {
                facebook: '#',
                twitter: '#',
                linkedin: '#'
            }
        },
        {
            id: 'd3',
            image: 'assets/images/doctor-3.webp',
            name: 'Dr. Sarah Chen',
            specialization: 'Dentist',
            socialLinks: {
                facebook: '#',
                twitter: '#',
                linkedin: '#'
            }
        },
        {
            id: 'd4',
            image: 'assets/images/doctor-4.webp',
            name: 'Dr. Michael Lee',
            specialization: 'Orthopedic Surgeon',
            socialLinks: {
                facebook: '#',
                twitter: '#',
                linkedin: '#'
            }
        }
    ];
};

export const getTestimonials = async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
        {
            id: 't1',
            image: 'assets/images/patient-1.webp',
            name: 'Jane Doe',
            quote: '"The medical team here is incredibly compassionate and professional. I felt truly cared for during my visit."',
            rating: 5
        },
        {
            id: 't2',
            image: 'assets/images/patient-2.webp',
            name: 'John Smith',
            quote: '"State-of-the-art facilities and highly skilled doctors. I highly recommend this medical center."',
            rating: 5
        },
        {
            id: 't3',
            image: 'assets/images/patient-3.webp',
            name: 'Emily Johnson',
            quote: '"From appointment booking to treatment, everything was seamless. A truly positive healthcare experience."',
            rating: 4
        }
    ];
};

export const submitAppointment = async (appointmentData) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log('Submitting appointment:', appointmentData);

    // Simulate success or failure
    if (Math.random() > 0.1) { // 90% success rate
        return { success: true, message: 'Appointment booked successfully!' };
    } else {
        throw new Error('Failed to book appointment. Please try again later.');
    }
};
