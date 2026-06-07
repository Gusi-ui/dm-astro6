const DEFAULT_CLOUD_NAME = 'dzs4olh43';
const DEFAULT_SITE = 'https://divermataro.org';
const CLOUDINARY_PREFIX = 'cloudinary:';
const CLOUDINARY_FETCH_PREFIX = 'cloudinary-fetch:';

const DEFAULT_WIDTHS = [400, 800, 1200, 1600] as const;
const DEFAULT_TRANSFORMS = 'f_auto,q_auto';

export const getCloudName = (): string =>
  (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_CLOUDINARY_CLOUD_NAME) ||
  DEFAULT_CLOUD_NAME;

export const getSiteOrigin = (): string =>
  (typeof import.meta !== 'undefined' && import.meta.env?.SITE) || DEFAULT_SITE;

export const isCloudinaryUrl = (src: string): boolean => src.includes('res.cloudinary.com');

export const isCloudinaryId = (src: string): boolean => src.startsWith(CLOUDINARY_PREFIX);

export const isCloudinaryFetch = (src: string): boolean => src.startsWith(CLOUDINARY_FETCH_PREFIX);

export const isCloudinarySource = (src: string): boolean =>
  isCloudinaryUrl(src) || isCloudinaryId(src) || isCloudinaryFetch(src);

export const parseCloudinaryId = (src: string): string =>
  src.slice(CLOUDINARY_PREFIX.length).replace(/^\//, '');

export const parseCloudinaryFetchPath = (src: string): string => {
  const path = src.slice(CLOUDINARY_FETCH_PREFIX.length);
  return path.startsWith('/') ? path : `/${path}`;
};

export const cloudinaryUrl = (publicId: string, transforms = DEFAULT_TRANSFORMS): string => {
  const cleanId = publicId.replace(/^\//, '');
  return `https://res.cloudinary.com/${getCloudName()}/image/upload/${transforms}/${cleanId}`;
};

export const cloudinaryFetchUrl = (remoteUrl: string, transforms = DEFAULT_TRANSFORMS): string =>
  `https://res.cloudinary.com/${getCloudName()}/image/upload/${transforms}/${remoteUrl}`;

/**
 * Resuelve una fuente de imagen local, Cloudinary (public ID) o fetch remoto.
 */
export const resolveImageSrc = (src: string, transforms = DEFAULT_TRANSFORMS): string => {
  if (!src) return src;

  if (isCloudinaryUrl(src)) {
    return src;
  }

  if (isCloudinaryId(src)) {
    return cloudinaryUrl(parseCloudinaryId(src), transforms);
  }

  if (isCloudinaryFetch(src)) {
    const remoteUrl = `${getSiteOrigin()}${parseCloudinaryFetchPath(src)}`;
    return cloudinaryFetchUrl(remoteUrl, transforms);
  }

  return src;
};

export const getImageSrcSet = (
  src: string,
  widths: readonly number[] = DEFAULT_WIDTHS,
  baseTransforms = DEFAULT_TRANSFORMS
): string | undefined => {
  if (!isCloudinarySource(src) || isCloudinaryUrl(src)) {
    return undefined;
  }

  const entries = widths.map((width) => {
    const url = resolveImageSrc(src, `${baseTransforms},w_${width}`);
    return `${url} ${width}w`;
  });

  return entries.join(', ');
};

export const getOgImageFromCloudinary = (
  src: string,
  transforms = 'f_jpg,w_1200,h_630,c_fill,q_auto'
): string => resolveImageSrc(src, transforms);
