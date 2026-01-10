// Manda2 Delivery Platform Demo Script

const services = [
    { id: 1, name: 'Express 1hr', icon: '⚡', price: 99, time: '60min' },
    { id: 2, name: 'Estándar', icon: '📦', price: 49, time: '3-5hr' },
    { id: 3, name: 'Programada', icon: '⏰', price: 79, time: 'Tu elección' },
    { id: 4, name: 'Masiva', icon: '🚛', price: 299, time: '1 día' },
    { id: 5, name: 'Refrigerada', icon: '❄️', price: 149, time: '2hr' },
];

const mockOrders = [
    { id: 'MD2-' + Math.random().toString(36).substr(2, 9).toUpperCase(), status: 'En camino', driver: 'Juan Pérez', progress: 75 },
    { id: 'MD2-' + Math.random().toString(36).substr(2, 9).toUpperCase(), status: 'Recolectando', driver: 'María García', progress: 25 },
    { id: 'MD2-' + Math.random().toString(36).substr(2, 9).toUpperCase(), status: 'Entregado', driver: 'Carlos López', progress: 100 },
];

function renderServices() {
    const grid = document.getElementById('servicesGrid');
    grid.innerHTML = services.map(service => `
        <div class="service-card glass" onclick="window.customerFlow.addProduct(${service.id})">
            <div class="service-icon">${service.icon}</div>
            <h3>${service.name}</h3>
            <p class="stat-value">$${service.price} MXN</p>
            <p>Tiempo: ${service.time}</p>
            <button class="btn-primary">Solicitar</button>
        </div>
    `).join('');
}

function renderDashboard() {
    // Stats
    document.getElementById('statsContent').innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-top: 1rem;">
            <div class="stat"><div class="stat-value">${mockOrders.length}</div><div class="stat-label">Pedidos Activos</div></div>
            <div class="stat"><div class="stat-value">47</div><div class="stat-label">Repartidores</div></div>
            <div class="stat"><div class="stat-value">89%</div><div class="stat-label">Entregas a Tiempo</div></div>
            <div class="stat"><div class="stat-value">32min</div><div class="stat-label">Tiempo Promedio</div></div>
        </div>
    `;

    // Map
    document.getElementById('mapContent').innerHTML = '🗺️';

    // Orders
    document.getElementById('ordersContent').innerHTML = mockOrders.map(order => `
        <div style="padding: 1rem; background: rgba(255,255,255,0.05); border-radius: 8px; margin-bottom: 0.5rem;">
            <strong>${order.id}</strong>
            <p>${order.status} - ${order.driver}</p>
            <div style="background: rgba(255,255,255,0.1); height: 8px; border-radius: 4px; overflow: hidden;">
                <div style="width: ${order.progress}%; height: 100%; background: linear-gradient(90deg, #667eea, #764ba2);"></div>
            </div>
        </div>
    `).join('');

    // Drivers
    document.getElementById('driversContent').innerHTML = `
        <div style="padding: 1rem;">
            ${mockOrders.filter(o => o.progress < 100).map(o => `
                <div style="padding: 0.75rem; background: rgba(255,255,255,0.05); border-radius: 8px; margin-bottom: 0.5rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span>🚴 ${o.driver}</span>
                        <span class="badge">${o.status}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

document.getElementById('trackBtn')?.addEventListener('click', () => {
    const input = document.getElementById('trackingInput').value;
    const result = document.getElementById('trackingResult');
    
    if (input) {
        const randomOrder = mockOrders[Math.floor(Math.random() * mockOrders.length)];
        result.innerHTML = `
            <h3>📦 Pedido: ${randomOrder.id}</h3>
            <p><strong>Estado:</strong> ${randomOrder.status}</p>
            <p><strong>Repartidor:</strong> ${randomOrder.driver}</p>
            <div style="background: rgba(255,255,255,0.1); height: 12px; border-radius: 6px; overflow: hidden; margin-top: 1rem;">
                <div style="width: ${randomOrder.progress}%; height: 100%; background: linear-gradient(90deg, #667eea, #764ba2); transition: width 0.5s;"></div>
            </div>
            <p style="text-align: center; margin-top: 0.5rem;">${randomOrder.progress}% completado</p>
        `;
        result.classList.add('show');
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderServices();
    renderDashboard();
});
