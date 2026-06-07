#!/usr/bin/env node
/**
 * Sube las imágenes locales de un artículo a Cloudinary y actualiza su markdown.
 *
 * Uso:
 *   pnpm upload:blog-images <slug-del-articulo>
 *
 * Ejemplo:
 *   pnpm upload:blog-images plaza-catalunya-accesibilidad
 *
 * El script:
 * 1. Abre src/content/blog/<slug>.md
 * 2. Detecta rutas /images/blog/... en el archivo
 * 3. Sube cada imagen a divermataro/blog/<slug>/ en Cloudinary
 * 4. Sustituye las rutas locales por cloudinary:<public_id>
 *
 * Requiere en .env (solo en tu máquina, nunca en git):
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
const BLOG_CONTENT_DIR = path.join(ROOT, 'src', 'content', 'blog');
const PUBLIC_BLOG_IMAGES = path.join(ROOT, 'public', 'images', 'blog');
const LOCAL_IMAGE_REGEX = /\/images\/blog\/([^\s"'`)]+)/g;

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

const slug = process.argv[2];
const isDryRun = process.argv.includes('--dry-run');

if (!slug) {
  console.error('Uso: pnpm upload:blog-images <slug-del-articulo> [--dry-run]');
  console.error('');
  console.error('Ejemplo:');
  console.error('  pnpm upload:blog-images plaza-catalunya-accesibilidad');
  console.error('');
  console.error('Artículos disponibles en src/content/blog/:');

  if (fs.existsSync(BLOG_CONTENT_DIR)) {
    const articles = fs
      .readdirSync(BLOG_CONTENT_DIR)
      .filter((file) => file.endsWith('.md'))
      .map((file) => file.replace(/\.md$/, ''));

    for (const article of articles) {
      console.error(`  - ${article}`);
    }
  }

  process.exit(1);
}

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'dzs4olh43';
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error('Faltan credenciales de Cloudinary.');
  console.error('Añade CLOUDINARY_API_KEY y CLOUDINARY_API_SECRET en tu archivo .env');
  process.exit(1);
}

const articlePath = path.join(BLOG_CONTENT_DIR, `${slug}.md`);

if (!fs.existsSync(articlePath)) {
  console.error(`No se encontró el artículo: ${articlePath}`);
  process.exit(1);
}

const articleContent = fs.readFileSync(articlePath, 'utf8');
const detectedFiles = [...articleContent.matchAll(LOCAL_IMAGE_REGEX)].map((match) => match[1]);
const uniqueFiles = [...new Set(detectedFiles)];

if (uniqueFiles.length === 0) {
  console.log(`No hay rutas /images/blog/ en ${slug}.md`);
  console.log('Si ya usas cloudinary:..., no hace falta volver a ejecutar el script.');
  process.exit(0);
}

const folder = `divermataro/blog/${slug}`;

const signParams = (params) => {
  const sorted = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');

  return crypto.createHash('sha1').update(`${sorted}${apiSecret}`).digest('hex');
};

const uploadImage = async (fileName) => {
  const localPath = path.join(PUBLIC_BLOG_IMAGES, fileName);

  if (!fs.existsSync(localPath)) {
    throw new Error(`No se encontró el archivo local: public/images/blog/${fileName}`);
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
  let content = fs.readFileSync(articlePath, 'utf8');

  for (const upload of uploads) {
    const localPath = `/images/blog/${upload.fileName}`;
    const cloudinaryRef = `cloudinary:${upload.publicId}`;

    content = content.split(localPath).join(cloudinaryRef);
  }

  fs.writeFileSync(articlePath, content, 'utf8');
};

const main = async () => {
  console.log(`Artículo: ${slug}.md`);
  console.log(`Carpeta Cloudinary: ${folder}`);
  console.log(`Imágenes detectadas: ${uniqueFiles.length}`);

  for (const file of uniqueFiles) {
    console.log(`  - ${file}`);
  }

  if (isDryRun) {
    console.log('\nModo --dry-run: no se subió nada ni se modificó el markdown.');
    return;
  }

  console.log('\nSubiendo imágenes...');

  const uploads = [];

  for (const fileName of uniqueFiles) {
    const upload = await uploadImage(fileName);
    uploads.push(upload);
    console.log(`✓ ${fileName} → ${upload.publicId}`);
  }

  updateArticleMarkdown(uploads);
  console.log(`\nArtículo actualizado: src/content/blog/${slug}.md`);
  console.log('Rutas locales sustituidas por cloudinary:<public_id>.');
  console.log('\nSiguiente paso: revisa el artículo en local y haz commit del .md');
};

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
