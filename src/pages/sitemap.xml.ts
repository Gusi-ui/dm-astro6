import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { reivindicacionesConfig } from '../lib/reivindicaciones';
import { getAlternates } from '../i18n';

type SitemapEntry = { path: string; changefreq: string; priority: number; lastmod?: Date };

// Las páginas fijas salen de src/pages, así que una página nueva entra sola en el
// sitemap. Quedan fuera las dinámicas ([slug]), que se añaden abajo, y estas:
const EXCLUDED_PAGES = new Set(['/asociate/gracias', '/ca/associa-te/gracies']);

const PAGE_PRIORITY: Record<string, Pick<SitemapEntry, 'changefreq' | 'priority'>> = {
  '/': { changefreq: 'weekly', priority: 1.0 },
  '/asociate': { changefreq: 'monthly', priority: 0.9 },
  '/blog': { changefreq: 'weekly', priority: 0.8 },
  '/privacidad': { changefreq: 'yearly', priority: 0.3 },
  '/eliminacion-datos': { changefreq: 'yearly', priority: 0.3 },
};

const staticPages = Object.keys(import.meta.glob('./**/*.astro'))
  .filter((file) => !file.includes('['))
  .map((file) =>
    file
      .replace(/^\./, '')
      .replace(/\.astro$/, '')
      .replace(/\/index$/, '')
  )
  .map((path) => path || '/')
  .filter((path) => !EXCLUDED_PAGES.has(path));

export const GET: APIRoute = async ({ site }) => {
  // site.href acaba en '/', y las rutas de abajo ya empiezan por '/'
  const baseUrl = (site?.href || 'https://divermataro.org').replace(/\/$/, '');
  // Mismo criterio que /blog: los artículos con fecha futura aún no se publican
  const posts: CollectionEntry<'blog'>[] = await getCollection(
    'blog',
    ({ data }: CollectionEntry<'blog'>) => data.pubDate <= new Date()
  );
  const categories = [
    ...new Set(posts.map((post) => post.data.category).filter(Boolean)),
  ] as string[];

  const entries: SitemapEntry[] = [
    ...staticPages.map((path) => ({
      path,
      // Las páginas en catalán toman la prioridad de su versión en castellano
      ...(PAGE_PRIORITY[getAlternates(path)?.es ?? path] ?? {
        changefreq: 'monthly',
        priority: 0.7,
      }),
    })),
    ...categories.map((category) => ({
      // Codificada como en su canonical («reflexión» → reflexi%C3%B3n)
      path: `/blog/categoria/${encodeURIComponent(category.toLowerCase())}`,
      changefreq: 'weekly',
      priority: 0.5,
    })),
    ...reivindicacionesConfig.map((reivindicacion) => ({
      path: `/blog/reivindicacion/${reivindicacion.slug}`,
      changefreq: 'weekly',
      priority: 0.5,
    })),
    ...posts.map((post) => ({
      path: `/blog/${post.id}`,
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: post.data.updatedDate ?? post.data.pubDate,
    })),
  ];

  const urls = entries
    .map(
      ({ path, changefreq, priority, lastmod }) => `  <url>
    <loc>${baseUrl}${path}</loc>${lastmod ? `\n    <lastmod>${lastmod.toISOString()}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`
    )
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
  );
};
