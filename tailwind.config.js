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
        'glass': {
          'subtle': 'rgba(255, 255, 255, 0.08)',
          'light': 'rgba(255, 255, 255, 0.12)',
          'medium': 'rgba(255, 255, 255, 0.18)',
          'bold': 'rgba(255, 255, 255, 0.25)',
          'heavy': 'rgba(255, 255, 255, 0.35)',
          'ultra': 'rgba(255, 255, 255, 0.45)',
        },
        'glass-dark': {
          'subtle': 'rgba(0, 0, 0, 0.05)',
          'light': 'rgba(0, 0, 0, 0.08)',
          'medium': 'rgba(0, 0, 0, 0.12)',
          'bold': 'rgba(0, 0, 0, 0.18)',
          'heavy': 'rgba(0, 0, 0, 0.25)',
        },
        'apple-purple': {
          500: '#5856d6',
          600: '#4c4bcc',
        },
        'apple-green': {
          500: '#30d158',
          600: '#28c946',
        },
        'apple-orange': {
          500: '#ff9500',
          600: '#e6860e',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
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
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        pulseGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 30px rgba(147, 51, 234, 0.2), 0 0 60px rgba(59, 130, 246, 0.1)' 
          },
          '50%': { 
            boxShadow: '0 0 50px rgba(147, 51, 234, 0.4), 0 0 100px rgba(59, 130, 246, 0.2)' 
          },
        }
      },
      backdropBlur: {
        'apple': '20px',
        'apple-light': '12px',
        'apple-medium': '20px',
        'apple-heavy': '40px',
        'glass-subtle': '8px',
        'glass': '16px',
        'glass-medium': '20px',
        'glass-bold': '28px',
        'glass-heavy': '36px',
        'glass-extreme': '48px',
        'glass-ultra': '64px',
      },
      boxShadow: {
        // Apple-style Glass Shadows
        'apple-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.04), 0 1px 0 0 rgba(255, 255, 255, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)',
        'apple-glass-hover': '0 16px 48px 0 rgba(0, 0, 0, 0.08), 0 1px 0 0 rgba(255, 255, 255, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.25)',
        'apple-glass-active': '0 4px 16px 0 rgba(0, 0, 0, 0.06), 0 1px 0 0 rgba(255, 255, 255, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        
        // Enhanced Glass Effects
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-subtle': '0 4px 16px 0 rgba(31, 38, 135, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'glass-medium': '0 8px 32px 0 rgba(31, 38, 135, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'glass-bold': '0 16px 48px 0 rgba(31, 38, 135, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.15)',
        'glass-ultra': '0 24px 64px 0 rgba(31, 38, 135, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.2)',
        'glass-inset': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.5)',
        
        // Skill Button Shadows
        'skill-button': '0 4px 16px 0 rgba(0, 0, 0, 0.08), 0 1px 0 0 rgba(255, 255, 255, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)',
        'skill-button-hover': '0 8px 24px 0 rgba(0, 0, 0, 0.12), 0 1px 0 0 rgba(255, 255, 255, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.25)',
        'skill-button-active': '0 2px 8px 0 rgba(0, 0, 0, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        
        // Glow Effects
        'glow-sm': '0 0 20px rgba(255, 255, 255, 0.1)',
        'glow-md': '0 0 40px rgba(255, 255, 255, 0.15)',
        'glow-lg': '0 0 60px rgba(255, 255, 255, 0.2)',
        'glow-blue': '0 0 40px rgba(59, 130, 246, 0.4)',
        'glow-purple': '0 0 40px rgba(147, 51, 234, 0.4)',
        'glow-green': '0 0 40px rgba(34, 197, 94, 0.4)',
        'glow-orange': '0 0 40px rgba(249, 115, 22, 0.4)',
        
        // Legacy Support
        'liquid': '0 8px 32px 0 rgba(31, 38, 135, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'liquid-hover': '0 12px 40px 0 rgba(31, 38, 135, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)',
        'project-card': '0 20px 60px 0 rgba(31, 38, 135, 0.15), 0 8px 32px 0 rgba(0, 0, 0, 0.05)',
        'project-hover': '0 32px 80px 0 rgba(31, 38, 135, 0.25), 0 16px 48px 0 rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
