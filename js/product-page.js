(async () => {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const res = await fetch('data/products.json');
  const data = await res.json();
  const p = data.find(x => x.id === id) || data[0];
  const container = document.getElementById('product-page');

  container.innerHTML = `
    <div class="product-page-card">
      <div class="product-slideshow">
        <div class="product-main"><img id="main-image" src="${p.images[0]}" alt="${p.title}" style="width:100%;border-radius:12px"/></div>
        <div class="product-thumbs">
          ${p.images.map((im, idx) => `<img data-src="${im}" ${idx === 0 ? 'class="selected"' : ''} src="${im}" />`).join('')}
        </div>
      </div>
      <h2>${p.title}</h2>
      <div class="price">${p.price.toLocaleString()} ${p.currency}</div>
      <p><em>${p.description}</em></p>

      <div class="color-options">
        ${p.colors.map((c, idx) => `
          <div class="color-item">
            <div class="color-name">${c.name}</div>
            <div class="color-option ${idx === 0 ? 'selected' : ''}" data-img="${c.img}" data-name="${c.name}">
              <img src="${c.img}" alt="${c.name}">
            </div>
          </div>
        `).join('')}
      </div>

      <label>Quantity:
        <input id="qty" type="number" value="1" min="1" max="${p.stock}" />
      </label>

      <button id="add-cart" class="primary">Add to Cart</button>
    </div>
  `;

  // Thumbnail switching
  document.querySelectorAll('.product-thumbs img').forEach(img => {
    img.addEventListener('click', () => {
      document.getElementById('main-image').src = img.dataset.src;
      document.querySelectorAll('.product-thumbs img').forEach(i => i.classList.remove('selected'));
      img.classList.add('selected');
    });
  });

  // Color selection
  document.querySelectorAll('.color-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.color-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      const img = opt.dataset.img;
      document.getElementById('main-image').src = img;
    });
  });

  // Add to cart
  document.getElementById('add-cart').addEventListener('click', () => {
    const qty = Number(document.getElementById('qty').value || 1);
    const colorEl = document.querySelector('.color-option.selected');
    const color = colorEl ? colorEl.dataset.name : 'Default';
    const cart = JSON.parse(localStorage.getItem('de_cart') || '[]');
    cart.push({ id: p.id, title: p.title, price: p.price, currency: p.currency, qty, color });
    localStorage.setItem('de_cart', JSON.stringify(cart));
    alert('Added to cart');
    const badge = document.getElementById('cart-count');
    if (badge) badge.textContent = cart.length;
  });
})();