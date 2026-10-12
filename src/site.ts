/** Dados institucionais da WA Coders, usados no rodapé, contato e JSON-LD. */
export const site = {
  name: 'WA Coders',
  url: 'https://www.wacoders.com',
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

/** Tecnologias exibidas na seção Technologies (arquivos em public/tech). */
export const technologies = [
  { name: 'Angular', file: 'angular.png' },
  { name: 'React', file: 'react.png' },
  { name: 'Node.js', file: 'node.png' },
  { name: 'Java', file: 'java.png' },
  { name: '.NET', file: 'net.png' },
  { name: 'React Native', file: 'reactNative.png' },
  { name: 'Flutter', file: 'flutter.png' },
  { name: 'Swift', file: 'swift.png' },
  { name: 'Android', file: 'android.png' },
  { name: 'MongoDB', file: 'mongoDb.png' },
  { name: 'MySQL', file: 'mysql.png' },
  { name: 'Docker', file: 'docker.png' },
  { name: 'Google Cloud', file: 'google-cloud.png' },
  { name: 'AWS', file: 'aws.png' },
  { name: 'Azure', file: 'azure.png' },
  { name: 'WordPress', file: 'wordpress.png' },
] as const;
