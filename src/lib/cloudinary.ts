const DEFAULT_CLOUD_NAME = 'dzs4olh43';
const DEFAULT_SITE = 'https://divermataro.org';
const CLOUDINARY_PREFIX = 'cloudinary:';
const CLOUDINARY_FETCH_PREFIX = 'cloudinary-fetch:';

/** Transformaciones base: formato automático (AVIF/WebP) y calidad adaptativa */
const BASE_TRANSFORMS = 'f_auto,q_auto:eco,dpr_auto';

export type CloudinaryPreset = {
  transforms: string;
  widths: readonly number[];
  defaultWidth: number;
  sizes: string;
};

/** Presets optimizados por contexto de uso */
export const CLOUDINARY_PRESETS = {
  /** Miniaturas en listados del blog (tarjetas) */
  thumbnail: {
    transforms: BASE_TRANSFORMS,
    widths: [320, 480, 640, 800],
    defaultWidth: 640,
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px',
  },
  /** Imagen hero de artículo — prioriza móvil */
  hero: {
    transforms: 'f_auto,q_auto:good,dpr_auto',
    widths: [480, 640, 768, 1024, 1280, 1600],
    defaultWidth: 768,
    sizes: '(max-width: 768px) 100vw, 896px',
  },
  /** Imágenes dentro del cuerpo del artículo */
  inline: {
    transforms: BASE_TRANSFORMS,
    widths: [320, 480, 640, 768, 1024, 1200],
    defaultWidth: 768,
    sizes: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 432px',
  },
} as const satisfies Record<string, CloudinaryPreset>;

export type CloudinaryPresetName = keyof typeof CLOUDINARY_PRESETS;

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

export const cloudinaryUrl = (publicId: string, transforms = BASE_TRANSFORMS): string => {
  const cleanId = publicId.replace(/^\//, '');
  return `https://res.cloudinary.com/${getCloudName()}/image/upload/${transforms}/${cleanId}`;
};

export const cloudinaryFetchUrl = (remoteUrl: string, transforms = BASE_TRANSFORMS): string =>
  `https://res.cloudinary.com/${getCloudName()}/image/upload/${transforms}/${remoteUrl}`;

const withWidth = (transforms: string, width: number): string => `${transforms},w_${width}`;

/**
 * Resuelve una fuente de imagen local, Cloudinary (public ID) o fetch remoto.
 */
export const resolveImageSrc = (
  src: string,
  transformsOrPreset: string | CloudinaryPresetName = 'inline',
  width?: number
): string => {
  if (!src) return src;

  const preset =
    typeof transformsOrPreset === 'string' && transformsOrPreset in CLOUDINARY_PRESETS
      ? CLOUDINARY_PRESETS[transformsOrPreset as CloudinaryPresetName]
      : null;

  const transforms = preset
    ? withWidth(preset.transforms, width ?? preset.defaultWidth)
    : width
      ? withWidth(transformsOrPreset, width)
      : transformsOrPreset;

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
  presetOrWidths: CloudinaryPresetName | readonly number[] = 'inline',
  baseTransforms?: string
): string | undefined => {
  if (!isCloudinarySource(src) || isCloudinaryUrl(src)) {
    return undefined;
  }

  const preset = typeof presetOrWidths === 'string' ? CLOUDINARY_PRESETS[presetOrWidths] : null;
  const widths = preset?.widths ?? presetOrWidths;
  const transforms = preset?.transforms ?? baseTransforms ?? BASE_TRANSFORMS;

  const entries = widths.map((w) => {
    const url = resolveImageSrc(src, withWidth(transforms, w));
    return `${url} ${w}w`;
  });

  return entries.join(', ');
};

export const getImageSizes = (preset: CloudinaryPresetName = 'inline'): string =>
  CLOUDINARY_PRESETS[preset].sizes;

export const getOgImageFromCloudinary = (
  src: string,
  transforms = 'f_jpg,w_1200,h_630,c_fill,q_auto:good'
): string => resolveImageSrc(src, transforms);
