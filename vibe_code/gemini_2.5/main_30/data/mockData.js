export const getServices = () => [
    {
        id: 'general-consultation',
        name: 'General Consultation',
        description: 'Comprehensive health check-ups, diagnosis, and treatment for common illnesses.',
        details: [
            'Routine check-ups and physicals',
            'Management of acute and chronic conditions',
            'Prescription refills and medication management',
            'Referrals to specialists when needed'
        ],
        cost: '$80 - $150'
    },
    {
        id: 'pediatrics',
        name: 'Pediatrics',
        description: 'Specialized care for infants, children, and adolescents, focusing on growth, development, and childhood diseases.',
        details: [
            'Well-child visits and immunizations',
            'Developmental screenings',
            'Treatment for common childhood illnesses',
            'Adolescent health services'
        ],
        cost: '$90 - $180'
    },
    {
        id: 'cardiology',
        name: 'Cardiology Services',
        description: 'Diagnosis and treatment of heart-related conditions, including preventive care and disease management.',
        details: [
            'ECG and Echocardiography',
            'Blood pressure management',
            'Cholesterol screening and management',
            'Heart disease risk assessment'
        ],
        cost: '$200 - $500+'
    },
    {
        id: 'dermatology',
        name: 'Dermatology',
        description: 'Expert care for skin, hair, and nail conditions, from acne to skin cancer screenings.',
        details: [
            'Acne and eczema treatment',
            'Mole checks and skin cancer screenings',
            'Psoriasis management',
            'Cosmetic dermatology consultations'
        ],
        cost: '$120 - $300'
    },
    {
        id: 'orthopedics',
        name: 'Orthopedics',
        description: 'Diagnosis and treatment of musculoskeletal injuries and conditions affecting bones, joints, ligaments, and tendons.',
        details: [
            'Fracture care',
            'Arthritis management',
            'Sports injury treatment',
            'Joint pain and mobility issues'
        ],
        cost: '$150 - $400+'
    },
    {
        id: 'neurology',
        name: 'Neurology',
        description: 'Specialized care for disorders of the brain, spinal cord, nerves, and muscles.',
        details: [
            'Headache and migraine management',
            'Epilepsy and seizure disorders',
            'Stroke prevention and recovery',
            'Neuropathic pain treatment'
        ],
        cost: '$180 - $450+'
    }
];

export const getDoctors = () => [
    {
        id: 1,
        name: 'Dr. Emily Chen',
        specialty: 'General Practice',
        experience: 15,
        education: 'MD, University of Health Sciences',
        bio: 'Dr. Chen is a highly respected general practitioner known for her holistic approach to patient care and dedication to preventive medicine.'
    },
    {
        id: 2,
        name: 'Dr. David Lee',
        specialty: 'Pediatrics',
        experience: 10,
        education: 'MD, Children\'s Medical College',
        bio: 'Dr. Lee specializes in pediatric care, creating a friendly and comforting environment for children and their families.'
    },
    {
        id: 3,
        name: 'Dr. Sarah Patel',
        specialty: 'Cardiology',
        experience: 20,
        education: 'MD, PhD, National Cardiology Institute',
        bio: 'With extensive experience in cardiology, Dr. Patel is a leading expert in heart health and advanced cardiac treatments.'
    },
    {
        id: 4,
        name: 'Dr. Michael Wong',
        specialty: 'Dermatology',
        experience: 12,
        education: 'MD, Dermatology Institute',
        bio: 'Dr. Wong offers expert care for a wide range of skin conditions, combining medical knowledge with a keen aesthetic eye.'
    },
    {
        id: 5,
        name: 'Dr. Jessica Brown',
        specialty: 'Orthopedics',
        experience: 18,
        education: 'MD, Orthopedic Surgery Residency',
        bio: 'Dr. Brown is an accomplished orthopedic surgeon, specializing in joint health and sports medicine, helping patients regain mobility.'
    }
];

export const getTestimonials = () => [
    {
        id: 1,
        quote: 'MediCare Clinic has been a lifesaver for my family. The doctors are incredibly knowledgeable and genuinely care about their patients. Highly recommend!',
        author: 'Jane Doe',
        city: 'Wellness City'
    },
    {
        id: 2,
        quote: 'Booking an appointment was so easy, and the staff were very friendly. Dr. Chen provided excellent care and answered all my questions thoroughly.',
        author: 'John Smith',
        city: 'Healthville'
    },
    {
        id: 3,
        quote: 'I appreciate the modern facilities and the professional atmosphere. My experience with Dr. Patel was outstanding; she made me feel at ease.',
        author: 'Emily White',
        city: 'MediTown'
    },
    {
        id: 4,
        quote: 'The pediatric department is fantastic! Dr. Lee is wonderful with kids, and my children actually enjoy their visits. A true gem!',
        author: 'Sarah Johnson',
        city: 'Careland'
    }
];