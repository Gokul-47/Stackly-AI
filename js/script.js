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
function prefillCheckout(plan, price){
  try {
    localStorage.setItem("checkoutPlan", plan);
    localStorage.setItem("checkoutPrice", price);
    window.location.href = "checkout.html";
  } catch(e){ console.warn(e); }
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
        obs.unobserve(en.target);
      }
    });
  }, {threshold:0.12});

  els.forEach(el=>{
    if(el instanceof Element){
      el.style.opacity = 0;
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'all .7s cubic-bezier(.2,.9,.2,1)';
      obs.observe(el);
    }
  });
})();

// COUNTER ANIMATION
const counters = document.querySelectorAll(".num");
let started = false;

function startCounter() {
  counters.forEach(el => {
    let start = 0;
    let end = parseInt(el.getAttribute("data-val"));
    const increment = Math.ceil(end / 100);
    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        el.textContent = end;
        clearInterval(counter);
      } else el.textContent = start;
    }, 20);
  });
}

const statsEl = document.querySelector(".stats");
if(statsEl){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        startCounter();
        started = true;
        observer.unobserve(statsEl);
      }
    });
  }, { threshold: 0.5 });
  observer.observe(statsEl);
}


// Dropdown click toggle
document.querySelectorAll('.drop-btn').forEach(btn => {
  let clickedOnce = false; // track first click

  btn.addEventListener('click', function(e){
    e.preventDefault(); // prevent default navigation
    const dropdown = btn.nextElementSibling; // the dropdown-content div

    if(!clickedOnce){
      // First click: show dropdown
      if(dropdown) dropdown.style.display = 'block';
      clickedOnce = true;

      // Close dropdown if user clicks outside
      document.addEventListener('click', function handler(ev){
        if(!btn.contains(ev.target) && !dropdown.contains(ev.target)){
          dropdown.style.display = 'none';
          clickedOnce = false;
          document.removeEventListener('click', handler);
        }
      });

    } else {
      // Second click: navigate
      window.location.href = btn.href;
    }
  });
});
