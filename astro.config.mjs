import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Build estático para https://www.wacoders.com (publique o conteúdo de dist/ onde o site é servido).
export default defineConfig({
  site: 'https://www.wacoders.com',
  trailingSlash: 'always',
  integrations: [
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: 'pt',
        locales: { pt: 'pt-BR', en: 'en-US', es: 'es-ES' },
      },
      lastmod: new Date(),
    }),
  ],
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
