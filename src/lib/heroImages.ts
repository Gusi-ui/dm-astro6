/**
 * Colección de imágenes de hero desde Cloudinary
 * Para añadir nuevas imágenes, simplemente añade la URL al array
 */

export const heroImages = [
  'https://res.cloudinary.com/dzs4olh43/image/upload/v1769508835/diverfaceww-minn-min_wvvllt.jpg',
  'https://res.cloudinary.com/dzs4olh43/image/upload/v1769446107/Ver_vbn638.png',
  'https://res.cloudinary.com/dzs4olh43/image/upload/v1769347000/Diversidad_nqwhmc.avif',
  // Añade más imágenes aquí conforme las subas a Cloudinary
];

/**
 * Obtiene una imagen de hero aleatoria
 */
export function getRandomHeroImage(): string {
  const randomIndex = Math.floor(Math.random() * heroImages.length);
  return heroImages[randomIndex];
}

/**
 * Obtiene una imagen específica por índice (útil para páginas que quieren una imagen fija)
 */
export function getHeroImage(index: number): string {
  return heroImages[index % heroImages.length];
}
