/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sf-pro': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        background: '#0f2818',
        'pcb-green': {
          50: '#e8f5e9',
          100: '#c8e6c9', 
          200: '#a5d6a7',
          300: '#81c784',
          400: '#66bb6a',
          500: '#1a4d2e',
          600: '#2e7d32',
          700: '#0f2818',
          800: '#0a1d12',
          900: '#05100a',
        },
        'pcb-copper': {
          300: '#d4af37',
          500: '#b8860b',
          700: '#8b6914',
        },
        'pcb-solder': {
          light: '#e5e7eb',
          dark: '#9ca3af',
        },
        'apple-gray': {
          50: '#fafafa',
          100: '#f5f5f7',
          200: '#f2f2f7',
          300: '#d2d2d7',
          400: '#86868b',
          500: '#515154',
          600: '#424245',
          700: '#1d1d1f',
          800: '#000000',
        },
        'apple-blue': {
          500: '#007aff',
          600: '#0056cc',
        },
        'apple-purple': {
          500: '#5856d6',
          600: '#4c4bcc',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'led-pulse': 'led-pulse 2s ease-in-out infinite',
        'scanline': 'scanline 10s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)' },
        },
        pulseGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 30px rgba(184, 134, 11, 0.2), 0 0 60px rgba(26, 77, 46, 0.1)' 
          },
          '50%': { 
            boxShadow: '0 0 50px rgba(184, 134, 11, 0.4), 0 0 100px rgba(26, 77, 46, 0.2)' 
          },
        },
        'led-pulse': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.9)' },
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        'glass-heavy': '0 20px 40px 0 rgba(0, 0, 0, 0.6), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
        'component': '5px 5px 10px rgba(0,0,0,0.5), inset 1px 1px 2px rgba(255,255,255,0.1)',
        'led-glow': '0 0 10px currentColor, 0 0 20px currentColor',
      },
      backgroundImage: {
        'pcb-pattern': "radial-gradient(#1a4d2e 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}
