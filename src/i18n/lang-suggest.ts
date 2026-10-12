import type { Locale } from './locales';

/**
 * Textos do aviso de idioma. Ficam no idioma de DESTINO (o que o visitante prefere),
 * porque ele ainda está vendo a página em outro idioma.
 */
export const langSuggest: Record<Locale, { text: string; go: string; stay: string; close: string; label: string }> = {
  pt: { text: 'Este site está disponível em português.', go: 'Ver em português', stay: 'Continuar aqui', close: 'Fechar', label: 'Sugestão de idioma' },
  en: { text: 'This site is available in English.', go: 'View in English', stay: 'Stay here', close: 'Close', label: 'Language suggestion' },
  es: { text: 'Este sitio está disponible en español.', go: 'Ver en español', stay: 'Quedarme aquí', close: 'Cerrar', label: 'Sugerencia de idioma' },
};
