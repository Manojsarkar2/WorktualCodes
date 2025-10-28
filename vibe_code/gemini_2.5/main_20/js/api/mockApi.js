const simulateNetworkLatency = (data, delay = 500) => {
    return new Promise(resolve => setTimeout(() => resolve(data), delay));
};

const mockData = {
    services: [
        { id: 1, title: 'Search Engine Optimization', description: 'Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis dui, eget bibendum magna congue ac.', icon: 'assets/images/icon-search.svg', theme: 'dark' },
        { id: 2, title: 'Social Media Marketing', description: 'Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis dui, eget bibendum magna congue ac.', icon: 'assets/images/icon-chart.svg', theme: 'green' },
        { id: 3, title: 'Web Development', description: 'Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis dui, eget bibendum magna congue ac.', icon: 'assets/images/icon-message.svg', theme: 'dark' },
        { id: 4, title: 'App Development', description: 'Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis dui, eget bibendum magna congue ac.', icon: 'assets/images/icon-graph.svg', theme: 'green' },
        { id: 5, title: 'Graphic Design', description: 'Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis dui, eget bibendum magna congue ac.', icon: 'assets/images/icon-pie.svg', theme: 'dark' },
        { id: 6, title: 'Content Marketing', description: 'Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis dui, eget bibendum magna congue ac.', icon: 'assets/images/icon-target.svg', theme: 'green' }
    ],
    caseStudies: [
        { id: 1, title: 'For a local business, we created a comprehensive digital marketing strategy.', description: 'Urna, cursus eu vitae purus ornare facilisi nullam id. Eu vitae purus ornare facilisi nullam id. ', link: '#', image: 'assets/images/case-study-1.png', type: 'small' },
        { id: 2, title: 'For a local business, we created a comprehensive digital marketing strategy.', description: 'Urna, cursus eu vitae purus ornare facilisi nullam id. Eu vitae purus ornare facilisi nullam id. ', link: '#', image: 'assets/images/case-study-2.png', type: 'small' },
        { id: 3, title: 'Business analysis, website development and optimisation ', description: 'Eu vitae purus ornare facilisi nullam id. Eu vitae purus ornare facilisi nullam id. Urna, cursus eu vitae purus ornare facilisi nullam id. ', link: '#', image: 'assets/images/case-study-3.png', type: 'large' }
    ],
    testimonials: [
        { id: 1, quote: 'Positivus has transformed our online presence, delivering exceptional results and a significant increase in leads. Their team is professional, responsive, and truly understands our business goals.', author: 'John Smith', position: 'CEO, Company Name', avatar: 'assets/images/testimonial-avatar-1.png' },
        { id: 2, quote: 'Working with Positivus has been a game-changer. Their innovative strategies and dedication have significantly boosted our brand visibility and engagement.', author: 'Sarah Johnson', position: 'Marketing Director, BrandCo', avatar: 'assets/images/testimonial-avatar-2.png' },
        { id: 3, quote: 'The team at Positivus is outstanding. They provided tailored solutions that exceeded our expectations, resulting in measurable growth and a strong return on investment.', author: 'David Lee', position: 'Founder, Startup Inc.', avatar: 'assets/images/testimonial-avatar-1.png' }
    ],
    team: [
        { id: 1, name: 'John Smith', position: 'CEO & Founder', image: 'assets/images/team-member-1.png', socials: { facebook: '#', twitter: '#', linkedin: '#' } },
        { id: 2, name: 'Sarah Johnson', position: 'Chief Marketing Officer', image: 'assets/images/team-member-2.png', socials: { facebook: '#', twitter: '#', linkedin: '#' } },
        { id: 3, name: 'David Lee', position: 'Lead Developer', image: 'assets/images/team-member-3.png', socials: { facebook: '#', twitter: '#', linkedin: '#' } },
        { id: 4, name: 'Emily Chen', position: 'Content Strategist', image: 'assets/images/team-member-4.png', socials: { facebook: '#', twitter: '#', linkedin: '#' } }
    ],
    faq: [
        { id: 1, question: 'What is digital marketing?', answer: 'Digital marketing encompasses all marketing efforts that use an electronic device or the internet. Businesses leverage digital channels such as search engines, social media, email, and other websites to connect with current and prospective customers.' },
        { id: 2, question: 'How can digital marketing benefit my business?', answer: 'Digital marketing offers numerous benefits, including increased brand visibility, higher lead generation, improved customer engagement, better ROI tracking, and the ability to reach a global audience efficiently and cost-effectively.' },
        { id: 3, question: 'What services does Positivus offer?', answer: 'Positivus specializes in a wide range of digital marketing services, including Search Engine Optimization (SEO), Social Media Marketing (SMM), Content Marketing, Email Marketing, Web Design & Development, and Analytics.' },
        { id: 4, question: 'How do you measure campaign success?', answer: 'We use a combination of key performance indicators (KPIs) such as website traffic, conversion rates, lead quality, social media engagement, and return on investment (ROI). We provide regular, transparent reports to keep you informed.' },
        { id: 5, question: 'Can you work with small businesses?', answer: 'Absolutely! We tailor our strategies to fit businesses of all sizes, from startups to large enterprises. Our goal is to provide scalable and effective digital marketing solutions that meet your specific needs and budget.' }
    ]
};

export const fetchServices = () => simulateNetworkLatency(mockData.services);
export const fetchCaseStudies = () => simulateNetworkLatency(mockData.caseStudies);
export const fetchTestimonials = () => simulateNetworkLatency(mockData.testimonials);
export const fetchTeam = () => simulateNetworkLatency(mockData.team);
export const fetchFaq = () => simulateNetworkLatency(mockData.faq);

export const submitContactForm = (formData) => {
    console.log('Mock API: Submitting contact form:', formData);
    return simulateNetworkLatency({ success: true, message: 'Message sent successfully!' }, 1000)
        .then(response => {
            if (!response.success) {
                throw new Error('Form submission failed');
            }
            return response;
        });
};

export const subscribeToNewsletter = (email) => {
    console.log('Mock API: Subscribing email:', email);
    return simulateNetworkLatency({ success: true, message: 'Subscribed successfully!' }, 800)
        .then(response => {
            if (!response.success) {
                throw new Error('Subscription failed');
            }
            return response;
        });
};