// Product Data
const products = [
    {
        id: 1,
        name: "Laptop Pro 15\"",
        category: "electronics",
        price: 24999,
        description: "Laptop profesional con procesador Intel i7, 16GB RAM, 512GB SSD",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
        features: ["Intel Core i7", "16GB RAM", "512GB SSD", "15.6\" Full HD", "Windows 11 Pro"]
    },
    {
        id: 2,
        name: "Smartphone X Pro",
        category: "electronics",
        price: 15999,
        description: "Smartphone de última generación con cámara de 108MP y 5G",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
        features: ["Cámara 108MP", "5G", "128GB Storage", "6.7\" AMOLED", "Batería 5000mAh"]
    },
    {
        id: 3,
        name: "Auriculares Pro",
        category: "electronics",
        price: 3499,
        description: "Auriculares inalámbricos con cancelación de ruido activa",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
        features: ["Cancelación de ruido", "Bluetooth 5.0", "30h batería", "Audio Hi-Fi", "Micrófono integrado"]
    },
    {
        id: 4,
        name: "Smartwatch Ultra",
        category: "electronics",
        price: 8999,
        description: "Reloj inteligente con monitoreo de salud y GPS integrado",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
        features: ["Monitor cardíaco", "GPS", "Resistente al agua", "7 días batería", "Pantalla OLED"]
    },
    {
        id: 5,
        name: "Camiseta Premium",
        category: "fashion",
        price: 599,
        description: "Camiseta de algodón 100% orgánico, diseño moderno",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
        features: ["Algodón orgánico", "Tallas S-XXL", "Varios colores", "Diseño exclusivo", "Lavable a máquina"]
    },
    {
        id: 6,
        name: "Jeans Clásicos",
        category: "fashion",
        price: 899,
        description: "Jeans de mezclilla premium con corte moderno",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop",
        features: ["Mezclilla premium", "Corte slim fit", "Tallas 28-40", "Azul clásico", "Resistente"]
    },
    {
        id: 7,
        name: "Zapatillas Running",
        category: "sports",
        price: 1899,
        description: "Zapatillas deportivas con tecnología de amortiguación avanzada",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
        features: ["Amortiguación avanzada", "Transpirable", "Suela antideslizante", "Ligeras", "Varios colores"]
    },
    {
        id: 8,
        name: "Mochila Deportiva",
        category: "sports",
        price: 799,
        description: "Mochila resistente al agua con múltiples compartimentos",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
        features: ["Resistente al agua", "30L capacidad", "Compartimento laptop", "Ergonómica", "Garantía 2 años"]
    },
    {
        id: 9,
        name: "Lámpara LED Moderna",
        category: "home",
        price: 1299,
        description: "Lámpara de escritorio LED con control táctil y regulador",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop",
        features: ["LED eficiente", "Control táctil", "3 niveles brillo", "Diseño moderno", "Bajo consumo"]
    },
    {
        id: 10,
        name: "Cojines Decorativos",
        category: "home",
        price: 399,
        description: "Set de 2 cojines decorativos con diseños modernos",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
        features: ["Set de 2", "45x45cm", "Funda lavable", "Relleno suave", "Varios diseños"]
    },
    {
        id: 11,
        name: "Tablet Pro 11\"",
        category: "electronics",
        price: 12999,
        description: "Tablet profesional con stylus incluido y pantalla de alta resolución",
        image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=300&fit=crop",
        features: ["11\" Retina", "Stylus incluido", "128GB", "WiFi + Cellular", "12h batería"]
    },
    {
        id: 12,
        name: "Chaqueta Impermeable",
        category: "fashion",
        price: 1499,
        description: "Chaqueta deportiva impermeable con capucha ajustable",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
        features: ["Impermeable", "Transpirable", "Capucha ajustable", "Bolsillos con cierre", "Ligera"]
    }
];

// Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartCount();
    setupEventListeners();
});

// Render Products
function renderProducts(filter = 'all') {
    const grid = document.getElementById('productsGrid');
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(p => p.category === filter);

    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card glass" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <div class="product-price">$${product.price.toLocaleString()} MXN</div>
                    <button class="btn-add-cart" onclick="addToCart(${product.id}); event.stopPropagation();">
                        Agregar
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Add click event to product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', () => {
            const productId = parseInt(card.dataset.id);
            showProductDetail(productId);
        });
    });
}

function getCategoryName(category) {
    const names = {
        electronics: 'Electrónica',
        fashion: 'Moda',
        home: 'Hogar',
        sports: 'Deportes'
    };
    return names[category] || category;
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartCount();
    showNotification('Producto agregado al carrito');
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    renderCart();
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            renderCart();
        }
    }
}

// Save Cart
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update Cart Count
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

// Render Cart
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Tu carrito está vacío</div>';
        document.getElementById('cartTotal').textContent = '$0.00 MXN';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toLocaleString()} MXN</div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Eliminar</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartTotal').textContent = `$${total.toLocaleString()} MXN`;
}

// Show Product Detail
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    const modal = document.getElementById('productModal');
    const detail = document.getElementById('productDetail');

    detail.innerHTML = `
        <div class="product-detail-grid">
            <div>
                <img src="${product.image}" alt="${product.name}" class="product-detail-image">
            </div>
            <div class="product-detail-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h2>${product.name}</h2>
                <div class="product-detail-price">$${product.price.toLocaleString()} MXN</div>
                <p class="product-detail-description">${product.description}</p>
                <h3>Características:</h3>
                <ul class="product-detail-features">
                    ${product.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
                <button class="btn-primary" onclick="addToCart(${product.id}); closeProductModal();" style="width: 100%;">
                    <span>🛒 Agregar al Carrito</span>
                </button>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
}

// Setup Event Listeners
function setupEventListeners() {
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProducts(btn.dataset.category);
        });
    });

    // Cart modal
    document.getElementById('cartBtn').addEventListener('click', () => {
        renderCart();
        document.getElementById('cartModal').classList.add('active');
    });

    document.getElementById('closeCart').addEventListener('click', () => {
        document.getElementById('cartModal').classList.remove('active');
    });

    document.getElementById('closeProduct').addEventListener('click', closeProductModal);

    // Close modals on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        alert(`Demo: Procesando pago de $${total.toLocaleString()} MXN\n\nEn producción, aquí se integraría con Stripe para procesar el pago de forma segura.`);
        
        // Simulate successful checkout
        cart = [];
        saveCart();
        updateCartCount();
        document.getElementById('cartModal').classList.remove('active');
        showNotification('¡Compra realizada con éxito!');
    });
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
