/**
 * Tabs Component State Management
 *
 * Handles initialization, state tracking, and helper functions for tab components.
 * The embedded script in tabs.ejs handles the primary interaction logic.
 * This module provides utilities for programmatic control and event coordination.
 */

(function() {
  'use strict';

  // Store instances for external access
  window.TabsManager = window.TabsManager || {};

  /**
   * Initialize all tabs on the page
   * Called on DOM ready or can be called manually for dynamically added tabs
   */
  function initializeAllTabs() {
    const tabContainers = document.querySelectorAll('.tabs-container');

    tabContainers.forEach(container => {
      const instanceId = container.id;
      if (!window.TabsManager[instanceId]) {
        window.TabsManager[instanceId] = {
          container: container,
          state: 'ready'
        };
      }
    });
  }

  /**
   * Get active tab for a specific tabs container
   * @param {string} containerId - ID of the tabs container
   * @returns {string|null} - Active tab ID or null
   */
  window.getActiveTab = function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return null;
    return container.dataset.activeTab || null;
  };

  /**
   * Set active tab programmatically
   * @param {string} containerId - ID of the tabs container
   * @param {string} tabId - ID of the tab to activate
   */
  window.setActiveTab = function(containerId, tabId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const tabButton = container.querySelector('[data-tab-id="' + tabId + '"][role="tab"]');
    if (!tabButton) return;

    // Simulate click to trigger all handlers
    tabButton.click();
  };

  /**
   * Get tabs configuration for a container
   * @param {string} containerId - ID of the tabs container
   * @returns {Array} - Array of tab objects with id, label properties
   */
  window.getTabsInfo = function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return [];

    const tabButtons = container.querySelectorAll('[role="tab"]');
    const tabs = [];

    tabButtons.forEach(btn => {
      tabs.push({
        id: btn.dataset.tabId,
        label: btn.textContent,
        isActive: btn.getAttribute('aria-selected') === 'true'
      });
    });

    return tabs;
  };

  /**
   * Listen for tab changes
   * Dispatches custom events on tab activation
   */
  function setupEventDispatchers() {
    const tabContainers = document.querySelectorAll('.tabs-container');

    tabContainers.forEach(container => {
      const originalData = container.dataset.activeTab;

      // Watch for changes to active tab
      const observer = new MutationObserver(() => {
        const currentActiveTab = container.dataset.activeTab;

        if (currentActiveTab !== originalData) {
          const tabsChangeEvent = new CustomEvent('tabsChange', {
            detail: {
              containerId: container.id,
              activeTab: currentActiveTab
            },
            bubbles: true
          });
          container.dispatchEvent(tabsChangeEvent);
        }
      });

      observer.observe(container, {
        attributes: true,
        attributeFilter: ['data-active-tab']
      });
    });
  }

  /**
   * Handle accessibility enhancements
   */
  function enhanceAccessibility() {
    const tabContainers = document.querySelectorAll('.tabs-container');

    tabContainers.forEach(container => {
      const tabList = container.querySelector('[role="tablist"]');

      if (tabList) {
        // Ensure tablist has proper attributes for screen readers
        if (!tabList.getAttribute('aria-label')) {
          tabList.setAttribute('aria-label', 'Tab navigation');
        }
      }
    });
  }

  /**
   * Initialize on DOM ready
   */
  function ready(callback) {
    if (document.readyState !== 'loading') {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  }

  // Initialize when DOM is ready
  ready(function() {
    initializeAllTabs();
    enhanceAccessibility();
    setupEventDispatchers();
  });

  // Also initialize if called after DOM ready (for dynamic content)
  window.initTabs = function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const instanceId = container.id;
    if (!window.TabsManager[instanceId]) {
      window.TabsManager[instanceId] = {
        container: container,
        state: 'ready'
      };
    }
  };
})();
