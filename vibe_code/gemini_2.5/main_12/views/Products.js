export const Products = (products, state) => {
  const { currentPage, itemsPerPage, filter } = state;

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(filter.toLowerCase()) || 
    p.category.toLowerCase().includes(filter.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const renderStars = (rating) => {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars += '<span class="star filled">★</span>';
      } else if (i - 0.5 <= rating) {
        stars += '<span class="star half">★</span>';
      } else {
        stars += '<span class="star">☆</span>';
      }
    }
    return stars;
  };

  const productCards = paginatedProducts.map(product => `
    <div class="product-card">
      <div class="product-image-placeholder">${product.category.slice(0,1)}</div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-category">${product.category}</p>
        <div class="product-rating">
          ${renderStars(product.rating)} (${product.rating})
        </div>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <button class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
      </div>
    </div>
  `).join('');

  const paginationControls = () => {
    if (totalPages <= 1) return '';
    let controls = '<div class="pagination">';
    for (let i = 1; i <= totalPages; i++) {
      controls += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }
    controls += '</div>';
    return controls;
  };

  const view = `
    <section class="products-page">
      <h1 class="page-title">Our Products</h1>
      <div class="products-container">
        ${productCards.length > 0 ? productCards : '<p>No products found.</p>'}
      </div>
      ${paginationControls()}
    </section>
  `;

  return view;
};