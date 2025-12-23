// State Management
let currentStep = 1;
let bookingData = {
    date: null,
    time: null,
    fullName: '',
    email: '',
    phone: '',
    guests: 2,
    notes: ''
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeCalendar();
    initializeTimeSlots();
    initializeAvailabilityCalendar();
    loadBookings();
});

// Calendar Functions
function initializeCalendar() {
    const calendar = document.getElementById('calendar');
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Add day headers
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    days.forEach(day => {
        const header = document.createElement('div');
        header.className = 'calendar-header';
        header.textContent = day;
        calendar.appendChild(header);
    });

    // Get first day of month and number of days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    // Add previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = document.createElement('div');
        day.className = 'calendar-day other-month disabled';
        day.textContent = daysInPrevMonth - i;
        calendar.appendChild(day);
    }

    // Add current month days
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.className = 'calendar-day';
        day.textContent = i;
        
        const date = new Date(currentYear, currentMonth, i);
        const isPast = date < today.setHours(0, 0, 0, 0);
        
        if (isPast) {
            day.classList.add('disabled');
        } else {
            day.addEventListener('click', () => selectDate(date, day));
        }
        
        calendar.appendChild(day);
    }

    // Add next month days to fill grid
    const totalCells = calendar.children.length - 7; // Subtract headers
    const remainingCells = 42 - totalCells; // 6 rows * 7 days
    for (let i = 1; i <= remainingCells; i++) {
        const day = document.createElement('div');
        day.className = 'calendar-day other-month disabled';
        day.textContent = i;
        calendar.appendChild(day);
    }
}

function selectDate(date, element) {
    // Remove previous selection
    document.querySelectorAll('.calendar-day').forEach(day => {
        day.classList.remove('selected');
    });
    
    // Add selection
    element.classList.add('selected');
    bookingData.date = date;
}

// Time Slots
function initializeTimeSlots() {
    const timeSlotsContainer = document.getElementById('timeSlots');
    const times = [
        '09:00', '10:00', '11:00', '12:00',
        '13:00', '14:00', '15:00', '16:00',
        '17:00', '18:00', '19:00', '20:00'
    ];

    times.forEach(time => {
        const slot = document.createElement('div');
        slot.className = 'time-slot';
        slot.textContent = time;
        
        // Randomly mark some as unavailable for demo
        if (Math.random() > 0.7) {
            slot.classList.add('unavailable');
        } else {
            slot.addEventListener('click', () => selectTime(time, slot));
        }
        
        timeSlotsContainer.appendChild(slot);
    });
}

function selectTime(time, element) {
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    
    element.classList.add('selected');
    bookingData.time = time;
}

// Availability Calendar
function initializeAvailabilityCalendar() {
    const calendar = document.getElementById('availabilityCalendar');
    const today = new Date();
    const daysToShow = 28; // 4 weeks

    for (let i = 0; i < daysToShow; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        const dayElement = document.createElement('div');
        dayElement.className = 'availability-day';
        
        // Random availability for demo
        const random = Math.random();
        let status, slotsLeft;
        
        if (random > 0.7) {
            status = 'full';
            slotsLeft = 0;
        } else if (random > 0.4) {
            status = 'available';
            slotsLeft = Math.floor(Math.random() * 8) + 5;
        } else {
            status = 'limited';
            slotsLeft = Math.floor(Math.random() * 3) + 1;
        }
        
        dayElement.classList.add(status);
        dayElement.innerHTML = `
            <div class="day-number">${date.getDate()}</div>
            <div class="slots-left">${slotsLeft > 0 ? slotsLeft + ' slots' : 'Completo'}</div>
        `;
        
        calendar.appendChild(dayElement);
    }
}

// Step Navigation
function nextStep() {
    // Validation
    if (currentStep === 1 && !bookingData.date) {
        alert('Por favor selecciona una fecha');
        return;
    }
    
    if (currentStep === 2 && !bookingData.time) {
        alert('Por favor selecciona un horario');
        return;
    }
    
    if (currentStep === 3) {
        // Validate form fields
        bookingData.fullName = document.getElementById('fullName').value;
        bookingData.email = document.getElementById('email').value;
        bookingData.phone = document.getElementById('phone').value;
        bookingData.guests = document.getElementById('guests').value;
        bookingData.notes = document.getElementById('notes').value;
        
        if (!bookingData.fullName || !bookingData.email || !bookingData.phone) {
            alert('Por favor completa todos los campos requeridos');
            return;
        }
        
        // Show confirmation
        showConfirmation();
    }
    
    if (currentStep < 4) {
        currentStep++;
        updateStepDisplay();
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStepDisplay();
    }
}

function updateStepDisplay() {
    // Update step indicator
    document.querySelectorAll('.step').forEach((step, index) => {
        if (index + 1 < currentStep) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (index + 1 === currentStep) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });
    
    // Update form steps
    document.querySelectorAll('.form-step').forEach((step, index) => {
        if (index + 1 === currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

function showConfirmation() {
    const confirmationDetails = document.getElementById('confirmationDetails');
    const dateStr = bookingData.date.toLocaleDateString('es-MX', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    confirmationDetails.innerHTML = `
        <div class="confirmation-item">
            <span class="confirmation-label">Fecha:</span>
            <span class="confirmation-value">${dateStr}</span>
        </div>
        <div class="confirmation-item">
            <span class="confirmation-label">Horario:</span>
            <span class="confirmation-value">${bookingData.time}</span>
        </div>
        <div class="confirmation-item">
            <span class="confirmation-label">Nombre:</span>
            <span class="confirmation-value">${bookingData.fullName}</span>
        </div>
        <div class="confirmation-item">
            <span class="confirmation-label">Email:</span>
            <span class="confirmation-value">${bookingData.email}</span>
        </div>
        <div class="confirmation-item">
            <span class="confirmation-label">Teléfono:</span>
            <span class="confirmation-value">${bookingData.phone}</span>
        </div>
        <div class="confirmation-item">
            <span class="confirmation-label">Personas:</span>
            <span class="confirmation-value">${bookingData.guests}</span>
        </div>
        ${bookingData.notes ? `
        <div class="confirmation-item">
            <span class="confirmation-label">Notas:</span>
            <span class="confirmation-value">${bookingData.notes}</span>
        </div>
        ` : ''}
    `;
}

function confirmBooking() {
    // Save booking
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const newBooking = {
        id: Date.now(),
        ...bookingData,
        status: 'confirmed',
        createdAt: new Date().toISOString()
    };
    
    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    // Show success modal
    showSuccessModal();
    
    // Reset form
    setTimeout(() => {
        resetForm();
    }, 3000);
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    const successDetails = document.getElementById('successDetails');
    
    const dateStr = bookingData.date.toLocaleDateString('es-MX', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    successDetails.innerHTML = `
        <div class="confirmation-item">
            <span class="confirmation-label">Fecha:</span>
            <span class="confirmation-value">${dateStr}</span>
        </div>
        <div class="confirmation-item">
            <span class="confirmation-label">Horario:</span>
            <span class="confirmation-value">${bookingData.time}</span>
        </div>
        <div class="confirmation-item">
            <span class="confirmation-label">Personas:</span>
            <span class="confirmation-value">${bookingData.guests}</span>
        </div>
    `;
    
    modal.classList.add('active');
}

function closeSuccessModal() {
    document.getElementById('successModal').classList.remove('active');
}

function resetForm() {
    currentStep = 1;
    bookingData = {
        date: null,
        time: null,
        fullName: '',
        email: '',
        phone: '',
        guests: 2,
        notes: ''
    };
    
    document.getElementById('bookingForm').reset();
    document.querySelectorAll('.calendar-day').forEach(day => {
        day.classList.remove('selected');
    });
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    
    updateStepDisplay();
}

// Dashboard Functions
function showDashboard() {
    const modal = document.getElementById('dashboardModal');
    modal.classList.add('active');
    updateDashboardStats();
    displayBookingsList();
}

function closeDashboard() {
    document.getElementById('dashboardModal').classList.remove('active');
}

function loadBookings() {
    updateDashboardStats();
}

function updateDashboardStats() {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    
    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
    const pendingBookings = bookings.filter(b => b.status === 'pending').length;
    const totalGuests = bookings.reduce((sum, b) => sum + parseInt(b.guests || 0), 0);
    
    // Animate numbers
    animateValue('totalBookings', 0, totalBookings, 1000);
    animateValue('confirmedBookings', 0, confirmedBookings, 1000);
    animateValue('pendingBookings', 0, pendingBookings, 1000);
    animateValue('totalGuests', 0, totalGuests, 1000);
}

function animateValue(id, start, end, duration) {
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
        element.textContent = Math.floor(current);
    }, 16);
}

function displayBookingsList() {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const bookingsList = document.getElementById('bookingsList');
    
    if (bookings.length === 0) {
        bookingsList.innerHTML = '<p style="text-align: center; color: #64748b;">No hay reservaciones aún</p>';
        return;
    }
    
    bookingsList.innerHTML = bookings.slice(-5).reverse().map(booking => {
        const date = new Date(booking.date);
        const dateStr = date.toLocaleDateString('es-MX', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        
        return `
            <div class="booking-item">
                <div class="booking-info">
                    <h4>${booking.fullName}</h4>
                    <p>📅 ${dateStr} - ${booking.time}</p>
                    <p>👥 ${booking.guests} personas</p>
                    <p>📧 ${booking.email}</p>
                </div>
                <div class="booking-status ${booking.status}">
                    ${booking.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                </div>
            </div>
        `;
    }).join('');
}

// Close modals on outside click
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});
