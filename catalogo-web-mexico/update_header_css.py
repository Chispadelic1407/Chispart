#!/usr/bin/env python3
with open('src/components/Header.css', 'a', encoding='utf-8') as f:
    f.write('''
/* Tour Button */
.tour-start-btn {
  background-color: #ffd700;
  color: #333;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
}

.tour-start-btn:hover {
  background-color: #ffed4e;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.5);
}

.hero-highlight {
  color: #ffd700;
  font-weight: 600;
  margin-top: 0.5rem;
  font-size: 1.1rem;
  animation: glow 2s ease-in-out infinite;
}

@keyframes glow {
  0%, 100% {
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
  }
  50% {
    text-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
  }
}
''')
print("✓ Estilos agregados al Header")
