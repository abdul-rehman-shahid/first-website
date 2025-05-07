// Shopping Cart System
let cart = [];
let cartCount = 0;
const cartModal = document.getElementById('cart-modal');
const closeBtn = document.querySelector('.close');
const cartIcon = document.querySelector('.cart-icon');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

// Add event listeners to cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
});

cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'block';
    updateCartDisplay();
});

closeBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Filter functionality
const categoryFilter = document.getElementById('category-filter');
const minPrice = document.getElementById('min-price');
const maxPrice = document.getElementById('max-price');
const searchBox = document.getElementById('search-box');

function filterProducts() {
    const category = categoryFilter.value;
    const min = minPrice.value ? parseFloat(minPrice.value) : 0;
    const max = maxPrice.value ? parseFloat(maxPrice.value) : Infinity;
    const search = searchBox.value.toLowerCase();

    document.querySelectorAll('.product-card').forEach(card => {
        const price = parseFloat(card.querySelector('.price').textContent.replace('$', ''));
        const title = card.querySelector('h3').textContent.toLowerCase();
        const isVisible = 
            (category === 'all' || card.classList.contains(category)) &&
            price >= min && price <= max &&
            title.includes(search);

        card.style.display = isVisible ? 'block' : 'none';
    });
}

categoryFilter.addEventListener('change', filterProducts);
minPrice.addEventListener('input', filterProducts);
maxPrice.addEventListener('input', filterProducts);
searchBox.addEventListener('input', filterProducts);

// Cart functionality
function addToCart(e) {
    const productCard = e.target.closest('.product-card');
    const product = {
        id: e.target.dataset.id,
        name: productCard.querySelector('h3').textContent,
        price: parseFloat(productCard.querySelector('.price').textContent.replace('$', '')),
        image: productCard.querySelector('.product-image').src,
        quantity: 1
    };

    // Check if product already exists in cart
    const existingProduct = cart.find(p => p.id === product.id);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push(product);
    }

    cartCount++;
    updateCartCount();
    updateCartDisplay();
    showNotification('Product added to cart!');
}

function updateCartCount() {
    document.getElementById('cart-count').textContent = cartCount;
}

function updateCartDisplay() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(product => {
        const item = document.createElement('div');
        item.className = 'cart-item';
        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="item-details">
                <h3>${product.name}</h3>
                <p class="price">$${product.price}</p>
                <div class="quantity-controls">
                    <button onclick="decreaseQuantity(${product.id})">-</button>
                    <span>${product.quantity}</span>
                    <button onclick="increaseQuantity(${product.id})">+</button>
                </div>
                <button onclick="removeFromCart(${product.id})" class="remove">Remove</button>
            </div>
        `;
        cartItems.appendChild(item);
        total += product.price * product.quantity;
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Quantity controls
function increaseQuantity(productId) {
    const product = cart.find(p => p.id === productId);
    if (product) {
        product.quantity++;
        updateCartDisplay();
    }
}

function decreaseQuantity(productId) {
    const product = cart.find(p => p.id === productId);
    if (product && product.quantity > 1) {
        product.quantity--;
        updateCartDisplay();
    }
}

function removeFromCart(productId) {
    const index = cart.findIndex(p => p.id === productId);
    if (index !== -1) {
        cartCount -= cart[index].quantity;
        cart.splice(index, 1);
        updateCartCount();
        updateCartDisplay();
        showNotification('Product removed from cart!');
    }
}

// Checkout functionality
checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        alert('Thank you for your purchase!');
        cart = [];
        cartCount = 0;
        updateCartCount();
        updateCartDisplay();
        cartModal.style.display = 'none';
    } else {
        alert('Your cart is empty!');
    }
});
