document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.main-nav');

  if(hamburger && nav){
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      nav.classList.toggle('open');
      hamburger.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if(!e.target.closest('.site-header')) {
        nav.classList.remove('open');
        hamburger.classList.remove('open');
      }
    });
  }

  // Search toggle
  const searchToggle = document.getElementById('search-toggle');
  const searchBox = document.getElementById('search-box');
  const searchInput = document.getElementById('search-input');
  const suggestions = document.getElementById('search-suggestions');
  window._products_for_suggestions = window._products_for_suggestions || [];

  if (searchToggle && searchBox && searchInput) {
    searchToggle.addEventListener('click', () => {
      searchBox.classList.toggle('hidden');
      if (!searchBox.classList.contains('hidden')) {
        searchInput.focus();
        showInitialSuggestions();
      }
    });

    function showInitialSuggestions(){
      if(!suggestions) return;
      suggestions.innerHTML = '';
      const picks = (window._products_for_suggestions||[]).slice(0,6);
      picks.forEach(m=>{
        const r = document.createElement('div');
        r.className = 'suggestion';
        r.innerHTML = `<a href="product.html?id=${encodeURIComponent(m.id)}"><img src="${m.images[0]}" width="56" height="56" style="object-fit:cover;border-radius:6px;margin-right:8px"/>${m.title}</a>`;
        suggestions.appendChild(r);
      });
    }

    searchInput.addEventListener('input', (e)=>{
      const q = e.target.value.toLowerCase();
      suggestions.innerHTML = '';
      if(!q) return showInitialSuggestions();
      const matches = (window._products_for_suggestions||[]).filter(p=> (p.title+p.description).toLowerCase().includes(q)).slice(0,6);
      matches.forEach(m=>{
        const r = document.createElement('div');
        r.className = 'suggestion';
        r.innerHTML = `<a href="product.html?id=${encodeURIComponent(m.id)}"><img src="${m.images[0]}" width="56" height="56" style="object-fit:cover;border-radius:6px;margin-right:8px"/>${m.title}</a>`;
        suggestions.appendChild(r);
      });
    });
  }

  // Offers setup
  function setupOffers() {
    const slides = [
      { img: "https://i.postimg.cc/xT35t3WK/image.png" },
      { img: "https://i.postimg.cc/k4tGgwxc/image.png" },
      { img: "https://i.postimg.cc/zGzWBSLp/H752e9673ded14855b91e284d97ed781c-F.jpg" }
    ];
    const container = document.getElementById('offers-slider');
    const dots = document.getElementById('offers-dots');
    if (!container || !dots) return;

    slides.forEach((s, i) => {
      const d = document.createElement('div');
      d.className = 'slide';
      if (i === 0) d.classList.add('active');
      d.style.backgroundImage = `url('${s.img}')`;
      container.appendChild(d);
      const btn = document.createElement('button');
      btn.addEventListener('click', () => showSlide(i));
      dots.appendChild(btn);
    });

    let idx = 0;
    function showSlide(n) {
      const ss = container.querySelectorAll('.slide');
      ss.forEach((s, ii) => s.classList.toggle('active', ii === n));
      idx = n;
      refreshDots();
    }
    function refreshDots() {
      const btns = dots.querySelectorAll('button');
      btns.forEach((b, i) => b.style.opacity = i === idx ? 1 : 0.45);
    }
    function next() { showSlide((idx + 1) % slides.length); }
    setInterval(next, 6000);

    const prev = document.getElementById('offers-prev');
    const nextBtn = document.getElementById('offers-next');
    if(prev) prev.addEventListener('click', ()=> showSlide((idx-1+slides.length)%slides.length));
    if(nextBtn) nextBtn.addEventListener('click', ()=> showSlide((idx+1)%slides.length));
  }

  setupOffers();

  // Load products for grid and suggestions
  async function loadProducts(){
    try{
      const res = await fetch('data/products.json');
      const products = await res.json();
      window._products_for_suggestions = products;
      const grid = document.getElementById('product-grid');
      if(grid){
        products.slice(0,10).forEach(p=> {
          const el = document.createElement('a');
          el.className = 'product-card';
          el.href = `product.html?id=${encodeURIComponent(p.id)}`;
          el.innerHTML = `
            <img loading="lazy" src="${p.images[0]}" alt="${p.title}" />
            <h3>${p.title}</h3>
            <div class="price">${p.price.toLocaleString()} ${p.currency}</div>
          `;
          grid.appendChild(el);
        });
      }
      const badge = document.getElementById('cart-count');
      const cart = JSON.parse(localStorage.getItem('de_cart')||'[]');
      if(badge) badge.textContent = cart.length || 0;
    }catch(err){
      console.error('Failed loading products.json', err);
    }
  }

  loadProducts();
});
