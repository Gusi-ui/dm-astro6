import type { APIRoute } from 'astro';
import { reivindicacionesConfig } from '../lib/reivindicaciones';
import { getAlternates } from '../i18n';
import { categoryPath, claimPath, getPublishedPosts, postPath } from '../lib/blog';

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
  const blogEntries = (['es', 'ca'] as const).map(async (lang) => {
    const posts = await getPublishedPosts(lang);
    const categories = [
      ...new Set(posts.map((post) => post.data.category).filter(Boolean)),
    ] as string[];
    return [
      ...categories.map((category) => ({
        // Codificada como en su canonical («reflexión» → reflexi%C3%B3n)
        path: encodeURI(categoryPath(category, lang)),
        changefreq: 'weekly',
        priority: 0.5,
      })),
      // Las reivindicaciones en catalán, solo cuando ya tienen artículos que mostrar
      ...reivindicacionesConfig
        .filter(
          (r) =>
            lang === 'es' ||
            posts.some((post) =>
              r.categories.some((c) => c.toLowerCase() === post.data.category?.toLowerCase())
            )
        )
        .map((reivindicacion) => ({
          path: claimPath(reivindicacion.slug, lang),
          changefreq: 'weekly',
          priority: 0.5,
        })),
      ...posts.map((post) => ({
        path: postPath(post),
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: post.data.updatedDate ?? post.data.pubDate,
      })),
    ];
  });

  const entries: SitemapEntry[] = [
    ...staticPages.map((path) => ({
      path,
      // Las páginas en catalán toman la prioridad de su versión en castellano
      ...(PAGE_PRIORITY[getAlternates(path)?.es ?? path] ?? {
        changefreq: 'monthly',
        priority: 0.7,
      }),
    })),
    ...(await Promise.all(blogEntries)).flat(),
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
