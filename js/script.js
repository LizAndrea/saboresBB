const defaultDesc = `<strong>Características:</strong> Producto elaborado con ingredientes 100% naturales, siguiendo recetas tradicionales de la región. Cuidadosamente seleccionado para garantizar la mejor calidad.
<br><br>
<strong>Beneficios:</strong> Alto contenido en nutrientes esenciales. Apoya el desarrollo sostenible y a los productores locales del Biobío. Sin preservantes ni colorantes artificiales.
<br><br>
<strong>Recetas y Usos:</strong> Ideal para disfrutar en el desayuno o la once. Puedes combinarlo con pan de masa madre, quesos maduros o simplemente disfrutarlo solo. ¡Dale un toque especial a tus comidas!`;

const PHONES = [
  { id: 1, brand: 'oro', model: 'Torta de Frambuesa', storage: '12 Porciones', color: 'Frambuesa', condition: 'Artesanal', price: 25, original: 30, image: 'assets/images/productos/producto (1).jpg', rating: 4.9, reviews: 124, seller: 'Pastelería Doña Rosa', battery: 100, desc: defaultDesc },
  { id: 2, brand: 'harina', model: 'Pan de Masa Madre', storage: '1 Kg', color: 'Integral', condition: 'Orgánico', price: 8, original: 10, image: 'assets/images/productos/producto (2).jpg', rating: 4.8, reviews: 89, seller: 'El Horno', battery: 100, desc: defaultDesc },
  { id: 3, brand: 'frescor', model: 'Mermelada de Mora', storage: '500g', color: 'Mora', condition: 'Artesanal', price: 6, original: 8, image: 'assets/images/productos/producto (3).jpg', rating: 4.7, reviews: 56, seller: 'Conservas del Sur', battery: 100, desc: defaultDesc },
  { id: 4, brand: 'aceite', model: 'Café Tostado Premium', storage: '250g', color: 'Tueste Medio', condition: 'Orgánico', price: 12, original: 15, image: 'assets/images/productos/producto (4).jpg', rating: 4.9, reviews: 203, seller: 'Café Biobío', battery: 100, desc: defaultDesc },
  { id: 5, brand: 'oro', model: 'Kuchen de Nuez', storage: '8 Porciones', color: 'Nuez y Manjar', condition: 'Tradicional', price: 18, original: 22, image: 'assets/images/productos/producto (5).jpg', rating: 4.8, reviews: 42, seller: 'Pastelería Alemana', battery: 100, desc: defaultDesc },
  { id: 6, brand: 'harina', model: 'Jugo Natural Arándano', storage: '1 Litro', color: 'Arándano', condition: 'Orgánico', price: 5, original: 7, image: 'assets/images/productos/producto (6).jpg', rating: 4.6, reviews: 67, seller: 'Jugos del Valle', battery: 100, desc: defaultDesc },
  { id: 7, brand: 'frescor', model: 'Torta de Frambuesa', storage: '12 Porciones', color: 'Frambuesa', condition: 'Artesanal', price: 25, original: 30, image: 'assets/images/productos/producto (7).jpg', rating: 4.9, reviews: 124, seller: 'Pastelería Doña Rosa', battery: 100, desc: defaultDesc },
  { id: 8, brand: 'aceite', model: 'Pan de Masa Madre', storage: '1 Kg', color: 'Integral', condition: 'Orgánico', price: 8, original: 10, image: 'assets/images/productos/producto (8).jpg', rating: 4.8, reviews: 89, seller: 'El Horno', battery: 100, desc: defaultDesc },
  { id: 9, brand: 'oro', model: 'Mermelada de Mora', storage: '500g', color: 'Mora', condition: 'Artesanal', price: 6, original: 8, image: 'assets/images/productos/producto (9).jpg', rating: 4.7, reviews: 56, seller: 'Conservas del Sur', battery: 100, desc: defaultDesc },
  { id: 10, brand: 'harina', model: 'Café Tostado Premium', storage: '250g', color: 'Tueste Medio', condition: 'Orgánico', price: 12, original: 15, image: 'assets/images/productos/producto (1).jpg', rating: 4.9, reviews: 203, seller: 'Café Biobío', battery: 100, desc: defaultDesc },
  { id: 11, brand: 'frescor', model: 'Kuchen de Nuez', storage: '8 Porciones', color: 'Nuez y Manjar', condition: 'Tradicional', price: 18, original: 22, image: 'assets/images/productos/producto (2).jpg', rating: 4.8, reviews: 42, seller: 'Pastelería Alemana', battery: 100, desc: defaultDesc },
  { id: 12, brand: 'aceite', model: 'Jugo Natural Arándano', storage: '1 Litro', color: 'Arándano', condition: 'Orgánico', price: 5, original: 7, image: 'assets/images/productos/producto (3).jpg', rating: 4.6, reviews: 67, seller: 'Jugos del Valle', battery: 100, desc: defaultDesc },
];


let activeBrand = 'all';
let searchQuery = '';

function conditionBadge(c) {
  return `<span class="bg-[#FDF3E7] text-[#6E5A4D] text-xs font-bold px-3 py-1 rounded-full">${c}</span>`;
}

function renderPhones() {
  const cond = document.getElementById('conditionFilter').value;
  const price = document.getElementById('priceFilter').value;
  const sort = document.getElementById('sortFilter').value;

  let filtered = PHONES.filter(p => {
    if (activeBrand !== 'all' && p.brand !== activeBrand) return false;
    if (cond !== 'all' && p.condition !== cond) return false;
    if (price !== 'all') {
      const [min, max] = price.split('-').map(Number);
      if (p.price < min || p.price > max) return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!p.brand.toLowerCase().includes(q) && !p.model.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  if (sort === 'priceLow') filtered.sort((a, b) => a.price - b.price);
  if (sort === 'priceHigh') filtered.sort((a, b) => b.price - a.price);

  const grid = document.getElementById('phoneGrid');
  const noRes = document.getElementById('noResults');
  if (filtered.length === 0) { grid.innerHTML = ''; noRes.classList.remove('hidden'); return; }
  noRes.classList.add('hidden');

  grid.innerHTML = filtered.map(p => {
    return `
    <div class="rounded-[24px] overflow-hidden shadow-lg border border-slate-100 card-hover fade-in flex flex-col h-[28rem] group relative bg-[#1A332C]">
      <!-- Image Container -->
      <div class="relative w-full h-[calc(100%-4.5rem)] overflow-hidden shrink-0">
        <img src="${p.image}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="${p.model}" />
        <!-- Gradient overlay for text readability -->
        <div class="absolute inset-0 bg-gradient-to-t from-[#1A332C] via-black/40 to-transparent"></div>
        
        <!-- Top Badge -->
        <div class="absolute top-4 left-4 z-10 drop-shadow-md">
          ${conditionBadge(p.condition)}
        </div>

        <!-- Content over image, centered like image 1 -->
        <div class="absolute bottom-5 left-0 right-0 z-10 flex flex-col items-center text-center px-5">
          
          <h3 class="font-bold text-2xl text-white leading-tight drop-shadow-lg mb-1">${p.model}</h3>
          <p class="text-[0.95rem] font-medium text-white/80">${p.storage} · ${p.color}</p>
          
          
          <!-- Price -->
          <div class="mt-2.5 flex items-end justify-center gap-3">
            <div class="text-2xl font-bold text-white leading-none drop-shadow-lg">${p.price}Bs.</div>
            <div class="text-sm text-white/60 line-through">${p.original}Bs.</div>
          </div>
        </div>
      </div>

      <!-- Bottom Buttons Area -->
      <div class="h-[4.5rem] w-full flex items-stretch mt-auto border-t border-white/10 z-20 relative bg-[#1A332C]">
        <button data-action="view" data-id="${p.id}" class="flex-1 flex items-center justify-center text-white/90 hover:text-white hover:bg-white/5 font-bold transition border-r border-white/10">
          Ver
        </button>
        <button data-action="order" data-id="${p.id}" class="flex-[1.5] flex items-center justify-center text-white font-bold transition hover:bg-white/10 gap-2">
          Pedir <span class="text-lg">→</span>
        </button>
      </div>
    </div>`;
  }).join('');
}

function openDetail(id) {
  const p = PHONES.find(x => x.id === id);
  if (!p) return;

  document.getElementById('detailContent').innerHTML = `
    <div class="flex flex-col md:flex-row h-full">
      <!-- Left side: Image -->
      <div class="md:w-1/2 relative bg-black/30 p-8 flex items-center justify-center min-h-[300px]">
        <img src="${p.image}" class="max-h-96 w-auto object-contain rounded-xl shadow-2xl transition-transform hover:scale-105 duration-500" alt="${p.model}" />
        <div class="absolute top-6 left-6 z-10 drop-shadow-md">
          ${conditionBadge(p.condition)}
        </div>
      </div>
      
      <!-- Right side: Content -->
      <div class="md:w-1/2 p-8 md:p-10 flex flex-col h-full bg-gradient-to-br from-[#1A332C] to-[#0f1f1a]">
        <div class="flex items-center gap-2 mb-3">
          <span class="text-sm text-white/60 font-medium uppercase tracking-wider">${p.brand}</span>
        </div>
        
        <h2 class="text-3xl md:text-4xl font-extrabold text-white mb-2 leading-tight">${p.model}</h2>
        
        <div class="flex items-center gap-2 mt-2 mb-6">
          
          <span class="font-bold text-white">${p.rating}</span>
          <span class="text-white/50 text-sm">(${p.reviews} reseñas)</span>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div class="bg-white/5 p-3 rounded-xl border border-white/10">
            <div class="text-white/50 mb-1">Cantidad</div>
            <div class="font-bold text-white">${p.storage}</div>
          </div>
          <div class="bg-white/5 p-3 rounded-xl border border-white/10">
            <div class="text-white/50 mb-1">Variedad</div>
            <div class="font-bold text-white">${p.color}</div>
          </div>
          <div class="bg-white/5 p-3 rounded-xl border border-white/10">
            <div class="text-white/50 mb-1">Elaboración</div>
            <div class="font-bold text-white">${p.condition}</div>
          </div>
          <div class="bg-white/5 p-3 rounded-xl border border-white/10">
            <div class="text-white/50 mb-1">Productor</div>
            <div class="font-bold text-white truncate" title="${p.seller}">${p.seller}</div>
          </div>
        </div>
        
        <!-- Large Text Area for description -->
        <div class="text-white/80 text-sm leading-relaxed mb-8 bg-white/5 p-5 rounded-xl border border-white/10 max-h-[160px] overflow-y-auto shadow-inner">
          ${p.desc}
        </div>

        <!-- Price and Order Button -->
        <div class="mt-auto pt-4 border-t border-white/10 flex items-center justify-between gap-6">
          <div class="flex items-end gap-3">
            <div class="text-4xl font-extrabold text-white drop-shadow-lg leading-none">${p.price}Bs.</div>
            <div class="text-lg text-white/40 line-through mb-1">${p.original}Bs.</div>
          </div>
          <button id="btnModalOrder" data-id="${p.id}" class="flex-1 bg-[#D37B60] hover:bg-[#E59275] text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group">
            Pedir
            <span class="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </div>`;

  document.getElementById('detailModal').classList.remove('hidden');
  document.getElementById('detailModal').classList.add('flex');
}

function closeDetail() {
  document.getElementById('detailModal').classList.add('hidden');
  document.getElementById('detailModal').classList.remove('flex');
}



function sendToWhatsApp(id) {
  const p = PHONES.find(x => x.id === id);
  if (!p) return;
  const phoneNumber = "77777777";
  const message = `Hola Sabores Biobío! Quiero hacer un pedido de: ${p.model} (${p.brand}) por $${p.price}.`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}




function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  setTimeout(() => t.classList.add('hidden'), 2500);
}

function scrollToListings() {
  const q = document.getElementById('heroSearch').value;
  searchQuery = q;
  renderPhones();
  document.getElementById('listings').scrollIntoView({ behavior: 'smooth' });
}

// Brand chips
document.querySelectorAll('.brand-chip').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.brand-chip').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeBrand = btn.dataset.brand;
    renderPhones();
  });
});

// Filters
['conditionFilter', 'priceFilter', 'sortFilter'].forEach(id => {
  document.getElementById(id).addEventListener('change', renderPhones);
});

// Hero search enter key
document.getElementById('heroSearch').addEventListener('keydown', e => {
  if (e.key === 'Enter') scrollToListings();
});

// Search Hero
const btnSearchHero = document.getElementById('btnSearchHero');
if (btnSearchHero) {
  btnSearchHero.addEventListener('click', scrollToListings);
}

// Global Order Button
const btnContactWhatsApp = document.getElementById('btnContactWhatsApp');
if (btnContactWhatsApp) {
  btnContactWhatsApp.addEventListener('click', () => sendToWhatsApp(1));
}

// Close Detail Modal
const btnCloseDetail = document.getElementById('btnCloseDetail');
if (btnCloseDetail) {
  btnCloseDetail.addEventListener('click', closeDetail);
}

// Event Delegation for Phone Grid (Ver / Pedir)
document.getElementById('phoneGrid').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;
  const action = btn.dataset.action;
  const id = Number(btn.dataset.id);

  if (action === 'view') {
    openDetail(id);
  } else if (action === 'order') {
    sendToWhatsApp(id);
  }
});

// Event Delegation for Detail Modal Order Button
document.getElementById('detailContent').addEventListener('click', (e) => {
  if (e.target.id === 'btnModalOrder') {
    sendToWhatsApp(Number(e.target.dataset.id));
    closeDetail();
  }
});

renderPhones();
