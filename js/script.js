/* js/script.js - Site interactivity */

// MOBILE NAV TOGGLE
(function(){
  const menu = document.getElementById('menuBtn');
  const nav = document.getElementById('navLinks');
  if(menu && nav){
    menu.addEventListener('click', () => {
      const isShown = nav.style.display === 'flex';
      nav.style.display = isShown ? 'none' : 'flex';
      nav.style.flexDirection = 'column';
    });
  }
})();

// PREFILL CHECKOUT
function prefillCheckout(name, price){
  try {
    sessionStorage.setItem('checkout_item', name);
    sessionStorage.setItem('checkout_price', price);
  } catch(e) { /* ignore */ }
}

// REDIRECT TO 404 (demo)
function redirect404(e){
  if(e) e.preventDefault();
  window.location.href = '404.html';
}

// REVEAL ON SCROLL
(function(){
  const els = document.querySelectorAll('.card, .price-card, .testimonial-card, .hero-title, .hero-sub');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if(en.isIntersecting){
        en.target.style.opacity = 1;
        en.target.style.transform = 'none';
      }
    });
  }, {threshold:0.12});
  els.forEach(el=>{
    el.style.opacity = 0;
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'all .7s cubic-bezier(.2,.9,.2,1)';
    obs.observe(el);
  });
})();
function redirect404(e){
  if(e) e.preventDefault();
  window.location.href = "404.html";
}

// Optional: prefill checkout plan (used from subscription cards)
function prefillCheckout(plan, price){
  localStorage.setItem("checkoutPlan", plan);
  localStorage.setItem("checkoutPrice", price);
  window.location.href = "checkout.html";
}
