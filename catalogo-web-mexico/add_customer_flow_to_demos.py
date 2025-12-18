#!/usr/bin/env python3
"""
Script to add customer flow mockup to all demo sites
"""

import os
import re

demos_config = {
    'chispart-app': {
        'siteName': 'CHISPART AI',
        'products': [
            {'id': 1, 'name': 'Plan Básico IA', 'price': 999, 'image': '🤖', 'category': 'Planes'},
            {'id': 2, 'name': 'Plan Pro IA', 'price': 1999, 'image': '⚡', 'category': 'Planes'},
            {'id': 3, 'name': 'Plan Enterprise', 'price': 4999, 'image': '🏢', 'category': 'Planes'},
            {'id': 4, 'name': 'Créditos IA Extra', 'price': 299, 'image': '💎', 'category': 'Créditos'},
            {'id': 5, 'name': 'Consultoría IA', 'price': 2499, 'image': '👨‍💼', 'category': 'Servicios'},
            {'id': 6, 'name': 'Integración Custom', 'price': 3999, 'image': '🔧', 'category': 'Servicios'}
        ]
    },
    'saas-dnd': {
        'siteName': 'SAAS-DND',
        'products': [
            {'id': 1, 'name': 'Plan Starter', 'price': 499, 'image': '🚀', 'category': 'Planes'},
            {'id': 2, 'name': 'Plan Business', 'price': 1499, 'image': '💼', 'category': 'Planes'},
            {'id': 3, 'name': 'Plan Enterprise', 'price': 3999, 'image': '🏢', 'category': 'Planes'},
            {'id': 4, 'name': 'Templates Premium', 'price': 299, 'image': '🎨', 'category': 'Add-ons'},
            {'id': 5, 'name': 'Componentes Extra', 'price': 199, 'image': '🧩', 'category': 'Add-ons'},
            {'id': 6, 'name': 'Soporte Priority', 'price': 999, 'image': '🎯', 'category': 'Servicios'}
        ]
    },
    'nova-legis-ai': {
        'siteName': 'NOVA LEGIS AI',
        'products': [
            {'id': 1, 'name': 'Consulta IA Básica', 'price': 299, 'image': '💬', 'category': 'Consultas'},
            {'id': 2, 'name': 'Análisis Legal IA', 'price': 899, 'image': '📊', 'category': 'Análisis'},
            {'id': 3, 'name': 'Plan Mensual Pro', 'price': 1999, 'image': '⭐', 'category': 'Planes'},
            {'id': 4, 'name': 'Redacción Documentos', 'price': 599, 'image': '📝', 'category': 'Documentos'},
            {'id': 5, 'name': 'Asesoría 24/7', 'price': 2999, 'image': '🌐', 'category': 'Premium'},
            {'id': 6, 'name': 'Integración WhatsApp', 'price': 499, 'image': '📱', 'category': 'Integraciones'}
        ]
    },
    'escuela-idiomas': {
        'siteName': 'Escuela de Idiomas',
        'products': [
            {'id': 1, 'name': 'Curso Inglés Básico', 'price': 1999, 'image': '🇬🇧', 'category': 'Cursos'},
            {'id': 2, 'name': 'Curso Francés', 'price': 2499, 'image': '🇫🇷', 'category': 'Cursos'},
            {'id': 3, 'name': 'Curso Alemán', 'price': 2499, 'image': '🇩🇪', 'category': 'Cursos'},
            {'id': 4, 'name': 'Clases Particulares', 'price': 499, 'image': '👨‍🏫', 'category': 'Clases'},
            {'id': 5, 'name': 'Certificación TOEFL', 'price': 3999, 'image': '📜', 'category': 'Certificaciones'},
            {'id': 6, 'name': 'Material Didáctico', 'price': 299, 'image': '📚', 'category': 'Materiales'}
        ]
    },
    'facturacion-template': {
        'siteName': 'Sistema de Facturación',
        'products': [
            {'id': 1, 'name': 'Plan Básico', 'price': 299, 'image': '📄', 'category': 'Planes'},
            {'id': 2, 'name': 'Plan Profesional', 'price': 799, 'image': '💼', 'category': 'Planes'},
            {'id': 3, 'name': 'Plan Enterprise', 'price': 1999, 'image': '🏢', 'category': 'Planes'},
            {'id': 4, 'name': 'Timbres Extra', 'price': 99, 'image': '🎫', 'category': 'Add-ons'},
            {'id': 5, 'name': 'Soporte Premium', 'price': 499, 'image': '🎯', 'category': 'Servicios'},
            {'id': 6, 'name': 'Integración Contable', 'price': 999, 'image': '🔗', 'category': 'Integraciones'}
        ]
    },
    'tarot-app': {
        'siteName': 'Tarot App',
        'products': [
            {'id': 1, 'name': 'Lectura Básica', 'price': 199, 'image': '🔮', 'category': 'Lecturas'},
            {'id': 2, 'name': 'Lectura Completa', 'price': 499, 'image': '✨', 'category': 'Lecturas'},
            {'id': 3, 'name': 'Consulta Personalizada', 'price': 899, 'image': '🌟', 'category': 'Premium'},
            {'id': 4, 'name': 'Pack 5 Lecturas', 'price': 799, 'image': '🎴', 'category': 'Packs'},
            {'id': 5, 'name': 'Membresía Mensual', 'price': 1299, 'image': '👑', 'category': 'Membresías'},
            {'id': 6, 'name': 'Guía Espiritual', 'price': 1999, 'image': '🕉️', 'category': 'Servicios'}
        ]
    }
}

def add_customer_flow(demo_name, config):
    html_file = f'/vercel/sandbox/catalogo-web-mexico/public/demos/{demo_name}/index.html'
    
    if not os.path.exists(html_file):
        print(f"⚠️  Skipping {demo_name} - index.html not found")
        return
    
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if already added
    if 'customer-flow-mockup.js' in content:
        print(f"✓ {demo_name} - Already has customer flow")
        return
    
    # Build products JavaScript array
    products_js = '[\n'
    for product in config['products']:
        products_js += f"""                {{
                    id: {product['id']},
                    name: '{product['name']}',
                    price: {product['price']},
                    image: '{product['image']}',
                    category: '{product['category']}'
                }},\n"""
    products_js += '            ]'
    
    # Build the script to add
    script_to_add = f"""    <script src="../shared/customer-flow-mockup.js"></script>
    <script src="script.js"></script>
    <script>
        // Initialize customer flow mockup for {config['siteName']}
        window.customerFlow = new CustomerFlowMockup({{
            siteName: '{config['siteName']}',
            currency: 'MXN',
            products: {products_js}
        }});
    </script>
</body>
</html>"""
    
    # Replace the closing script tag
    pattern = r'    <script src="script\.js"></script>\s*</body>\s*</html>'
    
    if re.search(pattern, content):
        new_content = re.sub(pattern, script_to_add, content)
        
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✓ {demo_name} - Customer flow added successfully")
    else:
        print(f"⚠️  {demo_name} - Could not find pattern to replace")

def main():
    print("🚀 Adding customer flow mockup to demo sites...\n")
    
    for demo_name, config in demos_config.items():
        add_customer_flow(demo_name, config)
    
    print("\n✅ Done!")

if __name__ == '__main__':
    main()
