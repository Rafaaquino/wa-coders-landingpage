export const locales = ['pt', 'en', 'es'] as const;
export type Locale = (typeof locales)[number];

/** Código BCP-47 usado em hreflang, og:locale e sitemap. */
export const hreflang: Record<Locale, string> = { pt: 'pt-BR', en: 'en-US', es: 'es-ES' };
export const ogLocale: Record<Locale, string> = { pt: 'pt_BR', en: 'en_US', es: 'es_ES' };

/** Caminho de uma página no idioma dado. `page` é '' (home) ou 'sap-crm/'. Sempre termina com '/'. */
export function localePath(locale: Locale, page = ''): string {
  return locale === 'pt' ? `/${page}` : `/${locale}/${page}`;
}
