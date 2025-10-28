export const Cart = (cart, allProducts) => {
  if (Object.keys(cart).length === 0) {
    return `
      <section class="cart-page">
        <h1 class="page-title">Your Cart</h1>
        <div class="cart-empty">
          <p>Your cart is empty.</p>
          <a href="#products" class="btn btn-primary">Continue Shopping</a>
        </div>
      </section>
    `;
  }

  let subtotal = 0;
  const cartItemsHtml = Object.entries(cart).map(([id, quantity]) => {
    const product = allProducts.find(p => p.id === parseInt(id));
    if (!product) return '';
    const itemTotal = product.price * quantity;
    subtotal += itemTotal;
    return `
      <div class="cart-item" data-product-id="${id}">
        <div class="cart-item-info">
          <h4>${product.name}</h4>
          <p>$${product.price.toFixed(2)}</p>
        </div>
        <div class="cart-item-controls">
          <button class="quantity-btn decrease-quantity" data-product-id="${id}">-</button>
          <span class="item-quantity">${quantity}</span>
          <button class="quantity-btn increase-quantity" data-product-id="${id}">+</button>
        </div>
        <div class="cart-item-total">$${itemTotal.toFixed(2)}</div>
        <button class="remove-item-btn" data-product-id="${id}">×</button>
      </div>
    `;
  }).join('');

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const view = `
    <section class="cart-page">
      <h1 class="page-title">Your Shopping Cart</h1>
      <div class="cart-container">
        <div class="cart-items">
          ${cartItemsHtml}
        </div>
        <div class="cart-summary">
          <h3>Order Summary</h3>
          <div class="summary-row">
            <span>Subtotal</span>
            <span>$${subtotal.toFixed(2)}</span>
          </div>
          <div class="summary-row">
            <span>Tax (8%)</span>
            <span>$${tax.toFixed(2)}</span>
          </div>
          <hr>
          <div class="summary-row total">
            <span>Total</span>
            <span>$${total.toFixed(2)}</span>
          </div>
          <button class="btn btn-primary checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </section>
  `;
  return view;
};