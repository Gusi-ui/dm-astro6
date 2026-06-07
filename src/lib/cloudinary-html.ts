import { getImageSrcSet, resolveImageSrc } from './cloudinary';

const DEFAULT_SIZES = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 896px';
const CLOUDINARY_IMG_REGEX = /<img\b([\s\S]*?)\bsrc="cloudinary:([^"]+)"([\s\S]*?)>/gi;

/**
 * Transforma etiquetas <img> con src="cloudinary:..." a URLs de Cloudinary
 * con srcset responsive. Funciona en dev y producción.
 */
export const transformCloudinaryHtml = (html: string): string =>
  html.replace(CLOUDINARY_IMG_REGEX, (_match, before, publicId, after) => {
    const cloudinarySrc = `cloudinary:${publicId}`;
    const src = resolveImageSrc(cloudinarySrc, 'f_auto,q_auto,w_1200');
    const srcSet = getImageSrcSet(cloudinarySrc);

    return `<img${before}src="${src}" srcset="${srcSet}" sizes="${DEFAULT_SIZES}" loading="lazy" decoding="async"${after}>`;
  });
