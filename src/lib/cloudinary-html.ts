import { getImageSizes, getImageSrcSet, resolveImageSrc } from './cloudinary';

const CLOUDINARY_IMG_REGEX = /<img\b([\s\S]*?)\bsrc="cloudinary:([^"]+)"([\s\S]*?)>/gi;

/**
 * Transforma etiquetas <img> con src="cloudinary:..." a URLs de Cloudinary
 * con srcset responsive optimizado para móvil.
 */
export const transformCloudinaryHtml = (html: string): string =>
  html.replace(CLOUDINARY_IMG_REGEX, (_match, before, publicId, after) => {
    const cloudinarySrc = `cloudinary:${publicId}`;
    const src = resolveImageSrc(cloudinarySrc, 'inline');
    const srcSet = getImageSrcSet(cloudinarySrc, 'inline');
    const sizes = getImageSizes('inline');

    return `<img${before}src="${src}" srcset="${srcSet}" sizes="${sizes}" loading="lazy" decoding="async"${after}>`;
  });
