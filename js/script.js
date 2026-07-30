let activeBrand = 'all';
let searchQuery = '';

function renderPhones() {
  const sort = document.getElementById('sortFilter').value;

  let filtered = PHONES.filter(p => {
    if (activeBrand !== 'all' && p.brand !== activeBrand) return false;

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
    <div class="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-ice-grey card-hover fade-in flex flex-col h-full bg-white group cursor-pointer" data-action="view" data-id="${p.id}">
      
      <!-- Image Container (Clean background) -->
      <div class="relative w-full aspect-square overflow-hidden bg-gray-50 flex items-center justify-center shrink-0">
        <img src="${p.image}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="${p.model}" />
        
        <!-- Top Badge -->
        <div class="absolute top-2 left-2 z-10">
          <span class="bg-[#FDF3E7] text-[#6E5A4D] text-xs font-bold px-3 py-1 rounded-full">${p.brand}</span>
        </div>
      </div>

      <!-- Content Below Image -->
      <div class="p-2.5 sm:p-4 flex flex-col flex-grow">
        <h3 class="font-bold text-xs sm:text-base text-deep-coffee leading-tight mb-1 line-clamp-2">${p.model}</h3>
        <p class="text-[11px] sm:text-xs text-mauve-brown mb-2">${p.storage}</p>
        
        <!-- Price -->
        <div class="mt-auto flex items-center gap-2">
          <div class="text-base sm:text-xl font-extrabold text-soft-terracotta leading-none">${p.price} Bs.</div>
        </div>
      </div>

      <!-- Actions -->
      <div class="px-2.5 sm:px-4 pb-2.5 sm:pb-4 pt-0 grid grid-cols-2 gap-1.5 sm:gap-2">
        <button data-action="view" data-id="${p.id}" class="w-full py-1.5 sm:py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-xs sm:text-sm font-bold transition flex items-center justify-center relative z-20">
          Detalles
        </button>
        <button data-action="order" data-id="${p.id}" class="w-full py-1.5 sm:py-2 bg-sage-olive hover:bg-dark-olive text-white rounded-lg text-xs sm:text-sm font-bold transition flex items-center justify-center relative z-20">
          Comprar
          <svg class="w-3 h-3 ml-1 sm:ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
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
      <div class="md:w-1/2 relative bg-white overflow-hidden min-h-[300px] md:min-h-full rounded-t-[24px] md:rounded-tr-none md:rounded-l-[24px]">
        <img src="${p.image}" class="absolute inset-0 w-full h-full object-cover transition-transform hover:scale-105 duration-500" alt="${p.model}" />
        
        <!-- Top Badge -->
        <div class="absolute top-4 left-4 z-10">
          <span class="bg-[#FDF3E7] text-[#6E5A4D] text-xs font-bold px-3 py-1 rounded-full shadow-md">${p.brand}</span>
        </div>
      </div>
      
      <!-- Right side: Content -->
      <div class="md:w-1/2 p-8 md:p-10 flex flex-col h-full bg-gradient-to-br from-[#1A332C] to-[#0f1f1a]">
        <h2 class="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight mt-2">${p.model}</h2>

        <div class="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div class="bg-white/5 p-3 rounded-xl border border-white/10">
            <div class="text-white/50 mb-1">Presentación</div>
            <div class="font-bold text-white">${p.storage}</div>
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
  const message = `¡Hola Sabores Biobío! Quiero hacer un pedido de:
- Producto: ${p.model}
- Variedad: ${p.brand}
- Precio: ${p.price} Bs.
  
¿Podrían confirmarme la disponibilidad?`;
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
function renderBrands() {
  const brands = [...new Set(PHONES.map(p => p.brand))];
  const container = document.getElementById('brandChips');
  if (!container) return;

  let html = `
    <button class="brand-chip active flex-shrink-0 snap-start w-36 h-20 md:w-56 md:h-28 flex items-center justify-center rounded-[20px] bg-dark-olive text-white font-bold shadow-md hover:shadow-lg transition text-sm md:text-lg relative overflow-hidden" data-brand="all">
      <span class="relative z-10 text-center px-2">Todo</span>
    </button>
  `;

  const colors = ['bg-sage-olive', 'bg-soft-terracotta', 'bg-mauve-brown', 'bg-ice-grey'];
  
  brands.forEach((brand, idx) => {
    const bg = colors[idx % colors.length];
    html += `
      <button class="brand-chip flex-shrink-0 snap-start w-36 h-20 md:w-56 md:h-28 flex items-center justify-center rounded-[20px] ${bg} text-white font-bold shadow-md hover:shadow-lg transition text-sm md:text-lg relative overflow-hidden group" data-brand="${brand}">
        <div class="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/40"></div>
        <span class="relative z-10 drop-shadow-md text-center px-2 leading-tight">${brand}</span>
      </button>
    `;
  });

  container.innerHTML = html;

  document.querySelectorAll('.brand-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.brand-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeBrand = btn.dataset.brand;
      renderPhones();
    });
  });
}

// Filters
['sortFilter'].forEach(id => {
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
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const action = el.dataset.action;
  const id = Number(el.dataset.id);

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

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Close menu when clicking a link
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}


// Initialize
renderBrands();
renderPhones();
