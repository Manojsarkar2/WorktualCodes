const products = [
    { id: 1, title: 'Product 1', price: '₹199', image: 'assets/product_image.jpg' },
    { id: 2, title: 'Product 2', price: '₹299', image: 'assets/product_image.jpg' },
    { id: 3, title: 'Product 3', price: '₹399', image: 'assets/product_image.jpg' },
    { id: 4, title: 'Product 4', price: '₹499', image: 'assets/product_image.jpg' },
    { id: 5, title: 'Product 5', price: '₹599', image: 'assets/product_image.jpg' },
    { id: 6, title: 'Product 6', price: '₹699', image: 'assets/product_image.jpg' }
];

const categories = [
    { id: 1, label: 'Grocery', icon: 'assets/categories.svg' },
    { id: 2, label: 'Mobiles', icon: 'assets/categories.svg' },
    { id: 3, label: 'Fashion', icon: 'assets/categories.svg' },
    { id: 4, label: 'Electronics', icon: 'assets/categories.svg' },
    { id: 5, label: 'Home', icon: 'assets/categories.svg' }
];

export const getProducts = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(products);
        }, 500);
    });
};

export const getCategories = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(categories);
        }, 500);
    });
};

export default {
    getProducts,
    getCategories
};