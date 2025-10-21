const BASE_URL = './data/';

export const api = {
    fetchProducts: async () => {
        try {
            const response = await fetch(`${BASE_URL}products.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    },

    fetchCategories: async () => {
        try {
            const response = await fetch(`${BASE_URL}categories.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    },

    // Example of a mock POST request
    submitNewsletter: async (email) => {
        console.log(`Submitting newsletter for: ${email}`);
        return new Promise(resolve => {
            setTimeout(() => {
                console.log('Newsletter subscription successful!');
                resolve({ success: true, message: 'Thank you for subscribing!' });
            }, 500);
        });
    }
};
