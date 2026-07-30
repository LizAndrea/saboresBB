import csv
import json

lines = set()
products = []

with open('/opt/proyectos/saboresBioBio/saboresBB/assets/BD/Plantilla_catalogo.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        if not row.get('ID'):
            continue
        try:
            id_val = int(row['ID'])
        except ValueError:
            continue
        
        linea = row.get('Linea', '').strip()
        if linea:
            lines.add(linea)
            
        presentations = []
        for i in range(1, 4):
            weight = row.get(f'Presentación {i} (Peso)', '').strip()
            price_str = row.get(f'Precio {i} (Bs.)', '').strip()
            if weight and price_str:
                presentations.append({'weight': weight, 'price': float(price_str)})
                
        # mapping to PHONES structure
        prod = {
            'id': id_val,
            'brand': linea,
            'model': row.get('Producto', '').strip(),
            'storage': row.get('Presentación 1 (Peso)', '').strip(),
            'price': float(row.get('Precio 1 (Bs.)', 0)) if row.get('Precio 1 (Bs.)', '').strip() else 0,
            'presentations': presentations,
            'image': f'assets/images/productos/{id_val}.jpg',
            'rating': 5.0,
            'reviews': 100,
            'seller': 'Sabores Biobío',
            'desc': f"<strong>Descripción:</strong> {row.get('Descripción Corta', '')}<br><br><strong>Detalles:</strong> {row.get('Ficha Expandida', '')}<br><br><strong>Uso/Recetas:</strong> {row.get('Modo de Uso / Preparación (Opcional)', '')} {row.get('Recetas', '')}"
        }
        products.append(prod)

with open('/opt/proyectos/saboresBioBio/saboresBB/categorias.json', 'w', encoding='utf-8') as f:
    json.dump(list(lines), f, ensure_ascii=False, indent=2)

with open('/opt/proyectos/saboresBioBio/saboresBB/productos.json', 'w', encoding='utf-8') as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

with open('/opt/proyectos/saboresBioBio/saboresBB/js/data.js', 'w', encoding='utf-8') as f:
    f.write('const PHONES = ')
    json.dump(products, f, ensure_ascii=False, indent=2)
    f.write(';')

print("Parsed successfully!")
