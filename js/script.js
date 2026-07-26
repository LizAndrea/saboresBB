const PHONES = [
            { id: 1, brand: 'Apple', model: 'iPhone 14 Pro', storage: '256GB', color: 'Deep Purple', condition: 'Like New', price: 749, original: 1099, image: 'https://image.qwenlm.ai/public_source/a5f461af-a234-4d00-a687-6981758f7da0/1f0bd2c03-5db8-45ce-9073-8f3b4ef13e2f.png', rating: 4.8, reviews: 124, seller: 'TechHub Store', battery: 92 },
            { id: 2, brand: 'Samsung', model: 'Galaxy S23 Ultra', storage: '512GB', color: 'Green', condition: 'Good', price: 699, original: 1199, image: 'https://image.qwenlm.ai/public_source/a5f461af-a234-4d00-a687-6981758f7da0/1aaee0531-b524-44db-856f-67f64ccaede1.png', rating: 4.7, reviews: 89, seller: 'MobileWorld', battery: 88 },
            { id: 3, brand: 'Google', model: 'Pixel 7 Pro', storage: '128GB', color: 'Obsidian', condition: 'Good', price: 399, original: 899, image: 'https://image.qwenlm.ai/public_source/a5f461af-a234-4d00-a687-6981758f7da0/1239a3dc4-c4e2-43be-a2d8-65797bda6e1f.png', rating: 4.6, reviews: 56, seller: 'PixelPros', battery: 85 },
            { id: 4, brand: 'Apple', model: 'iPhone 13', storage: '128GB', color: 'Blue', condition: 'Like New', price: 499, original: 799, image: 'https://image.qwenlm.ai/public_source/a5f461af-a234-4d00-a687-6981758f7da0/1c859835d-a427-4db5-a3da-dfd12fb081b1.png', rating: 4.7, reviews: 203, seller: 'TechHub Store', battery: 94 },
            { id: 5, brand: 'Samsung', model: 'Galaxy A54', storage: '128GB', color: 'White', condition: 'Like New', price: 279, original: 449, image: 'https://image.qwenlm.ai/public_source/a5f461af-a234-4d00-a687-6981758f7da0/126599bc1-1f0b-4dc4-b3d4-c4d34256306f.png', rating: 4.5, reviews: 42, seller: 'BudgetPhones', battery: 96 },
            { id: 6, brand: 'OnePlus', model: 'OnePlus 11', storage: '256GB', color: 'Green', condition: 'Good', price: 449, original: 699, image: 'https://image.qwenlm.ai/public_source/a5f461af-a234-4d00-a687-6981758f7da0/1709e5df7-08cd-466d-85b3-26ed5d56d5f7.png', rating: 4.6, reviews: 67, seller: 'OnePlusDirect', battery: 89 },
            { id: 7, brand: 'Apple', model: 'iPhone 15 Pro Max', storage: '256GB', color: 'Natural Titanium', condition: 'Like New', price: 999, original: 1199, image: 'https://image.qwenlm.ai/public_source/a5f461af-a234-4d00-a687-6981758f7da0/1f1e8f6ac-6be0-4efc-9c32-6879a55c3beb.png', rating: 4.9, reviews: 312, seller: 'PremiumTech', battery: 98 },
            { id: 8, brand: 'Xiaomi', model: '13 Pro', storage: '256GB', color: 'Ceramic White', condition: 'Good', price: 429, original: 899, image: 'https://image.qwenlm.ai/public_source/a5f461af-a234-4d00-a687-6981758f7da0/125dfc1a1-8ddf-45b3-bf6d-4c786ae2ff10.png', rating: 4.5, reviews: 38, seller: 'XiaomiOutlet', battery: 87 },
        ];

        let cart = [];
        let activeBrand = 'all';
        let searchQuery = '';

        function conditionBadge(c) {
            const cls = c === 'Like New' ? 'badge-like-new' : c === 'Good' ? 'badge-good' : 'badge-fair';
            return `<span class="${cls} text-xs font-semibold px-2.5 py-1 rounded-full">${c}</span>`;
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
                const discount = Math.round((1 - p.price / p.original) * 100);
                return `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 card-hover fade-in">
      <div class="relative bg-slate-50 p-4">
        <img src="${p.image}" class="w-full h-48 object-contain" alt="${p.model}" />
        <span class="absolute top-3 left-3 price-tag text-white text-xs font-bold px-2.5 py-1 rounded-full">-${discount}%</span>
        <button onclick="toggleWishlist(${p.id})" class="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow hover:scale-110 transition">
          <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
        </button>
      </div>
      <div class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-xs font-medium text-slate-500">${p.brand}</span>
          ${conditionBadge(p.condition)}
        </div>
        <h3 class="font-bold text-lg leading-tight">${p.model}</h3>
        <p class="text-sm text-slate-500 mt-1">${p.storage} · ${p.color}</p>
        <div class="flex items-center gap-1 mt-2 text-sm">
          <svg class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
          <span class="font-semibold">${p.rating}</span>
          <span class="text-slate-400">(${p.reviews})</span>
        </div>
        <div class="mt-4 flex items-end justify-between">
          <div>
            <div class="text-2xl font-bold text-slate-900">$${p.price}</div>
            <div class="text-xs text-slate-400 line-through">$${p.original}</div>
          </div>
          <div class="flex gap-2">
            <button onclick="openDetail(${p.id})" class="px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-sm font-medium">View</button>
            <button onclick="addToCart(${p.id})" class="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold">Add</button>
          </div>
        </div>
      </div>
    </div>`;
            }).join('');
        }

        function openDetail(id) {
            const p = PHONES.find(x => x.id === id);
            if (!p) return;
            const discount = Math.round((1 - p.price / p.original) * 100);
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
          <div><div class="text-3xl font-bold">$${p.price}</div><div class="text-sm text-slate-400 line-through">$${p.original} · Save ${discount}%</div></div>
        </div>
        <button onclick="addToCart(${p.id}); closeDetail();" class="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition">Add to Cart</button>
      </div>
    </div>`;
            document.getElementById('detailModal').classList.remove('hidden');
            document.getElementById('detailModal').classList.add('flex');
        }

        function closeDetail() {
            document.getElementById('detailModal').classList.add('hidden');
            document.getElementById('detailModal').classList.remove('flex');
        }

        function openSellModal() {
            document.getElementById('sellModal').classList.remove('hidden');
            document.getElementById('sellModal').classList.add('flex');
        }
        function closeSellModal() {
            document.getElementById('sellModal').classList.add('hidden');
            document.getElementById('sellModal').classList.remove('flex');
        }

        document.getElementById('sellForm').addEventListener('submit', function (e) {
            e.preventDefault();
            const brand = document.getElementById('sellBrand').value;
            const model = document.getElementById('sellModel').value;
            const storage = document.getElementById('sellStorage').value;
            const condition = document.getElementById('sellCondition').value;
            const price = Number(document.getElementById('sellPrice').value);
            const desc = document.getElementById('sellDesc').value;
            PHONES.unshift({ id: Date.now(), brand, model, storage, color: '—', condition, price, original: Math.round(price * 1.5), image: 'https://image.qwenlm.ai/public_source/a5f461af-a234-4d00-a687-6981758f7da0/1f0bd2c03-5db8-45ce-9073-8f3b4ef13e2f.png', rating: 0, reviews: 0, seller: 'You', battery: 0 });
            renderPhones();
            closeSellModal();
            this.reset();
            showToast('Listing published successfully!');
        });

        function addToCart(id) {
            const p = PHONES.find(x => x.id === id);
            if (!p) return;
            cart.push(p);
            updateCartUI();
            showToast(`${p.model} added to cart`);
        }

        function removeFromCart(idx) {
            cart.splice(idx, 1);
            updateCartUI();
        }

        function updateCartUI() {
            document.getElementById('cartCount').textContent = cart.length;
            const container = document.getElementById('cartItems');
            if (cart.length === 0) {
                container.innerHTML = '<div class="text-center text-slate-400 mt-10"><svg class="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg><p>Your cart is empty</p></div>';
            } else {
                container.innerHTML = cart.map((p, i) => `
      <div class="flex gap-3 py-3 border-b border-slate-100">
        <img src="${p.image}" class="w-16 h-16 object-contain bg-slate-50 rounded-lg" />
        <div class="flex-1">
          <div class="font-semibold text-sm">${p.brand} ${p.model}</div>
          <div class="text-xs text-slate-500">${p.storage} · ${p.condition}</div>
          <div class="font-bold mt-1">$${p.price}</div>
        </div>
        <button onclick="removeFromCart(${i})" class="self-start p-1 hover:bg-red-50 rounded text-red-400"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button>
      </div>`).join('');
            }
            const total = cart.reduce((s, p) => s + p.price, 0);
            document.getElementById('cartTotal').textContent = '$' + total;
        }

        function toggleCart() {
            const d = document.getElementById('cartDrawer');
            d.classList.toggle('hidden');
        }

        function checkout() {
            if (cart.length === 0) return;
            showToast('Order placed! Thank you 🎉');
            cart = [];
            updateCartUI();
            toggleCart();
        }

        function toggleWishlist(id) {
            showToast('Added to wishlist ❤️');
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

        renderPhones();
        updateCartUI();
