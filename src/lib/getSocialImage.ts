import fs from 'node:fs';
import path from 'node:path';

const SOCIAL_FALLBACK_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'] as const;
const DEFAULT_OG_WIDTH = 1200;
const DEFAULT_OG_HEIGHT = 630;

const MIME_BY_EXTENSION: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
};

export type SocialImageMeta = {
  src?: string;
  width: number;
  height: number;
  type?: string;
};

const getImageDimensions = (filePath: string): { width: number; height: number } | null => {
  const buffer = fs.readFileSync(filePath);

  if (buffer.length >= 24 && buffer.toString('ascii', 0, 4) === '\x89PNG') {
    return {
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20),
    };
  }

  if (buffer.length >= 30 && buffer.toString('ascii', 0, 4) === 'RIFF') {
    const chunk = buffer.toString('ascii', 12, 16);

    if (chunk === 'VP8X') {
      return {
        width: 1 + (buffer[24] | (buffer[25] << 8) | (buffer[26] << 16)),
        height: 1 + (buffer[27] | (buffer[28] << 8) | (buffer[29] << 16)),
      };
    }

    if (chunk === 'VP8 ') {
      return {
        width: buffer.readUInt16LE(26) & 0x3fff,
        height: buffer.readUInt16LE(28) & 0x3fff,
      };
    }

    if (chunk === 'VP8L') {
      const bits = buffer.readUInt32LE(21);
      return {
        width: (bits & 0x3fff) + 1,
        height: ((bits >> 14) & 0x3fff) + 1,
      };
    }
  }

  if (buffer.length >= 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;

    while (offset < buffer.length) {
      if (buffer[offset] !== 0xff) break;

      const marker = buffer[offset + 1];
      const length = buffer.readUInt16BE(offset + 2);

      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8) {
        return {
          height: buffer.readUInt16BE(offset + 5),
          width: buffer.readUInt16BE(offset + 7),
        };
      }

      offset += 2 + length;
    }
  }

  return null;
};

const resolveHeroPath = (heroImage: string): string => {
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

/**
 * Resuelve la imagen Open Graph para un hero en AVIF y sus dimensiones reales.
 * Prioriza JPG/PNG por compatibilidad con Facebook, WhatsApp y LinkedIn.
 */
export const getSocialImageMeta = (heroImage?: string): SocialImageMeta => {
  if (!heroImage) {
    return { width: DEFAULT_OG_WIDTH, height: DEFAULT_OG_HEIGHT };
  }

  const src = resolveHeroPath(heroImage);
  const filePath = path.join(process.cwd(), 'public', src.replace(/^\//, ''));
  const dimensions = fs.existsSync(filePath) ? getImageDimensions(filePath) : null;
  const extension = path.extname(src).toLowerCase();

  return {
    src,
    width: dimensions?.width ?? DEFAULT_OG_WIDTH,
    height: dimensions?.height ?? DEFAULT_OG_HEIGHT,
    type: MIME_BY_EXTENSION[extension],
  };
};

export const getSocialImage = (heroImage?: string): string | undefined => {
  return getSocialImageMeta(heroImage).src;
};
