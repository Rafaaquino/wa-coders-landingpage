// Remove caches e artefatos gerados: .astro (tipos/cache do Astro), node_modules/.vite (cache do Vite) e dist.
// Uso: npm run clean
import { rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
for (const target of ['.astro', 'node_modules/.vite', 'dist']) {
  rmSync(join(root, target), { recursive: true, force: true });
  console.log(`removido: ${target}`);
}
