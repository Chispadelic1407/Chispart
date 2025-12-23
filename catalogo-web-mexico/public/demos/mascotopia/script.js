// Product Data
const products = {
    1: { name: 'Alimento Premium Perros', price: 599, emoji: '🦴', category: 'alimentos' },
    2: { name: 'Arena para Gatos', price: 299, emoji: '🐱', category: 'higiene' },
    3: { name: 'Juguete Interactivo', price: 199, emoji: '🎾', category: 'juguetes' },
    4: { name: 'Cama para Mascotas', price: 899, emoji: '🛏️', category: 'accesorios' },
    5: { name: 'Collar con GPS', price: 1299, emoji: '📍', category: 'accesorios' },
    6: { name: 'Snacks Naturales', price: 149, emoji: '🍖', category: 'alimentos' },
    7: { name: 'Peluche Resistente', price: 249, emoji: '🧸', category: 'juguetes' },
    8: { name: 'Shampoo Premium', price: 179, emoji: '🧴', category: 'higiene' }
};

// Cart Management
let cart = JSON.parse(localStorage.getItem('mascotopiaCart')) || {};

function addToCart(productId) {
    if (cart[productId]) {
        cart[productId].quantity++;
    } else {
        cart[productId] = {
            ...products[productId],
            quantity: 1
        };
    }
    saveCart();
    updateCartDisplay();
    showNotification('Producto agregado al carrito');
}

function removeFromCart(productId) {
    delete cart[productId];
    saveCart();
    updateCartDisplay();
}

function updateQuantity(productId, change) {
    if (cart[productId]) {
        cart[productId].quantity += change;
        if (cart[productId].quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartDisplay();
        }
    }
}

function clearCart() {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        cart = {};
        saveCart();
        updateCartDisplay();
        showNotification('Carrito vaciado');
    }
}

function saveCart() {
    localStorage.setItem('mascotopiaCart', JSON.stringify(cart));
}

function updateCartDisplay() {
    const cartList = document.getElementById('cartItemsList');
    const cartKeys = Object.keys(cart);
    
    if (cartKeys.length === 0) {
        cartList.innerHTML = `
            <div class="empty-cart">
                <div class="empty-icon">🛒</div>
                <p>Tu carrito está vacío</p>
                <p class="empty-subtitle">Agrega productos desde el catálogo</p>
            </div>
        `;
    } else {
        cartList.innerHTML = cartKeys.map(id => {
            const item = cart[id];
            return `
                <div class="cart-item">
                    <div class="cart-item-image">${item.emoji}</div>
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p class="cart-item-price">${item.price.toFixed(2)}</p>
                    </div>
                    <div class="cart-item-controls">
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="updateQuantity(${id}, -1)">−</button>
                            <span class="quantity-value">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${id}, 1)">+</button>
                        </div>
                        <button class="remove-btn" onclick="removeFromCart(${id})">🗑️</button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    updateCartSummary();
}

function updateCartSummary() {
    const subtotal = Object.values(cart).reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 99 : 0;
    const tax = subtotal * 0.16;
    const total = subtotal + shipping + tax;
    
    document.getElementById('cartSubtotal').textContent = `${subtotal.toFixed(2)}`;
    document.getElementById('cartShipping').textContent = `${shipping.toFixed(2)}`;
    document.getElementById('cartTax').textContent = `${tax.toFixed(2)}`;
    document.getElementById('cartTotal').textContent = `${total.toFixed(2)}`;
}

function proceedToCheckout() {
    if (Object.keys(cart).length === 0) {
        showNotification('Tu carrito está vacío', 'error');
        return;
    }
    showNotification('Redirigiendo al checkout...', 'success');
    setTimeout(() => {
        alert('Demo de checkout - En una aplicación real, esto te llevaría al proceso de pago');
    }, 1000);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Category Filtering
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const category = this.dataset.category;
        document.querySelectorAll('.product-card').forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Initialize cart display on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animate on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .product-card, .checkout-step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});
