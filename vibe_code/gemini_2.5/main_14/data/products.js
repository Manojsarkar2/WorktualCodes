const products = [
    {
        id: 'p1',
        name: 'Velvet Rose Bouquet',
        price: 59.99,
        description: 'A classic dozen of deep red roses, perfect for romance.',
        category: 'bouquets',
        featured: true
    },
    {
        id: 'p2',
        name: 'Sunny Day Lilies',
        price: 45.50,
        description: 'Bright yellow lilies to bring sunshine into any room.',
        category: 'bouquets',
        featured: true
    },
    {
        id: 'p3',
        name: 'Pastel Dream Arrangement',
        price: 75.00,
        description: 'A gentle mix of pastel-colored seasonal flowers in a ceramic vase.',
        category: 'arrangements',
        featured: true
    },
    {
        id: 'p4',
        name: 'Orchid Elegance',
        price: 65.00,
        description: 'A stunning potted white Phalaenopsis orchid.',
        category: 'plants',
        featured: false
    },
    {
        id: 'p5',
        name: 'Wildflower Garden Mix',
        price: 52.99,
        description: 'A vibrant and rustic bouquet of assorted wildflowers.',
        category: 'bouquets',
        featured: false
    },
    {
        id: 'p6',
        name: 'Zen Succulent Garden',
        price: 48.00,
        description: 'A low-maintenance arrangement of various succulents in a modern pot.',
        category: 'plants',
        featured: true
    },
    {
        id: 'p7',
        name: 'Tulip Celebration',
        price: 49.99,
        description: 'A cheerful bunch of colorful tulips, perfect for spring.',
        category: 'bouquets',
        featured: false
    }
];

export const getProducts = () => products;
export const getFeaturedProducts = () => products.filter(p => p.featured);