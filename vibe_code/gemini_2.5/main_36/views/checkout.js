export const Checkout = () => `
    <div class="contact-form-container">
        <h2>Checkout</h2>
        <p class="text-center mb-20">Please fill in your details to complete the purchase.</p>
        <form id="checkout-form">
            <h3>Shipping Address</h3>
            <label for="fullname">Full Name:</label>
            <input type="text" id="fullname" name="fullname" required>

            <label for="address1">Address Line 1:</label>
            <input type="text" id="address1" name="address1" required>

            <label for="address2">Address Line 2 (Optional):</label>
            <input type="text" id="address2" name="address2">

            <label for="city">City:</label>
            <input type="text" id="city" name="city" required>

            <label for="state">State:</label>
            <input type="text" id="state" name="state" required>

            <label for="zip">Zip Code:</label>
            <input type="text" id="zip" name="zip" required>

            <h3 class="mt-30">Payment Information</h3>
            <label for="card-number">Card Number:</label>
            <input type="text" id="card-number" name="cardNumber" placeholder="XXXX XXXX XXXX XXXX" required>

            <label for="expiry-date">Expiry Date (MM/YY):</label>
            <input type="text" id="expiry-date" name="expiryDate" placeholder="MM/YY" required>

            <label for="cvv">CVV:</label>
            <input type="text" id="cvv" name="cvv" placeholder="XXX" required>

            <button type="submit">Place Order</button>
        </form>
    </div>
`;