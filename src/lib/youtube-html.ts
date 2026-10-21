const IFRAME_REGEX = /<iframe\b([^>]*)>\s*<\/iframe>/gi;
const YOUTUBE_ID_REGEX = /youtube(?:-nocookie)?\.com\/embed\/([\w-]{11})/;

const getAttribute = (attributes: string, name: string): string | undefined =>
  attributes.match(new RegExp(`\\b${name}="([^"]*)"`, 'i'))?.[1];

const escapeAttribute = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** Icono de reproducir con la forma y los colores del reproductor de YouTube */
const PLAY_ICON =
  '<svg class="yt-facade-play" viewBox="0 0 68 48" aria-hidden="true" focusable="false">' +
  '<path d="M66.5 7.7c-.8-2.9-2.5-5.4-5.4-6.2C55.8.1 34 0 34 0S12.2.1 6.9 1.6c-3 .7-4.6 3.2-5.4 6.1C.1 13 0 24 0 24s.1 11 1.5 16.3c.8 2.9 2.5 5.4 5.4 6.2C12.2 47.9 34 48 34 48s21.8-.1 27.1-1.5c2.9-.8 4.6-3.3 5.4-6.2C67.9 35 68 24 68 24s-.1-11-1.5-16.3z" fill="#f00"/>' +
  '<path d="M45 24 27 14v20" fill="#fff"/>' +
  '</svg>';

/**
 * Sustituye los iframes de YouTube por una miniatura con botón de reproducir.
 * El vídeo real (y los ~1 MB de JavaScript de YouTube) solo se carga al pulsar;
 * lo hace el script de la página del artículo. El botón conserva las clases y
 * estilos del iframe para no cambiar la maquetación.
 *
 * Los demás iframes (Google Drive, mapas) se dejan igual, pero con carga diferida.
 */
export const transformYouTubeHtml = (html: string): string =>
  html.replace(IFRAME_REGEX, (match, attributes: string) => {
    const src = getAttribute(attributes, 'src') ?? '';
    const videoId = src.match(YOUTUBE_ID_REGEX)?.[1];

    if (!videoId) {
      return /\bloading=/i.test(attributes)
        ? match
        : match.replace('<iframe', '<iframe loading="lazy"');
    }

    const title = getAttribute(attributes, 'title') ?? 'Vídeo de YouTube';
    const className = getAttribute(attributes, 'class');
    const style = getAttribute(attributes, 'style');

    return [
      `<button type="button" class="yt-facade${className ? ` ${escapeAttribute(className)}` : ''}"`,
      style ? ` style="${escapeAttribute(style)}"` : '',
      ` data-yt-id="${videoId}" data-yt-title="${escapeAttribute(title)}"`,
      ` aria-label="Reproducir el vídeo: ${escapeAttribute(title)}">`,
      `<img src="https://i.ytimg.com/vi/${videoId}/hqdefault.jpg" alt="" width="480" height="360" loading="lazy" decoding="async">`,
      PLAY_ICON,
      '</button>',
    ].join('');
  });
