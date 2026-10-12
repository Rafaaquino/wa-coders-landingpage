import { site } from '../site';
import { localePath, hreflang, type Locale } from '../i18n/locales';

const abs = (path: string) => new URL(path, site.url).toString();

export function organizationSchema(lang: Locale, description: string) {
  const o = site.offices;
  return {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${site.url}/#organization`,
    name: site.name,
    url: `${site.url}/`,
    logo: abs(site.logo),
    image: abs(site.ogImage),
    description,
    email: site.email,
    telephone: site.phoneE164,
    inLanguage: hreflang[lang],
    address: [
      { '@type': 'PostalAddress', streetAddress: o.miami.street, addressLocality: o.miami.city, addressRegion: o.miami.region, postalCode: o.miami.postalCode, addressCountry: o.miami.country },
      { '@type': 'PostalAddress', streetAddress: o.saoPaulo.street, addressLocality: o.saoPaulo.city, addressRegion: o.saoPaulo.region, addressCountry: o.saoPaulo.country },
    ],
    areaServed: ['United States', 'Canada', 'Europe', 'Brazil'],
    contactPoint: [{ '@type': 'ContactPoint', contactType: 'sales', email: site.email, telephone: site.phoneE164, availableLanguage: ['Portuguese', 'English', 'Spanish'] }],
  };
}

export function websiteSchema(lang: Locale) {
  return {
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: `${site.url}/`,
    name: site.name,
    inLanguage: hreflang[lang],
    publisher: { '@id': `${site.url}/#organization` },
  };
}

export function servicesSchema(items: { title: string; desc: string }[], lang: Locale) {
  return items.map((s) => ({
    '@type': 'Service',
    name: s.title,
    description: s.desc,
    serviceType: s.title,
    provider: { '@id': `${site.url}/#organization` },
    areaServed: ['United States', 'Europe', 'Brazil'],
    url: abs(localePath(lang)),
  }));
}

export function faqSchema(items: { q: string; a: string }[], lang: Locale) {
  return {
    '@type': 'FAQPage',
    inLanguage: hreflang[lang],
    mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
  };
}

export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.path) })),
  };
}

export function opportunityAppSchema(description: string, lang: Locale) {
  return {
    '@type': 'SoftwareApplication',
    name: 'Opportunity',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: 'https://www.getopportunity.com.br/',
    description,
    inLanguage: hreflang[lang],
    author: { '@id': `${site.url}/#organization` },
  };
}

export function portfolioSchema(items: { name: string; tagline: string; desc: string; url: string }[]) {
  return {
    '@type': 'ItemList',
    itemListElement: items.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: { '@type': 'SoftwareApplication', name: p.name, description: `${p.tagline}. ${p.desc}`, url: p.url, applicationCategory: 'BusinessApplication', author: { '@id': `${site.url}/#organization` } },
    })),
  };
}
