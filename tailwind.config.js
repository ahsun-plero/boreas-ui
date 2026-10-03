/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{html,ejs}',
    './src/components/**/*.{html,ejs}',
    './src/**/*.{html,ejs,js}'
  ],
  safelist: [
    'sm:grid-cols-1',
    'md:grid-cols-2',
    'lg:grid-cols-3',
    'xl:grid-cols-3',
    '2xl:grid-cols-3',
    'md:gap-6',
    'lg:gap-8',
    'md:py-24',
    'lg:py-32'
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },
    extend: {
      colors: {
        boreas: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          900: '#0c2d6b'
        },
        // Brand Palette
        'signature': '#312454',      // Sticky Navigation
        'charcoal': '#2C292A',       // Footer, Headings, Body text
        'gold': '#FFB300',           // Buttons Only
        'mint': '#7FE3D8',           // Accent, Active Nav, Highlights
        'tint-signature': '#EDE6FE', // Table headers, Cards
        'bg-light': '#F3F9FE',       // Alternate section backgrounds
        'outline': '#A1A1A1',        // Input field outlines
        'stroke': '#A1A1A1'          // Card outlines
      },
      fontFamily: {
        sans: ['Familjen Grotesk', 'system-ui', 'sans-serif'],
        display: ['Familjen Grotesk', 'system-ui', 'sans-serif'],
        body: ['Roboto', 'system-ui', 'sans-serif']
      },
      spacing: {
        '15': '3.75rem',  // 60px for custom padding
        '7xs': '0.5rem',  // 8px
      },
      inset: {
        '7xs': '0.5rem',  // 8px
        'header': '1.75rem',  // 28px for main header offset below top header
        'mobile-menu': '4rem',  // Position mobile menu below both headers (64px)
      },
      borderRadius: {
        'xs': '0.25rem',  // 4px
      },
      backgroundImage: {
        'hero-gradient': `linear-gradient(256deg, rgba(49, 36, 84, 0.65) -6.6%, rgba(49, 36, 84, 0.65) 29.85%, rgba(49, 36, 84, 0.32) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%)`,
      },
      fontSize: {
        'h1': ['72px', { lineHeight: 'auto', fontWeight: '700', fontFamily: 'Familjen Grotesk' }],
        'h2': ['60px', { lineHeight: 'auto', fontWeight: '700', fontFamily: 'Familjen Grotesk' }],
        'h3': ['48px', { lineHeight: 'auto', fontWeight: '700', fontFamily: 'Familjen Grotesk' }],
        'h4': ['32px', { lineHeight: 'auto', fontWeight: '700', fontFamily: 'Familjen Grotesk' }],
        'h5': ['24px', { lineHeight: 'auto', fontWeight: '700', fontFamily: 'Familjen Grotesk' }],
        'h6': ['16px', { lineHeight: 'auto', fontWeight: '700', fontFamily: 'Familjen Grotesk' }],
        'h7': ['16px', { lineHeight: 'auto', fontWeight: '700', fontFamily: 'Familjen Grotesk', letterSpacing: '1px', textTransform: 'uppercase' }],
        'tag': ['16px', { lineHeight: 'auto', fontWeight: '400', fontFamily: 'Familjen Grotesk' }],
        'caption-1': ['16px', { lineHeight: 'auto', fontWeight: '700', fontFamily: 'Familjen Grotesk', letterSpacing: '1px', textTransform: 'uppercase' }],
        'caption-2': ['16px', { lineHeight: 'auto', fontWeight: '500', fontFamily: 'Roboto' }],
        'caption-sm': ['12px', { lineHeight: 'auto', fontWeight: '500', fontFamily: 'Roboto' }],
        'subtitle': ['20px', { lineHeight: 'auto', fontWeight: '500', fontFamily: 'Roboto' }],
        'btn': ['16px', { lineHeight: 'auto', fontWeight: '700', fontFamily: 'Roboto' }],
        'body': ['16px', { lineHeight: '1.5', fontWeight: '400', fontFamily: 'Roboto' }],
        'body-sm': ['14px', { lineHeight: '1.5', fontWeight: '400', fontFamily: 'Roboto' }],
        'table-header': ['14px', { lineHeight: 'auto', fontWeight: '500', fontFamily: 'Roboto', letterSpacing: '1px', textTransform: 'uppercase' }]
      }
    }
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.bg-hero': {
          backgroundImage: `linear-gradient(256deg, rgba(49, 36, 84, 0.65) -6.6%, rgba(49, 36, 84, 0.65) 29.85%, rgba(49, 36, 84, 0.32) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), url('images/hero-bg.jpg')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        },
        '.leading-footer': {
          lineHeight: '1.375rem',
        },
        '.sr-only': {
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          borderWidth: '0',
        },
        '.focus\\:not-sr-only:focus': {
          position: 'static',
          width: 'auto',
          height: 'auto',
          padding: '0',
          margin: '0',
          overflow: 'visible',
          clip: 'auto',
          whiteSpace: 'normal',
        },
      });
    }
  ]
}
