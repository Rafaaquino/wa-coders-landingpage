import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Build estático para https://wacoders.com. Este é o domínio que responde (o www redireciona para ele),
// então canonical, hreflang, sitemap e JSON-LD usam esse mesmo host.
export default defineConfig({
  site: 'https://wacoders.com',
  trailingSlash: 'always',
  integrations: [
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: 'pt',
        locales: { pt: 'pt-BR', en: 'en-US', es: 'es-ES' },
      },
      filter: (page) => !page.includes('/404'),
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
