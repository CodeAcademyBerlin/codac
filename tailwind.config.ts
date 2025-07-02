import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './content/**/*.mdx',
    './public/**/*.svg',
    './components/**/*.{ts,tsx}',
  ],
  // Theme configuration moved to CSS using @theme directive in globals.css
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config
