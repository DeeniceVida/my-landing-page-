async function loadProducts(){const r=await fetch('products.json');return r.json();}
let PRODUCTS=[];let CART=[];
function formatKES(n){return 'Ksh '+Number(n).toLocaleString('en-KE');}
function renderProducts(products){const grid=document.getElementById('productGrid');grid.innerHTML='';products.forEach(p=>{const a=document.createElement('a');a.href='product.html?id='+encodeURIComponent(p.id);a.className='card-link';a.innerHTML=`<article class="card"><img loading="lazy" src="${p.images[0]}" alt="${p.title}"/><div class="title">${p.title}</div><div class="price">${formatKES(p.price)}</div><div class="muted">${p.short}</div></article>`;grid.appendChild(a);});}
function initOffers(){const slider=document.getElementById('offersSlider');const dots=document.getElementById('offerDots');const slides=slider.children;let idx=0;for(let i=0;i<slides.length;i++){const b=document.createElement('button');b.addEventListener('click',()=>{idx=i;move();});dots.appendChild(b);}function move(){slider.style.transform=`translateX(-${idx*100}%)`;Array.from(dots.children).forEach((d,di)=>d.classList.toggle('active',di===idx));}document.getElementById('prevOffer').addEventListener('click',()=>{idx=(idx-1+slides.length)%slides.length;move();});document.getElementById('nextOffer').addEventListener('click',()=>{idx=(idx+1)%slides.length;move();});move();setInterval(()=>{idx=(idx+1)%slides.length;move();},6000);}
function initSearch(){const sToggle=document.getElementById('searchToggle');const sBox=document.getElementById('searchBox');const sInput=document.getElementById('searchInput');const sSuggest=document.getElementById('searchSuggest');const categories=['Phones Cases','Sunglasses','Beanies','NewEra caps','Powerbanks'];function showChips(){sSuggest.innerHTML='<div class="cat-chips">'+categories.map(c=>`<button class="cat-chip" data-cat="${c}">${c}</button>`).join('')+'</div><div class="results"></div>';sSuggest.style.display='block';Array.from(sSuggest.querySelectorAll('.cat-chip')).forEach(ch=>{ch.addEventListener('click',()=>{sInput.value=ch.dataset.cat;filterResults();});});}
sToggle.addEventListener('click',()=>{sBox.classList.toggle('hidden');const input=document.getElementById('searchInput');if(!sBox.classList.contains('hidden')){input.classList.add('expanded');input.focus();showChips();}else{input.classList.remove('expanded');sSuggest.style.display='none';}});sInput.addEventListener('focus',()=>{sInput.classList.add('expanded');showChips();});sInput.addEventListener('blur',()=>{setTimeout(()=>{sSuggest.style.display='none';},200);});function filterResults(){const q=sInput.value.toLowerCase().trim();const resDiv=sSuggest.querySelector('.results');const results=PRODUCTS.filter(p=>(p.title+' '+(p.short||'')).toLowerCase().includes(q)).slice(0,6);resDiv.innerHTML=results.map(r=>`<div class="suggestion" data-id="${r.id}"><img src="${r.images[0]}"/><div><strong>${r.title}</strong><div>${formatKES(r.price)}</div></div></div>`).join('');Array.from(resDiv.querySelectorAll('.suggestion')).forEach(el=>{el.addEventListener('click',()=>{window.location.href='product.html?id='+el.dataset.id;});});}sInput.addEventListener('input',filterResults);}

// Mobile navigation functionality
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const closeMenu = document.querySelector('.close-menu');
  
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.add('active');
    });
    
    closeMenu.addEventListener('click', () => {
      mobileNav.classList.remove('active');
    });
    
    // Close menu when clicking on a link
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
      });
    });
  }
}

// Touch swipe for offers slider
function initTouchSwipe() {
  const slider = document.getElementById('offersSlider');
  if (!slider) return;
  
  let startX = 0;
  let currentX = 0;
  let isSwiping = false;
  
  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
  });
  
  slider.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;
    currentX = e.touches[0].clientX;
  });
  
  slider.addEventListener('touchend', () => {
    if (!isSwiping) return;
    isSwiping = false;
    
    const diff = startX - currentX;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
      const slides = slider.children;
      let idx = Math.round(parseInt(slider.style.transform.replace('translateX(-', '').replace('%)', '')) / 100);
      
      if (diff > 0) {
        // Swipe left - next
        idx = (idx + 1) % slides.length;
      } else {
        // Swipe right - previous
        idx = (idx - 1 + slides.length) % slides.length;
      }
      
      slider.style.transform = `translateX(-${idx * 100}%)`;
      Array.from(document.getElementById('offerDots').children).forEach((d, di) => 
        d.classList.toggle('active', di === idx)
      );
    }
  });
}

document.addEventListener('DOMContentLoaded',async()=>{PRODUCTS=await loadProducts();CART=JSON.parse(localStorage.getItem('deenice_cart')||'[]');document.getElementById('cartCount').textContent=CART.length;renderProducts(PRODUCTS);initOffers();initSearch();initMobileNav();initTouchSwipe();const help=document.getElementById('helpCenter');if(help)help.addEventListener('click',e=>{e.preventDefault();window.tidioChatApi&&window.tidioChatApi.open();});});