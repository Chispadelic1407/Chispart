// Tarot Card Data
const tarotCards = [
    // Major Arcana
    { id: 0, name: 'The Fool', suit: 'major', symbol: '🌟', meaning: 'New beginnings, innocence, spontaneity', keywords: ['adventure', 'faith', 'potential'] },
    { id: 1, name: 'The Magician', suit: 'major', symbol: '🎩', meaning: 'Manifestation, resourcefulness, power', keywords: ['skill', 'concentration', 'action'] },
    { id: 2, name: 'The High Priestess', suit: 'major', symbol: '🌙', meaning: 'Intuition, sacred knowledge, divine feminine', keywords: ['mystery', 'subconscious', 'inner voice'] },
    { id: 3, name: 'The Empress', suit: 'major', symbol: '👑', meaning: 'Femininity, beauty, nature, abundance', keywords: ['nurturing', 'creativity', 'fertility'] },
    { id: 4, name: 'The Emperor', suit: 'major', symbol: '⚔️', meaning: 'Authority, establishment, structure', keywords: ['stability', 'power', 'protection'] },
    { id: 5, name: 'The Hierophant', suit: 'major', symbol: '📿', meaning: 'Spiritual wisdom, religious beliefs, tradition', keywords: ['conformity', 'education', 'belief systems'] },
    { id: 6, name: 'The Lovers', suit: 'major', symbol: '💕', meaning: 'Love, harmony, relationships, values alignment', keywords: ['union', 'choice', 'communication'] },
    { id: 7, name: 'The Chariot', suit: 'major', symbol: '🏆', meaning: 'Control, willpower, success, determination', keywords: ['victory', 'ambition', 'direction'] },
    { id: 8, name: 'Strength', suit: 'major', symbol: '🦁', meaning: 'Strength, courage, patience, compassion', keywords: ['inner power', 'bravery', 'influence'] },
    { id: 9, name: 'The Hermit', suit: 'major', symbol: '🕯️', meaning: 'Soul searching, introspection, inner guidance', keywords: ['solitude', 'wisdom', 'contemplation'] },
    { id: 10, name: 'Wheel of Fortune', suit: 'major', symbol: '🎡', meaning: 'Good luck, karma, life cycles, destiny', keywords: ['change', 'patterns', 'movement'] },
    { id: 11, name: 'Justice', suit: 'major', symbol: '⚖️', meaning: 'Justice, fairness, truth, cause and effect', keywords: ['clarity', 'truth', 'law'] },
    { id: 12, name: 'The Hanged Man', suit: 'major', symbol: '🙃', meaning: 'Pause, surrender, letting go, new perspective', keywords: ['sacrifice', 'release', 'suspension'] },
    { id: 13, name: 'Death', suit: 'major', symbol: '🦋', meaning: 'Endings, change, transformation, transition', keywords: ['renewal', 'metamorphosis', 'closure'] },
    { id: 14, name: 'Temperance', suit: 'major', symbol: '🧘', meaning: 'Balance, moderation, patience, purpose', keywords: ['harmony', 'alchemy', 'healing'] },
    { id: 15, name: 'The Devil', suit: 'major', symbol: '😈', meaning: 'Shadow self, attachment, addiction, restriction', keywords: ['materialism', 'playfulness', 'bondage'] },
    { id: 16, name: 'The Tower', suit: 'major', symbol: '⚡', meaning: 'Sudden change, upheaval, chaos, revelation', keywords: ['disruption', 'breakthrough', 'awakening'] },
    { id: 17, name: 'The Star', suit: 'major', symbol: '✨', meaning: 'Hope, faith, purpose, renewal, spirituality', keywords: ['inspiration', 'serenity', 'healing'] },
    { id: 18, name: 'The Moon', suit: 'major', symbol: '🌕', meaning: 'Illusion, fear, anxiety, subconscious, intuition', keywords: ['dreams', 'uncertainty', 'mystery'] },
    { id: 19, name: 'The Sun', suit: 'major', symbol: '☀️', meaning: 'Positivity, fun, warmth, success, vitality', keywords: ['joy', 'celebration', 'enlightenment'] },
    { id: 20, name: 'Judgement', suit: 'major', symbol: '📯', meaning: 'Judgement, rebirth, inner calling, absolution', keywords: ['reflection', 'reckoning', 'decision'] },
    { id: 21, name: 'The World', suit: 'major', symbol: '🌍', meaning: 'Completion, accomplishment, travel, fulfillment', keywords: ['success', 'unity', 'wholeness'] },

    // Cups (Emotions, Relationships)
    { id: 22, name: 'Ace of Cups', suit: 'cups', symbol: '💧', meaning: 'Love, new relationships, compassion, creativity', keywords: ['emotion', 'intimacy', 'beginning'] },
    { id: 23, name: 'Two of Cups', suit: 'cups', symbol: '💑', meaning: 'Unified love, partnership, mutual attraction', keywords: ['connection', 'balance', 'harmony'] },
    { id: 24, name: 'Three of Cups', suit: 'cups', symbol: '🎉', meaning: 'Celebration, friendship, creativity, community', keywords: ['joy', 'gathering', 'abundance'] },
    { id: 25, name: 'Four of Cups', suit: 'cups', symbol: '😔', meaning: 'Meditation, contemplation, apathy, reevaluation', keywords: ['introspection', 'boredom', 'opportunity'] },
    { id: 26, name: 'Five of Cups', suit: 'cups', symbol: '😢', meaning: 'Regret, failure, disappointment, pessimism', keywords: ['loss', 'grief', 'letting go'] },

    // Wands (Action, Energy)
    { id: 27, name: 'Ace of Wands', suit: 'wands', symbol: '🔥', meaning: 'Inspiration, power, creation, new opportunity', keywords: ['passion', 'energy', 'potential'] },
    { id: 28, name: 'Two of Wands', suit: 'wands', symbol: '🌏', meaning: 'Future planning, progress, decisions, discovery', keywords: ['planning', 'vision', 'expansion'] },
    { id: 29, name: 'Three of Wands', suit: 'wands', symbol: '⛵', meaning: 'Progress, expansion, foresight, overseas opportunities', keywords: ['exploration', 'anticipation', 'growth'] },
    { id: 30, name: 'Four of Wands', suit: 'wands', symbol: '🏡', meaning: 'Celebration, harmony, marriage, home, community', keywords: ['stability', 'foundation', 'welcome'] },
    { id: 31, name: 'Five of Wands', suit: 'wands', symbol: '⚔️', meaning: 'Conflict, disagreements, competition, tension', keywords: ['struggle', 'diversity', 'challenge'] },

    // Swords (Thoughts, Communication)
    { id: 32, name: 'Ace of Swords', suit: 'swords', symbol: '🗡️', meaning: 'Breakthroughs, new ideas, mental clarity, success', keywords: ['truth', 'justice', 'clarity'] },
    { id: 33, name: 'Two of Swords', suit: 'swords', symbol: '🤔', meaning: 'Difficult decisions, weighing options, stalemate', keywords: ['avoidance', 'balance', 'truce'] },
    { id: 34, name: 'Three of Swords', suit: 'swords', symbol: '💔', meaning: 'Heartbreak, emotional pain, sorrow, grief, hurt', keywords: ['suffering', 'loss', 'separation'] },
    { id: 35, name: 'Four of Swords', suit: 'swords', symbol: '😴', meaning: 'Rest, relaxation, meditation, contemplation', keywords: ['recovery', 'peace', 'restoration'] },
    { id: 36, name: 'Five of Swords', suit: 'swords', symbol: '🏴', meaning: 'Conflict, disagreements, competition, defeat', keywords: ['tension', 'loss', 'betrayal'] },

    // Pentacles (Material, Career)
    { id: 37, name: 'Ace of Pentacles', suit: 'pentacles', symbol: '💰', meaning: 'Opportunity, prosperity, new venture, manifestation', keywords: ['abundance', 'security', 'growth'] },
    { id: 38, name: 'Two of Pentacles', suit: 'pentacles', symbol: '🎭', meaning: 'Multiple priorities, time management, balance', keywords: ['flexibility', 'adaptation', 'juggling'] },
    { id: 39, name: 'Three of Pentacles', suit: 'pentacles', symbol: '🔨', meaning: 'Teamwork, collaboration, learning, implementation', keywords: ['skill', 'craftsmanship', 'cooperation'] },
    { id: 40, name: 'Four of Pentacles', suit: 'pentacles', symbol: '💎', meaning: 'Saving money, security, conservatism, control', keywords: ['stability', 'possession', 'greed'] },
    { id: 41, name: 'Five of Pentacles', suit: 'pentacles', symbol: '❄️', meaning: 'Financial loss, poverty, insecurity, isolation', keywords: ['hardship', 'worry', 'struggle'] }
];

// Spread Configurations
const spreads = {
    'single-card': {
        name: 'Single Card',
        positions: ['Daily Guidance'],
        cardCount: 1
    },
    'three-card': {
        name: 'Three Card Spread',
        positions: ['Past', 'Present', 'Future'],
        cardCount: 3
    },
    'celtic-cross': {
        name: 'Celtic Cross',
        positions: [
            'Present Situation',
            'Challenge',
            'Distant Past',
            'Recent Past',
            'Best Outcome',
            'Immediate Future',
            'Your Approach',
            'External Influences',
            'Hopes & Fears',
            'Final Outcome'
        ],
        cardCount: 10
    },
    'relationship': {
        name: 'Relationship Spread',
        positions: ['You', 'Partner', 'Connection', 'Challenges', 'Potential'],
        cardCount: 5
    }
};

// State Management
let currentSpread = null;
let selectedCards = [];
let currentQuestion = '';
let readingHistory = JSON.parse(localStorage.getItem('tarotHistory') || '[]');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeGallery();
    displayHistory();
});

// Spread Selection
function selectSpread(spreadType) {
    currentSpread = spreads[spreadType];
    selectedCards = [];

    // Hide spread selection
    document.getElementById('spreadSelection').style.display = 'none';

    // Show question section
    document.getElementById('questionSection').style.display = 'block';

    // Smooth scroll to question section
    document.getElementById('questionSection').scrollIntoView({ behavior: 'smooth' });
}

// Start Reading
function startReading() {
    currentQuestion = document.getElementById('questionInput').value;

    // Hide question section
    document.getElementById('questionSection').style.display = 'none';

    // Show card selection
    const cardSelection = document.getElementById('cardSelection');
    cardSelection.style.display = 'block';

    // Update cards needed text
    document.getElementById('cardsNeeded').textContent = currentSpread.cardCount;

    // Generate deck
    generateDeck();

    // Smooth scroll
    cardSelection.scrollIntoView({ behavior: 'smooth' });
}

// Generate Deck
function generateDeck() {
    const deck = document.getElementById('cardDeck');
    deck.innerHTML = '';

    // Shuffle and select cards to display (show 20 random cards)
    const shuffled = [...tarotCards].sort(() => Math.random() - 0.5).slice(0, 20);

    shuffled.forEach((card, index) => {
        const cardElement = createCardElement(card, index);
        deck.appendChild(cardElement);

        // Stagger animation
        setTimeout(() => {
            cardElement.style.animation = 'card-reveal 0.6s ease-out forwards';
        }, index * 50);
    });
}

// Create Card Element
function createCardElement(card, index) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'tarot-card';
    cardDiv.dataset.cardId = card.id;

    cardDiv.innerHTML = `
        <div class="card-face card-back"></div>
        <div class="card-face card-front">
            <div class="card-number">${card.id}</div>
            <div class="card-image">${card.symbol}</div>
            <div class="card-name">${card.name}</div>
        </div>
    `;

    cardDiv.onclick = () => selectCard(card, cardDiv);

    return cardDiv;
}

// Select Card
function selectCard(card, cardElement) {
    if (selectedCards.length >= currentSpread.cardCount) return;
    if (selectedCards.find(c => c.id === card.id)) return;

    // Add card to selected
    selectedCards.push(card);

    // Visual feedback
    cardElement.classList.add('flipped', 'selected');
    cardElement.onclick = null;

    // Update progress
    updateProgress();

    // Check if reading is complete
    if (selectedCards.length === currentSpread.cardCount) {
        setTimeout(() => {
            displayReading();
        }, 1000);
    }
}

// Update Progress
function updateProgress() {
    const progress = (selectedCards.length / currentSpread.cardCount) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

// Display Reading
function displayReading() {
    // Hide card selection
    document.getElementById('cardSelection').style.display = 'none';

    // Show reading result
    const resultSection = document.getElementById('readingResult');
    resultSection.style.display = 'block';

    // Display spread
    const spreadDisplay = document.getElementById('spreadDisplay');
    spreadDisplay.innerHTML = '';

    selectedCards.forEach((card, index) => {
        const resultCard = document.createElement('div');
        resultCard.className = 'result-card';
        resultCard.style.animationDelay = `${index * 0.2}s`;

        resultCard.innerHTML = `
            <div class="card-position">${currentSpread.positions[index]}</div>
            ${createCardElement(card, index).outerHTML}
            <div class="card-meaning">${card.meaning}</div>
        `;

        spreadDisplay.appendChild(resultCard);

        // Add click to show details
        resultCard.querySelector('.tarot-card').onclick = () => showCardDetails(card);
    });

    // Force cards to show flipped
    setTimeout(() => {
        spreadDisplay.querySelectorAll('.tarot-card').forEach(card => {
            card.classList.add('flipped');
        });
    }, 100);

    // Generate AI interpretation
    generateInterpretation();

    // Save to history
    saveToHistory();

    // Smooth scroll
    resultSection.scrollIntoView({ behavior: 'smooth' });
}

// Generate AI Interpretation
function generateInterpretation() {
    const interpretationDiv = document.getElementById('interpretationText');
    interpretationDiv.innerHTML = '<div class="loading"></div> Channeling cosmic energies...';

    // Simulate AI processing
    setTimeout(() => {
        const interpretation = generateAIResponse();

        // Typing effect
        let index = 0;
        interpretationDiv.innerHTML = '';

        const typeWriter = () => {
            if (index < interpretation.length) {
                interpretationDiv.innerHTML += interpretation.charAt(index);
                index++;
                setTimeout(typeWriter, 20);
            }
        };

        typeWriter();
    }, 2000);
}

// Generate AI Response
function generateAIResponse() {
    const cardNames = selectedCards.map(c => c.name).join(', ');
    const positions = currentSpread.positions;

    let response = `<p><strong>Reading Overview:</strong> `;

    if (currentQuestion) {
        response += `Regarding your question about "${currentQuestion}", the cards reveal profound insights.</p>`;
    } else {
        response += `The cards have aligned to provide you with cosmic guidance.</p>`;
    }

    response += `<p>`;

    selectedCards.forEach((card, index) => {
        const position = positions[index];
        const keywords = card.keywords.join(', ');

        if (index === 0) {
            response += `<strong>${position}:</strong> ${card.name} appears, bringing energies of ${keywords}. ${getPositionInterpretation(card, position)} `;
        } else if (index === selectedCards.length - 1) {
            response += `<strong>${position}:</strong> Finally, ${card.name} illuminates the path with ${keywords}. ${getPositionInterpretation(card, position)}`;
        } else {
            response += `<strong>${position}:</strong> ${card.name} indicates ${keywords}. ${getPositionInterpretation(card, position)} `;
        }
    });

    response += `</p>`;

    response += `<p><strong>Cosmic Guidance:</strong> This reading suggests a journey of transformation. The cards encourage you to trust your intuition and embrace the changes ahead. Remember, the future is not fixed—your actions shape your destiny.</p>`;

    return response;
}

// Get Position Interpretation
function getPositionInterpretation(card, position) {
    const interpretations = [
        `This energy influences your current path significantly.`,
        `Pay attention to how this manifests in your life.`,
        `This represents a key factor in your situation.`,
        `Understanding this will help you move forward.`,
        `This guidance is particularly important right now.`,
        `The universe is highlighting this aspect for your growth.`,
        `Meditate on this message and its meaning for you.`
    ];

    return interpretations[Math.floor(Math.random() * interpretations.length)];
}

// Save Reading
function saveReading() {
    // Create a summary
    const summary = selectedCards.map(c => c.name).join(', ');

    showNotification('Reading saved successfully!', 'success');

    // In a real app, this would save to a database
    console.log('Saving reading:', {
        spread: currentSpread.name,
        cards: selectedCards,
        question: currentQuestion,
        date: new Date().toISOString()
    });
}

// Share Reading
function shareReading() {
    const summary = `My Tarot Reading: ${currentSpread.name}\nCards: ${selectedCards.map(c => c.name).join(', ')}`;

    if (navigator.share) {
        navigator.share({
            title: 'My Tarot Reading',
            text: summary
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(summary).then(() => {
            showNotification('Reading copied to clipboard!', 'success');
        });
    }
}

// New Reading
function newReading() {
    // Reset state
    currentSpread = null;
    selectedCards = [];
    currentQuestion = '';

    // Reset UI
    document.getElementById('readingResult').style.display = 'none';
    document.getElementById('spreadSelection').style.display = 'block';
    document.getElementById('questionInput').value = '';

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Save to History
function saveToHistory() {
    const reading = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        spread: currentSpread.name,
        question: currentQuestion || 'General reading',
        cards: selectedCards.map(c => ({ id: c.id, name: c.name, symbol: c.symbol }))
    };

    readingHistory.unshift(reading);

    // Keep only last 20 readings
    if (readingHistory.length > 20) {
        readingHistory = readingHistory.slice(0, 20);
    }

    localStorage.setItem('tarotHistory', JSON.stringify(readingHistory));
    displayHistory();
}

// Display History
function displayHistory() {
    const historyList = document.getElementById('historyList');

    if (readingHistory.length === 0) {
        historyList.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">No readings yet</p>';
        return;
    }

    historyList.innerHTML = readingHistory.map(reading => `
        <div class="history-item" onclick="viewHistoryReading(${reading.id})">
            <div class="history-date">${reading.date}</div>
            <div class="history-spread">${reading.spread}</div>
            <div class="history-question">${reading.question}</div>
        </div>
    `).join('');
}

// View History Reading
function viewHistoryReading(id) {
    const reading = readingHistory.find(r => r.id === id);
    if (!reading) return;

    // Load the reading
    currentSpread = Object.values(spreads).find(s => s.name === reading.spread);
    selectedCards = reading.cards.map(c => tarotCards.find(tc => tc.id === c.id));
    currentQuestion = reading.question;

    // Display it
    displayReading();

    // Close history
    toggleHistory();
}

// Toggle History
function toggleHistory() {
    const sidebar = document.getElementById('historySidebar');
    sidebar.classList.toggle('active');
}

// Initialize Gallery
function initializeGallery() {
    const galleryGrid = document.getElementById('galleryGrid');

    tarotCards.forEach(card => {
        const cardElement = createCardElement(card, 0);
        cardElement.classList.add('flipped');
        cardElement.onclick = () => showCardDetails(card);

        const wrapper = document.createElement('div');
        wrapper.className = 'gallery-card';
        wrapper.dataset.suit = card.suit;
        wrapper.appendChild(cardElement);

        galleryGrid.appendChild(wrapper);
    });
}

// Filter Gallery
function filterGallery(filter) {
    const cards = document.querySelectorAll('.gallery-card');
    const buttons = document.querySelectorAll('.filter-btn');

    // Update active button
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Filter cards
    cards.forEach(card => {
        if (filter === 'all' || card.dataset.suit === filter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Toggle Gallery
function toggleGallery() {
    const gallery = document.getElementById('cardGallery');
    gallery.classList.toggle('active');
}

// Show Card Details
function showCardDetails(card) {
    const modal = document.getElementById('cardModal');
    const modalBody = document.getElementById('modalBody');

    const cardElement = createCardElement(card, 0);
    cardElement.classList.add('flipped');
    cardElement.className += ' modal-card';

    modalBody.innerHTML = `
        ${cardElement.outerHTML}
        <div class="modal-details">
            <h3>${card.name}</h3>
            <p><strong>Suit:</strong> ${card.suit.charAt(0).toUpperCase() + card.suit.slice(1)}</p>
            <p><strong>Meaning:</strong> ${card.meaning}</p>
            <p><strong>Keywords:</strong> ${card.keywords.join(', ')}</p>
            <p><strong>Interpretation:</strong> ${getDetailedInterpretation(card)}</p>
        </div>
    `;

    modal.classList.add('active');
}

// Get Detailed Interpretation
function getDetailedInterpretation(card) {
    const interpretations = {
        major: 'This Major Arcana card represents significant life lessons and spiritual growth. Its appearance in a reading indicates important themes that require your attention.',
        cups: 'This card relates to emotions, relationships, and matters of the heart. It speaks to your emotional intelligence and interpersonal connections.',
        wands: 'This card embodies passion, creativity, and willpower. It represents the fire within you and your drive to take action.',
        swords: 'This card deals with thoughts, communication, and mental clarity. It encourages you to use logic and reason in your decision-making.',
        pentacles: 'This card concerns material world matters including career, finances, and physical health. It grounds you in practical reality.'
    };

    return interpretations[card.suit] || 'This card carries profound wisdom for your journey.';
}

// Close Modal
function closeModal() {
    document.getElementById('cardModal').classList.remove('active');
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slide-in 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Close modal when clicking outside
document.getElementById('cardModal').addEventListener('click', (e) => {
    if (e.target.id === 'cardModal') {
        closeModal();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();

        const gallery = document.getElementById('cardGallery');
        if (gallery.classList.contains('active')) {
            toggleGallery();
        }

        const history = document.getElementById('historySidebar');
        if (history.classList.contains('active')) {
            toggleHistory();
        }
    }
});

// Add mystical particle effects
function createMysticalParticles() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = `rgba(${168 + Math.random() * 50}, ${85 + Math.random() * 50}, ${247}, 0.6)`;
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = '-10px';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1';
    particle.style.animation = `float-particle ${5 + Math.random() * 5}s linear`;

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 10000);
}

// Add floating animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Create particles periodically
setInterval(createMysticalParticles, 2000);
