export const getProducts = async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return [
        {
            id: 'P001',
            name: 'Echo Dot (5th Gen) | Smart speaker with Alexa',
            price: 49.99,
            category: 'Electronics',
            description: 'Our best-sounding Echo Dot yet: Enjoy an improved audio experience compared to any previous Echo Dot with Alexa for clearer vocals, deeper bass and vibrant sound in any room.',
            rating: 4.5,
            image: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23f0f0f0%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20fill%3D%22%23666%22%20text-anchor%3D%22middle%22%20alignment-baseline%3D%22middle%22%3EEcho Dot%3C%2Ftext%3E%3C%2Fsvg%3E'
        },
        {
            id: 'P002',
            name: 'Kindle Paperwhite (11th Gen) | 8 GB',
            price: 139.99,
            category: 'Books & Kindle',
            description: 'Now with a 6.8\" display and a thinner border, adjustable warm light, up to 10 weeks of battery life, and 20% faster page turns.',
            rating: 4.7,
            image: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23f0f0f0%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20fill%3D%22%23666%22%20text-anchor%3D%22middle%22%20alignment-baseline%3D%22middle%22%3EKindle%3C%2Ftext%3E%3C%2Fsvg%3E'
        },
        {
            id: 'P003',
            name: 'Fire TV Stick 4K Max (2nd Gen)',
            price: 59.99,
            category: 'Electronics',
            description: 'Our most powerful streaming stick - 40% more powerful than Fire TV Stick 4K, with faster app starts and more fluid navigation.',
            rating: 4.6,
            image: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23f0f0f0%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20fill%3D%22%23666%22%20text-anchor%3D%22middle%22%20alignment-baseline%3D%22middle%22%3EFire TV Stick%3C%2Ftext%3E%3C%2Fsvg%3E'
        },
        {
            id: 'P004',
            name: 'Amazon Basics AA Performance Alkaline Batteries (48 Pack)',
            price: 16.99,
            category: 'Home & Kitchen',
            description: '48-pack of AA 1.5-volt alkaline batteries for reliable performance across a wide range of devices.',
            rating: 4.4,
            image: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23f0f0f0%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20fill%3D%22%23666%22%20text-anchor%3D%22middle%22%20alignment-baseline%3D%22middle%22%3EBatteries%3C%2Ftext%3E%3C%2Fsvg%3E'
        },
        {
            id: 'P005',
            name: 'Ring Video Doorbell Wired – 2021 release',
            price: 64.99,
            category: 'Smart Home',
            description: 'See, hear, and speak to anyone at your door from anywhere with the Ring Video Doorbell Wired.',
            rating: 4.3,
            image: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23f0f0f0%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20fill%3D%22%23666%22%20text-anchor%3D%22middle%22%20alignment-baseline%3D%22middle%22%3EDoorbell%3C%2Ftext%3E%3C%2Fsvg%3E'
        },
        {
            id: 'P006',
            name: 'Echo Show 8 (2nd Gen, 2021 release) | HD smart display with Alexa',
            price: 129.99,
            category: 'Electronics',
            description: 'Alexa can show you even more: With an 8\" HD touchscreen, adaptive color, and stereo speakers, Echo Show 8 brings you vivid visuals and crisp, full sound.',
            rating: 4.6,
            image: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23f0f0f0%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20fill%3D%22%23666%22%20text-anchor%3D%22middle%22%20alignment-baseline%3D%22middle%22%3EEcho Show%3C%2Ftext%3E%3C%2Fsvg%3E'
        },
        {
            id: 'P007',
            name: 'New World (PC Digital Code)',
            price: 39.99,
            category: 'Video Games',
            description: 'Explore a thrilling, open-world MMO filled with danger and opportunity on the supernatural island of Aeternum.',
            rating: 3.8,
            image: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23f0f0f0%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20fill%3D%22%23666%22%20text-anchor%3D%22middle%22%20alignment-baseline%3D%22middle%22%3ENew World%3C%2Ftext%3E%3C%2Fsvg%3E'
        },
        {
            id: 'P008',
            name: 'Amazon Essentials Men\'s Regular-Fit Short-Sleeve Crewneck T-Shirt',
            price: 15.00,
            category: 'Apparel',
            description: 'An Amazon brand - This regular-fit tee features a comfortable crewneck and short sleeves.',
            rating: 4.2,
            image: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23f0f0f0%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20fill%3D%22%23666%22%20text-anchor%3D%22middle%22%20alignment-baseline%3D%22middle%22%3ET-Shirt%3C%2Ftext%3E%3C%2Fsvg%3E'
        },
        {
            id: 'P009',
            name: 'Blink Mini – Compact indoor plug-in smart security camera, 1080p HD',
            price: 34.99,
            category: 'Smart Home',
            description: '1080P HD indoor, plug-in security camera with motion detection and two-way audio that lets you monitor the inside of your home day and night.',
            rating: 4.1,
            image: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23f0f0f0%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20fill%3D%22%23666%22%20text-anchor%3D%22middle%22%20alignment-baseline%3D%22middle%22%3EBlink Mini%3C%2Ftext%3E%3C%2Fsvg%3E'
        },
        {
            id: 'P010',
            name: 'Amazon Basics Classic Padded Office Desk Chair',
            price: 79.99,
            category: 'Office Products',
            description: 'Adjustable office chair with pneumatic seat-height adjustment and padded seat and back for comfort.',
            rating: 3.9,
            image: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23f0f0f0%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20fill%3D%22%23666%22%20text-anchor%3D%22middle%22%20alignment-baseline%3D%22middle%22%3EOffice Chair%3C%2Ftext%3E%3C%2Fsvg%3E'
        }
    ];
};
