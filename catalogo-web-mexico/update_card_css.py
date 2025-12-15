#!/usr/bin/env python3
with open('src/components/WebsiteCard.css', 'a', encoding='utf-8') as f:
    f.write('''
/* Quote Button */
.quote-btn {
  width: 100%;
  padding: 0.9rem;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #333;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1rem;
  margin-top: 1rem;
  box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
}

.quote-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255, 215, 0, 0.5);
  background: linear-gradient(135deg, #ffed4e 0%, #ffd700 100%);
}

.features li {
  padding-left: 0;
}

.features li::before {
  content: "";
  position: relative;
  left: 0;
}
''')
print("✓ Estilos del botón de cotización agregados")
