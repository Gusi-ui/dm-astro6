import fs from 'node:fs';
import path from 'node:path';

const SOCIAL_FALLBACK_EXTENSIONS = ['.webp', '.jpg', '.jpeg', '.png'] as const;

/**
 * Resuelve la imagen Open Graph para un hero en AVIF.
 * Las redes sociales no suelen soportar AVIF; busca webp/jpg/png en public/.
 */
export const getSocialImage = (heroImage?: string): string | undefined => {
  if (!heroImage) return undefined;

  if (!heroImage.endsWith('.avif')) {
    return heroImage;
  }

  const basePath = heroImage.replace(/\.avif$/, '');
  const publicRoot = path.join(process.cwd(), 'public');

  for (const ext of SOCIAL_FALLBACK_EXTENSIONS) {
    const candidate = `${basePath}${ext}`;
    const filePath = path.join(publicRoot, candidate.replace(/^\//, ''));

    if (fs.existsSync(filePath)) {
      return candidate;
    }
  }

  return heroImage;
};
