// Header Navigation - Desktop and Mobile Menu
(function() {
  const header = document.getElementById('header');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');
  const mobileMenu = document.getElementById('mobile-menu');
  const topHeader = document.getElementById('top-header');
  const overlay = document.getElementById('mobile-menu-overlay');
  let isMenuOpen = false;

  function setMobileMenuOpen(open) {
    isMenuOpen = open;
    mobileMenu.classList.toggle('hidden', !open);
    overlay.classList.toggle('hidden', !open);
    hamburgerIcon.classList.toggle('hidden', open);
    closeIcon.classList.toggle('hidden', !open);
    hamburgerBtn.setAttribute('aria-expanded', open);
    topHeader.classList.toggle('bg-white/20', !open);
    topHeader.classList.toggle('bg-signature/95', open);

    if (open) {
      header.classList.remove('bg-transparent');
      header.classList.add('bg-signature/95', 'shadow-lg');
    } else {
      updateHeaderOnScroll();
    }
  }

  hamburgerBtn.addEventListener('click', function() {
    setMobileMenuOpen(!isMenuOpen);
  });

  overlay.addEventListener('click', function() {
    setMobileMenuOpen(false);
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
      setMobileMenuOpen(false);
    });
  });

  function updateHeaderOnScroll() {
    const isScrolled = window.scrollY > 50;

    if (isScrolled) {
      header.classList.remove('bg-transparent');
      header.classList.add('bg-signature/95', 'shadow-lg');
    } else {
      // Only change to transparent if menu is not open
      if (!isMenuOpen) {
        header.classList.add('bg-transparent');
        header.classList.remove('bg-signature/95', 'shadow-lg');
      }
    }
  }

  window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });

  // Initial check
  updateHeaderOnScroll();
})();
