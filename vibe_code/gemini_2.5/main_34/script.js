document.addEventListener('DOMContentLoaded', () => {
    // --- Constants and Global State ---
    const PRODUCTS_PER_PAGE = 8;
    let allProducts = [];
    let filteredProducts = [];
    let cart = JSON.parse(localStorage.getItem('flipkartCart')) || [];
    let currentPage = 1;
    let currentSearchTerm = '';

    // --- DOM Elements ---
    const productContainer = document.getElementById('product-container');
    const paginationContainer = document.getElementById('pagination-container');
    const cartCountSpan = document.getElementById('cart-count');
    const cartIcon = document.getElementById('cart-icon');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCartSidebarBtn = document.getElementById('close-cart-sidebar');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalAmountSpan = document.getElementById('cart-total-amount');
    const checkoutButton = document.getElementById('checkout-button');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    const productDetailModal = document.getElementById('product-detail-modal');
    const closeProductDetailModalBtn = document.getElementById('close-product-detail-modal');
    const modalProductImage = document.getElementById('modal-product-image');
    const modalProductName = document.getElementById('modal-product-name');
    const modalProductPrice = document.getElementById('modal-product-price');
    const modalProductDescription = document.getElementById('modal-product-description');
    const modalAddToCartBtn = document.getElementById('modal-add-to-cart');

    // --- Simulated Product Data ---
    const mockProducts = [
        { id: 1, name: 'Samsung Galaxy F13 (Waterfall Blue, 64 GB)', price: 9499, image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/0/y/c/-original-imaghjfz6gq4hgp3.jpeg?q=70', description: '6 GB RAM | 64 GB ROM | Expandable Upto 1 TB, 16.76 cm (6.6 inch) Full HD+ Display, 50MP + 5MP + 2MP | 8MP Front Camera, 6000 mAh Lithium Ion Battery, Exynos 850 Processor.' },
        { id: 2, name: 'realme C53 (Champion Gold, 128 GB)', price: 9999, image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/h/h/d/-original-imagtfnz8dpkgu8k.jpeg?q=70', description: '6 GB RAM | 128 GB ROM | Expandable Upto 2 TB, 17.07 cm (6.72 inch) Full HD+ Display, 108MP + 2MP | 8MP Front Camera, 5000 mAh Battery, T612 Processor.' },
        { id: 3, name: 'APPLE iPhone 14 (Midnight, 128 GB)', price: 69999, image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/9/e/e/-original-imaghx9q5rvcdpba.jpeg?q=70', description: '128 GB ROM, 15.49 cm (6.1 inch) Super Retina XDR Display, 12MP + 12MP | 12MP Front Camera, A15 Bionic Chip, 6 Core Processor.' },
        { id: 4, name: 'Noise ColorFit Pulse 3 Smart Watch', price: 1799, image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/smartwatch/q/b/j/-original-imagsy62g98gkh3h.jpeg?q=70', description: '1.85" Display, Bluetooth Calling, 100 Sports Modes, IP68 Waterproof, 7-Day Battery Life.' },
        { id: 5, name: 'boAt Airdopes 141 Bluetooth Headset', price: 1299, image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/s/a/b/-original-imags378f9y53g5k.jpeg?q=70', description: 'Up to 42 Hours Playback, ENx Tech, ASAP Charge, IWP Technology, IPX4 Water Resistant.' },
        { id: 6, name: 'HP 15s-fq5007TU Laptop (Core i3 12th Gen)', price: 39990, image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/computer/m/j/s/-original-imagg367y222y3yq.jpeg?q=70', description: 'Intel Core i3 12th Gen - (8 GB/512 GB SSD/Windows 11 Home) 15s-fq5007TU Thin and Light Laptop.' },
        { id: 7, name: 'Canon EOS 3000D DSLR Camera Body', price: 35999, image: 'https://rukminim2.flixcart.com/image/312/312/jfbfde80/camera/n/u/a/canon-eos-3000d-dslr-original-imaf3t5k9tzrmzns.jpeg?q=70', description: '18MP APS-C CMOS Sensor, DIGIC 4+ Image Processor, Full HD 1080p Video Recording at 30 fps.' },
        { id: 8, name: 'LG 80 cm (32 inch) HD Ready Smart LED TV', price: 14999, image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/television/s/u/v/-original-imagt3h42y2g3y5g.jpeg?q=70', description: 'WebOS Smart TV, Active HDR, AI ThinQ, Built-in Google Assistant & Alexa.' },
        { id: 9, name: 'Pigeon by Stovekraft Amaze Plus Induction Cooktop', price: 1699, image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/induction-cook-top/w/o/y/-original-imagsz8y93b4qg9h.jpeg?q=70', description: '1800 W, Push Button, Black, 1 Year Warranty.' },
        { id: 10, name: 'Bajaj Rex 500 W Mixer Grinder (White, 3 Jars)', price: 2199, image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/mixer-grinder-juicer/v/c/m/-original-imagsz8y93b4qg9h.jpeg?q=70', description: '500 W Power, 3 Stainless Steel Jars, Multi-functional Blade System.' },
        { id: 11, name: 'Amazon Echo Dot (4th Gen) Smart Speaker', price: 3499, image: 'https://rukminim2.flixcart.com/image/612/612/kflikcw0/smart-speaker/v/f/e/echo-dot-4th-gen-amazon-original-imafwygz8h4z3f7z.jpeg?q=70', description: 'Our most popular smart speaker with Alexa. The sleek, compact design delivers crisp vocals and balanced bass for full sound.' },
        { id: 12, name: 'Fire-Boltt Visionary Smartwatch', price: 1999, image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/smartwatch/f/q/e/-original-imaghx9q5rvcdpba.jpeg?q=70', description: '1.78" AMOLED Display, Bluetooth Calling, 100+ Sports Modes, SpO2 Monitoring.' },
        { id: 13, name: 'MI 3i 20000 mAh Power Bank', price: 1899, image: 'https://rukminim2.flixcart.com/image/612/612/kflikcw0/power-bank/v/f/e/mi-3i-20000-mah-original-imafwygz8h4z3f7z.jpeg?q=70', description: '20000 mAh Lithium Polymer Battery, 18W Fast Charging, Triple Port Output.' },
        { id: 14, name: 'Philips HD9200/90 Air Fryer', price: 6999, image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/air-fryer/e/c/r/-original-imagsz8y93b4qg9h.jpeg?q=70', description: 'Rapid Air Technology, 4.1 Litre Capacity, 0.8 kg Frying Basket, Black.' },
        { id: 15, name: 'Prestige IRIS Plus 750 W Mixer Grinder', price: 2999, image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/mixer-grinder-juicer/v/c/m/-original-imagsz8y93b4qg9h.jpeg?q=70', description: '750 W Power, 4 Super Efficient Blades, 3 Stainless Steel Jars, White & Blue.' }
    ];

    // --- Functions ---

    function saveCart() {
        localStorage.setItem('flipkartCart', JSON.stringify(cart));
    }

    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountSpan.textContent = totalItems;
    }

    function renderProducts(productsToRender, page = 1) {
        productContainer.innerHTML = ''; // Clear existing products
        const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
        const endIndex = startIndex + PRODUCTS_PER_PAGE;
        const productsOnPage = productsToRender.slice(startIndex, endIndex);

        if (productsOnPage.length === 0) {
            productContainer.innerHTML = '<p style="text-align: center; width: 100%;">No products found matching your criteria.</p>';
            return;
        }

        productsOnPage.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.dataset.productId = product.id;
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-card-image">
                <h3 class="product-card-name">${product.name}</h3>
                <p class="product-card-price">₹${product.price.toLocaleString('en-IN')}</p>
                <button class="add-to-cart-button" data-product-id="${product.id}">Add to Cart</button>
            `;
            productContainer.appendChild(productCard);
        });

        // Attach event listeners for 'Add to Cart' buttons
        productContainer.querySelectorAll('.add-to-cart-button').forEach(button => {
            button.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent product card click event
                const productId = parseInt(event.target.dataset.productId);
                addToCart(productId);
            });
        });

        // Attach event listeners for product card clicks (to show details)
        productContainer.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', (event) => {
                const productId = parseInt(event.currentTarget.dataset.productId);
                showProductDetail(productId);
            });
        });
    }

    function renderPagination(productsToPaginate) {
        paginationContainer.innerHTML = ''; // Clear existing pagination
        const totalPages = Math.ceil(productsToPaginate.length / PRODUCTS_PER_PAGE);

        if (totalPages <= 1) return; // No pagination needed for 1 or less pages

        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderProducts(productsToPaginate, currentPage);
                renderPagination(productsToPaginate);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
        paginationContainer.appendChild(prevButton);

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            if (i === currentPage) {
                pageButton.classList.add('active');
            }
            pageButton.addEventListener('click', () => {
                currentPage = i;
                renderProducts(productsToPaginate, currentPage);
                renderPagination(productsToPaginate);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            paginationContainer.appendChild(pageButton);
        }

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderProducts(productsToPaginate, currentPage);
                renderPagination(productsToPaginate);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
        paginationContainer.appendChild(nextButton);
    }

    function addToCart(productId, quantity = 1) {
        const product = allProducts.find(p => p.id === productId);
        if (!product) return;

        const existingCartItem = cart.find(item => item.id === productId);

        if (existingCartItem) {
            existingCartItem.quantity += quantity;
        } else {
            cart.push({ ...product, quantity });
        }

        saveCart();
        renderCart();
        updateCartCount();
        // Optionally show a notification or open cart sidebar
        if (!cartSidebar.classList.contains('visible')) {
            toggleCartSidebar();
        }
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        renderCart();
        updateCartCount();
    }

    function updateCartItemQuantity(productId, newQuantity) {
        const item = cart.find(i => i.id === productId);
        if (item) {
            item.quantity = Math.max(1, newQuantity); // Ensure quantity is at least 1
            saveCart();
            renderCart();
            updateCartCount();
        }
    }

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let totalAmount = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align: center; padding: 20px;">Your cart is empty.</p>';
            cartTotalAmountSpan.textContent = '₹0.00';
            return;
        }

        cart.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <p class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</p>
                    <div class="cart-item-actions">
                        <input type="number" class="cart-item-quantity" value="${item.quantity}" min="1" data-product-id="${item.id}">
                        <button class="remove-from-cart-button" data-product-id="${item.id}">Remove</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
            totalAmount += item.price * item.quantity;
        });

        cartTotalAmountSpan.textContent = `₹${totalAmount.toLocaleString('en-IN')}`;

        // Attach event listeners for quantity change and remove buttons
        cartItemsContainer.querySelectorAll('.cart-item-quantity').forEach(input => {
            input.addEventListener('change', (event) => {
                const productId = parseInt(event.target.dataset.productId);
                const newQuantity = parseInt(event.target.value);
                updateCartItemQuantity(productId, newQuantity);
            });
        });

        cartItemsContainer.querySelectorAll('.remove-from-cart-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = parseInt(event.target.dataset.productId);
                removeFromCart(productId);
            });
        });
    }

    function showProductDetail(productId) {
        const product = allProducts.find(p => p.id === productId);
        if (!product) return;

        modalProductImage.src = product.image;
        modalProductImage.alt = product.name;
        modalProductName.textContent = product.name;
        modalProductPrice.textContent = `₹${product.price.toLocaleString('en-IN')}`;
        modalProductDescription.textContent = product.description;
        modalAddToCartBtn.dataset.productId = product.id; // Set product ID for add to cart button

        productDetailModal.classList.remove('hidden');
    }

    function toggleCartSidebar() {
        cartSidebar.classList.toggle('visible');
    }

    function closeModal(modalElement) {
        modalElement.classList.add('hidden');
    }

    function handleSearch() {
        currentSearchTerm = searchInput.value.toLowerCase().trim();
        if (currentSearchTerm) {
            filteredProducts = allProducts.filter(product =>
                product.name.toLowerCase().includes(currentSearchTerm) ||
                product.description.toLowerCase().includes(currentSearchTerm)
            );
        } else {
            filteredProducts = [...allProducts]; // Reset to all products if search is empty
        }
        currentPage = 1; // Reset to first page on new search
        renderProducts(filteredProducts, currentPage);
        renderPagination(filteredProducts);
    }

    // --- Event Listeners ---
    cartIcon.addEventListener('click', toggleCartSidebar);
    closeCartSidebarBtn.addEventListener('click', toggleCartSidebar);
    closeProductDetailModalBtn.addEventListener('click', () => closeModal(productDetailModal));

    modalAddToCartBtn.addEventListener('click', (event) => {
        const productId = parseInt(event.target.dataset.productId);
        addToCart(productId);
        closeModal(productDetailModal);
    });

    checkoutButton.addEventListener('click', () => {
        if (cart.length > 0) {
            alert('Proceeding to checkout! Total: ' + cartTotalAmountSpan.textContent);
            cart = []; // Clear cart after checkout
            saveCart();
            renderCart();
            updateCartCount();
            toggleCartSidebar();
        } else {
            alert('Your cart is empty. Add some items before checking out.');
        }
    });

    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });
    searchButton.addEventListener('click', handleSearch);

    // Close modals when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === productDetailModal) {
            closeModal(productDetailModal);
        }
    });

    // --- Initialization ---
    function init() {
        allProducts = mockProducts; // In a real app, this would be fetched from an API
        filteredProducts = [...allProducts]; // Initially, all products are filtered products
        renderProducts(filteredProducts, currentPage);
        renderPagination(filteredProducts);
        renderCart();
        updateCartCount();
    }

    init();
});
