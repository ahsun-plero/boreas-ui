// Header Navigation - Desktop and Mobile Menu
(function() {
  const header = document.getElementById('header');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');
  const mobileMenu = document.getElementById('mobile-menu');
  let scrollTimeout;
  let isMenuOpen = false;

  // Hamburger menu toggle
  hamburgerBtn.addEventListener('click', function() {
    isMenuOpen = !isMenuOpen;
    mobileMenu.classList.toggle('hidden');
    hamburgerIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
    hamburgerBtn.setAttribute('aria-expanded', isMenuOpen);

    // Apply scrolled background when menu is open
    if (isMenuOpen) {
      header.classList.remove('bg-signature/70');
      header.classList.add('bg-signature/95', 'shadow-lg');
    } else {
      // Restore scroll state
      updateHeaderOnScroll();
    }
  });

  // Mobile ETFs dropdown toggle
  const mobileEtfBtn = document.getElementById('mobile-etf-btn');
  const mobileEtfMenu = document.getElementById('mobile-etf-menu');
  const mobileEtfArrow = document.querySelector('.mobile-etf-arrow');
  let isEtfDropdownOpen = false;

  mobileEtfBtn.addEventListener('click', function(e) {
    e.preventDefault();
    isEtfDropdownOpen = !isEtfDropdownOpen;
    mobileEtfMenu.classList.toggle('hidden');
    mobileEtfArrow.classList.toggle('rotate-180');
    mobileEtfBtn.setAttribute('aria-expanded', isEtfDropdownOpen);
  });

  // Keyboard navigation for desktop dropdown
  const desktopEtfBtn = document.getElementById('desktop-etf-btn');
  if (desktopEtfBtn) {
    desktopEtfBtn.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
      }
      if (e.key === 'Escape') {
        this.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Close menu when clicking a link
  const mobileLinks = mobileMenu.querySelectorAll('a:not(#mobile-etf-btn)');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      isMenuOpen = false;
      mobileMenu.classList.add('hidden');
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      // Restore scroll state
      updateHeaderOnScroll();
    });
  });

  function updateHeaderOnScroll() {
    const isScrolled = window.scrollY > 50;

    if (isScrolled) {
      header.classList.remove('bg-signature/70');
      header.classList.add('bg-signature/95', 'shadow-lg');
    } else {
      // Only change to lighter background if menu is not open
      if (!isMenuOpen) {
        header.classList.add('bg-signature/70');
        header.classList.remove('bg-signature/95', 'shadow-lg');
      }
    }
  }

  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateHeaderOnScroll, 10);
  }, { passive: true });

  // Initial check
  updateHeaderOnScroll();
})();
