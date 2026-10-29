/**
 * El blog en los dos idiomas: la colección «blog» es el castellano (/blog) y
 * «blogCa» el catalán (/ca/blog). Cada artículo catalán puede apuntar a su versión
 * en castellano con esSlug.
 */

import { getCollection, type CollectionEntry } from 'astro:content';
import { categoryName, localizePath, normalizePath, type Lang } from '../i18n';
import { reivindicacionesConfig } from './reivindicaciones';

export type BlogPost = CollectionEntry<'blog'> | CollectionEntry<'blogCa'>;

const collectionByLang = { es: 'blog', ca: 'blogCa' } as const;

/**
 * Artículos ya publicados de un idioma (los de fecha futura esperan a su día).
 * En desarrollo, PREVIEW_SCHEDULED=1 muestra también los programados.
 */
export async function getPublishedPosts(lang: Lang): Promise<BlogPost[]> {
  const now = new Date();
  const showScheduled = import.meta.env.DEV && process.env.PREVIEW_SCHEDULED === '1';
  return (await getCollection(
    collectionByLang[lang],
    ({ data }: BlogPost) => showScheduled || data.pubDate <= now
  )) as BlogPost[];
}

/** Idioma en que está escrito el artículo (el de su blog, salvo que diga otra cosa) */
export function postLang(post: BlogPost): Lang {
  return post.data.lang ?? (post.collection === 'blogCa' ? 'ca' : 'es');
}

export function blogPath(lang: Lang): string {
  return lang === 'ca' ? '/ca/blog' : '/blog';
}

export function postPath(post: BlogPost): string {
  return `${blogPath(post.collection === 'blogCa' ? 'ca' : 'es')}/${post.id}`;
}

/**
 * Todas las categorías de los dos blogs (también las de artículos programados), para
 * generar sus páginas en los dos idiomas y que el selector de idioma nunca dé 404.
 */
export async function getAllCategories(): Promise<string[]> {
  const [es, ca] = (await Promise.all([getCollection('blog'), getCollection('blogCa')])) as [
    BlogPost[],
    BlogPost[],
  ];
  return [...new Set([...es, ...ca].map((post) => post.data.category).filter(Boolean))] as string[];
}

/** Ruta de la página de una categoría, con el nombre de la categoría en ese idioma */
export function categoryPath(category: string, lang: Lang): string {
  const name = categoryName(category, lang).toLowerCase();
  return `${blogPath(lang)}/categoria/${name}`;
}

/** Ruta de la página de una reivindicación */
export function claimPath(slug: string, lang: Lang): string {
  if (lang === 'es') return `/blog/reivindicacion/${slug}`;
  const claim = reivindicacionesConfig.find((r) => r.slug === slug);
  return `/ca/blog/reivindicacio/${claim?.ca.slug ?? slug}`;
}

/**
 * Pares de artículos traducidos, publicados en los dos idiomas: slug en castellano
 * → slug en catalán.
 */
export async function getTranslations(): Promise<Map<string, string>> {
  const [es, ca] = await Promise.all([getPublishedPosts('es'), getPublishedPosts('ca')]);
  const esIds = new Set(es.map((post) => post.id));
  const pairs = new Map<string, string>();
  for (const post of ca) {
    const esSlug = post.collection === 'blogCa' ? post.data.esSlug : undefined;
    if (esSlug && esIds.has(esSlug)) pairs.set(esSlug, post.id);
  }
  return pairs;
}

/** Las dos versiones de un artículo, o null si solo existe en su idioma */
export function postAlternates(
  post: BlogPost,
  translations: Map<string, string>
): Record<Lang, string> | null {
  if (post.collection === 'blogCa') {
    const esSlug = post.data.esSlug;
    return esSlug && translations.get(esSlug) === post.id
      ? { es: `/blog/${esSlug}`, ca: `/ca/blog/${post.id}` }
      : null;
  }
  const caSlug = translations.get(post.id);
  return caSlug ? { es: `/blog/${post.id}`, ca: `/ca/blog/${caSlug}` } : null;
}

/**
 * Ruta en catalán equivalente a una ruta interna en castellano: artículos con
 * traducción, reivindicaciones, categorías y páginas fijas. Si no hay versión
 * catalana, la deja como está.
 */
export function localizeBlogPath(path: string, translations: Map<string, string>): string {
  const [pathname, hash = ''] = path.split('#');
  const clean = normalizePath(pathname);
  const suffix = hash ? `#${hash}` : '';

  const claim = clean.match(/^\/blog\/reivindicacion\/([^/]+)$/);
  if (claim) return claimPath(claim[1], 'ca') + suffix;

  const category = clean.match(/^\/blog\/categoria\/([^/]+)$/);
  if (category) {
    const original = decodeURIComponent(category[1]);
    return categoryPath(original.charAt(0).toUpperCase() + original.slice(1), 'ca') + suffix;
  }

  const post = clean.match(/^\/blog\/([^/]+)$/);
  if (post) {
    const caSlug = translations.get(post[1]);
    return (caSlug ? `/ca/blog/${caSlug}` : clean) + suffix;
  }

  return localizePath(clean, 'ca') + suffix;
}

/**
 * En los artículos catalanes, los enlaces internos escritos en castellano
 * (/asociacion, /blog/x) pasan a su versión catalana si existe.
 */
export function localizeArticleLinks(html: string, translations: Map<string, string>): string {
  return html.replace(
    /href="(\/(?!ca\/|ca"|documents\/|images\/|_astro\/)[^"]*)"/g,
    (_match, path: string) => `href="${localizeBlogPath(path, translations)}"`
  );
}
