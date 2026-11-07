/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`

module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        bg: token('bg'),
        surface: token('surface'),
        raised: token('raised'),
        fg: token('fg'),
        muted: token('muted'),
        subtle: token('subtle'),
        line: token('line'),
        accent: token('accent'),
        'accent-fg': token('accent-fg'),
        code: {
          kw: token('code-kw'),
          str: token('code-str'),
          num: token('code-num'),
          key: token('code-key'),
          type: token('code-type'),
        },
      },
      maxWidth: { content: '68rem' },
      keyframes: {
        blink: { '0%, 49%': { opacity: '1' }, '50%, 100%': { opacity: '0' } },
      },
      animation: { blink: 'blink 1s step-end infinite' },
    },
  },
  plugins: [],
}
