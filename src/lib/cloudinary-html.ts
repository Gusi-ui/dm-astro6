import { getImageSizes, getImageSrcSet, resolveImageSrc } from './cloudinary';

const CLOUDINARY_IMG_REGEX = /<img\b([\s\S]*?)\bsrc="cloudinary:([^"]+)"([\s\S]*?)>/gi;

/**
 * Transforma etiquetas <img> con src="cloudinary:..." a URLs de Cloudinary
 * con srcset responsive optimizado para móvil.
 *
 * El `sizes` por defecto es el de dos columnas (432 px en escritorio). Una
 * imagen a todo el ancho del artículo debe traer el suyo, p. ej.
 * sizes="(max-width: 768px) 100vw, 896px"; si no, se descarga pequeña y se
 * ve borrosa. Los `sizes` y `loading` que ya traiga la etiqueta se respetan.
 */
export const transformCloudinaryHtml = (html: string): string =>
  html.replace(CLOUDINARY_IMG_REGEX, (_match, before, publicId, after) => {
    const cloudinarySrc = `cloudinary:${publicId}`;
    const src = resolveImageSrc(cloudinarySrc, 'inline');
    const srcSet = getImageSrcSet(cloudinarySrc, 'inline');
    const ownAttributes = `${before}${after}`;
    const sizes = /\bsizes=/.test(ownAttributes) ? '' : ` sizes="${getImageSizes('inline')}"`;
    const loading = /\bloading=/.test(ownAttributes) ? '' : ' loading="lazy"';

    return `<img${before}src="${src}" srcset="${srcSet}"${sizes}${loading} decoding="async"${after}>`;
  });
