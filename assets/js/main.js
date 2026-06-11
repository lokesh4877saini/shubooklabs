// assets/js/main.js - Optimized without any animations
(function() {
  'use strict';
  
  // DOM Elements
  let menuBtn = null;
  let mobileMenu = null;
  
  // Close mobile menu function
  function closeMobileMenu() {
    if (!mobileMenu) return;
    
    if (!mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }
  
  // Open mobile menu function
  function openMobileMenu() {
    if (!mobileMenu) return;
    
    if (mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }
  
  // Toggle mobile menu
  function toggleMobileMenu(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (!mobileMenu) return;
    
    if (mobileMenu.classList.contains('hidden')) {
      openMobileMenu();
    } else {
      closeMobileMenu();
    }
  }
  
  // Initialize menu functionality
  function initMobileMenu() {
    menuBtn = document.getElementById('menuBtn');
    mobileMenu = document.getElementById('mobileMenu');
    
    if (!menuBtn || !mobileMenu) return;
    
    // Menu button click handler
    menuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking on any link inside
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }
  
  // Close menu when clicking outside
  function initOutsideClick() {
    document.addEventListener('click', function(event) {
      if (!mobileMenu || mobileMenu.classList.contains('hidden')) return;
      
      const isClickInside = mobileMenu.contains(event.target) || (menuBtn && menuBtn.contains(event.target));
      if (!isClickInside) {
        closeMobileMenu();
      }
    });
  }
  
  // Initialize everything
  function init() {
    initMobileMenu();
    initOutsideClick();
  }
  
  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(init, 100);
    });
  } else {
    setTimeout(init, 100);
  }
  
  // Wait for CSS to be loaded
  if (document.body && document.body.classList) {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class' && document.body.classList.contains('css-loaded')) {
          const mobileMenu = document.getElementById('mobileMenu');
          if (mobileMenu && mobileMenu.classList.contains('hidden')) {
            observer.disconnect();
          }
        }
      });
    });
    
    observer.observe(document.body, { attributes: true });
  }
})();