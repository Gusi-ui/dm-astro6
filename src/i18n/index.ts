/**
 * Idiomas del sitio: castellano en la raíz y catalán bajo /ca/, con rutas propias
 * en catalán (/ca/serveis/…, /ca/associacio).
 */

import { categoryNamesCa } from './home';
import { ui } from './ui';

export const languages = { es: 'Castellano', ca: 'Català' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'es';

/** Locale para fechas (toLocaleDateString) y para Open Graph */
export const dateLocales: Record<Lang, string> = { es: 'es-ES', ca: 'ca-ES' };
export const ogLocales: Record<Lang, string> = { es: 'es_ES', ca: 'ca_ES' };

/**
 * Ruta en castellano → ruta en catalán.
 *
 * Una ruta entra aquí SOLO cuando su página /ca/ ya existe: el selector de idioma,
 * los hreflang y los enlaces de la cabecera y el pie en catalán salen de este mapa,
 * así que nunca apuntan a una página que no existe. Mientras falte, las páginas en
 * catalán enlazan a la versión en castellano.
 *
 * Rutas previstas: / → /ca · /asociacion → /ca/associacio · /blog → /ca/blog ·
 * /documentos → /ca/documents · /contacto → /ca/contacte · /asociate → /ca/associa-te ·
 * /privacidad → /ca/privacitat · /eliminacion-datos → /ca/eliminacio-dades ·
 * /servicios/apoyo-personalizado → /ca/serveis/suport-personalitzat ·
 * /servicios/comunidad-inclusiva → /ca/serveis/comunitat-inclusiva ·
 * /servicios/actos-reivindicativos → /ca/serveis/actes-reivindicatius ·
 * /servicios/reconocimiento-social → /ca/serveis/reconeixement-social ·
 * /servicios/accesibilidad-universal → /ca/serveis/accessibilitat-universal ·
 * /servicios/innovacion-constante → /ca/serveis/innovacio-constant
 */
export const caRoutes: Record<string, string> = {
  '/': '/ca',
  '/asociacion': '/ca/associacio',
  '/contacto': '/ca/contacte',
  '/documentos': '/ca/documents',
  '/servicios/apoyo-personalizado': '/ca/serveis/suport-personalitzat',
  '/servicios/comunidad-inclusiva': '/ca/serveis/comunitat-inclusiva',
  '/servicios/actos-reivindicativos': '/ca/serveis/actes-reivindicatius',
  '/servicios/reconocimiento-social': '/ca/serveis/reconeixement-social',
  '/servicios/accesibilidad-universal': '/ca/serveis/accessibilitat-universal',
  '/servicios/innovacion-constante': '/ca/serveis/innovacio-constant',
};

const esRoutes: Record<string, string> = Object.fromEntries(
  Object.entries(caRoutes).map(([es, ca]) => [ca, es])
);

/** Ruta sin .html ni barra final (salvo la portada), como los enlaces y el canonical */
export function normalizePath(pathname: string): string {
  return pathname.replace(/\.html$/, '').replace(/(.)\/$/, '$1');
}

export function getLangFromUrl(url: URL): Lang {
  const path = normalizePath(url.pathname);
  return path === '/ca' || path.startsWith('/ca/') ? 'ca' : 'es';
}

/** Ruta de una página (dada en castellano) en el idioma pedido; si aún no existe, la castellana */
export function localizePath(esPath: string, lang: Lang): string {
  return lang === 'ca' ? (caRoutes[esPath] ?? esPath) : esPath;
}

/** Las dos versiones de la página actual, o null si solo existe en un idioma */
export function getAlternates(pathname: string): Record<Lang, string> | null {
  const path = normalizePath(pathname);
  if (caRoutes[path]) return { es: path, ca: caRoutes[path] };
  if (esRoutes[path]) return { es: esRoutes[path], ca: path };
  return null;
}

export function useTranslations(lang: Lang) {
  return createTranslator(ui, lang);
}

/** Traductor para un diccionario de página ({ es: {...}, ca: {...} }) */
export function createTranslator<K extends string>(
  dict: { es: Record<K, string>; ca: Partial<Record<K, string>> },
  lang: Lang
) {
  return (key: K): string => dict[lang][key] ?? dict.es[key];
}

/**
 * Valor del atributo lang para un texto en `contentLang` dentro de una página en
 * `pageLang`: solo hace falta cuando no coinciden.
 */
export function langAttr(contentLang: Lang | undefined, pageLang: Lang): Lang | undefined {
  const lang = contentLang ?? defaultLang;
  return lang === pageLang ? undefined : lang;
}

/** Nombre visible de una categoría del blog */
export function categoryName(category: string, lang: Lang): string {
  return lang === 'ca' ? (categoryNamesCa[category] ?? category) : category;
}
