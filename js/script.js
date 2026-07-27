const PHONES = [
  { id: 1, brand: 'oro', model: 'Torta de Frambuesa', storage: '12 Porciones', color: 'Frambuesa', condition: 'Artesanal', price: 25, original: 30, image: 'assets/images/productos/producto (1).jpg', rating: 4.9, reviews: 124, seller: 'Pastelería Doña Rosa', battery: 100 },
  { id: 2, brand: 'harina', model: 'Pan de Masa Madre', storage: '1 Kg', color: 'Integral', condition: 'Orgánico', price: 8, original: 10, image: 'assets/images/productos/producto (2).jpg', rating: 4.8, reviews: 89, seller: 'El Horno', battery: 100 },
  { id: 3, brand: 'frescor', model: 'Mermelada de Mora', storage: '500g', color: 'Mora', condition: 'Artesanal', price: 6, original: 8, image: 'assets/images/productos/producto (3).jpg', rating: 4.7, reviews: 56, seller: 'Conservas del Sur', battery: 100 },
  { id: 4, brand: 'aceite', model: 'Café Tostado Premium', storage: '250g', color: 'Tueste Medio', condition: 'Orgánico', price: 12, original: 15, image: 'assets/images/productos/producto (4).jpg', rating: 4.9, reviews: 203, seller: 'Café Biobío', battery: 100 },
  { id: 5, brand: 'oro', model: 'Kuchen de Nuez', storage: '8 Porciones', color: 'Nuez y Manjar', condition: 'Tradicional', price: 18, original: 22, image: 'assets/images/productos/producto (5).jpg', rating: 4.8, reviews: 42, seller: 'Pastelería Alemana', battery: 100 },
  { id: 6, brand: 'harina', model: 'Jugo Natural Arándano', storage: '1 Litro', color: 'Arándano', condition: 'Orgánico', price: 5, original: 7, image: 'assets/images/productos/producto (6).jpg', rating: 4.6, reviews: 67, seller: 'Jugos del Valle', battery: 100 },
  { id: 7, brand: 'frescor', model: 'Torta de Frambuesa', storage: '12 Porciones', color: 'Frambuesa', condition: 'Artesanal', price: 25, original: 30, image: 'assets/images/productos/producto (7).jpg', rating: 4.9, reviews: 124, seller: 'Pastelería Doña Rosa', battery: 100 },
  { id: 8, brand: 'aceite', model: 'Pan de Masa Madre', storage: '1 Kg', color: 'Integral', condition: 'Orgánico', price: 8, original: 10, image: 'assets/images/productos/producto (8).jpg', rating: 4.8, reviews: 89, seller: 'El Horno', battery: 100 },
  { id: 9, brand: 'oro', model: 'Mermelada de Mora', storage: '500g', color: 'Mora', condition: 'Artesanal', price: 6, original: 8, image: 'assets/images/productos/producto (9).jpg', rating: 4.7, reviews: 56, seller: 'Conservas del Sur', battery: 100 },
  { id: 10, brand: 'harina', model: 'Café Tostado Premium', storage: '250g', color: 'Tueste Medio', condition: 'Orgánico', price: 12, original: 15, image: 'assets/images/productos/producto (1).jpg', rating: 4.9, reviews: 203, seller: 'Café Biobío', battery: 100 },
  { id: 11, brand: 'frescor', model: 'Kuchen de Nuez', storage: '8 Porciones', color: 'Nuez y Manjar', condition: 'Tradicional', price: 18, original: 22, image: 'assets/images/productos/producto (2).jpg', rating: 4.8, reviews: 42, seller: 'Pastelería Alemana', battery: 100 },
  { id: 12, brand: 'aceite', model: 'Jugo Natural Arándano', storage: '1 Litro', color: 'Arándano', condition: 'Orgánico', price: 5, original: 7, image: 'assets/images/productos/producto (3).jpg', rating: 4.6, reviews: 67, seller: 'Jugos del Valle', battery: 100 },
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
  document.getElementById('detailTitle').textContent = p.model;
  document.getElementById('detailContent').innerHTML = `
    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-slate-50 rounded-xl p-6 flex items-center justify-center">
        <img src="${p.image}" class="max-h-80 object-contain" alt="${p.model}" />
      </div>
      <div>
        <div class="flex items-center gap-2 mb-3">
          <span class="text-sm text-slate-500">${p.brand}</span>
          ${conditionBadge(p.condition)}
        </div>
        <h2 class="text-2xl font-bold">${p.model}</h2>
        <div class="flex items-center gap-2 mt-2">
          <div class="flex"><svg class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg><svg class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg><svg class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg><svg class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg><svg class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0......"/></svg></div>
          <span class="font-semibold">${p.rating}</span><span class="text-slate-400 text-sm">(${p.reviews} reviews)</span>
        </div>
        <div class="mt-6 space-y-3">
          <div class="flex justify-between py-2 border-b border-slate-100"><span class="text-slate-500">Storage</span><span class="font-medium">${p.storage}</span></div>
          <div class="flex justify-between py-2 border-b border-slate-100"><span class="text-slate-500">Color</span><span class="font-medium">${p.color}</span></div>
          <div class="flex justify-between py-2 border-b border-slate-100"><span class="text-slate-500">Condition</span><span class="font-medium">${p.condition}</span></div>
          <div class="flex justify-between py-2 border-b border-slate-100"><span class="text-slate-500">Battery Health</span><span class="font-medium">${p.battery}%</span></div>
          <div class="flex justify-between py-2 border-b border-slate-100"><span class="text-slate-500">Seller</span><span class="font-medium">${p.seller}</span></div>
        </div>
        <div class="mt-6 flex items-end gap-3">
          <div><div class="text-3xl font-bold">$${p.price}</div><div class="text-sm text-slate-400 line-through">$${p.original}</div></div>
        </div>
        <button id="btnModalOrder" data-id="${p.id}" class="w-full mt-4 bg-soft-terracotta hover:bg-deep-coffee text-white font-semibold py-3 rounded-xl transition">Pedir por WhatsApp</button>
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
