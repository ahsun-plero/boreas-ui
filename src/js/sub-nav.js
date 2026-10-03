// Sub-Navigation - Scroll Detection and Tab Switching
(function() {
  const subNav = document.getElementById('sub-nav');
  if (!subNav) return;

  const tabs = subNav.querySelectorAll('.sub-nav-tab');
  let scrollTimeout;
  let isManualClick = false;

  // Check if we're in mobile (SM) view
  function isMobileView() {
    return window.innerWidth < 768; // MD breakpoint is 768px
  }

  // Handle tab clicks for smooth scrolling
  tabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      isManualClick = true;

      const sectionId = this.getAttribute('data-section-id');
      const section = document.getElementById(sectionId);

      if (section) {
        // Calculate offset: top of section minus sub-nav height (approximately 60px)
        const subNavHeight = subNav.offsetHeight;
        const offset = section.offsetTop - subNavHeight;

        // Smooth scroll to section
        window.scrollTo({
          top: offset,
          behavior: 'smooth'
        });

        // Update active tab
        setTimeout(() => {
          updateActiveTab(sectionId);
          isManualClick = false;
        }, 100);
      }
    });
  });

  // Update active tab based on scroll position
  function updateActiveTab(activeId) {
    const mobile = isMobileView();

    tabs.forEach(tab => {
      const tabId = tab.getAttribute('data-tab-id');
      const isActive = tabId === activeId;
      const isMobileTab = tab.classList.contains('sub-nav-tab-sm');
      const isDesktopTab = tab.classList.contains('sub-nav-tab-md');

      // Skip tabs that aren't visible in current viewport
      if (mobile && !isMobileTab) return;
      if (!mobile && !isDesktopTab) return;

      // Remove all active/inactive classes first
      tab.classList.remove(
        'text-signature',
        'font-semibold',
        'border-signature',
        'border-transparent',
        'text-gray-600',
        'bg-gray-100',
        'bg-tint-signature'
      );

      if (isActive) {
        tab.classList.add('text-signature', 'font-semibold');

        if (isMobileTab) {
          // SM: pill-style active state - filled pill with tint background
          tab.classList.add('bg-tint-signature');
        } else if (isDesktopTab) {
          // MD/LG: underline-style active state
          tab.classList.add('border-signature');
        }
      } else {
        if (isMobileTab) {
          // SM: pill-style inactive state
          tab.classList.add('text-gray-600', 'bg-gray-100');
        } else if (isDesktopTab) {
          // MD/LG: underline-style inactive state
          tab.classList.add('text-gray-600', 'border-transparent');
        }
      }
    });
  }

  // Detect which section is currently in view
  function detectActiveSection() {
    if (isManualClick) return;

    const subNavHeight = subNav.offsetHeight;
    const scrollTop = window.scrollY + subNavHeight;

    let activeSection = null;

    // Find the section that starts closest to the current scroll position
    tabs.forEach(tab => {
      const sectionId = tab.getAttribute('data-section-id');
      const section = document.getElementById(sectionId);

      if (section) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        // Check if scroll position is within this section
        if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
          activeSection = sectionId;
        }
      }
    });

    // If no section found, use the first one that hasn't been passed
    if (!activeSection) {
      for (let tab of tabs) {
        const sectionId = tab.getAttribute('data-section-id');
        const section = document.getElementById(sectionId);

        if (section && section.offsetTop > scrollTop) {
          activeSection = sectionId;
          break;
        }
      }
    }

    // Fallback to first section
    if (!activeSection && tabs.length > 0) {
      activeSection = tabs[0].getAttribute('data-section-id');
    }

    if (activeSection) {
      updateActiveTab(activeSection);
    }
  }

  // Scroll event listener with debounce
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(detectActiveSection, 50);
  }, { passive: true });

  // Handle window resize to update styling
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Re-apply active styling in case viewport changed
      const activeTab = Array.from(tabs).find(t => t.classList.contains('font-semibold'));
      if (activeTab) {
        const activeId = activeTab.getAttribute('data-tab-id');
        updateActiveTab(activeId);
      }
    }, 100);
  }, { passive: true });

  // Initial detection on page load
  setTimeout(detectActiveSection, 300);
})();
