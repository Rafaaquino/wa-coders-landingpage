// Menu mobile e formulários. Carregado uma única vez pelo Layout.
import { site } from '../site';

const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('mobile-menu');

function setMenu(open: boolean) {
  if (!toggle || !menu) return;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', (open ? toggle.dataset.closeLabel : toggle.dataset.openLabel) ?? '');
  menu.classList.toggle('hidden', !open);
  toggle.querySelector('.menu-open')?.classList.toggle('hidden', open);
  toggle.querySelector('.menu-close')?.classList.toggle('hidden', !open);
}

toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
menu?.addEventListener('click', (e) => {
  if ((e.target as HTMLElement).closest('a')) setMenu(false);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setMenu(false);
});

// Formulários: <form data-api-form data-subject="..."> com campos nomeados.
// O backend (POST /emails/send-email) espera { name, email, subject, text } e, opcionalmente,
// { message, fields: [{label, value}], meta: { lang, page } } para montar o e-mail HTML (Resend).
document.querySelectorAll<HTMLFormElement>('form[data-api-form]').forEach((form) => {
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const sendingLabel = form.dataset.sending ?? '...';
  const idleLabel = button?.textContent ?? '';

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity() || !button) return;

    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const subject = String(data.get('subject') ?? form.dataset.subject ?? 'Contact');
    const lines: string[] = [`Name: ${name}`, `Email: ${email}`];
    const fields: { label: string; value: string }[] = [];
    form.querySelectorAll<HTMLElement>('[data-field-label]').forEach((el) => {
      const field = el as HTMLInputElement;
      if (!field.name || ['name', 'email', 'subject', 'message', 'consent'].includes(field.name)) return;
      const value = String(data.get(field.name) ?? '').trim();
      if (value) {
        lines.push(`${field.dataset.fieldLabel}: ${value}`);
        fields.push({ label: field.dataset.fieldLabel ?? field.name, value });
      }
    });
    const message = String(data.get('message') ?? '').trim();
    if (message) lines.push('', message);
    const meta = { lang: document.documentElement.lang, page: location.href };

    button.disabled = true;
    button.textContent = sendingLabel;
    if (status) status.textContent = '';

    try {
      const res = await fetch(`${site.api}/emails/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, text: lines.join('\n'), message, fields, meta }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      if (status) {
        status.textContent = form.dataset.success ?? 'OK';
        status.className = 'mt-3 text-sm font-medium text-success-text';
      }
      (window as any).dataLayer?.push({ event: 'form_submit', form_id: form.id });
    } catch {
      if (status) {
        status.textContent = form.dataset.error ?? 'Error';
        status.className = 'mt-3 text-sm font-medium text-[#c0392b]';
      }
    } finally {
      button.disabled = false;
      button.textContent = idleLabel;
    }
  });
});
