/** Dados institucionais da WA Coders, usados no rodapé, contato e JSON-LD. */
export const site = {
  name: 'WA Coders',
  url: 'https://wacoders.com',
  email: 'contact@wacoders.com',
  phoneDisplay: '+55 11 95437-8106',
  phoneE164: '+5511954378106',
  whatsapp: 'https://wa.me/5511954378106',
  api: 'https://wa-coders-backend-api.vercel.app/api/v1',
  logo: '/logo/wa-coders-logo.png',
  ogImage: '/og-image.png',
  offices: {
    miami: {
      street: '601 Brickell Key Drive',
      city: 'Miami',
      region: 'FL',
      postalCode: '33131',
      country: 'US',
      line: '601 Brickell Key Drive, Miami, FL 33131',
    },
    saoPaulo: {
      street: 'Av. Chucri Zaidan, 1550',
      city: 'São Paulo',
      region: 'SP',
      country: 'BR',
      line: '1550 Av. Chucri Zaidan, São Paulo-BR',
    },
  },
  analytics: { ga4: 'G-NQ25X0ZHDF', gtm: 'GTM-5MGPJ4B6', hotjar: 4977764 },
} as const;

/**
 * Fusos horários do Brasil (IANA). Usados para mostrar o WhatsApp só a visitantes no Brasil:
 * o navegador informa o fuso do dispositivo, sem consulta de IP nem serviço externo.
 */
export const brazilTimeZones = [
  'America/Sao_Paulo', 'America/Bahia', 'America/Fortaleza', 'America/Recife', 'America/Belem',
  'America/Maceio', 'America/Araguaina', 'America/Santarem', 'America/Manaus', 'America/Cuiaba',
  'America/Campo_Grande', 'America/Porto_Velho', 'America/Boa_Vista', 'America/Rio_Branco',
  'America/Eirunepe', 'America/Noronha',
  // apelidos antigos que alguns sistemas ainda devolvem
  'Brazil/East', 'Brazil/West', 'Brazil/Acre', 'Brazil/DeNoronha',
] as const;

/**
 * Tecnologias exibidas na seção Technologies.
 * - Com `file`: logo em public/tech (PNG com o nome embutido, ou SVG de ícone, que ganha o nome ao lado).
 * - Com `text`: cartão só de texto (marcas com regras de uso de logo: SAP e Microsoft).
 */
export type Tech =
  | { name: string; file: string; withName?: boolean }
  | { name: string; text: string; sub: string; color: string };

export const technologies: readonly Tech[] = [
  { name: 'Angular', file: 'angular.png' },
  { name: 'React', file: 'react.png' },
  { name: 'TypeScript', file: 'typescript.svg', withName: true },
  { name: 'Node.js', file: 'node.png' },
  { name: 'Python', file: 'python.svg', withName: true },
  { name: 'Java', file: 'java.png' },
  { name: '.NET', file: 'net.png' },
  { name: 'React Native', file: 'reactNative.png' },
  { name: 'Flutter', file: 'flutter.png' },
  { name: 'Swift', file: 'swift.png' },
  { name: 'Android', file: 'android.png' },
  { name: 'MongoDB', file: 'mongoDb.png' },
  { name: 'MySQL', file: 'mysql.png' },
  { name: 'PostgreSQL', file: 'postgresql.svg', withName: true },
  { name: 'Docker', file: 'docker.png' },
  { name: 'Google Cloud', file: 'google-cloud.png' },
  { name: 'AWS', file: 'aws.png' },
  { name: 'Azure', file: 'azure.png' },
  { name: 'WordPress', file: 'wordpress.png' },
  { name: 'Figma', file: 'figma.svg', withName: true },
  { name: 'SAP Business One / C4C', text: 'SAP', sub: 'Business One · C4C', color: '#0070F2' },
  { name: 'Microsoft Dynamics 365', text: 'Dynamics 365', sub: 'Microsoft', color: '#002050' },
  { name: 'Claude (Anthropic)', text: 'Claude', sub: 'Anthropic', color: '#B4552D' },
  { name: 'GPT (OpenAI)', text: 'GPT', sub: 'OpenAI', color: '#0E7F66' },
];
