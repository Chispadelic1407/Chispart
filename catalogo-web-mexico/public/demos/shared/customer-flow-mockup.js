/**
 * Universal Customer Flow Mockup System
 * Provides interactive shopping cart, checkout, and user journey flows
 * Can be customized per demo site
 */

class CustomerFlowMockup {
    constructor(config = {}) {
        this.config = {
            siteName: config.siteName || 'Demo Site',
            currency: config.currency || 'MXN',
            products: config.products || this.getDefaultProducts(),
            theme: config.theme || 'default',
            ...config
        };
        
        this.cart = [];
        this.currentStep = 'browse'; // browse, cart, checkout, confirmation
        this.init();
    }

    getDefaultProducts() {
        return [
            {
                id: 1,
                name: 'Producto Demo 1',
                price: 299,
                image: '🎁',
                category: 'General'
            },
            {
                id: 2,
                name: 'Producto Demo 2',
                price: 499,
                image: '📦',
                category: 'General'
            },
            {
                id: 3,
                name: 'Producto Demo 3',
                price: 799,
                image: '🎯',
                category: 'Premium'
            }
        ];
    }

    init() {
        this.createStyles();
        this.createFloatingCartButton();
        this.loadCartFromStorage();
    }

    createStyles() {
        if (document.getElementById('customer-flow-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'customer-flow-styles';
        styles.textContent = `
            .cf-floating-cart {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
                z-index: 9998;
                transition: all 0.3s ease;
                animation: pulse-cart 2s infinite;
            }

            .cf-floating-cart:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 30px rgba(102, 126, 234, 0.6);
            }

            .cf-floating-cart .cart-icon {
                font-size: 28px;
                filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
            }

            .cf-floating-cart .cart-badge {
                position: absolute;
                top: -5px;
                right: -5px;
                background: #ff4757;
                color: white;
                border-radius: 50%;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: bold;
                box-shadow: 0 2px 8px rgba(255, 71, 87, 0.4);
            }

            @keyframes pulse-cart {
                0%, 100% {
                    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
                }
                50% {
                    box-shadow: 0 4px 30px rgba(102, 126, 234, 0.6);
                }
            }

            .cf-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
                padding: 20px;
                overflow-y: auto;
            }

            .cf-modal {
                background: white;
                border-radius: 16px;
                max-width: 900px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                animation: slideUp 0.3s ease;
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .cf-modal-header {
                padding: 24px;
                border-bottom: 2px solid #f0f0f0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: sticky;
                top: 0;
                background: white;
                z-index: 10;
            }

            .cf-modal-header h2 {
                margin: 0;
                font-size: 24px;
                color: #333;
            }

            .cf-close-btn {
                background: none;
                border: none;
                font-size: 28px;
                color: #999;
                cursor: pointer;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
            }

            .cf-close-btn:hover {
                background: #f0f0f0;
                color: #333;
            }

            .cf-modal-body {
                padding: 24px;
            }

            .cf-steps {
                display: flex;
                justify-content: space-between;
                margin-bottom: 32px;
                position: relative;
            }

            .cf-steps::before {
                content: '';
                position: absolute;
                top: 20px;
                left: 0;
                right: 0;
                height: 2px;
                background: #e0e0e0;
                z-index: 0;
            }

            .cf-step {
                flex: 1;
                text-align: center;
                position: relative;
                z-index: 1;
            }

            .cf-step-circle {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: #e0e0e0;
                color: #999;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 8px;
                font-weight: bold;
                transition: all 0.3s ease;
            }

            .cf-step.active .cf-step-circle {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
            }

            .cf-step.completed .cf-step-circle {
                background: #4caf50;
                color: white;
            }

            .cf-step-label {
                font-size: 14px;
                color: #666;
                font-weight: 500;
            }

            .cf-step.active .cf-step-label {
                color: #667eea;
                font-weight: 600;
            }

            .cf-products-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 20px;
                margin-bottom: 24px;
            }

            .cf-product-card {
                border: 2px solid #f0f0f0;
                border-radius: 12px;
                padding: 20px;
                text-align: center;
                transition: all 0.3s ease;
                cursor: pointer;
            }

            .cf-product-card:hover {
                border-color: #667eea;
                box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
                transform: translateY(-4px);
            }

            .cf-product-image {
                font-size: 64px;
                margin-bottom: 12px;
            }

            .cf-product-name {
                font-size: 16px;
                font-weight: 600;
                color: #333;
                margin-bottom: 8px;
            }

            .cf-product-price {
                font-size: 20px;
                color: #667eea;
                font-weight: bold;
                margin-bottom: 12px;
            }

            .cf-add-to-cart-btn {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
                width: 100%;
            }

            .cf-add-to-cart-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
            }

            .cf-cart-items {
                margin-bottom: 24px;
            }

            .cf-cart-item {
                display: flex;
                align-items: center;
                padding: 16px;
                border: 2px solid #f0f0f0;
                border-radius: 12px;
                margin-bottom: 12px;
            }

            .cf-cart-item-image {
                font-size: 48px;
                margin-right: 16px;
            }

            .cf-cart-item-details {
                flex: 1;
            }

            .cf-cart-item-name {
                font-size: 16px;
                font-weight: 600;
                color: #333;
                margin-bottom: 4px;
            }

            .cf-cart-item-price {
                font-size: 18px;
                color: #667eea;
                font-weight: bold;
            }

            .cf-cart-item-quantity {
                display: flex;
                align-items: center;
                gap: 12px;
                margin-right: 16px;
            }

            .cf-qty-btn {
                width: 32px;
                height: 32px;
                border: 2px solid #667eea;
                background: white;
                color: #667eea;
                border-radius: 50%;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.3s ease;
            }

            .cf-qty-btn:hover {
                background: #667eea;
                color: white;
            }

            .cf-qty-value {
                font-weight: bold;
                min-width: 30px;
                text-align: center;
            }

            .cf-remove-btn {
                background: #ff4757;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
            }

            .cf-remove-btn:hover {
                background: #ff3838;
                transform: scale(1.05);
            }

            .cf-cart-summary {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 12px;
                margin-bottom: 24px;
            }

            .cf-summary-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 12px;
                font-size: 16px;
            }

            .cf-summary-row.total {
                font-size: 20px;
                font-weight: bold;
                color: #667eea;
                padding-top: 12px;
                border-top: 2px solid #e0e0e0;
            }

            .cf-form-group {
                margin-bottom: 20px;
            }

            .cf-form-group label {
                display: block;
                margin-bottom: 8px;
                font-weight: 600;
                color: #333;
            }

            .cf-form-group input,
            .cf-form-group select,
            .cf-form-group textarea {
                width: 100%;
                padding: 12px;
                border: 2px solid #e0e0e0;
                border-radius: 8px;
                font-size: 14px;
                transition: all 0.3s ease;
            }

            .cf-form-group input:focus,
            .cf-form-group select:focus,
            .cf-form-group textarea:focus {
                outline: none;
                border-color: #667eea;
                box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            }

            .cf-form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 16px;
            }

            .cf-modal-footer {
                padding: 24px;
                border-top: 2px solid #f0f0f0;
                display: flex;
                justify-content: space-between;
                gap: 12px;
                position: sticky;
                bottom: 0;
                background: white;
            }

            .cf-btn {
                padding: 14px 28px;
                border-radius: 8px;
                font-weight: 600;
                font-size: 16px;
                cursor: pointer;
                transition: all 0.3s ease;
                border: none;
            }

            .cf-btn-secondary {
                background: #f0f0f0;
                color: #666;
            }

            .cf-btn-secondary:hover {
                background: #e0e0e0;
            }

            .cf-btn-primary {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                flex: 1;
            }

            .cf-btn-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
            }

            .cf-success-icon {
                font-size: 80px;
                text-align: center;
                margin-bottom: 24px;
                animation: scaleIn 0.5s ease;
            }

            @keyframes scaleIn {
                from {
                    transform: scale(0);
                    opacity: 0;
                }
                to {
                    transform: scale(1);
                    opacity: 1;
                }
            }

            .cf-success-message {
                text-align: center;
                margin-bottom: 32px;
            }

            .cf-success-message h3 {
                font-size: 28px;
                color: #4caf50;
                margin-bottom: 12px;
            }

            .cf-success-message p {
                font-size: 16px;
                color: #666;
                line-height: 1.6;
            }

            .cf-order-details {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 12px;
                margin-bottom: 24px;
            }

            .cf-order-details h4 {
                margin-top: 0;
                margin-bottom: 16px;
                color: #333;
            }

            .cf-empty-cart {
                text-align: center;
                padding: 60px 20px;
            }

            .cf-empty-cart-icon {
                font-size: 80px;
                margin-bottom: 20px;
                opacity: 0.5;
            }

            .cf-empty-cart h3 {
                color: #666;
                margin-bottom: 12px;
            }

            .cf-empty-cart p {
                color: #999;
            }

            @media (max-width: 768px) {
                .cf-products-grid {
                    grid-template-columns: 1fr;
                }

                .cf-form-row {
                    grid-template-columns: 1fr;
                }

                .cf-cart-item {
                    flex-direction: column;
                    text-align: center;
                }

                .cf-cart-item-image {
                    margin-right: 0;
                    margin-bottom: 12px;
                }

                .cf-cart-item-quantity {
                    margin-right: 0;
                    margin-top: 12px;
                }

                .cf-modal-footer {
                    flex-direction: column;
                }

                .cf-floating-cart {
                    bottom: 20px;
                    right: 20px;
                    width: 50px;
                    height: 50px;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    createFloatingCartButton() {
        const button = document.createElement('div');
        button.className = 'cf-floating-cart';
        button.innerHTML = `
            <div class="cart-icon">🛒</div>
            <div class="cart-badge" style="display: none;">0</div>
        `;
        button.addEventListener('click', () => this.openCart());
        document.body.appendChild(button);
        this.cartButton = button;
        this.updateCartBadge();
    }

    updateCartBadge() {
        const badge = this.cartButton.querySelector('.cart-badge');
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        if (totalItems > 0) {
            badge.textContent = totalItems;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }

    addToCart(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        this.saveCartToStorage();
        this.updateCartBadge();
        this.showNotification(`${product.name} agregado al carrito`);
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCartToStorage();
        this.updateCartBadge();
    }

    updateQuantity(productId, change) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                this.saveCartToStorage();
            }
        }
    }

    saveCartToStorage() {
        localStorage.setItem('cf_cart', JSON.stringify(this.cart));
    }

    loadCartFromStorage() {
        const saved = localStorage.getItem('cf_cart');
        if (saved) {
            this.cart = JSON.parse(saved);
            this.updateCartBadge();
        }
    }

    getCartTotal() {
        return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    showNotification(message) {
        // Simple notification - can be enhanced
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4caf50;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    openCart() {
        this.currentStep = 'cart';
        this.renderModal();
    }

    renderModal() {
        // Remove existing modal if any
        const existing = document.querySelector('.cf-modal-overlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.className = 'cf-modal-overlay';
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.closeModal();
        });

        const modal = document.createElement('div');
        modal.className = 'cf-modal';
        modal.innerHTML = this.getModalContent();
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        this.attachModalEventListeners();
    }

    getModalContent() {
        const steps = [
            { id: 'browse', label: 'Productos', icon: '🛍️' },
            { id: 'cart', label: 'Carrito', icon: '🛒' },
            { id: 'checkout', label: 'Pago', icon: '💳' },
            { id: 'confirmation', label: 'Confirmación', icon: '✅' }
        ];

        let content = `
            <div class="cf-modal-header">
                <h2>${this.config.siteName} - ${this.getStepTitle()}</h2>
                <button class="cf-close-btn" onclick="window.customerFlow.closeModal()">×</button>
            </div>
            <div class="cf-modal-body">
                <div class="cf-steps">
                    ${steps.map(step => `
                        <div class="cf-step ${step.id === this.currentStep ? 'active' : ''} ${this.isStepCompleted(step.id) ? 'completed' : ''}">
                            <div class="cf-step-circle">${step.icon}</div>
                            <div class="cf-step-label">${step.label}</div>
                        </div>
                    `).join('')}
                </div>
                ${this.getStepContent()}
            </div>
            ${this.getModalFooter()}
        `;

        return content;
    }

    getStepTitle() {
        const titles = {
            browse: 'Explorar Productos',
            cart: 'Tu Carrito',
            checkout: 'Finalizar Compra',
            confirmation: '¡Pedido Confirmado!'
        };
        return titles[this.currentStep] || '';
    }

    isStepCompleted(stepId) {
        const order = ['browse', 'cart', 'checkout', 'confirmation'];
        const currentIndex = order.indexOf(this.currentStep);
        const stepIndex = order.indexOf(stepId);
        return stepIndex < currentIndex;
    }

    getStepContent() {
        switch (this.currentStep) {
            case 'browse':
                return this.getBrowseContent();
            case 'cart':
                return this.getCartContent();
            case 'checkout':
                return this.getCheckoutContent();
            case 'confirmation':
                return this.getConfirmationContent();
            default:
                return '';
        }
    }

    getBrowseContent() {
        return `
            <div class="cf-products-grid">
                ${this.config.products.map(product => `
                    <div class="cf-product-card">
                        <div class="cf-product-image">${product.image}</div>
                        <div class="cf-product-name">${product.name}</div>
                        <div class="cf-product-price">$${product.price.toLocaleString()} ${this.config.currency}</div>
                        <button class="cf-add-to-cart-btn" data-product-id="${product.id}">
                            Agregar al Carrito
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
    }

    getCartContent() {
        if (this.cart.length === 0) {
            return `
                <div class="cf-empty-cart">
                    <div class="cf-empty-cart-icon">🛒</div>
                    <h3>Tu carrito está vacío</h3>
                    <p>Agrega productos para continuar</p>
                </div>
            `;
        }

        return `
            <div class="cf-cart-items">
                ${this.cart.map(item => `
                    <div class="cf-cart-item">
                        <div class="cf-cart-item-image">${item.image}</div>
                        <div class="cf-cart-item-details">
                            <div class="cf-cart-item-name">${item.name}</div>
                            <div class="cf-cart-item-price">$${item.price.toLocaleString()} ${this.config.currency}</div>
                        </div>
                        <div class="cf-cart-item-quantity">
                            <button class="cf-qty-btn" data-action="decrease" data-product-id="${item.id}">-</button>
                            <span class="cf-qty-value">${item.quantity}</span>
                            <button class="cf-qty-btn" data-action="increase" data-product-id="${item.id}">+</button>
                        </div>
                        <button class="cf-remove-btn" data-product-id="${item.id}">Eliminar</button>
                    </div>
                `).join('')}
            </div>
            ${this.getCartSummary()}
        `;
    }

    getCartSummary() {
        const subtotal = this.getCartTotal();
        const shipping = 99;
        const total = subtotal + shipping;

        return `
            <div class="cf-cart-summary">
                <div class="cf-summary-row">
                    <span>Subtotal:</span>
                    <span>$${subtotal.toLocaleString()} ${this.config.currency}</span>
                </div>
                <div class="cf-summary-row">
                    <span>Envío:</span>
                    <span>$${shipping.toLocaleString()} ${this.config.currency}</span>
                </div>
                <div class="cf-summary-row total">
                    <span>Total:</span>
                    <span>$${total.toLocaleString()} ${this.config.currency}</span>
                </div>
            </div>
        `;
    }

    getCheckoutContent() {
        return `
            <form id="cf-checkout-form">
                <h3 style="margin-bottom: 20px;">Información de Envío</h3>
                <div class="cf-form-row">
                    <div class="cf-form-group">
                        <label>Nombre *</label>
                        <input type="text" name="firstName" required placeholder="Juan">
                    </div>
                    <div class="cf-form-group">
                        <label>Apellido *</label>
                        <input type="text" name="lastName" required placeholder="Pérez">
                    </div>
                </div>
                <div class="cf-form-group">
                    <label>Email *</label>
                    <input type="email" name="email" required placeholder="juan@ejemplo.com">
                </div>
                <div class="cf-form-group">
                    <label>Teléfono *</label>
                    <input type="tel" name="phone" required placeholder="+52 55 1234 5678">
                </div>
                <div class="cf-form-group">
                    <label>Dirección *</label>
                    <input type="text" name="address" required placeholder="Calle Principal 123">
                </div>
                <div class="cf-form-row">
                    <div class="cf-form-group">
                        <label>Ciudad *</label>
                        <input type="text" name="city" required placeholder="Ciudad de México">
                    </div>
                    <div class="cf-form-group">
                        <label>Código Postal *</label>
                        <input type="text" name="zipCode" required placeholder="01000">
                    </div>
                </div>
                
                <h3 style="margin: 32px 0 20px;">Método de Pago (Demo)</h3>
                <div class="cf-form-group">
                    <label>Número de Tarjeta</label>
                    <input type="text" placeholder="4242 4242 4242 4242" disabled>
                </div>
                <div class="cf-form-row">
                    <div class="cf-form-group">
                        <label>Vencimiento</label>
                        <input type="text" placeholder="MM/AA" disabled>
                    </div>
                    <div class="cf-form-group">
                        <label>CVV</label>
                        <input type="text" placeholder="123" disabled>
                    </div>
                </div>
                <p style="color: #999; font-size: 14px; margin-top: 16px;">
                    ⚠️ Esta es una demostración. No se procesarán pagos reales.
                </p>
            </form>
            ${this.getCartSummary()}
        `;
    }

    getConfirmationContent() {
        const orderNumber = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        const subtotal = this.getCartTotal();
        const shipping = 99;
        const total = subtotal + shipping;

        return `
            <div class="cf-success-icon">🎉</div>
            <div class="cf-success-message">
                <h3>¡Pedido Confirmado!</h3>
                <p>Gracias por tu compra. Hemos recibido tu pedido y lo procesaremos pronto.</p>
            </div>
            <div class="cf-order-details">
                <h4>Detalles del Pedido</h4>
                <div class="cf-summary-row">
                    <span>Número de Orden:</span>
                    <span><strong>${orderNumber}</strong></span>
                </div>
                <div class="cf-summary-row">
                    <span>Total:</span>
                    <span><strong>$${total.toLocaleString()} ${this.config.currency}</strong></span>
                </div>
                <div class="cf-summary-row">
                    <span>Artículos:</span>
                    <span>${this.cart.reduce((sum, item) => sum + item.quantity, 0)} productos</span>
                </div>
            </div>
            <p style="text-align: center; color: #666; margin-top: 24px;">
                Recibirás un email de confirmación con los detalles de tu pedido.
            </p>
        `;
    }

    getModalFooter() {
        if (this.currentStep === 'confirmation') {
            return `
                <div class="cf-modal-footer">
                    <button class="cf-btn cf-btn-primary" onclick="window.customerFlow.closeModal()">
                        Cerrar
                    </button>
                </div>
            `;
        }

        if (this.currentStep === 'browse') {
            return `
                <div class="cf-modal-footer">
                    <button class="cf-btn cf-btn-secondary" onclick="window.customerFlow.closeModal()">
                        Cerrar
                    </button>
                    <button class="cf-btn cf-btn-primary" onclick="window.customerFlow.goToCart()">
                        Ver Carrito (${this.cart.length})
                    </button>
                </div>
            `;
        }

        if (this.currentStep === 'cart') {
            return `
                <div class="cf-modal-footer">
                    <button class="cf-btn cf-btn-secondary" onclick="window.customerFlow.goToBrowse()">
                        ← Seguir Comprando
                    </button>
                    <button class="cf-btn cf-btn-primary" onclick="window.customerFlow.goToCheckout()" ${this.cart.length === 0 ? 'disabled' : ''}>
                        Proceder al Pago →
                    </button>
                </div>
            `;
        }

        if (this.currentStep === 'checkout') {
            return `
                <div class="cf-modal-footer">
                    <button class="cf-btn cf-btn-secondary" onclick="window.customerFlow.goToCart()">
                        ← Volver al Carrito
                    </button>
                    <button class="cf-btn cf-btn-primary" onclick="window.customerFlow.completeOrder()">
                        Confirmar Pedido →
                    </button>
                </div>
            `;
        }

        return '';
    }

    attachModalEventListeners() {
        // Add to cart buttons
        document.querySelectorAll('.cf-add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.productId);
                const product = this.config.products.find(p => p.id === productId);
                if (product) {
                    this.addToCart(product);
                    this.renderModal(); // Refresh to show updated cart count
                }
            });
        });

        // Quantity buttons
        document.querySelectorAll('.cf-qty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.productId);
                const action = e.target.dataset.action;
                const change = action === 'increase' ? 1 : -1;
                this.updateQuantity(productId, change);
                this.renderModal();
            });
        });

        // Remove buttons
        document.querySelectorAll('.cf-remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.productId);
                this.removeFromCart(productId);
                this.renderModal();
            });
        });
    }

    goToBrowse() {
        this.currentStep = 'browse';
        this.renderModal();
    }

    goToCart() {
        this.currentStep = 'cart';
        this.renderModal();
    }

    goToCheckout() {
        if (this.cart.length === 0) return;
        this.currentStep = 'checkout';
        this.renderModal();
    }

    completeOrder() {
        const form = document.getElementById('cf-checkout-form');
        if (form && !form.checkValidity()) {
            form.reportValidity();
            return;
        }

        this.currentStep = 'confirmation';
        this.cart = [];
        this.saveCartToStorage();
        this.updateCartBadge();
        this.renderModal();
    }

    closeModal() {
        const overlay = document.querySelector('.cf-modal-overlay');
        if (overlay) {
            overlay.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => overlay.remove(), 300);
        }
    }
}

// Make it globally accessible
window.CustomerFlowMockup = CustomerFlowMockup;
