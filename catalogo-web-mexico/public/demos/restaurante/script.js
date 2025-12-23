// Menu Data
const menuData = {
    entradas: [
        { name: "Guacamole Tradicional", price: 85, description: "Aguacate fresco con tomate, cebolla, cilantro y limón" },
        { name: "Queso Fundido", price: 95, description: "Queso Oaxaca derretido con chorizo y rajas" },
        { name: "Sopa de Tortilla", price: 75, description: "Caldo de tomate con tiras de tortilla, aguacate y queso" },
        { name: "Ceviche de Camarón", price: 145, description: "Camarones frescos marinados en limón con verduras" },
        { name: "Tostadas de Tinga", price: 95, description: "Tostadas con tinga de pollo, crema y queso" },
        { name: "Elote Asado", price: 65, description: "Elote con mayonesa, queso cotija y chile piquín" }
    ],
    platos: [
        { name: "Mole Poblano", price: 185, description: "Pollo en salsa de mole tradicional con arroz" },
        { name: "Tacos al Pastor", price: 125, description: "Tres tacos de cerdo marinado con piña y cilantro" },
        { name: "Enchiladas Verdes", price: 145, description: "Tortillas rellenas de pollo con salsa verde" },
        { name: "Chiles en Nogada", price: 225, description: "Chile poblano relleno con nogada y granada" },
        { name: "Arrachera a la Parrilla", price: 245, description: "Carne de res con guarnición y tortillas" },
        { name: "Pescado a la Veracruzana", price: 195, description: "Filete de pescado con salsa de tomate y aceitunas" },
        { name: "Pozole Rojo", price: 135, description: "Caldo de maíz con carne de cerdo y guarniciones" },
        { name: "Cochinita Pibil", price: 165, description: "Cerdo marinado en achiote estilo yucateco" }
    ],
    postres: [
        { name: "Flan Napolitano", price: 65, description: "Flan de vainilla con caramelo" },
        { name: "Churros con Chocolate", price: 75, description: "Churros crujientes con chocolate caliente" },
        { name: "Tres Leches", price: 85, description: "Pastel empapado en tres tipos de leche" },
        { name: "Arroz con Leche", price: 55, description: "Arroz cremoso con canela y pasas" },
        { name: "Helado de Cajeta", price: 70, description: "Helado artesanal de cajeta con nuez" }
    ],
    bebidas: [
        { name: "Agua de Horchata", price: 45, description: "Bebida de arroz con canela" },
        { name: "Agua de Jamaica", price: 45, description: "Infusión de flor de jamaica" },
        { name: "Margarita Clásica", price: 95, description: "Tequila, triple sec y limón" },
        { name: "Michelada", price: 75, description: "Cerveza preparada con limón y salsas" },
        { name: "Café de Olla", price: 50, description: "Café con piloncillo y canela" },
        { name: "Chocolate Caliente", price: 60, description: "Chocolate mexicano tradicional" }
    ]
};

// Gallery Images
const galleryImages = [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&h=600&fit=crop",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&h=600&fit=crop",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&h=600&fit=crop",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&h=600&fit=crop",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&h=600&fit=crop",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&h=600&fit=crop"
];

// Reviews Data
const reviews = [
    {
        name: "María González",
        text: "¡Increíble experiencia! Los sabores auténticos de México en cada platillo. El mole es espectacular.",
        avatar: "👩",
        rating: 5
    },
    {
        name: "Carlos Rodríguez",
        text: "El mejor restaurante mexicano de la ciudad. Ambiente acogedor y servicio excepcional.",
        avatar: "👨",
        rating: 5
    },
    {
        name: "Ana Martínez",
        text: "Los tacos al pastor son los mejores que he probado. Definitivamente volveré.",
        avatar: "👩‍🦰",
        rating: 5
    },
    {
        name: "Roberto Silva",
        text: "Excelente relación calidad-precio. Los chiles en nogada son una delicia.",
        avatar: "👨‍🦱",
        rating: 5
    }
];

let currentImage = 0;
let currentReview = 0;
let currentMenuCategory = 'entradas';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showMenuCategory('entradas');
    renderGallery();
    renderReviews();
    setupEventListeners();
});

// Menu Functions
function showMenuCategory(category) {
    currentMenuCategory = category;
    
    // Update active tab
    document.querySelectorAll('.menu-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Render menu items
    const menuContent = document.getElementById('menuContent');
    const items = menuData[category];
    
    menuContent.innerHTML = items.map(item => `
        <div class="menu-item">
            <div class="menu-item-header">
                <div class="menu-item-name">${item.name}</div>
                <div class="menu-item-price">$${item.price}</div>
            </div>
            <div class="menu-item-description">${item.description}</div>
        </div>
    `).join('');
}

// Gallery Functions
function renderGallery() {
    const track = document.getElementById('carouselTrack');
    const dots = document.getElementById('carouselDots');
    
    track.innerHTML = galleryImages.map(img => `
        <div class="carousel-item" style="background-image: url('${img}')"></div>
    `).join('');
    
    dots.innerHTML = galleryImages.map((_, i) => `
        <div class="dot ${i === 0 ? 'active' : ''}" onclick="goToImage(${i})"></div>
    `).join('');
}

function nextImage() {
    currentImage = (currentImage + 1) % galleryImages.length;
    updateGallery();
}

function prevImage() {
    currentImage = (currentImage - 1 + galleryImages.length) % galleryImages.length;
    updateGallery();
}

function goToImage(index) {
    currentImage = index;
    updateGallery();
}

function updateGallery() {
    const track = document.getElementById('carouselTrack');
    track.style.transform = `translateX(-${currentImage * 100}%)`;
    
    document.querySelectorAll('#carouselDots .dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentImage);
    });
}

// Auto-rotate gallery
setInterval(nextImage, 5000);

// Reviews Functions
function renderReviews() {
    const track = document.getElementById('reviewsTrack');
    const dots = document.getElementById('reviewsDots');
    
    track.innerHTML = reviews.map(review => `
        <div class="review-card">
            <div class="review-avatar">${review.avatar}</div>
            <p class="review-text">"${review.text}"</p>
            <div class="review-author">${review.name}</div>
            <div class="review-rating">${'⭐'.repeat(review.rating)}</div>
        </div>
    `).join('');
    
    dots.innerHTML = reviews.map((_, i) => `
        <div class="dot ${i === 0 ? 'active' : ''}" onclick="goToReview(${i})"></div>
    `).join('');
}

function nextReview() {
    currentReview = (currentReview + 1) % reviews.length;
    updateReviews();
}

function prevReview() {
    currentReview = (currentReview - 1 + reviews.length) % reviews.length;
    updateReviews();
}

function goToReview(index) {
    currentReview = index;
    updateReviews();
}

function updateReviews() {
    const track = document.getElementById('reviewsTrack');
    track.style.transform = `translateX(-${currentReview * 100}%)`;
    
    document.querySelectorAll('#reviewsDots .dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentReview);
    });
}

// Auto-rotate reviews
setInterval(nextReview, 6000);

// Order Functions
function addToOrder(itemName, price) {
    alert(`Demo: Agregado al pedido\n\n${itemName} - $${price} MXN\n\nEn producción, esto se agregaría al carrito de compras.`);
}

function orderWhatsApp() {
    const message = "Hola, me gustaría hacer un pedido";
    const phone = "5212345678";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    alert(`Demo: Abrir WhatsApp\n\nEn producción, esto abriría WhatsApp con el mensaje:\n"${message}"`);
}

// Setup Event Listeners
function setupEventListeners() {
    // Reservation Form
    const form = document.getElementById('reservationForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        alert('¡Reservación confirmada!\n\nGracias por reservar con nosotros. Te enviaremos un correo de confirmación.\n\nDemo: En producción, aquí se procesaría la reservación.');
        
        form.reset();
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
    
    // Parallax effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-content');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}
