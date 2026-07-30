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

  // Parse description into 3 parts
  const descParts = p.desc.split(/<br\s*\/?>\s*<br\s*\/?>/i);
  let col1 = '', col2 = '', col3 = '';
  
  descParts.forEach(part => {
    if (part.includes('Descripción:') || part.includes('Características:')) col1 = part.replace(/<strong>(Descripción|Características):<\/strong>\s*/i, '').trim();
    else if (part.includes('Detalles:') || part.includes('Beneficios:')) col2 = part.replace(/<strong>(Detalles|Beneficios):<\/strong>\s*/i, '').trim();
    else if (part.includes('Uso/Recetas:') || part.includes('Preparación:')) col3 = part.replace(/<strong>(Uso\/Recetas|Preparación):<\/strong>\s*/i, '').trim();
    else if (!col1) col1 = part;
  });

  document.getElementById('detailContent').innerHTML = `
    <div class="flex flex-col w-full h-full">
      
      <!-- TOP SECTION: Image and Basic Info -->
      <div class="flex flex-col md:flex-row relative">
        <!-- Left side: Image -->
        <div class="md:w-[45%] relative bg-white overflow-hidden min-h-[300px] md:min-h-full rounded-t-[24px] md:rounded-tr-none md:rounded-tl-[24px]">
          <img src="${p.image}" class="absolute inset-0 w-full h-full object-cover transition-transform hover:scale-105 duration-500" alt="${p.model}" />
          <!-- Top Badge -->
          <div class="absolute top-4 left-4 z-10">
            <span class="bg-[#FDF3E7] text-[#6E5A4D] text-xs font-bold px-3 py-1 rounded-full shadow-md">${p.brand}</span>
          </div>
        </div>
        
        <!-- Right side: Content -->
        <div class="md:w-[55%] p-5 md:p-10 flex flex-col bg-gradient-to-br from-[#1A332C] to-[#0f1f1a] md:rounded-tr-[24px]">
          <h2 class="text-2xl md:text-4xl font-extrabold text-white mb-3 md:mb-6 leading-tight mt-1 md:mt-2">${p.model}</h2>

          <div class="flex flex-col mb-4 md:mb-6">
            <div class="text-white/50 mb-2 text-xs md:text-sm">Opciones Disponibles</div>
            <div class="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
              ${p.presentations && p.presentations.length > 0 ? p.presentations.map(pres => `
                <div class="flex justify-between items-center bg-white/10 p-3 rounded-xl border border-white/10">
                  <div class="font-bold text-white text-sm md:text-base">${pres.weight}</div>
                  <div class="font-extrabold text-[#D37B60] text-sm md:text-base">${pres.price} Bs.</div>
                </div>
              `).join('') : `
                <div class="flex justify-between items-center bg-white/10 p-3 rounded-xl border border-white/10">
                  <div class="font-bold text-white text-sm md:text-base">${p.storage}</div>
                  <div class="font-extrabold text-[#D37B60] text-sm md:text-base">${p.price} Bs.</div>
                </div>
              `}
            </div>
            <div class="mt-3 bg-white/5 p-2 md:p-3 rounded-xl border border-white/10 flex flex-col justify-center text-xs md:text-sm">
              <div class="text-white/50 mb-0.5 md:mb-1">Productor</div>
              <div class="font-bold text-white truncate leading-tight" title="${p.seller}">${p.seller}</div>
            </div>
          </div>
          
          <!-- Price and Order Button -->
          <div class="mt-2 md:mt-auto pt-3 md:pt-4 border-t border-white/10 flex items-center justify-between gap-4 md:gap-6">
            <button id="btnModalOrder" data-id="${p.id}" class="w-full bg-[#D37B60] hover:bg-[#E59275] text-white font-bold py-3 md:py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group text-sm md:text-base">
              Pedir por WhatsApp
              <span class="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- BOTTOM SECTION: 3 Columns Details -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 p-5 md:p-10 bg-[#f8f9fa] rounded-b-[24px]">
        
        <!-- Column 1 -->
        <div class="flex flex-col gap-2 md:gap-3">
          <div class="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
            <div class="w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#8E3255] text-white flex items-center justify-center text-lg md:text-2xl font-bold shrink-0 shadow-md">1</div>
            <h3 class="text-base md:text-lg font-bold text-deep-coffee uppercase tracking-wide leading-tight">Ficha / Detalle</h3>
          </div>
          <div class="text-xs md:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap pl-10 md:pl-0">${col1 || 'Información no disponible.'}</div>
        </div>

        <!-- Column 2 -->
        <div class="flex flex-col gap-2 md:gap-3">
          <div class="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
            <div class="w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#8E3255] text-white flex items-center justify-center text-lg md:text-2xl font-bold shrink-0 shadow-md">2</div>
            <h3 class="text-base md:text-lg font-bold text-deep-coffee uppercase tracking-wide leading-tight">Cualidades</h3>
          </div>
          <div class="text-xs md:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap pl-10 md:pl-0">${col2 || 'Información no disponible.'}</div>
        </div>

        <!-- Column 3 -->
        <div class="flex flex-col gap-2 md:gap-3">
          <div class="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
            <div class="w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#8E3255] text-white flex items-center justify-center text-lg md:text-2xl font-bold shrink-0 shadow-md">3</div>
            <h3 class="text-base md:text-lg font-bold text-deep-coffee uppercase tracking-wide leading-tight">Recetas</h3>
          </div>
          <div class="text-xs md:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap pl-10 md:pl-0">${col3 || 'Información no disponible.'}</div>
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
  
  let optionsText = "";
  if (p.presentations && p.presentations.length > 0) {
    optionsText = "- Opciones:\n" + p.presentations.map(pres => `  * ${pres.weight} - ${pres.price} Bs.`).join('\n');
  } else {
    optionsText = `- Precio: ${p.price} Bs. (${p.storage})`;
  }
  
  const message = `¡Hola Sabores Biobío! Quiero hacer un pedido de:
- Producto: ${p.model}
- Variedad: ${p.brand}
${optionsText}
  
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
    <button class="brand-chip active flex-shrink-0 snap-start w-32 h-16 md:w-56 md:h-28 flex items-center justify-center rounded-[20px] bg-dark-olive text-white font-bold shadow-md hover:shadow-lg transition text-sm md:text-lg relative overflow-hidden" data-brand="all">
      <span class="relative z-10 text-center px-2">Todo</span>
    </button>
  `;

  const colors = ['bg-sage-olive', 'bg-soft-terracotta', 'bg-mauve-brown', 'bg-ice-grey'];
  
  brands.forEach((brand, idx) => {
    const bg = colors[idx % colors.length];
    html += `
      <button class="brand-chip flex-shrink-0 snap-start w-32 h-16 md:w-56 md:h-28 flex items-center justify-center rounded-[20px] ${bg} text-white font-bold shadow-md hover:shadow-lg transition text-sm md:text-lg relative overflow-hidden group" data-brand="${brand}">
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
