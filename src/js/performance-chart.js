/**
 * Performance Chart Component
 * Handles Chart.js initialization and range switching for growth charts
 */
(function() {
  // Store active chart instances
  const charts = {};

  /**
   * Initialize a performance chart
   * @param {string} chartId - The canvas element ID
   * @param {object} config - Chart configuration {ranges, data, legendItems}
   */
  function initializeChart(chartId, config) {
    const canvas = document.getElementById(chartId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Chart.js configuration
    const chartConfig = {
      type: 'line',
      data: config.data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            display: false, // We use a custom legend below the chart
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#7FE3D8',
            borderWidth: 1,
            padding: 12,
            displayColors: true,
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                // Format value as currency
                if (context.parsed.y !== null) {
                  label += '$' + context.parsed.y.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  });
                }
                return label;
              },
              title: function(context) {
                return context[0].label;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString('en-US', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                });
              },
              color: '#2C292A',
              font: {
                family: "'Roboto', system-ui, sans-serif",
                size: 12,
                weight: '400'
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
            },
            border: {
              display: false
            }
          },
          x: {
            ticks: {
              color: '#2C292A',
              font: {
                family: "'Roboto', system-ui, sans-serif",
                size: 12,
                weight: '400'
              }
            },
            grid: {
              display: false
            },
            border: {
              display: false
            }
          }
        }
      }
    };

    // Create the chart instance
    if (charts[chartId]) {
      charts[chartId].destroy();
    }
    charts[chartId] = new Chart(ctx, chartConfig);
  }

  /**
   * Update chart data for a specific range
   * @param {string} chartId - The canvas element ID
   * @param {object} newData - New chart data {labels, datasets}
   */
  function updateChartData(chartId, newData) {
    if (charts[chartId]) {
      charts[chartId].data.labels = newData.labels;
      charts[chartId].data.datasets = newData.datasets;
      charts[chartId].update();
    }
  }

  /**
   * Handle range pill clicks
   */
  function setupRangePillListeners() {
    const pills = document.querySelectorAll('.range-pill');

    pills.forEach(pill => {
      pill.addEventListener('click', function() {
        const chartId = this.getAttribute('data-chart-id');
        const range = this.getAttribute('data-range');

        // Update active state of pills
        const siblingPills = document.querySelectorAll(
          `.range-pill[data-chart-id="${chartId}"]`
        );
        siblingPills.forEach(sibling => {
          sibling.classList.remove('bg-signature', 'text-white');
          sibling.classList.add('bg-gray-100', 'text-charcoal', 'hover:bg-gray-200');
          sibling.setAttribute('aria-pressed', 'false');
        });

        // Mark this pill as active
        this.classList.remove('bg-gray-100', 'text-charcoal', 'hover:bg-gray-200');
        this.classList.add('bg-signature', 'text-white');
        this.setAttribute('aria-pressed', 'true');

        // Fetch or load new data for the selected range
        loadChartDataForRange(chartId, range);
      });
    });
  }

  /**
   * Load chart data for a specific range
   * In a real application, this would fetch data from an API
   * For now, it's a placeholder for demonstration
   * @param {string} chartId - The canvas element ID
   * @param {string} range - The range identifier (e.g., '1m', '1y', 'inception')
   */
  function loadChartDataForRange(chartId, range) {
    // Trigger a custom event that can be listened to by the page
    // This allows for external data loading (API calls, etc.)
    const event = new CustomEvent('performanceChartRangeChange', {
      detail: { chartId, range },
      bubbles: true
    });
    document.dispatchEvent(event);

    // Store the selected range in localStorage for persistence
    try {
      localStorage.setItem(`performanceChart_${chartId}_range`, range);
    } catch (e) {
      // Silently fail if localStorage is not available
    }
  }

  /**
   * Initialize all performance charts on the page
   * Triggered when the DOM is ready
   */
  function initializeAllCharts() {
    if (window.chartsData && typeof window.chartsData === 'object') {
      Object.keys(window.chartsData).forEach(chartId => {
        const config = window.chartsData[chartId];
        initializeChart(chartId, config);
      });
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initializeAllCharts();
      setupRangePillListeners();
    });
  } else {
    initializeAllCharts();
    setupRangePillListeners();
  }

  // Expose public API for dynamic updates
  window.performanceChart = {
    updateData: updateChartData,
    initialize: initializeChart,
    loadRange: loadChartDataForRange
  };
})();
