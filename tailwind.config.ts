import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // GMB Color Palette
        yellow: {
          50: '#FDF8E7',
          100: '#FAF1CF',
          200: '#F5E3A0',
          300: '#F0D571',
          400: '#EBC741',
          500: '#C9A24D', // Primary yellow
          600: '#A17B35',
          700: '#795425',
          800: '#512D15',
          900: '#291606',
        },
        earth: {
          50: '#F5F3F2',
          100: '#EAE7E4',
          200: '#D5CFCA',
          300: '#C0B6AF',
          400: '#AB9E95',
          500: '#3B2F2F', // Primary Earth
          600: '#2F2424',
          700: '#231919',
          800: '#170F0F',
          900: '#0B0505',
        },
        ivory: '#F7F3E9',
        forest: '#1F3D2B',
        clay: '#8B3A2E',
        royal: '#1E2A4A',
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'serif'],
        subheading: ['var(--font-cormorant)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'slow-spin': 'spin 20s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'kente-pattern': "url('/patterns/kente.svg')",
      },
    },
  },
  plugins: [],
}
export default config