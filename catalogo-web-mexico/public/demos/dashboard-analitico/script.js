// Chart instances
let lineChart, barChart, pieChart, areaChart, doughnutChart, radarChart;

// Sample data
const sampleTransactions = [
    { id: 'TXN-001', customer: 'Juan Pérez', product: 'Laptop Pro', date: '2024-01-20', amount: 1299.99, status: 'completed' },
    { id: 'TXN-002', customer: 'María García', product: 'Smartphone X', date: '2024-01-20', amount: 899.99, status: 'completed' },
    { id: 'TXN-003', customer: 'Carlos López', product: 'Tablet Plus', date: '2024-01-19', amount: 599.99, status: 'pending' },
    { id: 'TXN-004', customer: 'Ana Martínez', product: 'Auriculares Pro', date: '2024-01-19', amount: 299.99, status: 'completed' },
    { id: 'TXN-005', customer: 'Luis Hernández', product: 'Monitor 4K', date: '2024-01-18', amount: 499.99, status: 'completed' },
    { id: 'TXN-006', customer: 'Sofia Rodríguez', product: 'Teclado Mecánico', date: '2024-01-18', amount: 149.99, status: 'cancelled' },
    { id: 'TXN-007', customer: 'Miguel Torres', product: 'Mouse Gaming', date: '2024-01-17', amount: 79.99, status: 'completed' },
    { id: 'TXN-008', customer: 'Laura Sánchez', product: 'Webcam HD', date: '2024-01-17', amount: 129.99, status: 'pending' },
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    animateKPIs();
    initializeCharts();
    populateTable();
});

// Animate KPI values
function animateKPIs() {
    animateValue('totalRevenue', 0, 125847, 2000, true);
    animateValue('activeUsers', 0, 8542, 2000);
    animateValue('conversions', 0, 1234, 2000);
    animateValue('bounceRate', 0, 32.5, 2000, false, true);
}

function animateValue(id, start, end, duration, isCurrency = false, isPercentage = false) {
    const element = document.getElementById(id);
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current);
        if (isCurrency) {
            displayValue = '$' + displayValue.toLocaleString();
        } else if (isPercentage) {
            displayValue = current.toFixed(1) + '%';
        } else {
            displayValue = displayValue.toLocaleString();
        }
        
        element.textContent = displayValue;
    }, 16);
}

// Initialize all charts
function initializeCharts() {
    initLineChart();
    initBarChart();
    initPieChart();
    initAreaChart();
    initDoughnutChart();
    initRadarChart();
}

// Line Chart
function initLineChart() {
    const ctx = document.getElementById('lineChart').getContext('2d');
    
    lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            datasets: [
                {
                    label: 'Ventas',
                    data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 40000, 38000, 45000],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Objetivo',
                    data: [15000, 18000, 20000, 23000, 25000, 28000, 30000, 33000, 35000, 38000, 40000, 43000],
                    borderColor: '#ec4899',
                    backgroundColor: 'rgba(236, 72, 153, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderDash: [5, 5]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Bar Chart
function initBarChart() {
    const ctx = document.getElementById('barChart').getContext('2d');
    
    barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Electrónica', 'Ropa', 'Hogar', 'Deportes', 'Libros', 'Juguetes'],
            datasets: [{
                label: 'Ventas por Categoría',
                data: [45000, 32000, 28000, 21000, 18000, 15000],
                backgroundColor: [
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(236, 72, 153, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ],
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Pie Chart
function initPieChart() {
    const ctx = document.getElementById('pieChart').getContext('2d');
    
    pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Búsqueda Orgánica', 'Directo', 'Redes Sociales', 'Email', 'Referidos'],
            datasets: [{
                data: [35, 25, 20, 12, 8],
                backgroundColor: [
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(236, 72, 153, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Area Chart
function initAreaChart() {
    const ctx = document.getElementById('areaChart').getContext('2d');
    
    areaChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            datasets: [{
                label: 'Usuarios Acumulados',
                data: [1200, 2500, 4100, 6200, 8500, 11200, 14300, 17800, 21600, 25800, 30400, 35200],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Doughnut Chart
function initDoughnutChart() {
    const ctx = document.getElementById('doughnutChart').getContext('2d');
    
    doughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Desktop', 'Mobile', 'Tablet'],
            datasets: [{
                data: [45, 40, 15],
                backgroundColor: [
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(236, 72, 153, 0.8)',
                    'rgba(245, 158, 11, 0.8)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Radar Chart
function initRadarChart() {
    const ctx = document.getElementById('radarChart').getContext('2d');
    
    radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Velocidad', 'SEO', 'Accesibilidad', 'Mejores Prácticas', 'PWA'],
            datasets: [{
                label: 'Rendimiento',
                data: [85, 92, 78, 88, 75],
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                pointBackgroundColor: '#6366f1',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#6366f1'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Populate table
function populateTable() {
    const tableBody = document.getElementById('tableBody');
    
    tableBody.innerHTML = sampleTransactions.map(transaction => `
        <tr>
            <td><strong>${transaction.id}</strong></td>
            <td>${transaction.customer}</td>
            <td>${transaction.product}</td>
            <td>${formatDate(transaction.date)}</td>
            <td><strong>$${transaction.amount.toFixed(2)}</strong></td>
            <td><span class="status-badge ${transaction.status}">${getStatusText(transaction.status)}</span></td>
        </tr>
    `).join('');
}

function getStatusText(status) {
    const statusMap = {
        'completed': 'Completado',
        'pending': 'Pendiente',
        'cancelled': 'Cancelado'
    };
    return statusMap[status] || status;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Update date range
function updateDateRange() {
    const days = document.getElementById('dateRange').value;
    console.log(`Actualizando datos para los últimos ${days} días`);
    
    // Simulate data refresh
    refreshData();
}

// Refresh data
function refreshData() {
    // Animate refresh button
    const refreshBtn = document.querySelector('.btn-refresh');
    refreshBtn.style.pointerEvents = 'none';
    
    setTimeout(() => {
        // Update KPIs with new random values
        const newRevenue = Math.floor(Math.random() * 50000) + 100000;
        const newUsers = Math.floor(Math.random() * 3000) + 7000;
        const newConversions = Math.floor(Math.random() * 500) + 1000;
        const newBounceRate = (Math.random() * 20 + 25).toFixed(1);
        
        animateValue('totalRevenue', 0, newRevenue, 1000, true);
        animateValue('activeUsers', 0, newUsers, 1000);
        animateValue('conversions', 0, newConversions, 1000);
        animateValue('bounceRate', 0, parseFloat(newBounceRate), 1000, false, true);
        
        // Update charts with new data
        updateChartData(lineChart, generateRandomData(12, 10000, 50000));
        updateChartData(barChart, generateRandomData(6, 10000, 50000));
        
        refreshBtn.style.pointerEvents = 'auto';
    }, 500);
}

function updateChartData(chart, newData) {
    if (chart.data.datasets[0]) {
        chart.data.datasets[0].data = newData;
        chart.update();
    }
}

function generateRandomData(count, min, max) {
    return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min) + min));
}

// Export functions
function exportData() {
    document.getElementById('exportModal').classList.add('active');
}

function closeExportModal() {
    document.getElementById('exportModal').classList.remove('active');
}

function exportAs(format) {
    console.log(`Exportando datos en formato: ${format}`);
    
    // Simulate export
    const exportBtn = event.target.closest('.export-btn');
    const originalText = exportBtn.innerHTML;
    
    exportBtn.innerHTML = '<span>Exportando...</span>';
    exportBtn.style.pointerEvents = 'none';
    
    setTimeout(() => {
        exportBtn.innerHTML = originalText;
        exportBtn.style.pointerEvents = 'auto';
        closeExportModal();
        alert(`Datos exportados exitosamente en formato ${format.toUpperCase()}`);
    }, 1500);
}

function exportTable() {
    // Convert table to CSV
    const table = document.getElementById('dataTable');
    let csv = [];
    
    // Headers
    const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent);
    csv.push(headers.join(','));
    
    // Rows
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    rows.forEach(row => {
        const cells = Array.from(row.querySelectorAll('td')).map(td => {
            return '"' + td.textContent.trim().replace(/"/g, '""') + '"';
        });
        csv.push(cells.join(','));
    });
    
    // Download
    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'transacciones.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Close modal on outside click
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});
