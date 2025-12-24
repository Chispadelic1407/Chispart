// Sample products data
const products = [
    { id: 1, title: 'iPhone 13 Pro', category: 'electronica', price: 899, condition: 'usado', seller: 'Juan Pérez', rating: 4.8, image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400&h=300&fit=crop' },
    { id: 2, title: 'Sofá Moderno 3 Plazas', category: 'hogar', price: 450, condition: 'nuevo', seller: 'María García', rating: 4.9, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop' },
    { id: 3, title: 'Zapatillas Nike Air', category: 'moda', price: 120, condition: 'nuevo', seller: 'Carlos López', rating: 4.7, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop' },
    { id: 4, title: 'Bicicleta de Montaña', category: 'deportes', price: 350, condition: 'usado', seller: 'Ana Martínez', rating: 4.6, image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400&h=300&fit=crop' },
    { id: 5, title: 'MacBook Pro 2021', category: 'electronica', price: 1299, condition: 'usado', seller: 'Luis Hernández', rating: 4.9, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop' },
    { id: 6, title: 'Mesa de Comedor', category: 'hogar', price: 280, condition: 'nuevo', seller: 'Sofia Rodríguez', rating: 4.5, image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=300&fit=crop' },
    { id: 7, title: 'Chaqueta de Cuero', category: 'moda', price: 180, condition: 'usado', seller: 'Miguel Torres', rating: 4.8, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop' },
    { id: 8, title: 'Set de Pesas', category: 'deportes', price: 95, condition: 'nuevo', seller: 'Laura Sánchez', rating: 4.7, image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop' },
    { id: 9, title: 'Samsung Galaxy S22', category: 'electronica', price: 699, condition: 'nuevo', seller: 'Roberto Díaz', rating: 4.8, image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop' },
    { id: 10, title: 'Lámpara de Pie', category: 'hogar', price: 75, condition: 'nuevo', seller: 'Patricia Gómez', rating: 4.6, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop' },
    { id: 11, title: 'Reloj Inteligente', category: 'electronica', price: 250, condition: 'usado', seller: 'Diego Ruiz', rating: 4.7, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop' },
    { id: 12, title: 'Mochila Deportiva', category: 'deportes', price: 45, condition: 'nuevo', seller: 'Carmen Vega', rating: 4.5, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop' }
];

let filteredProducts = [...products];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});

// Render products
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="showProductDetail(${product.id})">
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-content">
                <span class="product-category">${getCategoryName(product.category)}</span>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">$${product.price}</div>
                <div class="product-seller">
                    <div class="seller-avatar">${product.seller.charAt(0)}</div>
                    <span class="seller-name">${product.seller}</span>
                </div>
                <div class="product-rating">
                    ${'⭐'.repeat(Math.floor(product.rating))}
                    <span>${product.rating}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function getCategoryName(category) {
    const names = {
        'electronica': 'Electrónica',
        'hogar': 'Hogar',
        'moda': 'Moda',
        'deportes': 'Deportes'
    };
    return names[category] || category;
}

// Filter products
function filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;
    const conditions = Array.from(document.querySelectorAll('.checkbox-group input:checked')).map(cb => cb.value);
    
    filteredProducts = products.filter(product => {
        const categoryMatch = category === 'all' || product.category === category;
        const priceMatch = product.price >= minPrice && product.price <= maxPrice;
        const conditionMatch = conditions.length === 0 || conditions.includes(product.condition);
        
        return categoryMatch && priceMatch && conditionMatch;
    });
    
    renderProducts();
}

function setMinRating(rating) {
    filteredProducts = products.filter(product => product.rating >= rating);
    renderProducts();
}

function clearFilters() {
    document.getElementById('categoryFilter').value = 'all';
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    document.querySelectorAll('.checkbox-group input').forEach(cb => cb.checked = false);
    filteredProducts = [...products];
    renderProducts();
}

// Sort products
function sortProducts() {
    const sortBy = document.getElementById('sortBy').value;
    
    switch(sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        default:
            filteredProducts.sort((a, b) => b.id - a.id);
    }
    
    renderProducts();
}

// Product detail
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const productDetail = document.getElementById('productDetail');
    productDetail.innerHTML = `
        <img src="${product.image}" alt="${product.title}" style="width: 100%; height: 400px; object-fit: cover; border-radius: 12px; margin-bottom: 20px;">
        <span class="product-category">${getCategoryName(product.category)}</span>
        <h2 style="color: var(--dark); font-size: 28px; margin: 15px 0;">${product.title}</h2>
        <div class="product-price" style="font-size: 36px; margin-bottom: 20px;">$${product.price}</div>
        
        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px; padding: 20px; background: #f8fafc; border-radius: 12px;">
            <div class="seller-avatar" style="width: 60px; height: 60px; font-size: 24px;">${product.seller.charAt(0)}</div>
            <div>
                <div style="font-weight: 600; color: var(--dark); margin-bottom: 5px;">${product.seller}</div>
                <div class="product-rating">
                    ${'⭐'.repeat(Math.floor(product.rating))}
                    <span>${product.rating}</span>
                </div>
            </div>
            <button class="btn-primary" style="margin-left: auto;" onclick="contactSeller()">Contactar Vendedor</button>
        </div>
        
        <div style="margin-bottom: 20px;">
            <h3 style="color: var(--dark); margin-bottom: 10px;">Descripción</h3>
            <p style="color: #64748b; line-height: 1.6;">
                Este producto está en excelente condición. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                quis nostrud exercitation ullamco laboris.
            </p>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 20px;">
            <div style="padding: 15px; background: #f8fafc; border-radius: 12px;">
                <div style="font-size: 14px; color: #64748b; margin-bottom: 5px;">Condición</div>
                <div style="font-weight: 600; color: var(--dark);">${product.condition === 'nuevo' ? 'Nuevo' : 'Usado'}</div>
            </div>
            <div style="padding: 15px; background: #f8fafc; border-radius: 12px;">
                <div style="font-size: 14px; color: #64748b; margin-bottom: 5px;">Ubicación</div>
                <div style="font-weight: 600; color: var(--dark);">Ciudad de México</div>
            </div>
        </div>
        
        <div style="display: flex; gap: 12px;">
            <button class="btn-primary" style="flex: 1;" onclick="buyNow()">Comprar Ahora</button>
            <button class="btn-secondary" style="flex: 1;" onclick="addToFavorites()">Agregar a Favoritos</button>
        </div>
    `;
    
    document.getElementById('productModal').classList.add('active');
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
}

function contactSeller() {
    closeProductModal();
    showChat();
}

function buyNow() {
    alert('Procesando compra...');
}

function addToFavorites() {
    alert('Producto agregado a favoritos');
}

// Chat functions
function showChat() {
    document.getElementById('chatModal').classList.add('active');
}

function closeChat() {
    document.getElementById('chatModal').classList.remove('active');
}

function openConversation(name) {
    document.getElementById('convName').textContent = name;
    document.getElementById('convAvatar').textContent = name.split(' ').map(n => n[0]).join('');
    closeChat();
    document.getElementById('conversationModal').classList.add('active');
}

function closeConversation() {
    document.getElementById('conversationModal').classList.remove('active');
}

function backToChats() {
    closeConversation();
    showChat();
}

function sendMessage() {
    const input = document.getElementById('messageText');
    const text = input.value.trim();
    
    if (!text) return;
    
    const messagesContainer = document.getElementById('messagesContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message sent';
    messageDiv.innerHTML = `
        <div class="message-content">${text}</div>
        <div class="message-time">${new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    input.value = '';
}

// Dashboard functions
function showDashboard() {
    document.getElementById('dashboardModal').classList.add('active');
    loadMyProducts();
}

function closeDashboard() {
    document.getElementById('dashboardModal').classList.remove('active');
}

function showTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(tab + 'Tab').classList.add('active');
}

function loadMyProducts() {
    const myProducts = document.getElementById('myProducts');
    const userProducts = products.slice(0, 3);
    
    myProducts.innerHTML = userProducts.map(product => `
        <div style="display: flex; gap: 15px; padding: 15px; background: #f8fafc; border-radius: 12px; margin-bottom: 12px;">
            <img src="${product.image}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
            <div style="flex: 1;">
                <h4 style="color: var(--dark); margin-bottom: 5px;">${product.title}</h4>
                <div style="color: var(--primary); font-weight: 600;">$${product.price}</div>
            </div>
            <button class="btn-secondary" style="width: auto; padding: 8px 16px; height: fit-content;">Editar</button>
        </div>
    `).join('');
}

// Publish product
function showPublishModal() {
    document.getElementById('publishModal').classList.add('active');
}

function closePublishModal() {
    document.getElementById('publishModal').classList.remove('active');
}

function publishProduct(event) {
    event.preventDefault();
    alert('¡Producto publicado exitosamente!');
    closePublishModal();
    event.target.reset();
}

// Close modals on outside click
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});
