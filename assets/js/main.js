// assets/js/main.js
document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function(e) {
      e.preventDefault();
      // Toggle the hidden class
      if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.style.animation = 'slideDown 0.3s ease-out';
        // Add overflow hidden to body to prevent scrolling when menu is open
        document.body.style.overflow = 'hidden';
      } else {
        mobileMenu.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(function() {
          mobileMenu.classList.add('hidden');
          mobileMenu.style.animation = '';
          // Restore scrolling
          document.body.style.overflow = '';
        }, 300);
      }
    });

    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(function() {
          mobileMenu.classList.add('hidden');
          mobileMenu.style.animation = '';
          document.body.style.overflow = '';
        }, 300);
      });
    });
  }

  // Close mobile menu when clicking outside (optional)
  document.addEventListener('click', function(event) {
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      const isClickInside = mobileMenu.contains(event.target) || menuBtn.contains(event.target);
      if (!isClickInside) {
        mobileMenu.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(function() {
          mobileMenu.classList.add('hidden');
          mobileMenu.style.animation = '';
          document.body.style.overflow = '';
        }, 300);
      }
    }
  });
});