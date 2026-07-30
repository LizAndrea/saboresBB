import re
import json

with open('/opt/proyectos/saboresBioBio/saboresBB/productos.json', 'r', encoding='utf-8') as f:
    productos_json = f.read()

with open('/opt/proyectos/saboresBioBio/saboresBB/js/script.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace defaultDesc and PHONES
start_idx = content.find("const defaultDesc = `")
end_idx = content.find("];", start_idx) + 2
if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + "const PHONES = " + productos_json + ";\n" + content[end_idx:]

# Remove conditionBadge
content = re.sub(r'function conditionBadge\(c\).*?\}', '', content, flags=re.DOTALL)

# Update renderPhones function body (removing condition badge and color/original price)
content = content.replace('${conditionBadge(p.condition)}', '')
content = content.replace('${p.storage} · ${p.color}', '${p.storage}')
content = content.replace('<div class="text-xs text-slate-400 line-through">${p.original} Bs.</div>', '')

# Remove condition/price filters from filtering logic
content = re.sub(r'if \(cond !== \'all\' && p\.condition !== cond\) return false;\n', '', content)

# Update openDetail function body
content = content.replace('<div class="text-white/50 mb-1">Cantidad</div>', '<div class="text-white/50 mb-1">Presentación</div>')
# Remove Variedad block
content = re.sub(r'<div class="bg-white/5 p-3 rounded-xl border border-white/10">\s*<div class="text-white/50 mb-1">Variedad</div>\s*<div class="font-bold text-white">\$\{p\.color\}</div>\s*</div>', '', content)
# Remove Elaboración block
content = re.sub(r'<div class="bg-white/5 p-3 rounded-xl border border-white/10">\s*<div class="text-white/50 mb-1">Elaboración</div>\s*<div class="font-bold text-white">\$\{p\.condition\}</div>\s*</div>', '', content)
# Remove original price from openDetail
content = content.replace('<div class="text-lg text-white/40 line-through mb-1">${p.original}Bs.</div>', '')


with open('/opt/proyectos/saboresBioBio/saboresBB/js/script.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated script.js successfully!")
