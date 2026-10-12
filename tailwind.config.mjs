/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0e1726',
        surface: { DEFAULT: '#f7f5f9', 2: '#f0ecf3' },
        line: '#e6e1ea',
        muted: '#5c5468',
        // Laranja da marca WA Coders. `text` é a variante com contraste AA para texto pequeno sobre branco.
        accent: { DEFAULT: '#f09105', hover: '#d67d00', tint: '#fff4e0', text: '#a85a00' },
        accent2: { DEFAULT: '#6f4bb8', tint: '#ebe4f7' },
        success: { DEFAULT: '#00ab55', tint: '#ddf5f0', text: '#007a3d' },
        warning: { DEFAULT: '#e2a03f', tint: '#fff9ed', text: '#8a5a00' },
      },
      fontFamily: {
        display: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        container: '1180px',
      },
      spacing: {
        4.5: '18px',
      },
    },
  },
  plugins: [],
};
