import type { Lang } from '../i18n';

/**
 * DiverMapa, el mapa de lugares accesibles de la asociación (repositorio divermapa-mataro). La web
 * enlaza a él desde la portada y el pie, en el mismo idioma y en la misma pestaña.
 */
export const DIVERMAPA_URL: Record<Lang, string> = {
  es: 'https://mapa.divermataro.org',
  ca: 'https://mapa.divermataro.org/ca',
};

/** Formulario del mapa para aportar un sitio nuevo (abierto a cualquiera). */
export const DIVERMAPA_NEW_PLACE_URL: Record<Lang, string> = {
  es: 'https://mapa.divermataro.org/avisar/sitio-nuevo',
  ca: 'https://mapa.divermataro.org/ca/avisa/lloc-nou',
};
