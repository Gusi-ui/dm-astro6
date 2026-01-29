/**
 * Colección de imágenes de hero desde Cloudinary
 * Cada imagen tiene configuración para desktop y móvil
 */

export interface HeroImage {
  /** URL base de Cloudinary */
  url: string;
  /** Posición del fondo en desktop (ej: 'center 30%') */
  desktopPosition: string;
  /** Posición del fondo en móvil (ej: 'center 50%') */
  mobilePosition: string;
  /** Transformación de Cloudinary para móvil (opcional, ej: 'g_auto', 'g_face') */
  mobileTransform?: string;
  /** Escala en móvil: 'cover' (default), 'contain', o porcentaje como '120%' */
  mobileScale?: string;
}

export const heroImages: HeroImage[] = [
  {
    url: 'https://res.cloudinary.com/dzs4olh43/image/upload/v1769508835/diverfaceww-minn-min_wvvllt.jpg',
    desktopPosition: 'center 30%',
    mobilePosition: '20% center',
    mobileTransform: 'c_fill,g_center,z_0.7,x_-150',
  },

  {
    url: 'https://res.cloudinary.com/dzs4olh43/image/upload/v1769446107/Ver_vbn638.png',
    desktopPosition: 'center -20%',
    mobilePosition: 'center -200%',
    mobileTransform: 'g_auto,c_fill,z_0.7', // Zoom 1.5x centrado en área auto-detectada
    mobileScale: 'cover',
  },
  {
    url: 'https://res.cloudinary.com/dzs4olh43/image/upload/v1769347000/Diversidad_nqwhmc.avif',
    desktopPosition: 'center 30%',
    mobilePosition: 'center 50%',
    mobileTransform: 'g_auto,c_fill',
  },
  {
    url: 'https://res.cloudinary.com/dzs4olh43/image/upload/v1769529141/DSC_3856_befiqf.jpg',
    desktopPosition: 'center 30%',
    mobilePosition: 'center 30%',
    mobileTransform: 'g_face,c_fill',
  },
  {
    url: 'https://res.cloudinary.com/dzs4olh43/image/upload/v1769529141/5_t7vv1w.jpg',
    desktopPosition: 'center 30%',
    mobilePosition: '30% center',
    mobileTransform: 'g_auto',
    mobileScale: 'cover',
  },
  {
    url: 'https://res.cloudinary.com/dzs4olh43/image/upload/v1769529140/4_oppb0s.jpg',
    desktopPosition: 'center 30%',
    mobilePosition: 'center center',
    mobileTransform: 'g_auto',
  },
  {
    url: 'https://res.cloudinary.com/dzs4olh43/image/upload/v1769529141/6_b8zngc.jpg',
    desktopPosition: 'center 30%',
    mobilePosition: 'center 40%',
    mobileTransform: 'g_auto,c_fill',
  },
  {
    url: 'https://res.cloudinary.com/dzs4olh43/image/upload/v1769529141/16_gac9ev.jpg',
    desktopPosition: 'center 30%',
    mobilePosition: 'center 55%',
    mobileTransform: 'g_auto,c_fill,z_0.7',
  },
  {
    url: 'https://res.cloudinary.com/dzs4olh43/image/upload/v1769529141/7_czsdn1.jpg',
    desktopPosition: 'center 30%',
    mobilePosition: 'center 40%',
    mobileTransform: 'g_auto,c_fill',
  },
  {
    url: 'https://res.cloudinary.com/dzs4olh43/image/upload/v1769528958/common-1300520_hg9hoo.svg',
    desktopPosition: 'center 30%',
    mobilePosition: 'center 40%',
    mobileTransform: 'g_auto,c_fill',
  },
  // Añade más imágenes aquí conforme las subas a Cloudinary
];

/**
 * Aplica transformaciones de Cloudinary a una URL
 */
function applyCloudinaryTransform(url: string, transform: string): string {
  // Las URLs de Cloudinary tienen el formato:
  // https://res.cloudinary.com/{cloud}/image/upload/{transformaciones}/{version}/{imagen}
  // Insertamos las transformaciones después de 'upload/'
  return url.replace('/upload/', `/upload/${transform}/`);
}

/**
 * Obtiene una imagen de hero aleatoria con todas sus propiedades
 */
export function getRandomHeroImage(): HeroImage {
  const randomIndex = Math.floor(Math.random() * heroImages.length);
  return heroImages[randomIndex];
}

/**
 * Obtiene una imagen específica por índice
 */
export function getHeroImage(index: number): HeroImage {
  return heroImages[index % heroImages.length];
}

/**
 * Genera la URL optimizada para móvil con transformaciones de Cloudinary
 */
export function getMobileHeroUrl(image: HeroImage): string {
  if (image.mobileTransform) {
    return applyCloudinaryTransform(image.url, image.mobileTransform);
  }
  return image.url;
}

/**
 * Genera el CSS para el hero con soporte responsive
 * Retorna un objeto con las clases y estilos necesarios
 */
export function getHeroStyles(image: HeroImage): {
  desktopUrl: string;
  mobileUrl: string;
  desktopPosition: string;
  mobilePosition: string;
} {
  return {
    desktopUrl: image.url,
    mobileUrl: getMobileHeroUrl(image),
    desktopPosition: image.desktopPosition,
    mobilePosition: image.mobilePosition,
  };
}
