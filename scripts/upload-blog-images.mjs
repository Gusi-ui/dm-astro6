#!/usr/bin/env node
/**
 * Sube imágenes del blog a Cloudinary y actualiza el artículo piloto.
 *
 * Uso:
 *   pnpm upload:blog-images plaza-catalunya
 *
 * Requiere en .env:
 *   CLOUDINARY_CLOUD_NAME=dzs4olh43
 *   CLOUDINARY_API_KEY=...
 *   CLOUDINARY_API_SECRET=...
 */

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const loadEnvFile = () => {
  const envPath = path.join(ROOT, '.env');

  if (!fs.existsSync(envPath)) {
    return;
  }

  const content = fs.readFileSync(envPath, 'utf8');

  for (const line of content.split('\n')) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmed.indexOf('=');

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^["']|["']$/g, '');

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
};

loadEnvFile();

const ARTICLE_IMAGES = {
  'plaza-catalunya': {
    articlePath: 'src/content/blog/plaza-catalunya-accesibilidad.md',
    folder: 'divermataro/blog/plaza-catalunya',
    files: [
      'pcb.avif',
      'pc1.avif',
      'pc2.avif',
      'pc3.avif',
      'pc4.avif',
      'pc8.avif',
      'pc9.avif',
      'pc12.avif',
      'pcp5.avif',
      'pcp6.avif',
      'pcp7.avif',
      'pcp11.avif',
    ],
  },
};

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'dzs4olh43';
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

const articleKey = process.argv[2];

if (!articleKey || !ARTICLE_IMAGES[articleKey]) {
  console.error('Uso: pnpm upload:blog-images <articulo>');
  console.error(`Artículos disponibles: ${Object.keys(ARTICLE_IMAGES).join(', ')}`);
  process.exit(1);
}

if (!apiKey || !apiSecret) {
  console.error('Faltan credenciales de Cloudinary.');
  console.error('Añade CLOUDINARY_API_KEY y CLOUDINARY_API_SECRET en tu archivo .env');
  process.exit(1);
}

const { articlePath, folder, files } = ARTICLE_IMAGES[articleKey];
const publicRoot = path.join(ROOT, 'public', 'images', 'blog');
const articleFullPath = path.join(ROOT, articlePath);

const signParams = (params) => {
  const sorted = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');

  return crypto.createHash('sha1').update(`${sorted}${apiSecret}`).digest('hex');
};

const uploadImage = async (fileName) => {
  const localPath = path.join(publicRoot, fileName);

  if (!fs.existsSync(localPath)) {
    throw new Error(`No se encontró el archivo local: ${localPath}`);
  }

  const publicId = fileName.replace(/\.[^.]+$/, '');
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const paramsToSign = {
    folder,
    overwrite: 'true',
    public_id: publicId,
    timestamp,
  };
  const signature = signParams(paramsToSign);
  const form = new FormData();

  form.append('file', new Blob([fs.readFileSync(localPath)]), fileName);
  form.append('api_key', apiKey);
  form.append('timestamp', timestamp);
  form.append('signature', signature);
  form.append('folder', folder);
  form.append('public_id', publicId);
  form.append('overwrite', 'true');

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: form,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error?.message || `Error al subir ${fileName}`);
  }

  return {
    fileName,
    publicId: result.public_id,
    url: result.secure_url,
  };
};

const updateArticleMarkdown = (uploads) => {
  let content = fs.readFileSync(articleFullPath, 'utf8');

  for (const upload of uploads) {
    const localPath = `/images/blog/${upload.fileName}`;
    const cloudinaryRef = `cloudinary:${upload.publicId}`;

    content = content.split(localPath).join(cloudinaryRef);
  }

  fs.writeFileSync(articleFullPath, content, 'utf8');
};

const main = async () => {
  console.log(`Subiendo ${files.length} imágenes a Cloudinary (${folder})...`);

  const uploads = [];

  for (const fileName of files) {
    const upload = await uploadImage(fileName);
    uploads.push(upload);
    console.log(`✓ ${fileName} → ${upload.publicId}`);
  }

  updateArticleMarkdown(uploads);
  console.log(`\nArtículo actualizado: ${articlePath}`);
  console.log('Las rutas locales se han sustituido por cloudinary:<public_id>.');
};

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
