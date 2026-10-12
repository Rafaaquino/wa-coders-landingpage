// Sugestão de idioma (sem redirecionar): mostra um aviso quando o idioma preferido do visitante
// difere do da página. Só usa localStorage; nenhuma chamada externa. Veja LangSuggest.astro.
type Locale = 'pt' | 'en' | 'es';
const KEY = 'wac-lang'; // escolha explícita do visitante
const SESSION_KEY = 'wac-lang-closed'; // fechou o aviso nesta sessão

const read = (store: 'local' | 'session', key: string): string | null => {
  try { return (store === 'local' ? localStorage : sessionStorage).getItem(key); } catch { return null; }
};
const write = (store: 'local' | 'session', key: string, value: string) => {
  try { (store === 'local' ? localStorage : sessionStorage).setItem(key, value); } catch { /* storage bloqueado */ }
};

const isLocale = (v: string | null): v is Locale => v === 'pt' || v === 'en' || v === 'es';

/** Primeiro idioma do navegador que temos (pt/en/es); qualquer outro cai em inglês. */
function browserLocale(): Locale {
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const l of langs) {
    const code = (l || '').toLowerCase().slice(0, 2);
    if (code === 'pt' || code === 'en' || code === 'es') return code;
  }
  return 'en';
}

// Trocar de idioma pelo seletor do cabeçalho conta como escolha explícita.
document.querySelectorAll<HTMLAnchorElement>('[data-lang-switch]').forEach((a) => {
  a.addEventListener('click', () => {
    const target = a.dataset.langSwitch ?? null;
    if (isLocale(target)) write('local', KEY, target);
  });
});

const box = document.getElementById('lang-suggest');
if (box) {
  const current = box.dataset.current as Locale;
  const options = JSON.parse(box.dataset.options ?? '{}') as Record<Locale, { text: string; go: string; stay: string; close: string; label: string; url: string }>;
  const saved = read('local', KEY);
  const preferred: Locale = isLocale(saved) ? saved : browserLocale();

  if (preferred !== current && !read('session', SESSION_KEY) && options[preferred]) {
    const o = options[preferred];
    box.setAttribute('aria-label', o.label);
    box.setAttribute('lang', preferred);
    box.querySelector('[data-lang-text]')!.textContent = o.text;
    box.querySelector('[data-lang-close-label]')!.textContent = o.close;
    const go = box.querySelector<HTMLAnchorElement>('[data-lang-go]')!;
    go.textContent = o.go;
    go.href = o.url;
    go.setAttribute('hreflang', preferred);
    box.querySelector('[data-lang-stay]')!.textContent = o.stay;

    go.addEventListener('click', () => write('local', KEY, preferred));
    box.querySelector('[data-lang-stay]')!.addEventListener('click', () => {
      write('local', KEY, current); // "continuar aqui" é uma escolha explícita
      box.hidden = true;
    });
    box.querySelector('[data-lang-close]')!.addEventListener('click', () => {
      write('session', SESSION_KEY, '1');
      box.hidden = true;
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !box.hidden) { write('session', SESSION_KEY, '1'); box.hidden = true; }
    });

    // Pequeno atraso: não compete com o carregamento inicial. O aviso é fixo, não desloca o conteúdo.
    // Se o aviso de cookies estiver na tela, espera a decisão do visitante para não empilhar dois avisos.
    const reveal = () => {
      const consent = document.getElementById('consent-banner');
      if (consent && !consent.hidden) {
        window.addEventListener('wac:consent-decided', () => setTimeout(() => { box.hidden = false; }, 500), { once: true });
      } else {
        box.hidden = false;
      }
    };
    setTimeout(reveal, 800);
  }
}
