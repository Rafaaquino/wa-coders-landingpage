// Consentimento de cookies de análise (LGPD/GDPR). GA4, GTM e Hotjar só são carregados depois que
// o visitante aceita. A decisão fica em localStorage ('wac-consent': 'granted' | 'denied').
import { site } from '../site';

const KEY = 'wac-consent';
const { ga4, gtm, hotjar } = site.analytics;

const read = (): string | null => {
  try { return localStorage.getItem(KEY); } catch { return null; }
};
const write = (value: string) => {
  try { localStorage.setItem(KEY, value); } catch { /* storage bloqueado */ }
};

let analyticsLoaded = false;

function loadAnalytics() {
  if (analyticsLoaded) return;
  analyticsLoaded = true;
  const w = window as any;
  w[`ga-disable-${ga4}`] = false;
  w.dataLayer = w.dataLayer || [];
  w.gtag = function () { w.dataLayer.push(arguments); };
  w.gtag('js', new Date());
  w.gtag('config', ga4);

  const g = document.createElement('script');
  g.async = true;
  g.src = `https://www.googletagmanager.com/gtag/js?id=${ga4}`;
  document.head.appendChild(g);

  w.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const m = document.createElement('script');
  m.async = true;
  m.src = `https://www.googletagmanager.com/gtm.js?id=${gtm}`;
  document.head.appendChild(m);

  w.hj = w.hj || function () { (w.hj.q = w.hj.q || []).push(arguments); };
  w._hjSettings = { hjid: hotjar, hjsv: 6 };
  const h = document.createElement('script');
  h.async = true;
  h.src = `https://static.hotjar.com/c/hotjar-${hotjar}.js?sv=6`;
  document.head.appendChild(h);
}

/** Ao recusar depois de ter aceitado: desliga o GA e apaga os cookies de análise. */
function clearAnalyticsCookies() {
  (window as any)[`ga-disable-${ga4}`] = true;
  const host = location.hostname;
  const domains = [host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`];
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim();
    if (/^(_ga|_gid|_gat|_hj)/.test(name)) {
      domains.forEach((d) => { document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${d}`; });
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
  });
}

const box = document.getElementById('consent-banner');
const decide = () => window.dispatchEvent(new Event('wac:consent-decided'));

function hide() {
  if (box) box.hidden = true;
  decide();
}

box?.querySelectorAll<HTMLButtonElement>('[data-consent]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const value = btn.dataset.consent as 'granted' | 'denied';
    const before = read();
    write(value);
    if (value === 'granted') {
      loadAnalytics();
      hide();
    } else {
      clearAnalyticsCookies();
      hide();
      // Os scripts já carregados só param de verdade ao recarregar a página.
      if (before === 'granted' && analyticsLoaded) location.reload();
    }
  });
});

// "Preferências de cookies" no rodapé reabre o aviso.
document.querySelectorAll<HTMLElement>('[data-consent-open]').forEach((el) => {
  el.addEventListener('click', () => {
    document.getElementById('lang-suggest')?.setAttribute('hidden', '');
    if (box) box.hidden = false;
  });
});

const saved = read();
if (saved === 'granted') loadAnalytics();
else if (saved !== 'denied' && box) box.hidden = false;
