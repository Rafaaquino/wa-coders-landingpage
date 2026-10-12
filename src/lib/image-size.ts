import fs from 'node:fs';
import path from 'node:path';

/** Lê largura e altura de um PNG em public/ (cabeçalho IHDR). Roda só no build (Node). */
export function pngSize(publicFile: string): { width: number; height: number } {
  const buf = fs.readFileSync(path.join(process.cwd(), 'public', publicFile));
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}
