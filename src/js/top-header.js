// Top Header - Modal Trigger and Scroll Background
(function() {
  const topHeader = document.getElementById('top-header');
  let scrollTimeout;

  function updateTopHeaderOnScroll() {
    const isScrolled = window.scrollY > 50;

    if (isScrolled) {
      topHeader.classList.remove('bg-white/20');
      topHeader.classList.add('bg-signature/95', 'backdrop-blur-sm', 'shadow-lg');
    } else {
      topHeader.classList.remove('bg-signature/95', 'backdrop-blur-sm', 'shadow-lg');
      topHeader.classList.add('bg-white/20');
    }
  }

  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateTopHeaderOnScroll, 10);
  }, { passive: true });

  // Initial check
  updateTopHeaderOnScroll();

  // Modal trigger handlers
  const modalTriggers = document.querySelectorAll('[data-open-modal]');
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      const modalId = this.dataset.openModal;
      const modal = document.getElementById(modalId);

      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('fixed');
        modal.dataset.modalOpen = 'true';
      }
    });
  });
})();
