import { ASSET_URLS } from './utils/constants.js';

const mockData = {
    services: [
        {
            id: 's1',
            icon: ASSET_URLS.SERVICE_ICON_1,
            title: 'Cardiology',
            description: 'Comprehensive heart care, from diagnostics to advanced treatments.',
            link: '#services'
        },
        {
            id: 's2',
            icon: ASSET_URLS.SERVICE_ICON_2,
            title: 'Neurology',
            description: 'Expert care for brain, spinal cord, and nervous system disorders.',
            link: '#services'
        },
        {
            id: 's3',
            icon: ASSET_URLS.SERVICE_ICON_3,
            title: 'Orthopedics',
            description: 'Specialized treatment for musculoskeletal injuries and conditions.',
            link: '#services'
        }
    ],
    doctors: [
        {
            id: 'd1',
            image: ASSET_URLS.DOCTOR_1,
            name: 'Dr. Emily White',
            specialization: 'Cardiologist',
            socials: [
                { icon: ASSET_URLS.FACEBOOK_ICON, url: '#' },
                { icon: ASSET_URLS.TWITTER_ICON, url: '#' },
                { icon: ASSET_URLS.INSTAGRAM_ICON, url: '#' }
            ]
        },
        {
            id: 'd2',
            image: ASSET_URLS.DOCTOR_2,
            name: 'Dr. John Davis',
            specialization: 'Neurologist',
            socials: [
                { icon: ASSET_URLS.FACEBOOK_ICON, url: '#' },
                { icon: ASSET_URLS.TWITTER_ICON, url: '#' },
                { icon: ASSET_URLS.LINKEDIN_ICON, url: '#' }
            ]
        },
        {
            id: 'd3',
            image: ASSET_URLS.DOCTOR_3,
            name: 'Dr. Sarah Chen',
            specialization: 'Pediatrician',
            socials: [
                { icon: ASSET_URLS.FACEBOOK_ICON, url: '#' },
                { icon: ASSET_URLS.INSTAGRAM_ICON, url: '#' }
            ]
        },
        {
            id: 'd4',
            image: ASSET_URLS.DOCTOR_4,
            name: 'Dr. Michael Brown',
            specialization: 'Orthopedic Surgeon',
            socials: [
                { icon: ASSET_URLS.TWITTER_ICON, url: '#' },
                { icon: ASSET_URLS.LINKEDIN_ICON, url: '#' }
            ]
        }
    ],
    testimonials: [
        {
            id: 't1',
            quote: '"The care I received here was exceptional. The doctors and staff are incredibly compassionate and professional. Highly recommend!"',
            name: 'Jane Doe',
            rating: 5,
            avatar: ASSET_URLS.AVATAR_1
        },
        {
            id: 't2',
            quote: '"I felt truly listened to and understood. The treatment plan was clear, and my recovery has been fantastic. Thank you!"',
            name: 'John Smith',
            rating: 4,
            avatar: ASSET_URLS.AVATAR_2
        },
        {
            id: 't3',
            quote: '"From the moment I walked in, I felt at ease. The facility is modern, and the medical team is top-notch. A truly positive experience."',
            name: 'Emily Johnson',
            rating: 5,
            avatar: ASSET_URLS.AVATAR_3
        }
    ]
};

const simulateDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

const api = {
    async getServices() {
        await simulateDelay();
        return mockData.services;
    },

    async getDoctors() {
        await simulateDelay();
        return mockData.doctors;
    },

    async getTestimonials() {
        await simulateDelay();
        return mockData.testimonials;
    },

    async submitAppointment(formData) {
        await simulateDelay(1500);
        console.log('Mock API received appointment:', formData);
        // In a real app, you'd send this to a backend
        if (Math.random() > 0.1) { // 90% success rate
            return { success: true, message: 'Appointment submitted successfully!' };
        } else {
            throw new Error('Failed to submit appointment. Please try again.');
        }
    }
};

export default api;
