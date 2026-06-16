/* cursor.js - Perfectly Synced Cursor (1:1 Tracking) */
(function() {
  if (window.innerWidth < 1024) return;

  const cursor = document.getElementById('cursorCircle');
  const rippleContainer = document.getElementById('rippleContainer');
  
  // PERFECT SYNC - No easing, instant tracking
  let mouseX = 0, mouseY = 0;
  
  function createParticle(x, y) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    const colors = ['#60A5FA', '#3B82F6', '#93C5FD'];
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    rippleContainer.appendChild(p);
    setTimeout(() => p.remove(), 500);
  }
  
  function createRipple(x, y) {
    const r = document.createElement('div');
    r.className = 'ripple';
    r.style.left = x + 'px';
    r.style.top = y + 'px';
    r.style.width = '40px';
    r.style.height = '40px';
    rippleContainer.appendChild(r);
    setTimeout(() => r.remove(), 600);
  }
  
  // DIRECT SYNC - No requestAnimationFrame needed
  function updateCursor(x, y) {
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';
  }
  
  let lastX = 0, lastY = 0;
  let throttleTimer = false;
  
  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // INSTANT UPDATE - Pixel perfect
    updateCursor(mouseX, mouseY);
    
    // Particles on movement
    if (!throttleTimer) {
      const dx = mouseX - lastX;
      const dy = mouseY - lastY;
      const speed = Math.sqrt(dx*dx + dy*dy);
      
      if (speed > 5) {
        const count = Math.min(Math.floor(speed / 3), 4);
        for (let i = 0; i < count; i++) {
          createParticle(
            mouseX + (Math.random() - 0.5) * 6,
            mouseY + (Math.random() - 0.5) * 6
          );
        }
      }
      
      lastX = mouseX;
      lastY = mouseY;
      throttleTimer = true;
      setTimeout(() => { throttleTimer = false; }, 30);
    }
  }
  
  function onMouseDown(e) {
    cursor.classList.add('click-effect');
    createRipple(e.clientX, e.clientY);
    setTimeout(() => cursor.classList.remove('click-effect'), 300);
  }
  
  function setupHovers() {
    document.querySelectorAll('a, button, input, .whatsapp-btn, .mobile-menu-btn, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover-mode'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover-mode'));
    });
  }
  
  // INIT
  // Set initial position to center
  const initX = window.innerWidth / 2;
  const initY = window.innerHeight / 2;
  cursor.style.left = initX + 'px';
  cursor.style.top = initY + 'px';
  
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mousedown', onMouseDown);
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupHovers);
  } else {
    setupHovers();
  }
  
  new MutationObserver(setupHovers).observe(document.body, { childList: true, subtree: true });
})();