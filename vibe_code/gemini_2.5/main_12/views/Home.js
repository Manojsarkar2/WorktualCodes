export const Home = () => {
  const view = `
    <section class="hero">
      <div class="hero-content">
        <h1>Great Offers, Unmatched Value</h1>
        <p>Discover the best deals on millions of products. Your one-stop shop for everything you need.</p>
        <a href="#products" class="btn btn-primary">Shop Now</a>
      </div>
    </section>
    <section class="featured-categories">
      <h2 class="section-title">Shop by Category</h2>
      <div class="category-grid">
        <div class="category-card">
          <div class="category-icon">📱</div>
          <h3>Electronics</h3>
        </div>
        <div class="category-card">
          <div class="category-icon">👕</div>
          <h3>Fashion</h3>
        </div>
        <div class="category-card">
          <div class="category-icon">🏠</div>
          <h3>Home & Kitchen</h3>
        </div>
        <div class="category-card">
          <div class="category-icon">📚</div>
          <h3>Books</h3>
        </div>
      </div>
    </section>
    <section class="promo-section">
        <div class="promo-content">
            <h2>Deals of the Day</h2>
            <p>Hurry, limited time offers on your favorite brands!</p>
            <a href="#products" class="btn btn-secondary">View Deals</a>
        </div>
    </section>
  `;
  return view;
};