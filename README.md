# WA Coders — Landing Page

Site institucional da WA Coders em **Astro 4 + Tailwind 3**, estático e multilíngue (pt, en, es), otimizado para SEO e para LLMs. Publicado em https://www.wacoders.com via GitHub Pages.

## Requisitos

- Node.js 20 ou superior e npm 10 ou superior

## Rodar localmente

```bash
npm install          # só na primeira vez (ou quando o package.json mudar)
npm run start:dev    # abre em http://localhost:4321 com hot reload
```

Rotas locais:

| Página | URL |
|---|---|
| Home (pt) | http://localhost:4321/ |
| Home (en / es) | http://localhost:4321/en/ · http://localhost:4321/es/ |
| SAP/CRM (pt / en / es) | http://localhost:4321/sap-crm/ · /en/sap-crm/ · /es/sap-crm/ |

### Escolher a porta

Argumentos depois de `--` vão direto para o Astro:

```bash
npm run start:dev -- --port 3000
npm run start:dev -- --port 3000 --host     # também acessível por outros dispositivos da rede
```

### Subir sem cache

```bash
npm run start:dev:nocache                   # apaga .astro e node_modules/.vite e sobe o dev server
npm run start:dev:nocache -- --port 3000    # o mesmo, em outra porta
npm run clean                               # só limpa (.astro, node_modules/.vite e dist)
```

Se o navegador ainda mostrar a versão antiga, force o recarregamento (Ctrl+Shift+R) ou use uma janela anônima.

## Build e preview do site final

```bash
npm run build        # gera dist/ (HTML estático, sitemap-index.xml, CNAME e .nojekyll)
npm start            # serve o dist/ em http://localhost:4321 (rode o build antes)
npm start -- --port 8080
npm run build:clean  # limpa os caches e gera o build do zero
```

Use `npm start` para conferir o resultado como ele vai ao ar (sitemap, robots.txt, llms.txt e JSON-LD só existem no build).

## Deploy (GitHub Pages)

```bash
npm run deploy          # build + publica o dist/ na branch gh-pages
npm run deploy:ssh      # alternativa via SSH (deploy-ghpages.sh)
npm run deploy:dry-run  # build + commit local na gh-pages, sem push
```

Requisitos: a pasta ser um repositório git com `origin` configurado. O domínio `wacoders.com` vem de `public/CNAME`. O domínio só pode apontar para um repositório de GitHub Pages por vez.

## Onde editar

| O quê | Onde |
|---|---|
| Textos da home, menu, rodapé e formulário | `src/i18n/pt.json`, `en.json`, `es.json` |
| Textos da página SAP/CRM | `src/i18n/sap.pt.json`, `sap.en.json`, `sap.es.json` |
| E-mail, endereços, WhatsApp, IDs de analytics, lista de tecnologias | `src/site.ts` |
| Logos das tecnologias, logo e imagens | `public/tech/`, `public/logo/`, `public/portfolio/` |
| Cores e fontes | `tailwind.config.mjs` e `src/styles/global.css` |
| Título, description, Open Graph, hreflang | `src/layouts/Layout.astro` |
| Dados estruturados (JSON-LD) | `src/lib/schema.ts` |
| robots, llms.txt, llms-full.txt | `public/` |

Os textos de `pt.json`/`en.json`/`es.json` devem manter as mesmas chaves nos três idiomas.

## Estrutura

```
src/
  pages/        rotas finas (/, /en, /es e sap-crm em cada idioma)
  views/        HomePage.astro e SapPage.astro (montam as seções)
  components/   home/ (seções da home), sap/ (seções da página SAP/CRM), Header, Footer, Faq
  layouts/      Layout.astro (head de SEO, analytics, WhatsApp flutuante)
  i18n/         textos por idioma
  lib/          JSON-LD
  scripts/      ui.ts (menu mobile e envio dos formulários)
public/         arquivos servidos como estão
```

## Formulários

Os formulários de contato e de demonstração SAP/CRM enviam `POST https://wa-coders-backend-api.vercel.app/api/v1/emails/send-email` com `{ name, email, subject, text }`. O backend só aceita origens liberadas no CORS (`wacoders.com`, `www.wacoders.com` e `localhost:4200`), então em `localhost:4321` o envio é bloqueado pelo navegador. Para testar o envio em desenvolvimento, rode em `--port 4200` ou libere a origem no backend.

## Observações

- `@astrojs/sitemap` está fixado em 3.2.1: as versões 3.7 ou superiores exigem Astro 5.
- O Hotjar só funciona em HTTPS, então não carrega no ambiente local.
