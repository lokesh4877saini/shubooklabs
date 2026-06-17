// cursor.js - Optimized custom cursor for desktop only
(function() {
  'use strict';

  // Only initialize on desktop (1024px+)
  if (window.innerWidth < 1024) return;

  const cursor = document.getElementById('cursorCircle');
  const rippleContainer = document.getElementById('rippleContainer');
  
  // Safety check - exit if elements don't exist
  if (!cursor || !rippleContainer) {
    console.warn('Cursor elements not found');
    return;
  }

  let mouseX = 0, mouseY = 0;
  let lastX = 0, lastY = 0;
  let throttleTimer = false;
  let isInitialized = false;
  
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
  
  function updateCursor(x, y) {
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';
  }
  
  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // INSTANT UPDATE - Pixel perfect tracking
    updateCursor(mouseX, mouseY);
    
    // Particles on movement (throttled for performance)
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
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, select, .whatsapp-btn, .mobile-menu-btn, [role="button"], .btn, .link'
    );
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover-mode'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover-mode'));
    });
  }
  
  function initCursor() {
    if (isInitialized) return;
    
    // Set initial position to center of viewport
    const initX = window.innerWidth / 2;
    const initY = window.innerHeight / 2;
    cursor.style.left = initX + 'px';
    cursor.style.top = initY + 'px';
    
    // Event listeners
    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mousedown', onMouseDown, { passive: true });
    
    // Setup hover effects
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupHovers);
    } else {
      setupHovers();
    }
    
    // Watch for dynamically added elements
    const observer = new MutationObserver(() => {
      setupHovers();
    });
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
    
    isInitialized = true;
  }
  
  // Handle window resize - reinitialize if desktop
  function handleResize() {
    if (window.innerWidth >= 1024) {
      if (!isInitialized) {
        initCursor();
      }
    } else {
      // Hide cursor on mobile
      cursor.style.display = 'none';
      rippleContainer.style.display = 'none';
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      isInitialized = false;
    }
  }
  
  // Initialize on desktop
  if (window.innerWidth >= 1024) {
    initCursor();
  }
  
  // Handle resize events
  window.addEventListener('resize', handleResize);
})();