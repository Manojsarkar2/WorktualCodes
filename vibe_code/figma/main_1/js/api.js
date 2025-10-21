// Mock API calls

export const fetchProducts = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
        { id: '1', title: 'Product 1', price: 19.99, image: 'assets/product1.jpg' },
        { id: '2', title: 'Product 2', price: 29.99, image: 'assets/product2.jpg' },
        { id: '3', title: 'Product 3', price: 39.99, image: 'assets/product3.jpg' }
    ];
};
